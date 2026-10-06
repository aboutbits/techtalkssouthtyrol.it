// Generates all logo files in public/images/logo and the app icons in
// public/images/icons. The letters are converted to outlines, so the files do
// not need the Inter font. Run it with: npm run logo
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import opentype from 'opentype.js'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const logoDir = join(root, 'public/images/logo')
const iconDir = join(root, 'public/images/icons')

const colors = {
  navy: '#071b2d',
  white: '#ffffff',
  cream: '#fef3ce',
  blush: '#fbdcda',
  mist: '#bcd5dc',
  sky: '#a0d4e0',
}

// The left brace in a 100 x 300 box. The tip points to the left.
const BRACE =
  'M100 0C58 0 36 20 36 58V112C36 136 22 147 0 150C22 153 36 164 36 188V242C36 280 58 300 100 300V272C76 272 64 262 64 236V190C64 168 54 156 36 150C54 144 64 132 64 110V64C64 38 76 28 100 28Z'

// eslint-disable-next-line import/no-named-as-default-member -- opentype.js is a CommonJS module
const font = opentype.parse(
  readFileSync(
    join(
      root,
      'node_modules/@fontsource/inter/files/inter-latin-600-normal.woff',
    ),
  ).buffer,
)

/**
 * Converts a text to one SVG path.
 * The anchor is "start" or "middle" on the x position.
 */
function textPath(text, { x, y, size, letterSpacing = 0, anchor = 'start' }) {
  const scale = size / font.unitsPerEm
  // One glyph per character. The ligature features of Inter are not
  // supported by opentype.js and are not necessary for these words.
  const glyphs = [...text].map((char) => font.charToGlyph(char))
  const positions = []
  let cursor = 0
  glyphs.forEach((glyph, index) => {
    positions.push(cursor)
    const next = glyphs[index + 1]
    const kerning = next ? font.getKerningValue(glyph, next) : 0
    cursor += (glyph.advanceWidth + kerning) * scale
    if (next) {
      cursor += letterSpacing
    }
  })
  const start = anchor === 'middle' ? x - cursor / 2 : x
  const d = glyphs
    .map((glyph, index) =>
      glyph.getPath(start + positions[index], y, size).toPathData(1),
    )
    .join('')
  return { d, width: cursor }
}

// The mark on a 512 x 512 canvas. The braces span x 60 to 452 and y 106 to 406.
const letters = textPath('ST', {
  x: 256,
  y: 304,
  size: 136,
  letterSpacing: -8,
  anchor: 'middle',
})

const gradient = `<linearGradient id="brace" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${colors.cream}"/>
    <stop offset=".3" stop-color="${colors.blush}"/>
    <stop offset=".6" stop-color="${colors.mist}"/>
    <stop offset="1" stop-color="${colors.sky}"/>
  </linearGradient>`

const pastel = `<radialGradient id="pastel-sky" cx="0" cy="1" r="1">
    <stop offset="0" stop-color="${colors.sky}"/>
    <stop offset=".6" stop-color="${colors.sky}" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="pastel-blush" cx=".15" cy=".2" r=".6">
    <stop offset="0" stop-color="${colors.blush}"/>
    <stop offset="1" stop-color="${colors.blush}" stop-opacity="0"/>
  </radialGradient>`

function mark({ brace, letter }) {
  return `<g fill="${brace}">
    <path d="${BRACE}" transform="translate(60 106)"/>
    <path d="${BRACE}" transform="translate(452 106) scale(-1 1)"/>
  </g>
  <path d="${letters.d}" fill="${letter}"/>`
}

const themes = {
  // Gradient braces and white letters. For dark backgrounds.
  primary: { brace: 'url(#brace)', letter: colors.white, defs: gradient },
  // Navy only. For light backgrounds and one-color print.
  navy: { brace: colors.navy, letter: colors.navy, defs: '' },
  // White only. For dark backgrounds and photos.
  white: { brace: colors.white, letter: colors.white, defs: '' },
}

const backgrounds = {
  navy: {
    rect: `<rect width="512" height="512" fill="${colors.navy}"/>`,
    defs: '',
  },
  pastel: {
    rect: `<rect width="512" height="512" fill="${colors.cream}"/>
  <rect width="512" height="512" fill="url(#pastel-sky)"/>
  <rect width="512" height="512" fill="url(#pastel-blush)"/>`,
    defs: pastel,
  },
}

function svg({ viewBox, width, height, defs, body }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${width}" height="${height}">
  ${defs ? `<defs>${defs}</defs>` : ''}
  ${body}
</svg>
`
}

/** The square logo with a background, for avatars and app icons. */
function squareLogo(themeName, backgroundName, viewBox = '0 0 512 512') {
  const theme = themes[themeName]
  const background = backgrounds[backgroundName]
  const size = Number(viewBox.split(' ')[2])
  return svg({
    viewBox,
    width: size,
    height: size,
    defs: theme.defs + background.defs,
    body: background.rect + mark(theme),
  })
}

/** The mark without a background, cropped to the braces. */
function markOnly(themeName) {
  const theme = themes[themeName]
  return svg({
    viewBox: '40 86 432 340',
    width: 432,
    height: 340,
    defs: theme.defs,
    body: mark(theme),
  })
}

/** The mark with the name next to it, without a background. */
function horizontalLogo(themeName) {
  const theme = themes[themeName]
  const textColor = themeName === 'navy' ? colors.navy : colors.white
  const name = textPath('Tech Talks South Tyrol', {
    x: 492,
    y: 296,
    size: 112,
    letterSpacing: -3,
  })
  const width = Math.ceil(492 + name.width + 40)
  return svg({
    viewBox: `40 86 ${width - 40} 340`,
    width: width - 40,
    height: 340,
    defs: theme.defs,
    body: `${mark(theme)}
  <path d="${name.d}" fill="${textColor}"/>`,
  })
}

async function png(svgSource, file, width) {
  await sharp(Buffer.from(svgSource), { density: 300 })
    .resize({ width })
    .png()
    .toFile(file)
}

mkdirSync(logoDir, { recursive: true })

const files = {
  'logo.svg': squareLogo('primary', 'navy'),
  'logo-pastel.svg': squareLogo('navy', 'pastel'),
  'logo-mark.svg': markOnly('primary'),
  'logo-mark-navy.svg': markOnly('navy'),
  'logo-mark-white.svg': markOnly('white'),
  'logo-horizontal.svg': horizontalLogo('primary'),
  'logo-horizontal-navy.svg': horizontalLogo('navy'),
  'logo-horizontal-white.svg': horizontalLogo('white'),
}

for (const [file, source] of Object.entries(files)) {
  writeFileSync(join(logoDir, file), source)
}

// PNG files for social media, Discord, slides and other tools.
await png(files['logo.svg'], join(logoDir, 'logo-1024.png'), 1024)
await png(files['logo-pastel.svg'], join(logoDir, 'logo-pastel-1024.png'), 1024)
await png(files['logo-mark.svg'], join(logoDir, 'logo-mark-1024.png'), 1024)
await png(
  files['logo-mark-navy.svg'],
  join(logoDir, 'logo-mark-navy-1024.png'),
  1024,
)
await png(
  files['logo-mark-white.svg'],
  join(logoDir, 'logo-mark-white-1024.png'),
  1024,
)
await png(
  files['logo-horizontal.svg'],
  join(logoDir, 'logo-horizontal-2000.png'),
  2000,
)
await png(
  files['logo-horizontal-navy.svg'],
  join(logoDir, 'logo-horizontal-navy-2000.png'),
  2000,
)
await png(
  files['logo-horizontal-white.svg'],
  join(logoDir, 'logo-horizontal-white-2000.png'),
  2000,
)

// App icons and favicons. The small sizes use a tighter crop, so the braces
// stay visible at 16 and 32 px.
const icon = squareLogo('primary', 'navy')
const smallIcon = squareLogo('primary', 'navy', '36 36 440 440').replace(
  `<rect width="512" height="512"`,
  `<rect x="36" y="36" width="440" height="440"`,
)
writeFileSync(join(iconDir, 'icon.svg'), smallIcon)
for (const size of [16, 32]) {
  await png(smallIcon, join(iconDir, `${size}x${size}.png`), size)
}
for (const size of [72, 96, 128, 144, 152, 180, 192, 384, 512]) {
  await png(icon, join(iconDir, `${size}x${size}.png`), size)
}

process.stdout.write(
  `Letters path for src/components/shared/Logo.tsx:\n${letters.d}\n`,
)
