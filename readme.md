# techtalkssouthtyrol.it

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing
purposes.

### Prerequisites

- [NPM](https://www.npmjs.com)

### Setup

Install all dependencies by executing the following command:

```bash
npm ci
```

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
venue:
  name: 'Name of the venue'
  address: 'Street 1'
  city: 'Bozen/Bolzano'
image: '/images/events/episode-15.jpeg'   # banner, 16:9, put the file in public/images/events
attendees: 0
talks:
  - time: '18:15'
    title: 'Title of the talk'
    speakers:
      - name: 'Jane Doe'
        role: 'Software Engineer'          # optional
        company: 'Company'                 # optional
        companyUrl: 'https://example.com'  # optional
    slides: '/slides/episode-15/talk-title.pdf'  # optional, a path in public/ or an external URL
    recording: ''                                # optional, URL of a video
    abstract: |
      The abstract of the talk. Markdown is supported.
---

Optional Markdown content, for example arrival information. It is shown below the talks.
```

The home page shows an event as the "next event" until the end of the event day.
After that day, the event moves to the past events.
The pages are generated at build time, so a new deployment is necessary to move an event from "next" to "past".

### Slides

Put the slide files in `public/slides/<episode>/` and set the `slides` field of the talk.
A link to an external service (for example Speaker Deck or Google Slides) also works.

### Team

The organizers are in `src/data/team.ts`. The photos are in `public/images/team`.

### General information

The e-mail address and the social media links are in `src/data/site.ts`.

### Logo

All logo files are in `public/images/logo`. Use them for social media, Discord, slides and print.

| File | Use |
| --- | --- |
| `logo.svg`, `logo-1024.png` | Square logo on navy. For avatars (social media, Discord, Meetup). |
| `logo-pastel.svg`, `logo-pastel-1024.png` | Square logo on the pastel background. |
| `logo-mark.svg`, `logo-mark-1024.png` | Braces and letters without a background. For dark backgrounds. |
| `logo-mark-navy.svg`, `logo-mark-navy-1024.png` | Navy only, without a background. For light backgrounds and one-color print. |
| `logo-mark-white.svg`, `logo-mark-white-1024.png` | White only, without a background. For photos and dark backgrounds. |
| `logo-horizontal*.svg`, `logo-horizontal*-2000.png` | Logo with the name next to it. The same three color versions as the mark. |

The script `scripts/generate-logo.mjs` generates all these files and the app icons in `public/images/icons`.
After a change to the logo, run the following command and update the paths in `src/components/shared/Logo.tsx`:

```bash
npm run logo
```
