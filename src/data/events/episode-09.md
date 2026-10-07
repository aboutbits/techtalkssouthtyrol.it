---
episode: 9
date: '2025-05-28'
startTime: '18:00'
endTime: '20:00'
host: 'Brandnamic'
venue:
  name: 'Brandnamic'
  address: 'Satzlstraße 4'
  city: 'Brixen/Bressanone'
talks:
  - title: 'Modernizing Legacy Apps: Microfrontends Architecture, and Core-Agnostic Design'
    speakers:
      - name: 'Daniel David Díaz González'
        role: 'Head of Frontend'
        company: 'Yanovis'
        companyUrl: 'https://www.yanovis.com'
    slides: '/slides/episode-09/modernizing-legacy-apps.pdf'
    abstract: |
      Migrating a legacy monolithic application is a major challenge — especially when a full rewrite isn't realistic. In this talk, I'll share how we successfully transitioned a large Vue 2 monolith to a modern, scalable architecture using Microfrontends. By first migrating the architecture — not the framework — we allowed teams to progressively rebuild individual apps in Vue 3 without disrupting the whole system. I'll discuss why having a Core-Agnostic project for shared services like Authentication, i18n, Sockets, Settings, and Sentry was critical to support multiple framework versions seamlessly. We used Single-SPA and SystemJS to manage Microfrontends dynamically, while preparing for a future switch to native ESM as browser support matures. Microfrontends not only helped us split and modernize the app, but also empowered teams to own and innovate independently.
  - title: 'Engineering a VR Cloud Rendering Service'
    speakers:
      - name: 'Klaus Prünster'
        role: 'Senior Software Engineer - Cloud Solutions'
        company: 'Innoactive'
        companyUrl: 'https://www.innoactive.io'
    slides: ''
    abstract: |
      GPUs are in high demand, but most PCs—especially in large enterprises—can’t run high-fidelity applications. Innoactive Portal solves this problem. This talk explores how a globally distributed platform lifts GPU-intensive workloads into the cloud and streams them to browsers, VR devices, and now the Apple Vision Pro—while keeping latency manageable and cloud costs under control. It covers the technical challenges of scaling across 100+ cloud regions and shares insights from iterative product development in a small team, highlighting the tension between ideal architecture, legacy code and pragmatic trade-offs.
---
