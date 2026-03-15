# CRUD Success Feedback Pattern

The MochaEase application uses a high-impact, premium visual feedback system for all database CRUD (Create, Read, Update, Delete) operations. This ensures users feel the impact of their actions and provides definitive confirmation of data synchronisation.

## Visual Components

### 1. Success Modal (High Impact)
For major operations (Updates, Creations, Authorizations), use a dedicated Success Modal instead of a standard toast.

- **Backdrop**: `bg-black/95 backdrop-blur-2xl`
- **Container**: `fixed inset-0 z-[100001] flex items-center justify-center`
- **Styling**: `rounded-[50px]`, `bg-[#0A0A0A]`, subtle top gradient border.
- **Animation**: `Framer Motion` spring animation for the icon (`scale: 0` to `1`).
- **Icon**: Generally use `Sparkles` or `Check` in a branded background (`bg-[#C3EB7A]/10`).

### 2. Implementation Template (React + Framer Motion)

```tsx
<Portal>
    <AnimatePresence>
        {showSuccessModal && (
            <div className="fixed inset-0 z-[100001] flex items-center justify-center p-6 text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowSuccessModal(false)}
                    className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
                />
                <motion.div
                    initial={{ scale: 0.8, opacity: 0, y: 40 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.8, opacity: 0, y: 40 }}
                    className="relative w-[92%] sm:max-w-md bg-[#0A0A0A] border border-white/5 rounded-[50px] p-8 sm:p-12 overflow-hidden shadow-[0_0_150px_rgba(195,235,122,0.1)]"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Content Section */}
                    {/* Success Icon */}
                    {/* Title & Detail */}
                    {/* Action Button */}
                </motion.div>
            </div>
        )}
    </AnimatePresence>
</Portal>
```

## Best Practices
- **Localization**: Always include the item name or specific action in the success message detail.
- **Auto-Dismiss**: While action buttons are provided, these modals can also be dismissed via backdrop click.
- **Mutation Integration**: Trigger the `showSuccessModal` state within the `onSuccess` handler of React Query mutations.
