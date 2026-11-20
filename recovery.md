# Recovery Guide

This guide covers how to recover a working local setup for this React + TypeScript (Vite) components project if something goes wrong during install, development, or a clean checkout.

## Prerequisites

- **Node.js**: LTS recommended (v18+)
- **npm**: Comes with Node.js
- **Git**: To clone or reset the repository

Confirm versions:

```bash
node -v
npm -v
git --version
```

## Fresh Recovery (clean start)

Use this when the project is broken locally, dependencies are corrupted, or you want a known-good state.

1. Clone (or re-clone) the repository:

```bash
git clone https://github.com/ImranJalal/Components-ts.git
cd Components-ts
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open the URL Vite prints (typically `http://localhost:5173`).

## Soft Recovery (keep your local changes)

Use this when `node_modules` or the lockfile is the problem, but you still want your uncommitted work.

1. Stop the running dev server (`Ctrl+C`).
2. Remove install artifacts:

```bash
rm -rf node_modules
rm -f package-lock.json
```

3. Reinstall and verify:

```bash
npm install
npm run lint
npm run build
npm run dev
```

## Reset to Remote `main`

Use this when local git history or tracked files are out of sync and you want to match GitHub.

```bash
git fetch origin
git checkout main
git reset --hard origin/main
npm install
npm run dev
```

> **Warning:** `git reset --hard` discards uncommitted changes to tracked files. Stash or commit first if you need to keep them:
>
> ```bash
> git stash push -u -m "pre-recovery backup"
> ```

## Common Recovery Scenarios

### Dev server will not start

1. Confirm you are in the project root (where `package.json` lives).
2. Reinstall dependencies (`npm install`).
3. Check that the port is free (default `5173`). If something else is using it, stop that process or start Vite with another port:

```bash
npx vite --port 5174
```

### TypeScript or build failures

```bash
npm run build
```

If the build fails after a dependency change:

```bash
rm -rf node_modules
npm install
npm run build
```

### Lint errors blocking work

```bash
npm run lint
```

Fix reported issues in the listed files, or recover to a clean tree with the soft/fresh steps above if your local edits are the cause.

### Broken import paths after moving files

This project uses components under `src/Componenets/` (note the spelling) and pages under `src/pages/`. If imports fail after refactoring, confirm paths match those folders and that exports still exist in:

- `src/Componenets/Header.tsx`
- `src/Componenets/FileDrop.tsx`
- `src/Componenets/Footer.tsx`
- `src/pages/MainPage.tsx`
- `src/App.tsx`

## Verify a Healthy Recovery

After any recovery path, run:

```bash
npm install
npm run lint
npm run build
npm run dev
```

You should be able to load the app in the browser without install or compile errors.

## Useful Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start Vite development server |
| `npm run build` | Typecheck and production build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build locally |

## Still Stuck?

1. Confirm Node/npm versions meet the prerequisites.
2. Retry a **Fresh Recovery**.
3. Compare your tree to `origin/main` and note any unexpected local changes:

```bash
git status
git diff
```
