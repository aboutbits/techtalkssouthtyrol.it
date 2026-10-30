import { trackEvent } from '../../lib/analytics'
import { IconMail } from '../icons/Icons'
import { Section, SectionHeader } from './Section'
import { SubscribeForm } from './SubscribeForm'

type NewsletterProps = {
  // Where the form is, for the analytics
  source: string
}

export function Newsletter({ source }: NewsletterProps) {
  return (
    <Section id="newsletter" tone="navy" compact>
      <SectionHeader
        label="Newsletter"
        tone="dark"
        title="Never miss an episode"
        // Nothing follows the header in this section
        className="!mb-0 lg:!items-center"
        description={
          <p className="max-w-xl text-md text-slate-muted">
            Get an email when we announce the next episode, with the date, the
            location and the talks. About four emails per year, no spam.
          </p>
        }
      >
        <SubscribeForm
          tone="dark"
          className="lg:max-w-md"
          submitLabel={
            <>
              <IconMail className="size-5" />
              Subscribe
            </>
          }
          onSuccess={() => {
            trackEvent('Newsletter', { source })
          }}
        />
      </SectionHeader>
    </Section>
  )
}
