# Working Guide & Collaboration Rules

This document outlines the strict rules and procedures for AI-assisted development on the `mochaease_web-main` project.

## 1. Transparency & Permissions
- **New Libraries**: I must inform you and get explicit approval before installing any new libraries or dependencies (e.g., `npm install`).
- **No Unapproved "Pushes"**: No major architectural changes or permanent deletions will be made without your direct approval.

## 2. Code Integrity
- **Safety First**: Avoiding breaking the existing setup is the highest priority. If a change carries risk, it must be discussed first.
- **Clarification Rule**: If I am not **at least 90% certain** about a specific implementation detail or USER intent, I will stop and ask clarifying questions instead of making assumptions.

- **No Schema Assumptions**: I will never assume table names, column names, or RLS policies.
- **Verification**: I will always check [TASK_SCHEMA.md](file:///Users/virendernehra/Documents/mochaease_web-main/TASK_SCHEMA.md), [SUPABASE_SCHEMA.md](file:///Users/virendernehra/Documents/mochaease_web-main/SUPABASE_SCHEMA.md), existing `.sql` files, run discovery commands, or ask for schema details before writing queries or mutations.
- **Multi-Tenancy Filtering**: When querying data, I must **always** include a filter for `business_id`. If the table does not have a `business_id` column, I must use `outlet_id` for filtering.
- **Data Structure Verification**: I must never "guess" the meaning or hierarchy of data in a table. Before wiring any UI to a database table, I must stop and ask for a detailed explanation of the data structure, how rows are calculated, and what specific fields represent if not explicitly clear from schema discovery.

- **Workflow Pattern**: For any complex change, I will provide an `implementation_plan.md` for your review. Every change will be followed by a verification step (starting the dev server, linting, or checking logs).

## 3. Global Feature Rules (Regression Prevention)
- **Sustainability First**: No new feature or modification shall "blow up" or degrade the previous setup. This includes UI elements like charts, tables, and layouts.
- **Responsiveness (Standard 2.0)**: All UI components must be fluid and mobile-first. If a component is expanded or modified, its mobile state must be verified and maintained.
- **Global Parameter Adherence**:
    - **Currency**: Always use `businessConfig.currency` from `useUserStore()` for formatting. NEVER hardcode currency symbols.
    - **Date Filtering**: Always respect `selectedRange` from `useFilterStore()`. Any new data-driven feature must be integrated with the global date picker.
    - **Context Awareness**: Always respect `activeContextId` (Global vs. Outlet) and implement appropriate guards for mutations.

## 4. UI Consistency
- **Standardized Tokens**: Use existing theme store tokens for colors and standardized sizes for charts (e.g., standard `barSize={32}` for bars) and spacing to ensure a cohesive look.
- **Regression Testing**: Before finalizing a UI change, I must verify that it doesn't negatively impact adjacent components or the overall visual balance of the page.
