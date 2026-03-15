---
description: How to safely push Next.js code to Vercel production
---

# Pre-Push Checks for MochaEase Web

Before pushing code to the `main` branch to trigger a Vercel deployment, we mustALWAYS run local production builds to catch TypeScript and Next.js specific errors that the dev server (`npm run dev`) will gladly ignore.

## Required Steps

1. **Batch Your Fixes First:** Do not run this workflow after every minor fix. Wait until all requested UI, bug, or feature fixes are complete before doing a production build.
2. Stop any currently running `npm run dev` servers to clear up the terminal.
3. Run the production build command:
// turbo
npm run build
3. Wait for the build process to reach the "Compiled successfully" and "Running TypeScript" stages.
4. **If the build fails**, investigate the exact errors. Common errors include:
   - **Framer Motion Variants:** Ensure objects passed to `variants={`...`}` are strictly typed with the `Variants` interface from `framer-motion`.
   - **Deprecated Request Methods:** Next.js 14+ deprecates `request.geo` in middleware. Use `request.headers.get('x-vercel-ip-country')` instead.
   - **Missing Assets:** Ensure all Image `src` paths are correctly relative to the `/public` dir.

5. **User Approval (MANDATORY):**
   - > [!IMPORTANT]
   - > **NEVER PUSH CODE WITHOUT EXPLICIT USER APPROVAL.**
   - Even if the build passes, you must notify the user, summarize the final state, and ask: "Ready to push these changes to production?"
   - **Wait for a "Yes", "Push it", or similar confirmation before proceeding to the git push step.**

6. **Once Approved:**
// turbo
git add .
// turbo
git commit -m "feat/fix: descriptive message covering all batched changes"

7. **The Final Confirmation (CRITICAL):**
   - > [!WARNING]
   - > **NEVER combine the `git push` command with any other tool calls or commands.**
   - > **NEVER use `git push` until the user has specifically replied "Yes", "Push it", or "Go ahead" to your summary message.**
   - Once (and only once) you have that confirmation:
git push

By following this workflow, we ensure our Vercel deployments are both stable and user-approved!
