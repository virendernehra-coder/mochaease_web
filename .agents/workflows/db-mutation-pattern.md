---
description: how to implement database mutations using server-side API routes
---
# Database Mutation Pattern (Server-Side)

To ensure data integrity, robust validation, and consistent error handling, follow this pattern when implementing database inserts or updates.

## 1. Create a Server-Side API Route
Create a new route in `src/app/api/[mutation-name]/route.ts`. Use the `@/utils/supabase/server` client.

```typescript
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        // 1. Destructure and Basic Validation
        const { ...fields } = body;
        if (!requiredFieldsPresent) {
            return NextResponse.json({ success: false, error: 'Validation failed' }, { status: 400 });
        }

        const supabase = await createClient();
        
        // 2. Insert/Update
        const { data, error } = await supabase
            .from('table_name')
            .insert(payload)
            .select()
            .single();

        if (error) {
            return NextResponse.json({ success: false, error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (err) {
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
```

## 2. Implement Client-Side State & Handling
In the Client Component (e.g., `SettingsClient.tsx`):

- **State**: Add `isLoading` and `errorMessage` states.
- **Handling**: Use `fetch` to call the API route.

```typescript
const [errorMessage, setErrorMessage] = useState('');

const handleMutation = async () => {
    setErrorMessage('');
    setIsLoading(true);
    try {
        const res = await fetch('/api/[mutation-name]', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok && data.success) {
            // Handle success (e.g., show success UI, redirect)
        } else {
            setErrorMessage(data.error || 'Server rejected the request');
        }
    } catch (err) {
            setErrorMessage('Network connectivity issue');
    } finally {
        setIsLoading(false);
    }
};
```

## 3. UI Feedback
Ensure the error message is displayed **inline** within the component (not via `alert()`) to provide persistent and accessible feedback to the user.
