import Link from 'next/link'
import { ReactNode } from 'react'
import { site } from '../../data/site'
import { IconLinkedIn, IconMail, IconX } from '../icons/Icons'
import { Logo } from '../shared/Logo'

const pages = [
  { href: '/', label: 'Home' },
  { href: '/#next-event', label: 'Next event' },
  { href: '/events', label: 'Past events' },
  { href: '/speaker-notes', label: 'Speaker notes' },
  { href: '/host-notes', label: 'Host notes' },
]

const channels = [
  {
    href: `mailto:${site.email}`,
    // The address can break after the @ on narrow screens.
    label: (
      <>
        {site.email.split('@')[0]}@<wbr />
        {site.email.split('@')[1]}
      </>
    ),
    icon: <IconMail className="size-4" />,
    external: false,
  },
  {
    href: site.linkedInUrl,
    label: 'LinkedIn',
    icon: <IconLinkedIn className="size-4" />,
    external: true,
  },
  {
    href: site.twitterUrl,
    label: site.twitterHandle,
    icon: <IconX className="size-4" />,
    external: true,
  },
]

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-content grid-cols-[auto_1fr] gap-x-12 gap-y-10 border-t border-white/10 px-4 py-12 md:grid-cols-[1fr_auto_auto] md:gap-16 md:px-10 lg:gap-24">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-4">
            <Logo className="w-14 shrink-0" />
            <p className="max-w-xs text-sm text-slate-muted">
              Your quarterly tech event in South Tyrol to connect, share and
              discuss.
            </p>
          </div>
        </div>
        <FooterGroup title="Pages" label="Footer">
          {pages.map((page) => (
            <li key={page.href}>
              <Link href={page.href} className="hover:underline">
                {page.label}
              </Link>
            </li>
          ))}
        </FooterGroup>
        <FooterGroup title="Follow us" label="Social media">
          {channels.map((channel) => (
            <li key={channel.href}>
              <a
                href={channel.href}
                target={channel.external ? '_blank' : undefined}
                rel={channel.external ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center gap-2 hover:underline"
              >
                <span className="shrink-0">{channel.icon}</span>
                <span className="min-w-0">{channel.label}</span>
              </a>
            </li>
          ))}
        </FooterGroup>
      </div>
    </footer>
  )
}

type FooterGroupProps = {
  title: string
  label: string
  children: ReactNode
}

function FooterGroup({ title, label, children }: FooterGroupProps) {
  return (
    <nav aria-label={label} className="flex flex-col gap-4">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-muted">
        {title}
      </h2>
      <ul className="flex flex-col gap-3 text-sm">{children}</ul>
    </nav>
  )
}
