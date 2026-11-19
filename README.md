# Felix Akatia Edoukou Porquet: Portfolio

My personal portfolio, built with **TypeScript, HTML and CSS**. No frameworks and no build tools beyond the TypeScript compiler, so the whole codebase is easy to read and host.

Live site: https://porquet01.github.io

## Project structure

```
felix-portfolio/
├── index.html          Page structure and metadata
├── src/                TypeScript source (edit these)
│   ├── profile.ts      Your intro, about text, skills and education
│   ├── projects.ts     Your project cards
│   ├── config.ts       Email, GitHub, LinkedIn and form settings
│   ├── render.ts       Builds the page sections from the data
│   ├── contact.ts      Contact form validation and sending
│   ├── theme.ts        Light and dark mode
│   ├── nav.ts          Mobile menu and active link
│   ├── dom.ts          Small helpers
│   └── main.ts         Entry point
├── dist/               Compiled JavaScript (generated, commit it)
├── css/                base.css, layout.css, components.css
└── assets/
    ├── images/         Your photo and project screenshots
    └── icons/          Favicon
```

## Run it on your computer

You need [Node.js](https://nodejs.org) installed.

```bash
npm install        # installs TypeScript (first time only)
npm run build      # compiles src/ into dist/
```

Open the folder in VS Code and start the **Live Server** extension on `index.html`. Double-clicking `index.html` will not work, because browsers block JavaScript modules on `file://`.

While editing, `npm run watch` recompiles every time you save.

## Make it yours

1. **Text:** edit `src/profile.ts` and `src/projects.ts`, then run `npm run build`.
2. **Pictures:** follow `assets/images/README.txt`.
3. **LinkedIn:** paste your URL into `linkedinUrl` in `src/config.ts`.
4. **CV:** put your PDF in `assets/` and set `cvUrl: "assets/Felix_CV.pdf"` in `src/profile.ts`.
5. **Project links:** fill in `liveUrl` and `repoUrl` for each project in `src/projects.ts`. Links that are `null` stay hidden.

## Contact form

The form validates every field in TypeScript and has a hidden spam trap.

- **Out of the box**, submitting opens the visitor's email app with the message ready to send to your address.
- **To receive messages directly in your inbox**, create a free form at [formspree.io](https://formspree.io) using porquetfelix@gmail.com, then paste its URL into `formEndpoint` in `src/config.ts`.

## Deploy on GitHub Pages

1. Create a public repository named **Porquet01.github.io** on GitHub.
2. Push this folder to it:
   ```bash
   git init
   git add .
   git commit -m "Add portfolio"
   git branch -M main
   git remote add origin https://github.com/Porquet01/Porquet01.github.io.git
   git push -u origin main
   ```
3. On GitHub, open **Settings, Pages**, set the source to **Deploy from a branch**, choose `main` and `/ (root)`, and save.
4. After a minute or two the site is live at https://porquet01.github.io.

Remember to run `npm run build` and commit the updated `dist/` folder after every change to `src/`.
