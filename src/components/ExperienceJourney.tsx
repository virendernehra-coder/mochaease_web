"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    Coffee, ShoppingBag, Zap, Building, Scissors, Dumbbell, Map, Users, Receipt, Box, LineChart, ChevronDown,
    HeartHandshake, Truck, Smartphone, QrCode, ChefHat, Globe, Megaphone, ShieldAlert, Monitor, Star, Factory, FileText, Link as LinkIcon, CalendarDays, UserCircle, Ticket, Lock, Target, Trophy
} from 'lucide-react';
import Link from 'next/link';

export type Role = 'Cafe' | 'Retail' | 'QSR' | 'Enterprise' | 'Salon' | 'Gym' | null;

export const ROLES = [
    { id: 'Cafe', icon: Coffee, label: 'Cafe Owner', color: 'from-orange-500/20 to-amber-500/5' },
    { id: 'Retail', icon: ShoppingBag, label: 'Retail Owner', color: 'from-pink-500/20 to-rose-500/5' },
    { id: 'QSR', icon: Zap, label: 'QSR Operator', color: 'from-red-500/20 to-orange-500/5' },
    { id: 'Enterprise', icon: Building, label: 'Enterprise Chain', color: 'from-[#4A90E2]/20 to-indigo-500/5' },
    { id: 'Salon', icon: Scissors, label: 'Salon Owner', color: 'from-purple-500/20 to-fuchsia-500/5' },
    { id: 'Gym', icon: Dumbbell, label: 'Gym Owner', color: 'from-[#C3EB7A]/20 to-emerald-500/5' },
];

export const CONTENT = {
    Cafe: {
        headline: "Brew More. Manage Less.",
        subheadline: "Running a cafe is tough enough without wrestling with five different apps. Let's see how MochaEase handles everything for your coffee shop.",
        steps: [
            { title: "AI-Powered Location Insights", desc: "Thinking about opening a second branch? Our AI analyzes real-time footfall and compares it to your average ticket size to tell you exactly where your next cafe should be.", icon: Map, imageGradient: "from-orange-500 to-amber-500" },
            { title: "Automated Staff Management", desc: "No more messy WhatsApp groups for shifts. MochaEase handles scheduling your baristas, tracking attendance, and processing payroll—all automatically.", icon: Users, imageGradient: "from-blue-500 to-cyan-500" },
            { title: "Expenses & Intelligent Billing", desc: "From milk suppliers to electricity bills, snap a receipt and let MochaEase categorize your expenses while giving you a lightning-fast POS for your front counter.", icon: Receipt, imageGradient: "from-emerald-500 to-teal-500" },
            { title: "Recipe & Menu Costing", desc: "Ensure every flat white is profitable. We calculate the exact cost of your milk, beans, and syrups per cup to protect your margins.", icon: ChefHat, imageGradient: "from-rose-400 to-red-500" },
            { title: "Smart Cafe Inventory", desc: "Never run out of oat milk during the morning rush again. We track your perishables and send alerts before you hit the danger zone.", icon: Box, imageGradient: "from-purple-500 to-pink-500" },
            { title: "Table Management & QR Orders", desc: "Let customers scan a QR code at their table to order and pay instantly. Turn tables faster without hiring extra waitstaff.", icon: QrCode, imageGradient: "from-amber-400 to-orange-500" },
            { title: "Online Aggregator Sync", desc: "Manage Zomato, Swiggy, and UberEats directly from your main POS. Say goodbye to the cluttered 'tablet hell' on your front counter.", icon: Smartphone, imageGradient: "from-cyan-400 to-blue-500" },
            { title: "Supplier Automation", desc: "Running low on espresso beans? MochaEase automatically generates and emails purchase orders to your suppliers before you run out.", icon: Truck, imageGradient: "from-indigo-400 to-cyan-400" },
            { title: "Loyalty & Digital Punch Cards", desc: "Turn walk-ins into regulars. Offer automated points and rewards tied simply to a customer's phone number at checkout.", icon: HeartHandshake, imageGradient: "from-fuchsia-500 to-pink-500" },
            { title: "The Big Picture Analytics", desc: "See your true profitability. MochaEase breaks down your margins by the cup, day, or overall outlet so you know exactly what is driving your success.", icon: LineChart, imageGradient: "from-[#C3EB7A] to-[#4A90E2]" }
        ]
    },
    Retail: {
        headline: "Sell More. Stress Less.",
        subheadline: "Whether you sell sneakers or skincare, MochaEase is built to keep your shelves moving and your customers smiling. Let's take a tour.",
        steps: [
            { title: "Footfall vs. Conversion Insights", desc: "Our AI tracks how many people walk past your store versus how many actually buy, helping you optimize your window displays and seasonal inventory.", icon: Map, imageGradient: "from-pink-500 to-rose-500" },
            { title: "Omnichannel Sync", desc: "Real-time inventory sync between your physical boutique and your Shopify/WooCommerce store. Never accidentally oversell an item again.", icon: Globe, imageGradient: "from-violet-500 to-fuchsia-500" },
            { title: "Floor Staff Scheduling", desc: "Easily manage your floor staff's shifts, handle leave requests, and calculate commissions and payroll in one seamless dashboard.", icon: Users, imageGradient: "from-blue-500 to-indigo-500" },
            { title: "Frictionless Billing & POS", desc: "A sleek checkout experience that handles split payments, store credit, and returns effortlessly from anywhere on the floor via tablet.", icon: Receipt, imageGradient: "from-emerald-500 to-[#C3EB7A]" },
            { title: "Multi-Variant Inventory", desc: "Tracking sizes, colors, and seasonal drops can be a nightmare. We make it easy with automated reorder points and custom barcode generation.", icon: Box, imageGradient: "from-purple-500 to-fuchsia-500" },
            { title: "Supplier & Branch Transfers", desc: "Manage bulk seasonal purchase orders and easily transfer stock between your different boutique locations to meet demand.", icon: Truck, imageGradient: "from-orange-400 to-amber-500" },
            { title: "VIP Clienteling", desc: "Empower your floor staff with a customer's complete online and in-store purchase history right on their tablet to drive personalized upsells.", icon: UserCircle, imageGradient: "from-cyan-500 to-blue-500" },
            { title: "Marketing & Campaigns", desc: "Automatically text or email your VIP customers when a new collection drops, perfectly targeted based on their past brand preferences.", icon: Megaphone, imageGradient: "from-rose-400 to-red-500" },
            { title: "Loss Prevention & Audits", desc: "Conduct massive stocktakes in minutes using mobile barcode scanners to quickly identify discrepancies and reduce shrinkage.", icon: ShieldAlert, imageGradient: "from-red-500 to-orange-500" },
            { title: "Retail Profitability Analytics", desc: "Track your bestselling brands and overall margins. Know exactly what to discount and what to restock before the weekend.", icon: LineChart, imageGradient: "from-[#C3EB7A] to-[#4A90E2]" }
        ]
    },
    QSR: {
        headline: "Lightning Fast Operations.",
        subheadline: "Speed is everything in QSR. MochaEase is engineered to slash your wait times and keep your kitchen humming. Let's dive into your setup.",
        steps: [
            { title: "Predictive Demand AI", desc: "Our AI looks at local events, weather, and historical footfall to predict exactly how many burgers or bowls you're going to sell today.", icon: Map, imageGradient: "from-red-500 to-orange-500" },
            { title: "Kitchen Display Systems (KDS)", desc: "Route orders instantly to the grill or fry station screens. Track prep times in real-time and identify bottlenecks before they slow down service.", icon: ChefHat, imageGradient: "from-amber-400 to-orange-500" },
            { title: "Self-Serve Kiosks", desc: "Bust the line during the lunch rush. Let customers order and pay themselves at interactive kiosks, proven to increase average ticket size by 15%.", icon: Monitor, imageGradient: "from-cyan-400 to-blue-500" },
            { title: "High-Turnover Staffing", desc: "Managing a fast-paced roster? We automate shift swapping, attendance, and hourly payroll so your kitchen is never understaffed.", icon: Users, imageGradient: "from-blue-500 to-sky-500" },
            { title: "Lightning Fast Billing", desc: "A front-counter POS built purely for speed. Process high-volume orders in seconds and auto-track your daily operational overheads.", icon: Receipt, imageGradient: "from-yellow-400 to-amber-500" },
            { title: "Aggregator Management", desc: "All delivery apps (UberEats, Zomato, etc.) injected straight into your POS and Kitchen Display. Automatically pause them if the kitchen gets overwhelmed.", icon: Smartphone, imageGradient: "from-violet-500 to-fuchsia-500" },
            { title: "Ingredient-Level Inventory", desc: "When someone orders a burger, we automatically deduct the bun, the patty, and the cheese. Precision tracking prevents hidden food waste.", icon: Box, imageGradient: "from-emerald-500 to-green-400" },
            { title: "Franchise Consistency", desc: "Ensure your portion controls and standard operating procedures are strictly followed across all your fast-casual locations.", icon: ShieldAlert, imageGradient: "from-indigo-400 to-cyan-400" },
            { title: "Customer Feedback Loop", desc: "Send automated SMS surveys immediately after a meal. Catch negative feedback internally before it hits public Google Reviews.", icon: Star, imageGradient: "from-fuchsia-500 to-pink-500" },
            { title: "Real-Time Margin Tracking", desc: "Analyze your true food cost percentage instantly. Keep your value menu profitable even when your wholesale supplier prices fluctuate.", icon: LineChart, imageGradient: "from-[#C3EB7A] to-[#4A90E2]" }
        ]
    },
    Enterprise: {
        headline: "Command Your Empire.",
        subheadline: "Running an empire requires a bird's-eye view with ground-level control. Here is how MochaEase unites your entire chain under one roof.",
        steps: [
            { title: "Expansion Intelligence", desc: "Don't guess where your 50th store should be. Our AI correlates demographic data and footfall to pinpoint your most lucrative next locations.", icon: Map, imageGradient: "from-[#4A90E2] to-blue-600" },
            { title: "Master Menu Management", desc: "Push a new seasonal item, promotional combo, or price change to 500 locations simultaneously from HQ, with intelligent regional pricing overrides.", icon: Globe, imageGradient: "from-violet-500 to-fuchsia-500" },
            { title: "Enterprise HR & Payroll", desc: "Standardize labor costs across regions. Centralized scheduling, attendance tracking, and automated payroll for thousands of employees.", icon: Users, imageGradient: "from-purple-500 to-indigo-500" },
            { title: "Central Kitchens & Commissary", desc: "Manage bulk prep at a central facility. Automate daily dispatch routing and internal transfers to keep satellite stores fully stocked.", icon: Factory, imageGradient: "from-amber-400 to-orange-500" },
            { title: "Centralized Expenses", desc: "Consolidate global supplier billing, automated franchise royalty calculations, and real-estate expenses into a single financial dashboard.", icon: Receipt, imageGradient: "from-emerald-500 to-teal-500" },
            { title: "Warehouse & Logistics", desc: "Manage vast distribution centers. Automate high-volume purchase orders and track freight logistics from warehouse to storefront.", icon: Box, imageGradient: "from-gray-600 to-slate-800" },
            { title: "Compliance & Audits", desc: "Deploy digital checklists for regional managers to ensure health, safety, and brand standards are flawlessly met across every single location.", icon: ShieldAlert, imageGradient: "from-red-500 to-orange-500" },
            { title: "B2B & Corporate Accounts", desc: "Streamline invoicing and credit limits for corporate catering clients, wholesale distributors, and your network of franchisees.", icon: FileText, imageGradient: "from-cyan-400 to-blue-500" },
            { title: "Open API & ERP Integrations", desc: "Connect MochaEase data seamlessly with your existing enterprise infrastructure, including SAP, Oracle NetSuite, or custom BI data lakes.", icon: LinkIcon, imageGradient: "from-indigo-400 to-cyan-400" },
            { title: "Global vs. Outlet Analytics", desc: "Compare top-performing regions against underperforming stores. Actionable macro-data to ensure maximum profitability chain-wide.", icon: LineChart, imageGradient: "from-[#C3EB7A] to-[#4A90E2]" }
        ]
    },
    Salon: {
        headline: "Master The Art Of Service.",
        subheadline: "From booking chairs to tracking products, running a salon is an art. Let MochaEase handle the science of your business.",
        steps: [
            { title: "Local Footfall Insights", desc: "Understand your neighborhood's peak hours. Our AI helps you capture high-margin walk-ins when sidewalk footfall is strictly at its highest.", icon: Map, imageGradient: "from-purple-500 to-fuchsia-500" },
            { title: "Smart Appointments & Waitlists", desc: "A 24/7 online booking widget with automated SMS reminders that slashes costly no-show rates by up to 80%.", icon: CalendarDays, imageGradient: "from-cyan-400 to-blue-500" },
            { title: "Stylist Management & Payroll", desc: "Complex commission splits? Product vs Service payouts? We calculate your stylists' pay, manage their schedules, and track attendance seamlessly.", icon: Users, imageGradient: "from-pink-500 to-rose-400" },
            { title: "Detailed Client Profiles", desc: "Store custom color formulas, treatment history, allergies, and even their coffee preferences so every single client visit feels like a VIP experience.", icon: UserCircle, imageGradient: "from-amber-400 to-orange-500" },
            { title: "Seamless Checkout & Expenses", desc: "Check out clients elegantly with split tips, while keeping a digital eye on your monthly rent, utility, and backbar supply expenses.", icon: Receipt, imageGradient: "from-blue-400 to-indigo-500" },
            { title: "Packages & Memberships", desc: "Boost your upfront cash flow by easily selling course packages (e.g., 5 blowouts for the price of 4) or recurring monthly VIP memberships.", icon: Ticket, imageGradient: "from-violet-500 to-fuchsia-500" },
            { title: "Retail & Supply Inventory", desc: "Track the costly shampoos you use at the backbar and the serums you sell at the front. Never run out of your essential color tubes again.", icon: Box, imageGradient: "from-[#C3EB7A] to-green-500" },
            { title: "Marketing & Win-Backs", desc: "Automatically text clients who haven't booked a haircut in 8 weeks with a special 'we miss you' offer to keep your chairs constantly full.", icon: Megaphone, imageGradient: "from-rose-400 to-red-500" },
            { title: "Resource Optimization", desc: "Intelligent scheduling ensures a specialized treatment room or a specific laser machine is never accidentally double-booked by staff.", icon: Monitor, imageGradient: "from-indigo-400 to-cyan-400" },
            { title: "Service Profitability", desc: "Which treatments actually make you the most money? We analyze service time vs. product cost to help you prioritize your bottom line.", icon: LineChart, imageGradient: "from-[#C3EB7A] to-[#4A90E2]" }
        ]
    },
    Gym: {
        headline: "Build Muscle. Build Business.",
        subheadline: "You focus on building muscles; we’ll focus on building your business. Here’s how MochaEase powers your fitness center.",
        steps: [
            { title: "Demographic Location AI", desc: "Looking to open a new facility? We analyze local health trends and footfall to ensure your next gym reaches peak membership capacity fast.", icon: Map, imageGradient: "from-[#C3EB7A] to-emerald-500" },
            { title: "Access Control Integration", desc: "Connect our system seamlessly to your front door turnstiles, RFID tags, or mobile app barcodes for secure, unstaffed 24/7 member entry.", icon: Lock, imageGradient: "from-slate-400 to-gray-500" },
            { title: "Class Booking & Scheduling", desc: "Members book their spin or yoga classes via your branded app. We auto-manage waitlists and cancellations when classes inevitably fill up.", icon: CalendarDays, imageGradient: "from-cyan-400 to-blue-500" },
            { title: "Trainer Scheduling & Payroll", desc: "Manage personal training sessions, group class instructors, and front-desk staff. We handle their varying commission structures automatically.", icon: Users, imageGradient: "from-orange-500 to-red-500" },
            { title: "Recurring Membership Billing", desc: "No more chasing down awkward failed payments. Manage recurring subscriptions, auto-retry cards, and log facility expenses with absolute ease.", icon: Receipt, imageGradient: "from-blue-500 to-cyan-500" },
            { title: "Lead Management (CRM)", desc: "Track walk-in trials and web leads. Automate reminder tasks for your sales reps to follow up and maximize your conversion rates.", icon: Target, imageGradient: "from-rose-400 to-red-500" },
            { title: "Personal Training Hub", desc: "A dedicated portal where trainers can track client progress, assign custom workouts, and seamlessly deduct pre-paid session credits.", icon: UserCircle, imageGradient: "from-amber-400 to-orange-500" },
            { title: "Supplement & Merch Inventory", desc: "Keep careful track of protein shakes, water bottles, and gym apparel. Set low-stock alerts so your lobby fridge is always fully stocked.", icon: Box, imageGradient: "from-purple-500 to-violet-500" },
            { title: "Member Journey & Milestones", desc: "Automate celebratory emails for their 100th workout or birthdays to boost community engagement and significantly increase retention.", icon: Trophy, imageGradient: "from-yellow-400 to-amber-500" },
            { title: "Retention & Churn Analytics", desc: "Track member attendance vs. revenue. We use AI to highlight exactly who is about to churn so you can win them back before they cancel.", icon: LineChart, imageGradient: "from-[#4A90E2] to-[#C3EB7A]" }
        ]
    }
};

interface ExperienceJourneyProps {
    role: Exclude<Role, null>;
    onBack?: () => void;
    hideBackButton?: boolean;
}

export default function ExperienceJourney({ role, onBack, hideBackButton = false }: ExperienceJourneyProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Framer Motion Scroll tracking for the main interactive section
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <motion.section
            key="experience"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full relative z-10"
        >
            {/* Intro Header for the selected role */}
            <div className="w-full min-h-[60vh] flex flex-col items-center justify-center pt-32 pb-20 px-4 text-center">
                {!hideBackButton && onBack && (
                    <motion.button
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                        onClick={onBack}
                        className="mb-8 px-4 py-2 rounded-full bg-white/5 text-white/50 text-sm font-bold hover:text-white hover:bg-white/10 transition-colors border border-white/10"
                    >
                        &larr; Change Business Type
                    </motion.button>
                )}

                <motion.div
                    initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}
                    className="max-w-4xl mx-auto flex flex-col gap-6"
                >
                    <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 leading-tight">
                        {CONTENT[role].headline}
                    </h2>
                    <p className="text-xl md:text-2xl text-white/50 leading-relaxed max-w-2xl mx-auto">
                        {CONTENT[role].subheadline}
                    </p>
                    <div className="flex flex-col items-center justify-center gap-2 mt-8 animate-bounce opacity-50">
                        <span className="text-xs uppercase tracking-[0.2em] font-bold text-white">Scroll to explore</span>
                        <ChevronDown className="w-5 h-5 text-[#C3EB7A]" />
                    </div>
                </motion.div>
            </div>

            {/* ScrollyTelling Container */}
            <div ref={containerRef} className="relative h-[1100vh] w-full">
                <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
                    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">

                        {/* Left Side: Dynamic Text mapped to Scroll % */}
                        <div className="flex flex-col justify-center h-full relative">
                            {CONTENT[role].steps.map((step, index) => {
                                const start = index * 0.1;
                                const end = start + 0.1;
                                return (
                                    <StepContent
                                        key={index}
                                        step={step}
                                        index={index}
                                        progress={scrollYProgress}
                                        start={start}
                                        end={end}
                                    />
                                );
                            })}
                        </div>

                        {/* Right Side: Dynamic UI/Visuals mapped to Scroll % */}
                        <div className="hidden lg:flex flex-col justify-center h-full relative perspective-[1000px]">
                            {CONTENT[role].steps.map((step, index) => {
                                const start = index * 0.1;
                                const end = start + 0.1;
                                return (
                                    <StepVisual
                                        key={index}
                                        step={step}
                                        index={index}
                                        progress={scrollYProgress}
                                        start={start}
                                        end={end}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA at the end of the journey */}
            <div className="h-[40vh] flex items-center justify-center -mt-[20vh] relative z-20 pb-20">
                <motion.div
                    style={{
                        opacity: useTransform(scrollYProgress, [0.8, 0.9, 1], [0, 1, 1]),
                        y: useTransform(scrollYProgress, [0.8, 0.9], [50, 0])
                    }}
                    className="text-center"
                >
                    <h3 className="text-3xl md:text-5xl font-black text-white mb-8">Ready to transform your {role.toLowerCase()}?</h3>
                    <Link href="/demo" className="px-10 py-5 rounded-full bg-[#C3EB7A] text-black font-black text-xl hover:brightness-110 active:scale-95 transition-all inline-block shadow-[0_0_30px_rgba(195,235,122,0.4)]">
                        Book a Free Demo
                    </Link>
                </motion.div>
            </div>
        </motion.section>
    );
}

function StepContent({ step, index, progress, start, end }: any) {
    // Reveal text between start and midpoint, hide after midpoint
    const midpoint = start + (end - start) / 2;
    const opacity = useTransform(progress, [start, start + 0.05, midpoint, end - 0.05, end], [0, 1, 1, 0, 0]);
    const y = useTransform(progress, [start, start + 0.05, midpoint, end - 0.05, end], [50, 0, 0, -50, -50]);
    const pointerEvents = useTransform(progress, (v: number) => (v >= start && v < end) ? "auto" : "none");

    return (
        <motion.div
            style={{ opacity, y, pointerEvents }}
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col"
        >
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 backdrop-blur-md shadow-inner">
                <step.icon className="w-8 h-8 text-white" />
            </div>
            <div className="flex items-center gap-4 mb-4">
                <div className="text-[#C3EB7A] font-black font-mono text-xl">
                    PHASE {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </div>
            </div>
            <h3 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">{step.title}</h3>
            <p className="text-xl md:text-2xl text-white/50 font-medium leading-relaxed max-w-xl">
                {step.desc}
            </p>
        </motion.div>
    );
}

function StepVisual({ step, index, progress, start, end }: any) {
    const midpoint = start + (end - start) / 2;
    const opacity = useTransform(progress, [start, start + 0.05, midpoint, end - 0.05, end], [0, 1, 1, 0, 0]);
    const scale = useTransform(progress, [start, start + 0.05, midpoint, end - 0.05, end], [0.8, 1, 1, 1.2, 1.2]);
    const rotateX = useTransform(progress, [start, midpoint, end], [20, 0, -20]);

    return (
        <motion.div
            style={{ opacity, scale, rotateX }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
            <div className="w-full aspect-square max-h-[500px] relative">
                {/* Visual Glass Card */}
                <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden">
                    {/* Dynamic Gradient Background */}
                    <div className={`absolute -inset-20 bg-gradient-to-br ${step.imageGradient} opacity-20 blur-[50px] animate-pulse`} />

                    <div className="absolute inset-0 flex items-center justify-center">
                        <step.icon className="w-40 h-40 text-white/80 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]" />
                    </div>

                    {/* Mocked UI Elements in the card */}
                    <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                        <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-md">
                            <span className="text-white font-bold font-mono">N</span>
                        </div>
                        <div className="w-24 h-24 rounded-full bg-black/40 border border-white/10 flex items-center justify-center backdrop-blur-md shadow-[0_0_20px_currentColor] text-white">
                            <Users className="w-10 h-10" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
