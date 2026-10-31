# techtalkssouthtyrol.it

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing
purposes.

### Prerequisites

- [NPM](https://www.npmjs.com)

### Setup

#### GitHub Registry

Some packages (`@aboutbits/eslint-config`, `@aboutbits/prettier-config` and `@aboutbits/ts-config`) are hosted on the
GitHub registry.

In order to get access to packages (public and private) hosted on the GitHub registry, generate a classic personal
access token on GitHub with `read:packages` permissions: https://github.com/settings/tokens

Next, you have to paste the following snippet including your generated token to the `~/.npmrc` file on your machine.

```
//npm.pkg.github.com/:_authToken=<YOUR_TOKEN>
@aboutbits:registry=https://npm.pkg.github.com
```

#### Dependencies

Install all dependencies by executing the following command:

```bash
npm ci
```

#### Execution

Next, you can start the application:

```bash
npm run dev
```

The project will be served at http://localhost:3000.

## Development

For linting the source files, execute the following command:

```bash
npm run lint

# or

npm run lint:fix
```

For type checking, execute the following command:

```bash
npm run typecheck
```

## Content

All content is managed in the code. There is no CMS.

### Events

Each episode is a Markdown file in `src/data/events`, for example `src/data/events/episode-14.md`.
The file name is also the URL: `/events/episode-14`.

The front matter holds the structured data of the event:

```yaml
---
episode: 15
date: '2026-12-01'          # YYYY-MM-DD, always in quotes
startTime: '18:00'
endTime: '20:00'
host: 'Company that hosts the episode'
hostUrl: 'https://example.com'   # optional, website of the host
venue:
  name: 'Name of the venue'               # optional, only if the event does not take place at the host
  address: 'Street 1'
  city: 'Bozen/Bolzano'
talks:
  - title: 'Title of the talk'
    speakers:
      - name: 'Jane Doe'
        role: 'Software Engineer'          # optional
        company: 'Company'                 # optional
        companyUrl: 'https://example.com'  # optional
        image: '/images/speakers/jane-doe.jpg'  # optional, square photo in public/images/speakers
        social:                            # optional, every entry is optional
          x: 'https://x.com/janedoe'
          linkedin: 'https://www.linkedin.com/in/janedoe'
          github: 'https://github.com/janedoe'
          website: 'https://janedoe.dev'
    slides: '/slides/episode-15/talk-title.pdf'  # optional, a path in public/ or an external URL
    recording: ''                                # optional, URL of a video
    abstract: |
      The abstract of the talk. Markdown is supported.
---

Optional Markdown content, for example arrival information. It is shown below the talks in the "Additional information" section. Use `###` for sub-headings.
```

The home page shows an event as the "next event" until the end of the event day.
The schedule of the next event is calculated from `startTime`: the first talk starts 15 minutes later, and every further talk starts 35 minutes after the talk before.
After that day, the event moves to the past events.
The pages are generated at build time, so a new deployment is necessary to move an event from "next" to "past".

### Slides

Put the slide files in `public/slides/<episode>/` and set the `slides` field of the talk.
A link to an external service (for example Speaker Deck or Google Slides) also works.

### Presentation of the evening

Each event has a presentation at `/events/<episode>/slides`, for example `/events/episode-15/slides`.
On the day of the event, open the page in the browser and share the screen.
No page links to the presentation, and search engines do not index it.

The slides use the data of the event. Without further configuration, the presentation has these slides:

1. `title`: Tech Talks South Tyrol, the episode, the date and the location
2. `about`: what the meetup is about
3. `agenda`: welcome and introduction, presenting the host, the talks with their start times, closing remarks, and networking
4. `get-involved`: give a talk or host a meetup
5. `next-event`: the next episode. If the file of the next episode exists, the slide shows its date, location and talks.

To change the slides, add the `presentation` field to the front matter of the event.
The field replaces the default list, so it must contain all slides in the correct order:

```yaml
presentation:
  - title
  - about
  - agenda
  - host                 # optional: the name of the host, before the host presents the company
  - type: talk           # optional: the title and the speakers of a talk
    talk: 1              # the number of the talk, starting with 1
  - type: custom         # a slide with your own content
    label: 'Thank you'   # optional, the pill above the title
    title: 'Our sponsor' # optional
    tone: pastel         # optional: navy, white (default) or pastel
    content: |           # optional, Markdown. Images must be in public/, for example ![](/images/...)
      Thanks to **Company** for the drinks and the snacks.
  - get-involved
  - next-event
```

Navigate with the arrow keys, the space key or a remote clicker. Press `F` for the fullscreen mode.
The number of the slide is in the URL (`#3`), so a reload keeps the slide.
To save the slides as a PDF, print the page in Chrome and select "Save as PDF".

### Team

The organizers are in `src/data/team.ts`. The photos are in `public/images/team`.

## Newsletter

The newsletter runs on [Buttondown](https://buttondown.com).
The forms on the website send the email address to `/api/subscribe`, and this API route adds the person to Buttondown.

- The newsletter section (on the home page and on the events page) only adds the person to the newsletter.
- "I will attend" on an upcoming event downloads the calendar file and opens a dialog. In the dialog, the person can subscribe to the newsletter.
  These subscribers get the tag of the episode, for example `episode-15`. To see them, filter the subscribers by this tag in Buttondown.
  Tags need a paid plan of Buttondown. Without tags, the person is only added to the newsletter.

Buttondown sends a confirmation email (double opt-in) to new subscribers.
A person who unsubscribed does not get the newsletter again after a registration for an event.

The API route needs the environment variable `BUTTONDOWN_API_KEY`.
Get the API key in Buttondown under Settings → API, and add it to the environment variables of the Vercel project.
For local development, put it in `.env.local`:

```
BUTTONDOWN_API_KEY=<YOUR_API_KEY>
```

The website sends the Plausible events `Attending` and `Newsletter`.
Add them as goals in Plausible to see them.
