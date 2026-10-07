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

### Team

The organizers are in `src/data/team.ts`. The photos are in `public/images/team`.
