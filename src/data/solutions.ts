import { 
    Coffee, Zap, UserCircle, Trophy, Truck, ChefHat, Scissors, HeartHandshake, 
    ShoppingBag, Box, Target, Building, Factory, Ticket, Globe 
} from 'lucide-react';
import { Role } from './experience';

export interface SolutionFAQ {
    question: string;
    answer: string;
}

export interface PainPoint {
    title: string;
    desc: string;
    iconName: string;
    color: string;
    text: string;
    border: string;
    glow: string;
}

export interface IndustryHighlight {
    title: string;
    subtitle: string;
    checklist: string[];
    dashboard?: {
        title: string;
        tag: string;
        items: Array<{
            label: string;
            value: string;
            status: string;
            subtext: string;
            statusColor: string;
        }>;
    };
}

export interface Testimonial {
    quote: string;
    author: string;
    role: string;
}

export interface SolutionData {
    id: Role;
    slug: string;
    title: string;
    metaTitle: string;
    metaDescription: string;
    heroHeadline: string;
    heroSubheadline: string;
    faqs: SolutionFAQ[];
    blogTag: string;
    painPoints?: PainPoint[];
    highlight?: IndustryHighlight;
    testimonial?: Testimonial;
    features?: Array<{
        title: string;
        desc: string;
        iconName: string;
        imageGradient: string;
    }>;
    category: 'fnb' | 'retail' | 'enterprise';
}

export const SOLUTIONS: SolutionData[] = [
    {
        id: 'cafe',
        slug: 'cafe-pos',
        category: 'fnb',
        title: 'Cafes & Coffee Shops',
        metaTitle: 'MochaEase for Cafes | AI-Powered Coffee Shop POS System',
        metaDescription: 'Boost your cafe efficiency with MochaEase. Automated ingredient tracking, barista scheduling, and real-time inventory management for modern coffee shops.',
        heroHeadline: 'Brew More. Manage Less.',
        heroSubheadline: "Running a cafe is tough enough without wrestling with five different apps. Let's see how MochaEase handles everything for your coffee shop.",
        blogTag: 'Cafe Management',
        faqs: [
            { question: "How does MochaEase handle oat milk and ingredient tracking?", answer: "MochaEase tracks ingredients down to the milliliter. When a drink is sold, it automatically deducts the exact amount of milk or beans, alerting you before you run out during a morning rush." },
            { question: "Can I manage multiple cafe locations synchronously?", answer: "Yes. Our cloud-first architecture allows you to update menus, track costs, and manage staff across all locations from one central dashboard instantly." },
            { question: "Does it work if the internet goes down?", answer: "Absolutely. MochaEase has a local-first offline mode that allows you to keep processing transactions. Data syncs to the cloud automatically once you're back online." }
        ],
        painPoints: [
            { title: "Staffing Chaos", desc: "Chaotic staff scheduling or payroll errors", iconName: "Users", color: "from-pink-500/20 to-transparent", text: "text-pink-400", border: "group-hover:border-pink-500/50", glow: "group-hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]" },
            { title: "Financial Blind Spots", desc: "No real view of profits, losses, or wastage", iconName: "EyeOff", color: "from-red-500/20 to-transparent", text: "text-red-400", border: "group-hover:border-red-500/50", glow: "group-hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]" },
            { title: "Cash Flow Struggles", desc: "Struggling to pay salaries or manage shifts", iconName: "Wallet", color: "from-orange-500/20 to-transparent", text: "text-orange-400", border: "group-hover:border-orange-500/50", glow: "group-hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]" },
            { title: "Delivery Sync Fails", desc: "Delivery menus showing out-of-stock items", iconName: "Smartphone", color: "from-blue-500/20 to-transparent", text: "text-blue-400", border: "group-hover:border-blue-500/50", glow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]" },
            { title: "Growing Pains", desc: "Growing operations without losing control", iconName: "TrendingDown", color: "from-yellow-500/20 to-transparent", text: "text-yellow-400", border: "group-hover:border-yellow-500/50", glow: "group-hover:shadow-[0_0_30px_rgba(234,179,8,0.15)]" },
            { title: "Service Bottlenecks", desc: "Manual order taking and long wait times", iconName: "Clock", color: "from-purple-500/20 to-transparent", text: "text-purple-400", border: "group-hover:border-purple-500/50", glow: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]" }
        ],
        highlight: {
            title: "Zero Waste. Complete Control.",
            subtitle: "MochaEase ends the chaos. Once and for all.",
            checklist: [
                "Track ingredients down to the milliliter",
                "Automated low-stock alerts sent to suppliers",
                "Real-time dashboards for multi-outlet visibility",
                "Staff shift management & performance tracking"
            ],
            dashboard: {
                title: "Today's Insights (Bandung Outlet)",
                tag: "Live",
                items: [
                    { label: "Oat Milk Stock", value: "12 Liters", status: "Depleting Fast", subtext: "Reorder triggering soon", statusColor: "text-red-400" },
                    { label: "Bestseller Today", value: "Iced Caramel Macchiato", status: "+24% vs last week", subtext: "", statusColor: "text-[#C3EB7A]" }
                ]
            }
        },
        testimonial: {
            quote: "Before MochaEase, inventory was a nightmare. We'd over-order milk and under-order beans. Now AI tells me exactly when to order everything. It pays for itself in saved waste alone.",
            author: "Anjali",
            role: "Owner, Brew & Co."
        },
        features: [
            { title: "Rapid Billing & POS", desc: "Built for speed. Process orders in seconds even if your internet goes down.", iconName: "Receipt", imageGradient: "from-orange-500 to-amber-500" },
            { title: "Expense Management", desc: "Snap receipt photos of milk or bean purchases to track margins in real-time.", iconName: "Wallet", imageGradient: "from-emerald-500 to-teal-500" },
            { title: "Staff & Payroll", desc: "Automated scheduling, attendance tracking, and payroll processing for baristas.", iconName: "Users", imageGradient: "from-blue-500 to-cyan-500" },
            { title: "Anomaly Detection", desc: "AI alerts for unusual stock depletion or transaction patterns that indicate waste.", iconName: "ShieldAlert", imageGradient: "from-red-500 to-orange-500" },
            { title: "Inventory Prediction", desc: "Predictive reordering for perishables before you hit the morning rush.", iconName: "Box", imageGradient: "from-purple-500 to-pink-500" },
            { title: "AI Business Insights", desc: "Actionable data on your best-selling hours and menu item profitability.", iconName: "LineChart", imageGradient: "from-[#C3EB7A] to-[#4A90E2]" }
        ]
    },
    {
        id: 'qsr',
        slug: 'qsr-pos',
        category: 'fnb',
        title: 'Quick Service Restaurants',
        metaTitle: 'QSR POS System | Fast & Scalable Solutions by MochaEase',
        metaDescription: 'Accelerate your QSR operations. Predictive AI demand forecasting, self-serve kiosks, and integrated kitchen display systems for high-volume franchises.',
        heroHeadline: 'Lightning Fast Operations.',
        heroSubheadline: 'Speed is everything in QSR. MochaEase is engineered to slash your wait times and keep your kitchen humming.',
        blogTag: 'Product Updates',
        faqs: [
            { question: "How fast is the checkout process?", answer: "Our QSR interface is optimized for speed, allowing cashiers to process high-volume orders in seconds. We also support self-serve kiosks to bust lines during peak hours." },
            { question: "Can it integrate with delivery apps like Zomato or Swiggy?", answer: "Yes, all major delivery aggregators are injected directly into your POS and Kitchen Display System, eliminating 'tablet hell' at the counter." },
            { question: "How does predictive AI help my kitchen?", answer: "MochaEase analyzes historical footfall and local events to predict daily demand, telling your kitchen exactly how much to prep to avoid waste." }
        ],
        painPoints: [
            { title: "Long Queues", desc: "Customers walking away during rush hour delays", iconName: "Clock", color: "from-pink-500/20 to-transparent", text: "text-pink-400", border: "group-hover:border-pink-500/50", glow: "group-hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]" },
            { title: "Kitchen Miscommunications", desc: "Lost tickets and dropped orders at the prep station", iconName: "AlertOctagon", color: "from-red-500/20 to-transparent", text: "text-red-400", border: "group-hover:border-red-500/50", glow: "group-hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]" },
            { title: "Aggregator Chaos", desc: "Juggling 4 delivery tablets at the front desk", iconName: "Smartphone", color: "from-orange-500/20 to-transparent", text: "text-orange-400", border: "group-hover:border-orange-500/50", glow: "group-hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]" },
            { title: "Wastage Blind Spots", desc: "No real-time view of ingredient usage and loss", iconName: "EyeOff", color: "from-blue-500/20 to-transparent", text: "text-blue-400", border: "group-hover:border-blue-500/50", glow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]" },
            { title: "High Staff Turnover", desc: "Complex legacy POS systems frustrating new hires", iconName: "Users", color: "from-yellow-500/20 to-transparent", text: "text-yellow-400", border: "group-hover:border-yellow-500/50", glow: "group-hover:shadow-[0_0_30px_rgba(234,179,8,0.15)]" },
            { title: "Slow Expansion", desc: "Unable to easily replicate tech stack to new branches", iconName: "TrendingDown", color: "from-purple-500/20 to-transparent", text: "text-purple-400", border: "group-hover:border-purple-500/50", glow: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]" }
        ],
        highlight: {
            title: "Lightning Fast Checkout.",
            subtitle: "MochaEase brings enterprise-grade technology to your fast-casual chain.",
            checklist: [
                "Self-serve kiosks to double order volume",
                "Direct integrations with aggregators",
                "Intelligent Kitchen Display Systems (KDS)",
                "Drive-thru optimization with dual-screen POS"
            ],
            dashboard: {
                title: "Live Counter (Downtown QSR)",
                tag: "Active RUSH",
                items: [
                    { label: "Current Prep Time", value: "2m 45s", status: "On Target", subtext: "Below 3m SLA", statusColor: "text-[#C3EB7A]" },
                    { label: "Bestseller Today", value: "Crispy Chicken Combo", status: "+34% vs yesterday", subtext: "", statusColor: "text-[#C3EB7A]" }
                ]
            }
        },
        testimonial: {
            quote: "Since switching our 14 burger outlets to MochaEase, our average order-to-table time dropped by 2 full minutes. The KDS and aggregator integration just works.",
            author: "Mark L.",
            role: "Operations Director, SmashBurger"
        },
        features: [
            { title: "High-Speed POS", desc: "Handle massive queues with zero lag. Integrated with self-serve kiosks.", iconName: "Zap", imageGradient: "from-red-500 to-orange-500" },
            { title: "Aggregator Sync", desc: "Inject Swiggy, Zomato, and UberEats orders directly into your KDS.", iconName: "Smartphone", imageGradient: "from-blue-500 to-cyan-500" },
            { title: "Predictive Prep AI", desc: "Know exactly how much to prep today based on historical demand trends.", iconName: "ChefHat", imageGradient: "from-emerald-500 to-teal-500" },
            { title: "Multi-Outlet Control", desc: "Update menus and track sales across 100+ branches from one head office.", iconName: "Globe", imageGradient: "from-purple-500 to-pink-500" },
            { title: "Wastage Analytics", desc: "AI-powered loss prevention and granular wastage tracking per outlet.", iconName: "TrendingDown", imageGradient: "from-rose-500 to-red-500" },
            { title: "Centralized Payroll", desc: "Manage thousands of staff shifts and payroll remotely with ease.", iconName: "Users", imageGradient: "from-[#C3EB7A] to-[#4A90E2]" }
        ]
    },
    {
        id: 'full-service',
        slug: 'restaurant-pos',
        category: 'fnb',
        title: 'Full Service Dining',
        metaTitle: 'Restaurant POS System | Premium Full-Service Dining by MochaEase',
        metaDescription: 'Elevate your restaurant experience with MochaEase. Table management, handheld server terminals, and seamless kitchen communication for fine dining.',
        heroHeadline: 'Table Service, Elevated.',
        heroSubheadline: 'Running a full-service dining room requires choreography. MochaEase unites your hosts, servers, and chefs in perfect sync.',
        blogTag: 'Enterprise',
        faqs: [
            { question: "How does table management work?", answer: "Our dynamic floor plan view shows real-time table status (seated, dessert, empty) and allows hosts to manage waitlists and reservations from an iPad." },
            { question: "Do you offer handheld devices for servers?", answer: "Yes. Servers can take orders tableside using mobile terminals, firing tickets instantly to the bar or kitchen without leaving the floor." },
            { question: "Can it handle complex bill splitting?", answer: "Easily. MochaEase allows you to split checks by item, seat, or custom percentage in seconds, keeping your guests happy." }
        ],
        features: [
            { title: "Dynamic Floor Plans", desc: "Real-time table status tracking—know exactly which tables are on dessert or ready for turnover.", iconName: "Map", imageGradient: "from-emerald-500 to-teal-500" },
            { title: "Handheld Terminals", desc: "Fire orders tableside to eliminate server travel time and speed up kitchen communication.", iconName: "Smartphone", imageGradient: "from-blue-500 to-cyan-500" },
            { title: "Split-Bill Pro", desc: "Complex bill splitting by item or seat handled in seconds, right at the table.", iconName: "Receipt", imageGradient: "from-orange-500 to-amber-500" },
            { title: "Kitchen Display Sync", desc: "Route appetizers, mains, and desserts with precision timing to multiple kitchen stations.", iconName: "Monitor", imageGradient: "from-purple-500 to-indigo-500" },
            { title: "Staff Shift Bidding", desc: "Let staff swap shifts via their app, with automated manager approval and payroll sync.", iconName: "Users", imageGradient: "from-pink-500 to-rose-500" },
            { title: "Yield Analytics", desc: "Deep AI insights into plate margins and ingredient waste to protect your bottom line.", iconName: "LineChart", imageGradient: "from-[#C3EB7A] to-[#4A90E2]" }
        ]
    },
    {
        id: 'bars',
        slug: 'bar-pos',
        category: 'fnb',
        title: 'Bars & Breweries',
        metaTitle: 'Bar POS System | High-Volume Bar Management by MochaEase',
        metaDescription: 'Secure your bar profits. Strict liquor inventory, rapid pre-authorized tabs, and happy hour automation for busy bars and venues.',
        heroHeadline: 'Pour Profitably.',
        heroSubheadline: 'Bars move fast. High volume, high shrinkage. MochaEase keeps your bartenders pouring while locking down your inventory.',
        blogTag: 'Retail Tips',
        faqs: [
            { question: "Can I open tabs with pre-authorization?", answer: "Yes. Swipe a card to open a pre-authorized tab in just 1 second, allowing drinks to flow without delay while securing your revenue." },
            { question: "How do you track liquor shrinkage?", answer: "MochaEase maps cocktail recipes to deduct exact ounces from your inventory, flagging discrepancies or over-pours instantly on your dashboard." },
            { question: "Does it support automated happy hour pricing?", answer: "Absolutely. You can program complex pricing rules that switch on and off automatically based on time and day." }
        ],
        features: [
            { title: "Instant Tabs", desc: "Pre-authorize cards in 1 second. Keep drinks flowing without holding onto physical cards.", iconName: "Zap", imageGradient: "from-purple-500 to-fuchsia-500" },
            { title: "Pour Cost Tracking", desc: "AI maps recipes to inventory, flagging over-pours or unauthorized comps instantly.", iconName: "Box", imageGradient: "from-orange-500 to-amber-500" },
            { title: "Happy Hour Automation", desc: "Program complex time-based pricing that switches on and off without staff intervention.", iconName: "Clock", imageGradient: "from-pink-500 to-rose-500" },
            { title: "Security Integration", desc: "Link POS transactions to security footage to prevent theft and monitor high-value liquor.", iconName: "ShieldAlert", imageGradient: "from-red-500 to-orange-500" },
            { title: "Venue Capacity Sync", desc: "Connect entry clickers to the POS to see live spending per head vs venue capacity.", iconName: "Ticket", imageGradient: "from-cyan-500 to-blue-500" },
            { title: "Inventory Prediction", desc: "Automated reordering for bestsellers based on predicted weekend volume.", iconName: "LineChart", imageGradient: "from-[#C3EB7A] to-[#4A90E2]" }
        ]
    },
    {
        id: 'food-trucks',
        slug: 'food-truck-pos',
        category: 'fnb',
        title: 'Food Trucks',
        metaTitle: 'Food Truck POS | Mobile & Offline Solutions by MochaEase',
        metaDescription: 'Take your food truck to the next level. Offline-resilient POS, line-busting handhelds, and real-time inventory sync for mobile vendors.',
        heroHeadline: 'Scale Your Street Food.',
        heroSubheadline: 'Tight spaces, high heat, and huge lines. MochaEase gives your food truck enterprise-grade tech that fits in your pocket.',
        blogTag: 'Cafe Management',
        faqs: [
            { question: "Does it work without internet?", answer: "Yes. Our systems are built local-first, allowing you to process card and cash payments even at remote festivals with zero connectivity." },
            { question: "Can I take orders from people in line?", answer: "Absolutely. Our handheld terminals allow staff to walk the line and fire orders to the truck window before the customer even reaches the front." },
            { question: "How do I manage prep from a central kitchen?", answer: "MochaEase syncs your commissary kitchen prep directly to your truck's daily inventory, ensuring you never undersell or overprep." }
        ],
        features: [
            { title: "Local-First POS", desc: "Process card payments at festivals even with zero internet. Data syncs when you're back online.", iconName: "Zap", imageGradient: "from-yellow-500 to-lime-500" },
            { title: "Line Buster Handhelds", desc: "Take orders from the crowd and fire them to the truck window before they reach the front.", iconName: "Smartphone", imageGradient: "from-blue-500 to-cyan-500" },
            { title: "Prep Kitchen Sync", desc: "Sync inventory between your central commissary kitchen and your mobile units daily.", iconName: "Box", imageGradient: "from-emerald-500 to-teal-500" },
            { title: "Location Marketing", desc: "Automated SMS/WhatsApp blasts to fans when you park at a new location today.", iconName: "Globe", imageGradient: "from-purple-500 to-pink-500" },
            { title: "Expense AI", desc: "Snap receipt photos at wholesale markets; our AI categorizes costs and tracks daily margins.", iconName: "Wallet", imageGradient: "from-orange-500 to-red-500" },
            { title: "Demand Forecasting", desc: "Know exactly how much to prep for festivals based on historical footfall and weather data.", iconName: "LineChart", imageGradient: "from-[#C3EB7A] to-[#4A90E2]" }
        ]
    },
    {
        id: 'bakeries',
        slug: 'bakery-pos',
        category: 'fnb',
        title: 'Bakeries',
        metaTitle: 'Bakery POS System | Production & Inventory by MochaEase',
        metaDescription: 'Master your bakery operations. Production planning AI, custom order management, and wastage analytics for local and chain bakeries.',
        heroHeadline: 'Rise to the Occasion.',
        heroSubheadline: 'Bakeries require incredible precision, early mornings, and strict shelf lives. Let MochaEase manage the math.',
        blogTag: 'Product Updates',
        faqs: [
            { question: "How do you help with bake production?", answer: "Our AI analyzes historical sales and weather patterns to tell your bakers exactly how many units to produce at 4 AM to maximize profit." },
            { question: "Can I manage custom wedding cake orders?", answer: "Yes. Track deposits, design notes, and pickup dates for complex custom orders with automated customer reminders." },
            { question: "Does it handle wholesale accounts?", answer: "Easily. Generate B2B invoices and manage recurring delivery routes for the coffee shops and stores you supply." }
        ],
        features: [
            { title: "Production Planning AI", desc: "Know exactly how many units to bake at 4 AM based on historical daily demand trends.", iconName: "ChefHat", imageGradient: "from-pink-500 to-rose-500" },
            { title: "Custom Order Manager", desc: "Track complex multi-date cake orders, deposits, and delivery schedules effortlessly.", iconName: "CalendarDays", imageGradient: "from-amber-400 to-orange-500" },
            { title: "Expiry Tracking", desc: "Automated alerts for shelf-life management and day-old discounting via the POS.", iconName: "Box", imageGradient: "from-red-500 to-orange-500" },
            { title: "Wholesale Billing", desc: "B2B invoicing and recurring route management for your retail and cafe partners.", iconName: "Truck", imageGradient: "from-blue-500 to-cyan-500" },
            { title: "Ingredient Margins", desc: "AI alerts if butter or flour prices fluctuate, impacting your pastry profitability.", iconName: "Target", imageGradient: "from-purple-500 to-indigo-500" },
            { title: "Waste Analytics", desc: "Granular reports on unsold stock to help you dial in production and eliminate food waste.", iconName: "LineChart", imageGradient: "from-[#C3EB7A] to-[#4A90E2]" }
        ]
    },
    {
        id: 'fashion',
        slug: 'fashion-pos',
        category: 'retail',
        title: 'Apparel & Fashion',
        metaTitle: 'Fashion Retail POS | Omnichannel Inventory by MochaEase',
        metaDescription: 'Run your boutique with MochaEase. Real-time Shopify sync, multi-variant inventory management, and VIP clienteling for fashion brands.',
        heroHeadline: 'Sell More. Stress Less.',
        heroSubheadline: 'Whether you sell sneakers or streetwear, MochaEase is built to keep your shelves moving and your customers smiling.',
        blogTag: 'Retail Tips',
        faqs: [
            { question: "Does it sync with my Shopify store?", answer: "Yes, we provide real-time omnichannel sync. Sales in your physical boutique are instantly reflected in your online store to prevent overselling." },
            { question: "How do you handle size and color variants?", answer: "MochaEase manages complex matrix inventory effortlessly, allowing you to track every SKU by size, color, and season with ease." },
            { question: "Can I see my customer's purchase history?", answer: "Yes. Our VIP clienteling feature shows a customer's complete online and in-store history right on your staff's tablet for personalized service." }
        ],
        features: [
            { title: "Omnichannel Sync", desc: "Real-time Shopify & e-commerce integration. Prevent overselling across all physical and digital channels.", iconName: "Globe", imageGradient: "from-pink-500 to-rose-500" },
            { title: "Matrix Inventory", desc: "Manage complex variations (Size, Color, Material) effortlessly with a high-speed SKU matrix.", iconName: "Box", imageGradient: "from-blue-500 to-cyan-500" },
            { title: "VIP Clienteling", desc: "Access 360-degree customer history tableside to provide personalized style recommendations.", iconName: "UserCircle", imageGradient: "from-purple-500 to-indigo-500" },
            { title: "Anomaly Detection", desc: "AI-powered loss prevention that flags unusual return patterns or inventory discrepancies.", iconName: "ShieldAlert", imageGradient: "from-red-500 to-orange-500" },
            { title: "Automated Reordering", desc: "Intelligent stock-outs prevention by predicting which sizes and styles will sell out first.", iconName: "Target", imageGradient: "from-[#C3EB7A] to-[#4A90E2]" },
            { title: "Staff Commissions", desc: "Automated tracking and calculation of sales-based commissions for your floor staff.", iconName: "Users", imageGradient: "from-orange-500 to-amber-500" }
        ],
        painPoints: [
            { title: "Ghost Inventory", desc: "Items showing in stock that don't exist", iconName: "EyeOff", color: "from-pink-500/20 to-transparent", text: "text-pink-400", border: "group-hover:border-pink-500/50", glow: "group-hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]" },
            { title: "Siloed Channels", desc: "No connection between online and offline sales", iconName: "Globe", color: "from-blue-500/20 to-transparent", text: "text-blue-400", border: "group-hover:border-blue-500/50", glow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]" },
            { title: "Return Headaches", desc: "Complex returns ruining customer experience", iconName: "Clock", color: "from-red-500/20 to-transparent", text: "text-red-400", border: "group-hover:border-red-500/50", glow: "group-hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]" }
        ],
        testimonial: {
            quote: "MochaEase transformed our boutique. The Shopify sync is flawless, and the VIP clienteling helps us sell 20% more to our best customers.",
            author: "Sarah J.",
            role: "Owner, Mode Noir"
        }
    },
    {
        id: 'beauty',
        slug: 'beauty-pos',
        category: 'retail',
        title: 'Health & Beauty',
        metaTitle: 'Salon & Spa POS | Appointment Booking by MochaEase',
        metaDescription: 'Streamline your beauty business. Automated SMS reminders, commission tracking, and detailed client profiles for salons and clinics.',
        heroHeadline: 'Radiate Excellence.',
        heroSubheadline: 'From booking chairs to tracking products, running a beauty clinic is an art. Let MochaEase handle the science.',
        blogTag: 'Retail Tips',
        faqs: [
            { question: "Do you have an online booking widget?", answer: "Yes. A 24/7 web-based booking tool that integrates directly with your staff calendar and sends automated SMS reminders to reduce no-shows." },
            { question: "Can it track staff commissions?", answer: "Easily. Set custom commission rates for different services or products, and MochaEase will calculate your payroll splits automatically." },
            { question: "How do client profiles work?", answer: "Store treatment notes, custom formulas, and before/after photos safely in each customer profile for a truly personalized experience." }
        ],
        features: [
            { title: "Smart Booking", desc: "24/7 online appointment widget with automated SMS/email reminders to slash no-show rates.", iconName: "CalendarDays", imageGradient: "from-cyan-500 to-blue-500" },
            { title: "Treatment History", desc: "Securely store formulas, treatment notes, and before/after photos in unified client profiles.", iconName: "FileText", imageGradient: "from-purple-500 to-pink-500" },
            { title: "Commission Pro", desc: "Customizable tiered commissions for stylists and therapists, calculated automatically.", iconName: "Users", imageGradient: "from-emerald-500 to-teal-500" },
            { title: "Product Upselling", desc: "AI-powered recommendations suggesting retail products based on a client's service history.", iconName: "Star", imageGradient: "from-orange-500 to-amber-500" },
            { title: "Room & Chair Mgmt", desc: "Ensure your most expensive assets (equipment, rooms, chairs) are always optimized.", iconName: "Map", imageGradient: "from-indigo-500 to-blue-500" },
            { title: "Business Health AI", desc: "Actionable insights on client retention, staff performance, and peak booking hours.", iconName: "LineChart", imageGradient: "from-[#C3EB7A] to-[#4A90E2]" }
        ]
    },
    {
        id: 'grocery',
        slug: 'grocery-pos',
        category: 'retail',
        title: 'Grocery & Convenience',
        metaTitle: 'Grocery POS System | High-Volume Inventory by MochaEase',
        metaDescription: 'Precision grocery management. Manage 50,000+ SKUs, integrated scales, and automated expiry tracking for supermarkets and local shops.',
        heroHeadline: 'High Volume. Perfect Control.',
        heroSubheadline: 'Ten thousand SKUs. Narrow margins. Endless foot traffic. MochaEase gives you the heavy-duty tech needed to run convenience retail.',
        blogTag: 'Retail Tips',
        faqs: [
            { question: "How many SKUs can it handle?", answer: "MochaEase is built for high volume, easily handling over 50,000 unique SKUs with rapid barcode scanning and master categorization." },
            { question: "Can it integrate with weighing scales?", answer: "Yes. The POS interfaces directly with digital scales to sell produce and deli items by the gram or kilo instantly." },
            { question: "How do you help with food waste?", answer: "We track batch numbers and expiry dates for perishables, sending automated alerts before products go bad so you can discount or push them." }
        ],
        features: [
            { title: "50k+ SKU Handling", desc: "Enterprise-grade database built for massive inventories and rapid multi-lane barcode scanning.", iconName: "Box", imageGradient: "from-green-500 to-emerald-500" },
            { title: "Scale Integration", desc: "Direct interface with digital scales for rapid weigh-and-pay transactions at the counter.", iconName: "Scale", imageGradient: "from-blue-500 to-cyan-500" },
            { title: "Expiry Guard AI", desc: "Proactive alerts for batch expiry, helping you discount perishables before they become waste.", iconName: "ShieldAlert", imageGradient: "from-red-500 to-orange-500" },
            { title: "Supplier Auto-PO", desc: "Predictive reordering that generates purchase orders as stock hits lean levels.", iconName: "Truck", imageGradient: "from-amber-500 to-orange-500" },
            { title: "Inventory Anomaly AI", desc: "Detection of shrinkage or billing errors through deep pattern analysis of transactions.", iconName: "Target", imageGradient: "from-[#C3EB7A] to-[#4A90E2]" },
            { title: "Payroll & Attendance", desc: "Manage large shift rotations and automated payroll for floor staff and cashiers.", iconName: "Users", imageGradient: "from-purple-500 to-indigo-500" }
        ]
    },
    {
        id: 'home',
        slug: 'home-lifestyle-pos',
        category: 'retail',
        title: 'Home & Lifestyle',
        metaTitle: 'Homeware & Furniture POS | Logistics Sync by MochaEase',
        metaDescription: 'Master your lifestyle retail. Warehouse-to-showroom sync, white-glove delivery routing, and large-item variant tracking items.',
        heroHeadline: 'Cater to Lifestyle.',
        heroSubheadline: 'Big items, diverse homeware sets, and delivery logistics. MochaEase provides the architecture lifestyle stores need.',
        blogTag: 'Retail Tips',
        faqs: [
            { question: "Can I sell items not in stock at the showroom?", answer: "Yes. Sync your showroom POS to your warehouse inventory so staff can sell large furniture items they don't physically have on hand." },
            { question: "How do you handle delivery routing?", answer: "Our white-glove delivery tools allow you to route trucks efficiently and send customers live SMS tracking links for their furniture arrival." },
            { question: "Can it manage custom deposits?", answer: "Easily. Take partial deposits for custom builds and automate balance-due reminders for customers upon delivery." }
        ],
        features: [
            { title: "Showroom-Warehousing", desc: "Live sync between floor samples and warehouse stock—sell what you have, anywhere.", iconName: "Building", imageGradient: "from-amber-500 to-orange-500" },
            { title: "White-Glove Delivery", desc: "Integrated logistics for large-item delivery, including SMS arrival tracking for customers.", iconName: "Truck", imageGradient: "from-blue-500 to-indigo-500" },
            { title: "Deposit Management", desc: "Securely handle partial payments and automated balance-due flows for custom orders.", iconName: "Wallet", imageGradient: "from-emerald-500 to-teal-500" },
            { title: "Variation Specialist", desc: "Manage massive catalogs of finish, wood, and fabric variations in a clean SKU matrix.", iconName: "Box", imageGradient: "from-purple-500 to-pink-500" },
            { title: "Staff Schedule AI", desc: "Automate floor staff shifts based on predicted weekend footfall trends.", iconName: "Users", imageGradient: "from-cyan-500 to-blue-500" },
            { title: "Revenue Forecasting", desc: "Actionable AI insights predicting long-term sales trends and stock requirements.", iconName: "LineChart", imageGradient: "from-[#C3EB7A] to-[#4A90E2]" }
        ]
    },
    {
        id: 'vape',
        slug: 'vape-shop-pos',
        category: 'retail',
        title: 'Vape & Smoke Shops',
        metaTitle: 'Vape Shop POS | Compliance & Inventory by MochaEase',
        metaDescription: 'Secure your specialty retail. Mandatory age verification, flavor-variant matrix, and automated compliance taxes for vape shops.',
        heroHeadline: 'Compliance Meets Commerce.',
        heroSubheadline: 'Age verification, vast SKU variations, and strict regulations. MochaEase streamlines your vape or smoke shop operations.',
        blogTag: 'Retail Tips',
        faqs: [
            { question: "Does it support mandatory age checks?", answer: "Yes. Our POS includes an age-gate that requires ID scanning to process any age-restricted transactions, ensuring 100% compliance." },
            { question: "How do you handle thousands of juice flavors?", answer: "MochaEase uses an intelligent variant matrix that allows you to manage flavors, nicotine levels, and bottle sizes without cluttering your database." },
            { question: "Can it automate reorders with distributors?", answer: "Absolutely. Set minimum stock levels for bestsellers, and we'll automatically generate POs to your suppliers before you run out." }
        ],
        features: [
            { title: "Compliance Gate", desc: "Mandatory age-verification prompts and ID scanning integrated directly into the POS.", iconName: "ShieldAlert", imageGradient: "from-red-500 to-orange-500" },
            { title: "Flavor-Variant Matrix", desc: "Cleanly manage thousands of flavor and nicotine variants without database clutter.", iconName: "Box", imageGradient: "from-purple-500 to-indigo-500" },
            { title: "Loyalty Engines", desc: "Advanced reward programs to drive repeat business in a highly competitive niche.", iconName: "HeartHandshake", imageGradient: "from-pink-500 to-rose-500" },
            { title: "Supplier Automation", desc: "Set 'Lean-Levels' and automate purchase orders for your top-moving SKUs.", iconName: "Truck", imageGradient: "from-blue-500 to-cyan-500" },
            { title: "Inventory Loss AI", desc: "Rapidly identify discrepancies and shrinkage through automated daily audit reports.", iconName: "Target", imageGradient: "from-[#C3EB7A] to-[#4A90E2]" },
            { title: "Staff Payroll Auth", desc: "Automated attendance tracking and payroll calculation for your retail staff.", iconName: "Users", imageGradient: "from-orange-500 to-amber-500" }
        ]
    },
    {
        id: 'enterprise',
        slug: 'enterprise-pos',
        category: 'enterprise',
        title: 'Enterprise Chains',
        metaTitle: 'Enterprise POS | Franchise & Chain Management by MochaEase',
        metaDescription: 'Command your retail empire. Centralized menu management, franchise royalty automation, and deep analytics for large-scale multi-unit operators.',
        heroHeadline: 'Command Your Empire.',
        heroSubheadline: "Running an empire requires a bird's-eye view with ground-level control. MochaEase unites your entire chain under one roof.",
        blogTag: 'Enterprise',
        faqs: [
            { question: "How do I update menus across 100 locations?", answer: "Our Master Menu Management allows you to push price changes or new items to every location at once from your Head Office dashboard." },
            { question: "Can you automate franchise royalties?", answer: "Yes. MochaEase acts as the neutral source of truth, automatically calculating and ledgering royalty splits based on verified sales data." },
            { question: "Does it integrate with ERP systems like SAP?", answer: "Absolutely. We provide a robust Open API and pre-built connectors for major ERPs like SAP and Oracle NetSuite for deep financial sync." }
        ],
        features: [
            { title: "Brand Control Center", desc: "Update menus, pricing, and tax rules across 1,000+ outlets from one central dashboard.", iconName: "Factory", imageGradient: "from-[#4A90E2] to-indigo-500" },
            { title: "Franchise Royalties", desc: "Automated calculation and ledgering of royalties based on real-time, verified sales.", iconName: "Receipt", imageGradient: "from-blue-500 to-cyan-500" },
            { title: "Enterprise ERP Sync", desc: "Deep, native integrations with SAP, Oracle NetSuite, and Microsoft Dynamics 365.", iconName: "LinkIcon", imageGradient: "from-purple-500 to-indigo-500" },
            { title: "Anomaly Detection AI", desc: "Cross-continent pattern analysis to detect enterprise-level fraud or systemic waste.", iconName: "ShieldAlert", imageGradient: "from-red-500 to-orange-500" },
            { title: "Global Payroll Sync", desc: "Unified staff management and payroll processing across diverse regional legislations.", iconName: "Users", imageGradient: "from-[#C3EB7A] to-[#4A90E2]" },
            { title: "Supply Chain AI", desc: "Predictive global inventory management to optimize warehouse-to-outlet logistics.", iconName: "LineChart", imageGradient: "from-emerald-500 to-teal-500" }
        ],
        painPoints: [
            { title: "Legacy Bloat", desc: "Slow, expensive systems that won't scale", iconName: "TrendingDown", color: "from-red-500/20 to-transparent", text: "text-red-400", border: "group-hover:border-red-500/50", glow: "group-hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]" },
            { title: "Data Silos", desc: "Impossible to get a unified view of performance", iconName: "LineChart", color: "from-blue-500/20 to-transparent", text: "text-blue-400", border: "group-hover:border-blue-500/50", glow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]" },
            { title: "Security Risks", desc: "Vulnerable POS hardware and data leaks", iconName: "ShieldAlert", color: "from-purple-500/20 to-transparent", text: "text-purple-400", border: "group-hover:border-purple-500/50", glow: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]" }
        ],
        testimonial: {
            quote: "MochaEase replaced 4 different vendors for our 50-store group. Centralized management alone saved us $15k per month.",
            author: "David K.",
            role: "CTO, Global Hospitality"
        }
    },
    {
        id: 'multi-brand',
        slug: 'multi-brand-pos',
        category: 'enterprise',
        title: 'Multi-Brand Portfolios',
        metaTitle: 'Multi-Brand POS | Ghost Kitchens & Food Halls by MochaEase',
        metaDescription: 'Unified control for multi-brand operators. Manage ghost kitchens, food halls, and diversfied portfolios from one singular login.',
        heroHeadline: 'One Screen. Multiple Domains.',
        heroSubheadline: 'Running ghost kitchens, food halls, or massive hospitality groups? Command distinctly multiple brands entirely from one single login.',
        blogTag: 'Enterprise',
        faqs: [
            { question: "Can I manage different brands from one screen?", answer: "Yes. Toggle instantly between different brand entities and compare portfolio health without ever logging out of the system." },
            { question: "How do you handle shared inventory?", answer: "If multiple brands share ingredients (e.g., tomatoes or flour), our system intelligently deducts from a shared master warehouse in real-time." },
            { question: "Does it support food hall kiosks?", answer: "Absolutely. Customers can order from multiple brands on a single kiosk, and our backend splits the revenue to the correct entities automatically." }
        ],
        features: [
            { title: "Multi-Brand Kiosks", desc: "Let customers order from 5 brands in one transaction. We handle the split and payouts instantly.", iconName: "QrCode", imageGradient: "from-orange-500 to-amber-500" },
            { title: "Shared Warehousing", desc: "Track ingredients used across multiple concepts from a single master inventory pool.", iconName: "Box", imageGradient: "from-blue-500 to-cyan-500" },
            { title: "Portfolio Dashboards", desc: "Deep AI analytics comparing performance across your diversified brand portfolio.", iconName: "LineChart", imageGradient: "from-purple-500 to-indigo-500" },
            { title: "Unified Loyalty", desc: "One loyalty currency across all your brands, driving cross-brand customer traffic.", iconName: "HeartHandshake", imageGradient: "from-[#C3EB7A] to-[#4A90E2]" },
            { title: "Staff Sharing", desc: "Seamlessly schedule and pay staff who work across multiple brands in the same venue.", iconName: "Users", imageGradient: "from-emerald-500 to-teal-500" },
            { title: "Centralized Expenses", desc: "Snap bills once; our AI splits costs between brand entities for tax-ready reporting.", iconName: "Wallet", imageGradient: "from-rose-500 to-red-500" }
        ]
    },
    {
        id: 'stadiums',
        slug: 'stadium-venue-pos',
        category: 'enterprise',
        title: 'Stadiums & Venues',
        metaTitle: 'Stadium POS System | High-Volume Venue Solutions by MochaEase',
        metaDescription: 'Handle the rush. Offline-resilient POS, in-seat mobile ordering, and mass-scale inventory management for large stadiums and arenas.',
        heroHeadline: 'Handle The Halftime Rush.',
        heroSubheadline: 'Fifty thousand fans. 15 minutes. Pure chaos. MochaEase deploys the most robust, high-availability architecture to handle immense spikes.',
        blogTag: 'Enterprise',
        faqs: [
            { question: "Can it work without WiFi?", answer: "Yes. Stadium environments are tough on connectivity. Our terminals run fully local-first and can process thousands of orders with zero internet access." },
            { question: "Do you offer in-seat mobile ordering?", answer: "Yes. Fans scan a QR code on their seat to order concessions, which are then routed to the nearest runner or collection point instantly." },
            { question: "How do you handle 500+ staff on game days?", answer: "Our high-speed clock-in systems and facial recognition attendance tracking make managing hundreds of temporary workers flawless." }
        ],
        features: [
            { title: "Halftime Rush POS", desc: "Zero-latency checkout designed for stadiums. Process thousands of orders in minutes.", iconName: "Zap", imageGradient: "from-red-500 to-orange-500" },
            { title: "In-Seat QR Ordering", desc: "Seamless concessions ordering from fan seats with integrated runner routing.", iconName: "QrCode", imageGradient: "from-blue-500 to-cyan-500" },
            { title: "Mass Attendance AI", desc: "Facial recognition and high-speed clock-in for managing 500+ gameday staff.", iconName: "Users", imageGradient: "from-purple-500 to-indigo-500" },
            { title: "Inventory Scale", desc: "Manage massive keg and concession stock across 100+ points of sale in real-time.", iconName: "Box", imageGradient: "from-emerald-500 to-teal-500" },
            { title: "Offline Resilience", desc: "Stadium internet fails. MochaEase doesn't. Full functionality with zero connectivity.", iconName: "ShieldAlert", imageGradient: "from-orange-500 to-amber-500" },
            { title: "Profit per Event", desc: "Granular AI reports on gameday profitability, staffing efficiency, and fan spending.", iconName: "LineChart", imageGradient: "from-[#C3EB7A] to-[#4A90E2]" }
        ]
    }
];

export function getSolutionBySlug(slug: string) {
    return SOLUTIONS.find(s => s.slug === slug);
}
