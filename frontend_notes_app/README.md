# Ocean Notes – Astro Frontend Notes App

A modern, minimalistic notes app built with Astro and the "Ocean Professional" theme.  
Features a responsive sidebar, searchable notes list, markdown/plain text editing, localStorage persistence, and keyboard accessibility.

---

## 🚀 Quickstart

```sh
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to use the app.

- `npm run preview`: Preview your production build locally.

---

## Features

- **Sidebar:** List your notes, select to edit, or delete. Create new notes with one click.
- **Main Editor:** Write and edit notes. Autosaves changes and persists via browser localStorage.
- **Real-time Search:** Filter notes by title or content.
- **Keyboard-accessible:** Navigate and operate all features with keyboard alone.
- **Persisted Storage:** Notes survive browser refresh via localStorage.
- **Theme:** Ocean Professional – blue primary (`#2563EB`), amber secondary (`#F59E0B`), error (`#EF4444`), soft gradients, surface/background, deep navy text, rounded corners, subtle drop-shadows, and lively transitions.
- **Responsive:** Fully responsive and touch compatible.

---

## Architecture

- **Astro** for static rendering and theming.
- **Preact** island for reactive state: Search, CRUD, localStorage, focus, and editor logic.
- Custom components for header, sidebar, note editor.
- Domain logic and UI glued via a single island pattern for best interactivity with minimal bundle size.

---

## Environment

- No backend is required or configured for the MVP; data is stored in browser localStorage.
- `.env.example` is included for future PUBLIC_API_BASE or related variables, but not needed for current functionality.

---

## Accessibility & UX

- Semantic HTML, ARIA roles, proper focus management.
- Keyboard users: Tab through sidebar/notes/actions, Enter or Space to activate, Esc or Cancel button to leave edit mode.

---

## Theming

- Colors:  
  - Primary: `#2563EB` (blue)  
  - Secondary/success: `#F59E0B` (amber)
  - Error: `#EF4444`
  - Background: `#f9fafb`
  - Surface: `#ffffff`
  - Text: `#111827`
  - Gradient: subtle, from blue-500/10 to gray-50  
- Rounded corners, drop-shadows, and smooth transitions for a polished "Ocean Professional" feel.

---

## Customization

- To wire up an API or sync backend, see `.env.example` for `PUBLIC_*` env configuration points.

---

## License

MIT
