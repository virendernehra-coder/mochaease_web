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

## 4. Workflow Pattern
- **Plan First**: For any complex change, I will provide an `implementation_plan.md` for your review.
- **Verification**: Every change will be followed by a verification step (starting the dev server, linting, or checking logs).
