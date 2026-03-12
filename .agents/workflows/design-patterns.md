---
description: Symmetrical Wizard Layout and Premium UI Design Patterns
---

# Premium Wizard Design Pattern

Follow this pattern to ensure consistent, high-quality, and symmetrical multi-step wizards across all creation flows (Employees, Discounts, Outlets, etc.).

## 1. Outer Container & Backdrop
Use a separate backdrop `motion.div` and a container with responsive padding and `overflow-y-auto`. Use `my-auto` on the inner modal to ensure perfect vertical centering.

```tsx
<AnimatePresence>
    {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={close}
                className="fixed inset-0 bg-[#0A0A0A]/95 backdrop-blur-xl"
            />

            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-2xl bg-[#09090B] border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden my-auto"
            >
                {/* Header, Content, Footer go here */}
            </motion.div>
        </div>
    )}
</AnimatePresence>
```

## 2. Header Structure
- **Progress Bar**: Positioned at the very top (`absolute top-0`), full width, segmented by steps.
- **Symmetry**: Centered icon, title, and step count.
- **Typography**: `text-3xl font-black tracking-tighter text-white uppercase` for titles.

```tsx
<div className="relative p-10 pt-14 border-b border-white/5 flex flex-col items-center justify-center">
    {/* Progress Bar */}
    <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5 flex gap-1">
        {[1, 2, 3].map(i => (
            <div key={i} className={`flex-1 transition-all duration-500 ${step >= i ? 'bg-blue-500' : 'bg-transparent'}`} />
        ))}
    </div>
    {/* Icon & Title */}
    <div className="flex flex-col items-center gap-4 text-center">
        <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center">
            <Icon className="w-6 h-6 text-blue-400" />
        </div>
        <div className="space-y-1">
            <h2 className="text-3xl font-black tracking-tighter text-white uppercase mt-4">FLOW TITLE</h2>
            <p className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Step {step} of 3</p>
        </div>
    </div>
</div>
```

## 3. Content Symmetry
- **Centering**: Use `text-center` on the content wrapper.
- **Inputs**: Use `text-center` for all labels and input fields.
- **Labels**: Small, uppercase, tracking-widest, bold labels.

```tsx
<div className="space-y-2">
    <label className="text-[10px] font-black tracking-widest text-white/40 uppercase block text-center">LABEL NAME</label>
    <input className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-center text-sm font-bold text-white ..." />
</div>
```

## 4. Footer & Buttons
- **Style**: Pill-shaped (`rounded-3xl`), font-black, tracking-widest.
- **Colors**: White/Black for primary actions, White/40 Ghost for secondary.
- **Elevation**: Hover transitions like `hover:scale-[1.02]`.

```tsx
<button className="bg-white text-black px-10 py-5 rounded-3xl font-black tracking-widest transition-all uppercase text-sm hover:scale-[1.02]">
    CONTINUE
</button>
```
