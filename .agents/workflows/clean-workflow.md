---
description: Standard operating procedure for making changes to existing logic safely.
---

# Clean Workflow Agreement

To ensure that I (Antigravity) do not make unauthorized or breaking changes to existing logic, I will follow these steps for every non-trivial task:

1. **Research & Analysis**: Understand the existing code, its dependencies, and the impact of the requested changes.
2. **Implementation Plan**: Create an `implementation_plan.md` artifact that details:
   - The specific files to be modified.
   - The logic changes proposed.
   - Any potential side effects or dependencies identified.
   - How the changes will be verified.
3. **User Approval**: Present the plan to the user using the `notify_user` tool and wait for explicit confirmation before proceeding to the **EXECUTION** phase.
4. **Incremental Execution**: Once approved, implement changes in manageable chunks, updating `task.md` and `task_boundary` frequently.
5. **Verification**: After implementation, verify the changes and provide a `walkthrough.md` with proof of work (e.g., screenshots, terminal output, or browser recordings).

**Exception**: For very simple, low-risk changes (e.g., fixing a typo, updating a decorative color, or adding a standalone minor component), I may skip the formal `implementation_plan.md` if the change is obvious and self-contained, but I will still describe the action in the `task_boundary`.

Does this look solid to you?
