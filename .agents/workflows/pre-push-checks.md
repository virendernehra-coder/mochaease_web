---
description: How to safely push Next.js code to Vercel production
---

# Pre-Push Checks for MochaEase Web

Before pushing code to the `main` branch to trigger a Vercel deployment, we mustALWAYS run local production builds to catch TypeScript and Next.js specific errors that the dev server (`npm run dev`) will gladly ignore.

## Required Steps

1. Stop any currently running `npm run dev` servers to clear up the terminal.
2. Run the production build command:
// turbo
npm run build
3. Wait for the build process to reach the "Compiled successfully" and "Running TypeScript" stages.
4. **If the build fails**, investigate the exact errors. Common errors include:
   - **Framer Motion Variants:** Ensure objects passed to `variants={`...`}` are strictly typed with the `Variants` interface from `framer-motion`.
   - **Deprecated Request Methods:** Next.js 14+ deprecates `request.geo` in middleware. Use `request.headers.get('x-vercel-ip-country')` instead.
   - **Missing Assets:** Ensure all Image `src` paths are correctly relative to the `/public` dir.

5. **If the build succeeds:**
   - **CRITICAL: Ask the user for explicit confirmation before pushing code to production.** Do not proceed without their approval.
// turbo
git add .
// turbo
git commit -m "feat/fix: descriptive message"

6. **Wait for user approval.** Once approved, push the code:
git push

By following this workflow, we ensure our Vercel deployments will never fail due to static typing errors!
