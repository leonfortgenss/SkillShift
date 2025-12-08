# SkillShift — AI Football Training Assistant

This repository will use **React** as the foundation for the mobile-friendly web client, paired with **shadcn/ui** for consistent, modern components. The stack aligns with the teen-focused, athletic aesthetic outlined in the product brief while keeping the build lean and easily themeable.

## Why React + shadcn/ui
- **Modern UX velocity:** React supports rapid iteration on the dashboard, recording flow, and analysis results while staying flexible for future native bridges if needed.
- **shadcn/ui polish:** The component library offers well-structured, accessible primitives that can be themed to the SkillShift palette (#0D0F10, #00E676, #1DE9B6) and rounded, card-based layouts.
- **Composable primitives:** Cards, dialogs, charts, and toggles can be tailored for features like Tier Progression, Privacy controls (face-blur toggles), Weekly Growth cards, and Ranked Mode opt-in.
- **Strong theming:** Tokens for spacing (24–32px containers, 12–16px gaps), radii (16–20px), and neon accents can live in a single theme file for consistent styling.

## Suggested project setup
1. **Framework:** Start with Next.js (App Router) for file-based routing and API routes for upload placeholders.
2. **UI system:** Install shadcn/ui and configure a dark theme that matches the SkillShift palette; add custom icons for tiers and recording overlays.
3. **State & data:** Use React Query or SWR for async flows (upload, analysis results, progress graphs) and Zustand/Context for light client state like Momentum Score and Tier card data.
4. **Media handling:** Integrate a recording/upload component with AR overlay placeholders; wire to backend endpoints as they become available.
5. **Analytics & privacy:** Keep Ranked Mode opt-in and privacy toggles front-and-center; default face-blur to ON.
6. **Animations:** Use Framer Motion for subtle tier level-ups and ghost overlay previews without heavy performance costs.

## Next steps
- Scaffold the Next.js app with TypeScript.
- Add shadcn/ui theme tokens for the neon green accents and dark surfaces.
- Build core screens: Onboarding, Home Dashboard, Recording with AR overlay placeholder, Analysis Results, Progress Graphs, Tier Progression, Weekly Growth Card, and Settings.
- Wire mock data for Momentum Score, Tier progression, and micro-improvement bullet points to validate the layout before hooking up real analysis outputs.

React + shadcn/ui is a solid fit for delivering a fast, polished SkillShift experience while remaining adaptable as the AI analysis pipeline evolves.
