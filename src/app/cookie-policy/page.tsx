import NetworkBackground from '@/components/NetworkBackground';
import { ShieldCheck, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function CookiePolicy() {
    return (
        <main className="flex min-h-screen flex-col bg-[#050505] selection:bg-[#C3EB7A]/30">
            <NetworkBackground />

            {/* Top Gradient */}
            <div className="fixed top-0 w-full h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#4A90E2]/10 via-[#050505]/40 to-transparent pointer-events-none -z-0" />

            {/* Header Content */}
            <section className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 pt-40 pb-12 z-10 flex flex-col items-center text-center">
                <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-[#4A90E2]/20 to-transparent border border-[#4A90E2]/30 mb-8 backdrop-blur-md">
                    <ShieldCheck className="w-8 h-8 text-[#4A90E2]" />
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                    Cookie Policy
                </h1>
                <p className="text-white/60 text-lg md:text-xl max-w-2xl">
                    Detailed insights into how MochaEase utilizes cookies, tracking technologies, and session data to optimize your platform experience.
                </p>
                <div className="mt-8 flex items-center justify-center gap-2 text-sm font-medium text-white/40">
                    <span>Effective Date: November 15, 2024</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 mx-2" />
                    <span>Last Updated: February 28, 2025</span>
                </div>
            </section>

            {/* Document Content */}
            <section className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 pb-32 z-10">
                <div className="bg-[#1A1A1A]/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-12 lg:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                    <div className="prose prose-invert prose-lg max-w-none">
                        <p>
                            At MochaEase Tech Private Limited ("MochaEase", "we", "us", or "our"), we use cookies and similar tracking technologies across our website and point-of-sale platform applications to enhance your experience, analyze performance, and ensure our systems function properly. This Cookie Policy explains what cookies are, how we use them, and your choices regarding their usage.
                        </p>

                        <h3 className="text-2xl font-bold text-white mt-12 mb-4">1. What Are Cookies?</h3>
                        <p>
                            Cookies are small text files stored on your browser or device when you visit a website or use an application. They allow the server to remember your actions and preferences (such as login credentials, language, font size, and other display preferences) over a period of time, so you don't have to keep re-entering them whenever you come back to the site or browse from one page to another.
                        </p>

                        <h3 className="text-2xl font-bold text-white mt-12 mb-4">2. Types of Cookies We Use</h3>
                        <p>
                            We utilize the following classifications of cookies on our platform:
                        </p>
                        <ul className="space-y-4 my-6">
                            <li className="flex gap-4">
                                <span className="text-[#C3EB7A] font-bold shrink-0">A.</span>
                                <div>
                                    <strong className="text-white">Strictly Necessary Cookies:</strong>
                                    <p className="text-white/70 mt-1">These are essential for the MochaEase POS platform to function. They include cookies that enable you to log into secure areas of our systems, process transactions, and utilize the core terminal functionality. Without these, the service cannot be provided.</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <span className="text-[#C3EB7A] font-bold shrink-0">B.</span>
                                <div>
                                    <strong className="text-white">Performance & Analytics Cookies:</strong>
                                    <p className="text-white/70 mt-1">We utilize these to recognize and count the number of visitors and see how users move around our website when they are using it. This helps us improve the way our platform works, for example, by ensuring that users find what they are looking for easily.</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <span className="text-[#C3EB7A] font-bold shrink-0">C.</span>
                                <div>
                                    <strong className="text-white">Functionality Cookies:</strong>
                                    <p className="text-white/70 mt-1">Used to recognize you when you return to our website. This enables us to personalize our content for you, greet you by name, and remember your preferences (such as your platform region or language).</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <span className="text-[#C3EB7A] font-bold shrink-0">D.</span>
                                <div>
                                    <strong className="text-white">Targeting/Advertising Cookies:</strong>
                                    <p className="text-white/70 mt-1">These cookies record your visit to our website, the pages you have visited, and the links you have followed. We use this information to make our website and the advertising displayed on it more relevant to your interests.</p>
                                </div>
                            </li>
                        </ul>

                        <h3 className="text-2xl font-bold text-white mt-12 mb-4">3. Third-Party Cookies</h3>
                        <p>
                            In some special cases, we also use cookies provided by trusted third parties. For example, we use Google Analytics to help us understand how you use the site and ways that we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit so we can continue to produce engaging content.
                        </p>
                        <p>
                            We also use social media buttons and/or plugins on this site that allow you to connect with your social network in various ways. For these to work, social networks including LinkedIn, Instagram, and Twitter will set cookies through our site.
                        </p>

                        <h3 className="text-2xl font-bold text-white mt-12 mb-4">4. Managing Your Cookie Preferences</h3>
                        <p>
                            You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website—specifically the MochaEase merchant dashboard and operational POS terminals—may be severely restricted or entirely broken.
                        </p>
                        <p>
                            To learn how to manage cookies on popular browsers, please visit the help pages of your specific browser (e.g., Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge).
                        </p>

                        <h3 className="text-2xl font-bold text-white mt-12 mb-4">5. Updates and Contact</h3>
                        <p>
                            We may update this Cookie Policy from time to time in order to reflect changes to the cookies we use or for other operational, legal, or regulatory reasons. Please revisit this page regularly to stay informed about our use of cookies and related technologies.
                        </p>
                        <p>
                            If you have questions regarding this policy, please reach out to our privacy compliance team via our <Link href="/support" className="text-[#4A90E2] hover:text-[#C3EB7A] transition-colors underline underline-offset-4">Support Center</Link>.
                        </p>
                    </div>
                </div>

                <div className="mt-12 flex justify-center">
                    <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 hover:border-white/30 transition-all group">
                        <ChevronRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" />
                        Return to Homepage
                    </Link>
                </div>
            </section>
        </main>
    );
}
