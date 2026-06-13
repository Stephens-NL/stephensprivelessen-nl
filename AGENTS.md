# AGENTS.md

Codex guidance for `projects/stephensprivelessen-nl`.

## Overview

- Public tutoring marketing site built with Next.js and `next-intl`.

## Commands

```bash
npm run dev
npm run build
npm run lint
npm run test
npx jest __tests__/components/About.test.ts
docker compose up -d --build
```

## Rules

- Dutch is the default locale. Preserve the current locale routing behavior.
- Use `next-intl`, not alternative i18n libraries.
- Check whether text comes from `data/` or `messages/` before editing copy.
- Respect the current visual system: Cormorant Garamond, Outfit, amber/yellow palette, Framer Motion.
