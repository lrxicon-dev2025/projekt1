# To‑Do App

Simple browser-based To‑Do application.

## What this is
A minimal To‑Do list built with plain HTML, CSS, and JavaScript. Tasks are stored in localStorage so they persist across page reloads.

## Files
- `index.html` — UI for the app
- `style.css` — Styles for the app
- `index.js` — Application logic (add/toggle/delete tasks, localStorage persistence)

## Prerequisites
A modern web browser (Chrome, Edge, Firefox, Safari). No server required.

## Run locally
From the project folder open `index.html` in your browser. In PowerShell:

```powershell
Start-Process .\index.html -WorkingDirectory 'C:\Users\Admin\mitt-repo\HTML\Project2'
```

Or double-click the file in your file explorer or open it from your editor.

## Features
- Add tasks
- Mark tasks complete (checkbox)
- Delete tasks
- Persistent storage via `localStorage`
- Keyboard-friendly: press Enter to add a task

## Tests / Manual checklist
- Add a new task — it appears at the top of the list.
- Mark a task complete — it shows as crossed out.
- Delete a task — it is removed.
- Reload the page — tasks persist.

## Git / Commit
To commit changes locally:

```powershell
git add .
git commit -m "Add todo app with localStorage persistence and styles"
git push origin main
```

## Next improvements

## License
 This project exposes a JSON export/import feature and includes machine-readable JSON-LD in the page so AI tools can read the current task list.
 
 How AI tools can interact
 
 - The page includes a <script type="application/ld+json" id="todo-jsonld"> which contains a schema.org ItemList of current tasks. AI agents (or scrapers) can parse that script tag to read tasks, positions, and a small `done` flag.
 - Use the "Export JSON" button to download `todos.json` — a plain array of todo objects ({id,text,done}). AI tools can ingest that file directly.
 - Use the "Import JSON" button to upload a `todos.json` file to restore tasks locally.
 
 Notes and next steps
 
 - This is a static front-end implementation. If you want a programmatic AI integration (e.g., a bot that reads and updates tasks remotely), the next step is to add a small server API (Express/Flask) that exposes REST endpoints (GET/POST/PUT/DELETE) which an AI agent can call. I can scaffold a minimal server for local use if you want.
 - The JSON-LD approach is useful for web crawlers and agents that scan page HTML — it doesn't provide write access. Import/export supports manual or scripted read/write flows.
