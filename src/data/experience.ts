import {
    Coffee, ShoppingBag, Zap, Building, Scissors, Dumbbell, Map, Users, Receipt, Box, LineChart, ChevronDown,
    HeartHandshake, Truck, Smartphone, QrCode, ChefHat, Globe, Megaphone, ShieldAlert, Monitor, Star, Factory, FileText, Link as LinkIcon, CalendarDays, UserCircle, Ticket, Lock, Target, Trophy
} from 'lucide-react';

export type Role =
    | 'cafe' | 'qsr' | 'full-service' | 'bars' | 'food-trucks' | 'bakeries'
    | 'fashion' | 'beauty' | 'grocery' | 'home' | 'vape'
    | 'enterprise' | 'multi-brand' | 'stadiums' | 'airports' | null;

export const ROLES = [
    { id: 'cafe', icon: Coffee, label: 'Coffee Shops', color: 'from-orange-500/20 to-amber-500/5' },
    { id: 'qsr', icon: Zap, label: 'Quick Service', color: 'from-red-500/20 to-orange-500/5' },
    { id: 'full-service', icon: UserCircle, label: 'Full Service Dining', color: 'from-emerald-500/20 to-teal-500/5' },
    { id: 'bars', icon: Trophy, label: 'Bars & Breweries', color: 'from-purple-500/20 to-fuchsia-500/5' },
    { id: 'food-trucks', icon: Truck, label: 'Food Trucks', color: 'from-yellow-500/20 to-lime-500/5' },
    { id: 'bakeries', icon: ChefHat, label: 'Bakeries', color: 'from-pink-500/20 to-rose-500/5' },
    { id: 'fashion', icon: Scissors, label: 'Apparel & Fashion', color: 'from-pink-500/20 to-rose-500/5' },
    { id: 'beauty', icon: HeartHandshake, label: 'Health & Beauty', color: 'from-cyan-500/20 to-blue-500/5' },
    { id: 'grocery', icon: ShoppingBag, label: 'Grocery', color: 'from-green-500/20 to-emerald-500/5' },
    { id: 'home', icon: Box, label: 'Home & Lifestyle', color: 'from-amber-500/20 to-orange-500/5' },
    { id: 'vape', icon: Target, label: 'Vape Shops', color: 'from-slate-500/20 to-gray-500/5' },
    { id: 'enterprise', icon: Building, label: 'Franchise Management', color: 'from-[#4A90E2]/20 to-indigo-500/5' },
    { id: 'multi-brand', icon: Factory, label: 'Multi-Brand', color: 'from-indigo-500/20 to-violet-500/5' },
    { id: 'stadiums', icon: Ticket, label: 'Stadiums', color: 'from-rose-500/20 to-orange-500/5' },
    { id: 'airports', icon: Globe, label: 'Travel Retail', color: 'from-blue-500/20 to-cyan-500/5' },
];

export const CONTENT: Record<Exclude<Role, null>, { headline: string; subheadline: string; steps: any[] }> = {
    'cafe': {
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
    'qsr': {
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
    'full-service': {
        headline: "Table Service, Elevated.",
        subheadline: "Running a full-service dining room requires choreography. MochaEase unites your hosts, servers, and chefs in perfect sync.",
        steps: [
            { title: "Host Stand & Reservations", desc: "Manage your floor plan dynamically. See which tables are on dessert, which are empty, and seamlessly manage your waitlist directly from an iPad.", icon: CalendarDays, imageGradient: "from-emerald-500 to-teal-500" },
            { title: "Handheld Server POS", desc: "Equip your waitstaff with mobile terminals. Take orders tableside and instantly fire them to the bar or kitchen without walking across the room.", icon: Smartphone, imageGradient: "from-cyan-500 to-blue-500" },
            { title: "Course Calling & Pacing", desc: "Ensure appetizers don't arrive with the main course. Intelligent course pacing allows servers to hold, fire, and manage dish timing with a single tap.", icon: ChefHat, imageGradient: "from-rose-400 to-red-500" },
            { title: "Split Checks Made Easy", desc: "Splitting an intricate bill 6 ways by item or percentage? It takes seconds on MochaEase, leaving your guests happy and stress-free.", icon: Receipt, imageGradient: "from-purple-500 to-fuchsia-500" },
            { title: "Wine Strategy & Inventory", desc: "Tracking valuable bottles of wine is critical. We scan them in, deduct them upon sale, and alert you of missing high-ticket inventory.", icon: Box, imageGradient: "from-red-500 to-orange-500" },
            { title: "Kitchen Display (KDS)", desc: "Replace messy paper tickets. Your chefs get a digitized view of incoming orders, color-coded by wait times to prevent backed-up service.", icon: Monitor, imageGradient: "from-amber-400 to-orange-500" },
            { title: "Labor Cost Control", desc: "Full-service requires heavy staffing. Track hourly wages, tips declarations, and overtime risks to keep your labor costs under control.", icon: Users, imageGradient: "from-blue-500 to-indigo-500" },
            { title: "VIP Diner CRM", desc: "Remember what your VIP guests ordered last time, their wine preferences, and allergies automatically when reservations link to their mobile number.", icon: UserCircle, imageGradient: "from-cyan-400 to-emerald-400" },
            { title: "Cost of Goods Sold (COGS)", desc: "Map every ingredient in complex recipes to understand if that special steak dinner is actually yielding a profit after food costs.", icon: Target, imageGradient: "from-pink-500 to-rose-400" },
            { title: "Daily Sales Reports", desc: "End your night with an automated breakdown of sales, tips, comps, and voids emailed directly to your phone before you even leave.", icon: LineChart, imageGradient: "from-[#C3EB7A] to-[#4A90E2]" }
        ]
    },
    'bars': {
        headline: "Pour Profitably.",
        subheadline: "Bars move fast. High volume, high shrinkage. MochaEase keeps your bartenders pouring while locking down your inventory.",
        steps: [
            { title: "Lightning Fast Tabs", desc: "Swipe a credit card to open a pre-authorized tab in just 1 second. Keep the drinks flowing without making customers wait to close out.", icon: Zap, imageGradient: "from-purple-500 to-indigo-500" },
            { title: "Strict Alcohol Inventory", desc: "Track every pour. We map your cocktail recipes to deduct the exact ounces of liquor from your bottles, flagging over-pouring instantly.", icon: Box, imageGradient: "from-amber-500 to-orange-500" },
            { title: "Happy Hour Automation", desc: "Program complex pricing rules. 50% off drafts on Tuesdays at 5 PM? MochaEase automatically adjusts prices and switches them back when time is up.", icon: Target, imageGradient: "from-pink-500 to-rose-500" },
            { title: "Age Verification & Security", desc: "Prompt staff for ID checks on restricted items. Connect security cameras to POS hardware to monitor registers and prevent theft.", icon: ShieldAlert, imageGradient: "from-red-500 to-orange-500" },
            { title: "Split Payments & Tips", desc: "Drunken math at 2 AM is a bad idea. We auto-calculate massive group tabs and split them flawlessly, processing tips securely.", icon: Receipt, imageGradient: "from-emerald-500 to-teal-500" },
            { title: "Bouncer & Capacity Sync", desc: "Connect front door clickers to the POS to see real-time venue capacity against live bar sales to gauge spending per head.", icon: Ticket, imageGradient: "from-cyan-500 to-blue-500" },
            { title: "Staff Scheduling & Payroll", desc: "Manage bartenders, barbacks, and security. We automate shift bidding and calculate complex hourly wages and tip pooling.", icon: Users, imageGradient: "from-violet-500 to-purple-500" },
            { title: "Supplier Reordering", desc: "Running low on your best-selling IPA? Automate POs to your brewery reps every Monday morning based on weekend depletion.", icon: Truck, imageGradient: "from-blue-500 to-indigo-500" },
            { title: "Event Ticketing & VIP Tables", desc: "Sell VIP bottle service tables or event tickets online through MochaEase and seamlessly redeem them at the door or bar.", icon: Megaphone, imageGradient: "from-rose-500 to-pink-500" },
            { title: "Liquor Cost Analytics", desc: "Analyze your true pour cost percentage. Pinpoint exactly which liquors are losing you money through spillage or unauthorized comps.", icon: LineChart, imageGradient: "from-[#C3EB7A] to-[#4A90E2]" }
        ]
    },
    'food-trucks': {
        headline: "Scale Your Street Food.",
        subheadline: "Tight spaces, high heat, and huge lines. MochaEase gives your food truck enterprise-grade tech that fits in your pocket.",
        steps: [
            { title: "Mobile & Offline POS", desc: "Cell service dead at the festival? No problem. The MochaEase tablet POS runs fully offline and syncs the second you find a connection.", icon: Zap, imageGradient: "from-orange-500 to-amber-500" },
            { title: "Line Busting Handhelds", desc: "Take orders from people deep in the line using a handheld terminal, firing tickets to the truck window before they even reach the front.", icon: Smartphone, imageGradient: "from-blue-500 to-cyan-500" },
            { title: "Prep Kitchen Sync", desc: "Running a commissary kitchen? Track what you prepped centrally and sync it to the truck's inventory before you drive out for the day.", icon: Box, imageGradient: "from-emerald-500 to-teal-500" },
            { title: "Event Demand Predictor", desc: "We track historical data for local festivals to tell you exactly how much product to prep to avoid selling out or wasting food.", icon: Map, imageGradient: "from-rose-400 to-red-500" },
            { title: "Location Tweeting & CRM", desc: "Automatically blast SMS or WhatsApp messages to your loyal fans to let them know where you are parked today.", icon: Megaphone, imageGradient: "from-purple-500 to-pink-500" },
            { title: "Tap-to-Pay Processing", desc: "Built-in NFC allows customers to tap their phones or cards directly against the tablet—no bulky credit card readers required.", icon: Receipt, imageGradient: "from-cyan-400 to-blue-500" },
            { title: "Digital Menus & QR", desc: "Tape a QR code to the side of the truck. Customers order and pay on their phones, taking the pressure off your window staff.", icon: QrCode, imageGradient: "from-amber-400 to-orange-500" },
            { title: "Supplier Spend Tracking", desc: "Snap photos of receipts from your dawn trips to the wholesale market; our AI reads them and categorizes your daily food costs.", icon: FileText, imageGradient: "from-indigo-400 to-cyan-400" },
            { title: "Multi-Truck Management", desc: "Expanded to five trucks? See live sales from all of them on one dashboard and track which locations are vastly outperforming others.", icon: Globe, imageGradient: "from-fuchsia-500 to-pink-500" },
            { title: "Profit Margin Analytics", desc: "Determine your exact profit per taco or slider, adjusting for event parking fees and gasoline costs to find your true bottom line.", icon: LineChart, imageGradient: "from-[#C3EB7A] to-[#4A90E2]" }
        ]
    },
    'bakeries': {
        headline: "Rise to the Occasion.",
        subheadline: "Bakeries require incredible precision, early mornings, and strict shelf lives. Let MochaEase manage the math.",
        steps: [
            { title: "Production Planning AI", desc: "We analyze historical weather and day-of-week data to tell your bakers exactly how many croissants to bake at 4 AM.", icon: ChefHat, imageGradient: "from-amber-400 to-orange-500" },
            { title: "Strict Shelf-Life Tracking", desc: "Manage perishables flawlessly. Automatically discount day-old pastries via the POS or API-link to surplus food apps before they go bad.", icon: Box, imageGradient: "from-red-500 to-orange-500" },
            { title: "Custom Order Management", desc: "Handling complex, multi-tiered wedding cakes? Track detailed custom orders, accept deposits, and manage pickup dates securely.", icon: CalendarDays, imageGradient: "from-pink-500 to-rose-400" },
            { title: "Ingredient Cost Fluctuations", desc: "Butter prices skyrocketing? We track your wholesale supplier costs and alert you if your pastry margins slip below profitability.", icon: Target, imageGradient: "from-purple-500 to-indigo-500" },
            { title: "Wholesale & B2B Invoicing", desc: "Supply coffee shops around the city? Easily generate B2B invoices and set custom delivery routing for your wholesale clients.", icon: Truck, imageGradient: "from-blue-500 to-cyan-500" },
            { title: "Rapid POS & Weights", desc: "Integrate directly with counter scales to sell items by the kilo, checking out a massive morning rush in unparalleled speed.", icon: Zap, imageGradient: "from-emerald-500 to-teal-500" },
            { title: "Staff Scheduling", desc: "Ensure your late-night bakers and early-morning baristas are scheduled correctly without overlap, managing payroll effortlessly.", icon: Users, imageGradient: "from-indigo-400 to-blue-500" },
            { title: "Customer Loyalty", desc: "Implement digital punch cards. Sell 10 loaves of sourdough, give the 11th free, perfectly tracked via customer phone numbers.", icon: HeartHandshake, imageGradient: "from-fuchsia-500 to-pink-500" },
            { title: "Multi-Outlet Menus", desc: "Run a massive bakery chain? Update your seasonal tart offering or adjust pricing across 20 locations from one central dashboard.", icon: Globe, imageGradient: "from-cyan-400 to-emerald-400" },
            { title: "Wastage Analytics", desc: "See exactly what didn't sell today. Granular reports help you dial in production runs the next morning to virtually eliminate food waste.", icon: LineChart, imageGradient: "from-[#C3EB7A] to-[#4A90E2]" }
        ]
    },
    'fashion': {
        headline: "Sell More. Stress Less.",
        subheadline: "Whether you sell sneakers or streetwear, MochaEase is built to keep your shelves moving and your customers smiling.",
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
    'beauty': {
        headline: "Radiate Excellence.",
        subheadline: "From booking chairs to tracking products, running a beauty clinic is an art. Let MochaEase handle the science.",
        steps: [
            { title: "Local Footfall Insights", desc: "Understand your neighborhood's peak hours. Our AI helps you capture high-margin walk-ins when sidewalk footfall is strictly at its highest.", icon: Map, imageGradient: "from-purple-500 to-fuchsia-500" },
            { title: "Smart Appointments & Waitlists", desc: "A 24/7 online booking widget with automated SMS reminders that slashes costly no-show rates by up to 80%.", icon: CalendarDays, imageGradient: "from-cyan-400 to-blue-500" },
            { title: "Specialist Payroll & commission", desc: "Complex splits? Product vs Service payouts? We calculate your aestheticians' pay, manage schedules, and track attendance seamlessly.", icon: Users, imageGradient: "from-pink-500 to-rose-400" },
            { title: "Detailed Client Profiles", desc: "Store custom formulas, treatment history, and before/after photos so every single client visit feels like a VIP experience.", icon: UserCircle, imageGradient: "from-amber-400 to-orange-500" },
            { title: "Seamless Checkout & Expenses", desc: "Check out clients elegantly with split tips, while keeping a digital eye on your monthly rent, utility, and backbar supply expenses.", icon: Receipt, imageGradient: "from-blue-400 to-indigo-500" },
            { title: "Packages & Subscriptions", desc: "Boost your upfront cash flow by easily selling course packages (e.g., 5 facials for the price of 4) or recurring monthly VIP memberships.", icon: Ticket, imageGradient: "from-violet-500 to-fuchsia-500" },
            { title: "Retail & Supply Inventory", desc: "Track the costly serums you use at the backbar and sell at the front. Never run out of your essential treatment supplies.", icon: Box, imageGradient: "from-[#C3EB7A] to-green-500" },
            { title: "Marketing & Win-Backs", desc: "Automatically text clients who haven't booked a treatment in 8 weeks with a special 'we miss you' offer to keep calendars full.", icon: Megaphone, imageGradient: "from-rose-400 to-red-500" },
            { title: "Resource Optimization", desc: "Intelligent scheduling ensures a specialized treatment room or a specific laser machine is never accidentally double-booked by staff.", icon: Monitor, imageGradient: "from-indigo-400 to-cyan-400" },
            { title: "Service Profitability", desc: "Which treatments actually make you the most money? We analyze service time vs. product cost to help you prioritize your bottom line.", icon: LineChart, imageGradient: "from-[#C3EB7A] to-[#4A90E2]" }
        ]
    },
    'grocery': {
        headline: "High Volume. Perfect Control.",
        subheadline: "Ten thousand SKUs. Narrow margins. Endless foot traffic. MochaEase gives you the heavy-duty tech needed to run convenience retail.",
        steps: [
            { title: "Massive SKU Management", desc: "Easily import, categorize, and track over 50,000 unique SKUs. Manage barcodes, variants, and dynamic pricing across thousands of items effortlessly.", icon: Box, imageGradient: "from-emerald-500 to-green-500" },
            { title: "Lightning Fast Checkouts", desc: "Our POS interfaces with high-speed barcode scanners, scales, and customer-facing displays to dramatically reduce queue times.", icon: Zap, imageGradient: "from-amber-400 to-yellow-500" },
            { title: "Perishable Expiry Tracking", desc: "Say goodbye to spoiled milk. Log batch numbers and expiry dates to receive automated alerts before inventory goes bad, slashing waste.", icon: ShieldAlert, imageGradient: "from-red-500 to-orange-500" },
            { title: "Automated Reordering", desc: "Set minimum thresholds for fast-moving consumer goods. When water or snacks drop low, MooneyEase instantly emails your distributors.", icon: Truck, imageGradient: "from-blue-500 to-cyan-500" },
            { title: "Scale Integrations", desc: "Sell produce and deli meat flawlessly. The POS talks directly to your weight scales, calculating price per kg instantly without manual entry.", icon: Target, imageGradient: "from-fuchsia-500 to-purple-500" },
            { title: "E-Commerce & Delivery", desc: "Give your neighborhood an online storefront. Sync local inventory to your grocery app for click-and-collect or 15-minute local delivery.", icon: Globe, imageGradient: "from-indigo-500 to-blue-500" },
            { title: "Promotions & Multi-Buys", desc: "Set up 'Buy 1, Get 1 Free' or complex mix-and-match deals. The POS applies the discounts automatically at checkout to save cashiers time.", icon: Ticket, imageGradient: "from-pink-500 to-rose-400" },
            { title: "Staff Shift Management", desc: "From stockers to cashiers, manage complex rotating shifts. Secure till access ensures accountability for every single cent exchanged.", icon: Users, imageGradient: "from-cyan-400 to-emerald-400" },
            { title: "Wholesale Supplier Sync", desc: "Pay all your vendors from one dashboard. Track fluctuating wholesale prices of commodities like eggs and adjust your retail price accordingly.", icon: Receipt, imageGradient: "from-orange-500 to-red-500" },
            { title: "Category Profit Analytics", desc: "Know which aisles make you money. Find out if the snack aisle or fresh produce is driving your overall supermarket margin.", icon: LineChart, imageGradient: "from-[#C3EB7A] to-[#4A90E2]" }
        ]
    },
    'home': {
        headline: "Cater to Lifestyle.",
        subheadline: "Big items, diverse homeware sets, and delivery logistics. MochaEase provides the architecture lifestyle stores need.",
        steps: [
            { title: "Showroom to Warehouse Maps", desc: "Don't sell the display model. Sync your showroom POS to your offsite warehouse so staff can confidently sell items they don't physically have.", icon: Map, imageGradient: "from-amber-500 to-orange-500" },
            { title: "Complex Variant Tracking", desc: "Sofas in 12 colors and 3 fabrics? Manage extensive custom matrix configurations without confusing your staff or messing up orders.", icon: Box, imageGradient: "from-fuchsia-500 to-purple-500" },
            { title: "Custom Orders & Deposits", desc: "Take a 50% deposit for a custom-built dining table. MochaEase tracks the balance due upon delivery and triggers final payment automated links.", icon: Receipt, imageGradient: "from-emerald-500 to-teal-500" },
            { title: "White-Glove Delivery Routing", desc: "Organize your trucks. Route large furniture deliveries efficiently and send customers live SMS tracking links of your delivery crew.", icon: Truck, imageGradient: "from-blue-500 to-indigo-500" },
            { title: "Commission & Concierge", desc: "Incentivize your floor staff with tiered commissions based on the gross margin of the living room sets they successfully upsell.", icon: Users, imageGradient: "from-pink-500 to-rose-500" },
            { title: "Omnichannel Sync", desc: "Sync your massive furniture catalogs with Shopify. Keep stock accurately reflected online to capture weekend interior-design hunters.", icon: Globe, imageGradient: "from-cyan-500 to-blue-500" },
            { title: "Supplier Purchase Orders", desc: "Automatically generate massive international purchase orders to overseas manufacturers based on your quarterly sell-through rates.", icon: FileText, imageGradient: "from-slate-500 to-gray-500" },
            { title: "Clienteling & Wishlists", desc: "Help customers build entire room wishlists. Save them to their profile and send them an email when those items eventually go on sale.", icon: HeartHandshake, imageGradient: "from-rose-400 to-red-500" },
            { title: "Inventory Audits", desc: "Perform cycle counts of large warehouse goods using mobile barcode scanners to keep multi-million dollar inventory totally accurate.", icon: ShieldAlert, imageGradient: "from-orange-500 to-red-500" },
            { title: "True Profit Analytics", desc: "Analyze landed costs. We factor in shipping, customs, and warehousing to show you the true net profit of that imported armchair.", icon: LineChart, imageGradient: "from-[#C3EB7A] to-[#4A90E2]" }
        ]
    },
    'vape': {
        headline: "Compliance Meets Commerce.",
        subheadline: "Age verification, vast SKU variations, and strict regulations. MochaEase streamlines your vape or smoke shop operations.",
        steps: [
            { title: "Mandatory Age Verification", desc: "Turn on age-gates in the POS. Scanners read government IDs and instantly refuse checkout if the customer does not meet local regulations.", icon: Lock, imageGradient: "from-red-500 to-rose-500" },
            { title: "Infinite Flavor Variants", desc: "Manage thousands of flavors, nicotine strengths, and coil types without your database turning into a massive disaster.", icon: Box, imageGradient: "from-purple-500 to-indigo-500" },
            { title: "Compliance & Taxes", desc: "Automatically apply specific complex excise taxes and hardware taxes required by your state, entirely removing the manual math from checkout.", icon: Receipt, imageGradient: "from-emerald-500 to-teal-500" },
            { title: "Customer Loyalty Programs", desc: "Keep regulars away from the competition. Implement customized 'Buy 10 Juices, Get 1 Free' digital punch cards tied strictly to phone numbers.", icon: HeartHandshake, imageGradient: "from-cyan-500 to-blue-500" },
            { title: "Lightning Fast Scan POS", desc: "Your customers want to get in and out. Interface with rapid barcode scanners for 5-second transaction times at the counter.", icon: Zap, imageGradient: "from-amber-400 to-orange-500" },
            { title: "Automated Wholesale Reorders", desc: "Don't run out of bestsellers. MochaEase triggers an email to your distributor the second your popular disposable vapes drop below 50 units.", icon: Truck, imageGradient: "from-blue-500 to-cyan-500" },
            { title: "Mix-and-Match Deals", desc: "Build promotional bundles logically inside the POS (e.g., Any 3 tanks for $50) and let the system automatically apply the math transparently.", icon: Ticket, imageGradient: "from-pink-500 to-fuchsia-500" },
            { title: "Loss Prevention", desc: "Small items vanish easily. Perform granular blind stocktakes and link your security cameras to specific flagged POS transactions.", icon: ShieldAlert, imageGradient: "from-orange-500 to-red-500" },
            { title: "Multi-Store Inventory Check", desc: "If you're sold out of a coil, check your other locations instantly and complete the sale, having the item held for the customer.", icon: Map, imageGradient: "from-teal-500 to-emerald-500" },
            { title: "Product Margin Analytics", desc: "Know which juice lines actually pad your bank account. Drop the underperforming brands and double down on high-margin winners.", icon: LineChart, imageGradient: "from-[#C3EB7A] to-[#4A90E2]" }
        ]
    },
    'enterprise': {
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
    'multi-brand': {
        headline: "One Screen. Multiple Domains.",
        subheadline: "Running ghost kitchens, food halls, or massive hospitality groups? Command distinctly multiple brands entirely from one single login.",
        steps: [
            { title: "Unified Brand Dashboard", desc: "Toggle instantly between your taco brand and your pizza brand. Compare overall portfolio health without needing to log out of the system.", icon: Monitor, imageGradient: "from-indigo-500 to-violet-500" },
            { title: "Ghost Kitchen Routing", desc: "Operating 4 delivery brands from 1 kitchen? Route orders logically to specific prep stations so chefs know exactly which brand the meal is for.", icon: ChefHat, imageGradient: "from-rose-500 to-pink-500" },
            { title: "Aggregator Hub", desc: "Consolidate 15 different UberEats and DoorDash tablets into one singular screen to manage the inbound flow for your entire multi-brand portfolio.", icon: Smartphone, imageGradient: "from-cyan-500 to-blue-500" },
            { title: "Master Inventory Sharing", desc: "If both your burger joint and taco stand use the same tomatoes, the system deducts from a master shared warehouse seamlessly.", icon: Box, imageGradient: "from-emerald-500 to-teal-500" },
            { title: "Cross-Brand Staffing", desc: "A barista works at your coffee shop on Tuesday and your bar on Friday? Manage their schedule and blended payroll across different company entities.", icon: Users, imageGradient: "from-orange-500 to-amber-500" },
            { title: "White-Labeled Loyalty Apps", desc: "Deploy uniquely branded mobile apps for each of your entities, all powered identically by the same MochaEase backend systems.", icon: HeartHandshake, imageGradient: "from-fuchsia-500 to-purple-500" },
            { title: "Food Hall Kiosks", desc: "Let customers order sushi from Brand A and a burger from Brand B on the exact same self-serve kiosk in your food hall, splitting the revenue on the backend.", icon: Monitor, imageGradient: "from-blue-400 to-cyan-500" },
            { title: "Segregated Finances", desc: "Automate accounting to split out cost of goods sold, revenue, and taxes for each separate corporate entity flawlessly.", icon: Receipt, imageGradient: "from-red-500 to-orange-500" },
            { title: "Centralized Purchasing", desc: "Leverage your massive size. Order thousands of pounds of flour centrally and dispatch them to the various brands, massively reducing your COGS.", icon: Truck, imageGradient: "from-slate-500 to-gray-500" },
            { title: "Portfolio Analytics", desc: "Identify which restaurant concept is holding the matrix back. Make high-level decisions to kill sub-brands or expand the winners.", icon: LineChart, imageGradient: "from-[#C3EB7A] to-[#4A90E2]" }
        ]
    },
    'stadiums': {
        headline: "Handle The Halftime Rush.",
        subheadline: "Fifty thousand fans. 15 minutes. Pure chaos. MochaEase deploys the most robust, high-availability architecture to handle immense spikes.",
        steps: [
            { title: "Offline Resiliency", desc: "Stadium WiFi is notoriously awful. Our terminals operate fully local-first. We can process 100,000 transactions without touching the internet.", icon: ShieldAlert, imageGradient: "from-red-500 to-rose-500" },
            { title: "Self-Serve Beer Taps & Kiosks", desc: "Eliminate queues entirely. Fans authorize a card, pour their own drink, or use rapid self-serve concession kiosks to get back to the game.", icon: Zap, imageGradient: "from-amber-400 to-orange-500" },
            { title: "In-Seat Mobile Ordering", desc: "Let fans scan a QR code on their stadium seat to order hotdogs and beer. Route the ticket directly to the nearest localized concession runner.", icon: Smartphone, imageGradient: "from-blue-500 to-cyan-500" },
            { title: "Mass Scale Inventory", desc: "Running out of cups in Section 112? Shift managers get instant alerts on their mobile devices to restock specific stands before halftime.", icon: Box, imageGradient: "from-purple-500 to-fuchsia-500" },
            { title: "Hawker & Vendor Terminals", desc: "Strap ultra-lightweight, 5G-enabled handheld POS terminals to your walking vendors in the stands to take card payments flawlessly.", icon: Monitor, imageGradient: "from-emerald-500 to-teal-500" },
            { title: "Event Day Staffing", desc: "Hiring 500 temp workers for game day? Our system handles hyper-fast clock-ins via facial recognition or QR to process massive payrolls.", icon: Users, imageGradient: "from-indigo-500 to-blue-500" },
            { title: "VIP Suite Management", desc: "Provide a luxury experience. Track pre-ordered catering, open massive ongoing tabs, and assign dedicated VIP servers to box suites.", icon: Ticket, imageGradient: "from-rose-400 to-red-500" },
            { title: "Real-Time Flash Reporting", desc: "The GM can view a live dashboard showing overall stadium revenue per minute, breaking records in real time during massive touchdown moments.", icon: LineChart, imageGradient: "from-cyan-400 to-emerald-400" },
            { title: "Integrations & Ticketing", desc: "Connect the POS to Ticketmaster or native stadium apps to offer season ticket holder discounts seamlessly on concessions.", icon: LinkIcon, imageGradient: "from-orange-500 to-amber-500" },
            { title: "Post-Event Financials", desc: "End the night efficiently. Reconcile millions in revenue across 300 different concession stands instantaneously with automated financial auditing.", icon: Receipt, imageGradient: "from-[#C3EB7A] to-[#4A90E2]" }
        ]
    },
    'airports': {
        headline: "Speed Above All Else.",
        subheadline: "Travelers don't have time to wait when their flight is boarding. MochaEase powers travel retail with unparalleled speed and reliability.",
        steps: [
            { title: "Scan & Go Flight Boarding", desc: "Integrate boarding pass scanners at the POS. Automatically apply duty-free limits and track passenger destinations for strict compliance.", icon: Globe, imageGradient: "from-sky-400 to-blue-500" },
            { title: "Multi-Currency Payments", desc: "Accept USD, Euros, Yen, or crypto flawlessly. The POS handles rapid real-time currency conversions to keep international travelers moving.", icon: Receipt, imageGradient: "from-emerald-500 to-teal-500" },
            { title: "Grab-and-Go Kiosks", desc: "Deploy unstaffed self-checkout kiosks in busy terminals for magazines, water, and snacks, eliminating queue friction entirely.", icon: Zap, imageGradient: "from-orange-500 to-amber-500" },
            { title: "High-Security Logistics", desc: "Airports are heavily restricted. Track inventory deliveries meticulously to comply with extensive TSA and airport authority security audits.", icon: ShieldAlert, imageGradient: "from-red-500 to-rose-500" },
            { title: "Gate Delivery Optimization", desc: "Allow passengers to order a meal from the lounge app. Our system routes the ticket to the nearest kitchen and schedules a runner to the gate.", icon: Truck, imageGradient: "from-purple-500 to-indigo-500" },
            { title: "Concessionaire Reporting", desc: "Airport authorities demand a cut. Automatically compile and electronically transmit your mandatory daily gross revenue reports to the terminal operator.", icon: FileText, imageGradient: "from-slate-500 to-gray-500" },
            { title: "Flight Delay Surges", desc: "Flight grounded? Expect a surge. Our predictive AI warns managers of massive impending delays so they can quickly reallocate staff to the bar.", icon: Map, imageGradient: "from-amber-400 to-orange-500" },
            { title: "Vast Retail Franchising", desc: "Manage 30 different retail concepts in Terminal B globally from one central command center, normalizing the varied multi-brand data.", icon: Monitor, imageGradient: "from-cyan-500 to-blue-500" },
            { title: "Loyalty Airline Integration", desc: "Connect directly to frequent flier APIs, allowing passengers to effortlessly burn their airline miles to purchase a coffee or a sandwich.", icon: LinkIcon, imageGradient: "from-pink-500 to-rose-400" },
            { title: "Real-Time Passenger Spend", desc: "Calculate revenue per enplaned passenger (RPE). We merge POS data with flight manifests to show you the ultimate travel retail metrics.", icon: LineChart, imageGradient: "from-[#C3EB7A] to-[#4A90E2]" }
        ]
    }
};
