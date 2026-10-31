import classNames from 'classnames'
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { IconArrowLeft, IconArrowRight, IconFullscreen } from '../icons/Icons'

// All slides have this size. The deck scales them to fit the window.
export const slideWidth = 1920
export const slideHeight = 1080

export const SlideNumberContext = createContext({ number: 1, total: 1 })

// Sets the scale of the slides as a CSS variable. It runs as an inline script
// before React loads, so that the first slide shows immediately in the correct
// size, also on a slow network.
const scaleScript = `(function () {
  function update() {
    document.documentElement.style.setProperty(
      '--slide-scale',
      String(Math.min(innerWidth / ${slideWidth}, innerHeight / ${slideHeight})),
    )
  }
  update()
  addEventListener('resize', update)
})()`

const nextKeys = ['ArrowRight', 'ArrowDown', 'PageDown', ' ', 'Enter']
const previousKeys = ['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace']

// The controls and the cursor hide after this time without a mouse movement
const idleMilliseconds = 2000

/**
 * Reads the slide number from the URL hash, for example "#3" for slide 3.
 */
function getIndexFromHash(total: number) {
  const number = parseInt(window.location.hash.slice(1), 10)

  return Number.isNaN(number) ? 0 : Math.min(Math.max(number, 1), total) - 1
}

function toggleFullscreen() {
  if (document.fullscreenElement) {
    void document.exitFullscreen()
  } else {
    void document.documentElement.requestFullscreen()
  }
}

/**
 * Shows one slide at a time in the full window.
 * Keyboard: arrow keys, space, enter and page up/down (also used by remote
 * clickers) go to the next or the previous slide. Home and End go to the
 * first and the last slide. F toggles the fullscreen mode.
 * The URL hash holds the number of the slide, so a reload keeps the slide.
 * To print all slides, or to save them as a PDF, use the print dialog of the browser.
 */
export function SlideDeck({ slides }: { slides: ReactNode[] }) {
  const total = slides.length
  const [index, setIndex] = useState(0)
  const [isIdle, setIsIdle] = useState(false)

  const goTo = useCallback(
    (value: number) => {
      const next = Math.min(Math.max(value, 0), total - 1)
      setIndex(next)
      window.history.replaceState(null, '', `#${next + 1}`)
    },
    [total],
  )

  useEffect(() => {
    const updateIndex = () => {
      setIndex(getIndexFromHash(total))
    }

    updateIndex()
    window.addEventListener('hashchange', updateIndex)

    return () => {
      window.removeEventListener('hashchange', updateIndex)
    }
  }, [total])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Keep the shortcuts of the browser, for example to reload the page
      if (event.metaKey || event.ctrlKey || event.altKey) {
        return
      }

      if (nextKeys.includes(event.key)) {
        event.preventDefault()
        goTo(index + 1)
      } else if (previousKeys.includes(event.key)) {
        event.preventDefault()
        goTo(index - 1)
      } else if (event.key === 'Home') {
        event.preventDefault()
        goTo(0)
      } else if (event.key === 'End') {
        event.preventDefault()
        goTo(total - 1)
      } else if (event.key === 'f') {
        toggleFullscreen()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [goTo, index, total])

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    const handleMouseMove = () => {
      setIsIdle(false)
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        setIsIdle(true)
      }, idleMilliseconds)
    }

    handleMouseMove()
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      clearTimeout(timeout)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div
      className={classNames(
        'fixed inset-0 flex items-center justify-center overflow-hidden bg-navy print:static print:block',
        isIdle && 'cursor-none',
      )}
    >
      <script dangerouslySetInnerHTML={{ __html: scaleScript }} />
      <div
        className="shrink-0 print:!transform-none"
        style={{
          width: slideWidth,
          height: slideHeight,
          transform: 'scale(var(--slide-scale, 1))',
        }}
      >
        {slides.map((slide, slideIndex) => (
          <div
            // The slides have no other stable identity than their position
            key={slideIndex}
            // Hidden slides stay in the page, so that their images load in advance.
            // The enter animations restart each time a slide shows again.
            className={classNames(
              'size-full overflow-hidden print:block print:break-after-page',
              slideIndex !== index && 'hidden',
            )}
            aria-hidden={slideIndex !== index}
          >
            <SlideNumberContext.Provider
              value={{ number: slideIndex + 1, total }}
            >
              {slide}
            </SlideNumberContext.Provider>
          </div>
        ))}
      </div>

      <nav
        aria-label="Slides"
        className={classNames(
          'fixed bottom-4 right-4 flex items-center gap-1 rounded-full bg-slate/80 p-1 text-white backdrop-blur transition-opacity duration-500 print:hidden',
          isIdle && 'pointer-events-none opacity-0',
        )}
      >
        <DeckButton
          label="Previous slide"
          onClick={() => {
            goTo(index - 1)
          }}
          disabled={index === 0}
        >
          <IconArrowLeft className="size-5" />
        </DeckButton>
        <span className="min-w-14 text-center text-sm tabular-nums">
          {index + 1} / {total}
        </span>
        <DeckButton
          label="Next slide"
          onClick={() => {
            goTo(index + 1)
          }}
          disabled={index === total - 1}
        >
          <IconArrowRight className="size-5" />
        </DeckButton>
        <DeckButton label="Fullscreen (F)" onClick={toggleFullscreen}>
          <IconFullscreen className="size-5" />
        </DeckButton>
      </nav>
    </div>
  )
}

type DeckButtonProps = {
  label: string
  onClick: () => void
  disabled?: boolean
  children: ReactNode
}

function DeckButton({
  label,
  onClick,
  disabled = false,
  children,
}: DeckButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={(event) => {
        onClick()
        // Without it, the space key and the enter key press the button again
        event.currentTarget.blur()
      }}
      disabled={disabled}
      className="flex size-10 items-center justify-center rounded-full transition-colors hover:bg-slate-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-white disabled:opacity-30 disabled:hover:bg-transparent"
    >
      {children}
    </button>
  )
}
