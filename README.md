# Nelly Portfolio (Vite + React Footer)

This keeps your current static site, but mounts only the **Footer** as a React component with Vite.
Your original HTML, CSS, and JS remain unchanged.

## What changed?
- Replaced the `<footer>...</footer>` in `index.html` with `<div id="footer-root"></div>`
- Added Vite entry: `<script type="module" src="/src/main.jsx"></script>` before `</body>`
- `src/components/Footer.jsx` renders the dynamic year and your nav links
- `src/main.jsx` mounts the footer into `#footer-root`
- Your existing `style.css`, `mediaqueries.css`, and `script.js` are preserved at project root

## Scripts
```bash
npm install
npm run dev       # start local dev server
npm run build     # build for production
npm run preview   # preview the production build
```

## Notes
- If you have images in `./assets/` from your old site, copy that folder into this project root
  and keep the relative paths the same (e.g., `<img src="./assets/Nelly 1.png" ...>`).
- You can gradually migrate other sections into React components later for consistency.
