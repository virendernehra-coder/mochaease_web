import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, BLOG_POSTS } from '@/data/blog';
import NetworkBackground from '@/components/NetworkBackground';
import { Clock, Calendar, ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

// Generate static parameters for all known blog posts at build time
export function generateStaticParams() {
    return BLOG_POSTS.map((post) => ({
        slug: post.slug,
    }));
}

// Dynamically generate SEO Metadata specific to this article
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getBlogPostBySlug(slug);

    if (!post) {
        return { title: 'Post Not Found | MochaEase' };
    }

    const imageUrl = `https://mochaease.com${post.coverImage}`;

    return {
        title: post.title,
        description: post.excerpt,
        keywords: post.keywords,
        authors: [{ name: post.author }],
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: `https://mochaease.com/blog/${post.slug}`,
            siteName: 'MochaEase',
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
            type: 'article',
            publishedTime: new Date(post.date).toISOString(),
            authors: [post.author]
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: [imageUrl],
        },
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = getBlogPostBySlug(slug);

    if (!post) {
        notFound();
    }

    // Split markdown-style string into paragraphs or headers for rendering
    const renderContent = (contentString: string) => {
        return contentString.split('\n').map((line, index) => {
            const trimmedLine = line.trim();
            if (!trimmedLine) return null;

            if (trimmedLine.startsWith('## ')) {
                return <h2 key={index} className="text-3xl font-bold text-white mt-12 mb-6">{trimmedLine.replace('## ', '')}</h2>;
            }
            if (trimmedLine.startsWith('### ')) {
                return <h3 key={index} className="text-2xl font-bold text-white/90 mt-10 mb-4">{trimmedLine.replace('### ', '')}</h3>;
            }
            if (trimmedLine.startsWith('*   ') || trimmedLine.startsWith('-   ') || /^\d+\.\s/.test(trimmedLine)) {
                // Render list items with slight formatting
                const text = trimmedLine.replace(/^(\*   |-   |\d+\.\s)/, '');

                const parts = text.split(/(\*\*.*?\*\*)/).map((part, i) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={i} className="text-white font-bold">{part.replace(/\*\*/g, '')}</strong>;
                    }
                    return part;
                });

                return (
                    <div key={index} className="flex gap-4 mb-4">
                        <span className="text-[#C3EB7A]">●</span>
                        <p className="text-lg text-white/70 leading-relaxed font-medium">{parts}</p>
                    </div>
                );
            }

            // Render emphasized text (e.g., italics)
            if (trimmedLine.startsWith('*') && trimmedLine.endsWith('*')) {
                return <p key={index} className="text-xl text-white/60 italic my-8 border-l-2 border-[#4A90E2] pl-6 py-2">{trimmedLine.replace(/\*/g, '')}</p>
            }

            // Render bold text formatting
            const parts = trimmedLine.split(/(\*\*.*?\*\*)/).map((part, i) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={i} className="text-white font-bold">{part.replace(/\*\*/g, '')}</strong>;
                }
                return part;
            });

            return <p key={index} className="text-xl text-white/70 leading-relaxed mb-6 font-medium">{parts}</p>;
        });
    };

    return (
        <main className="flex min-h-screen flex-col items-center overflow-x-hidden relative bg-[#050505] selection:bg-[#C3EB7A]/30">
            <NetworkBackground />

            {/* Dark wash to read text clearly */}
            <div className="absolute inset-0 bg-black/40 xl:bg-black/60 z-0 pointer-events-none" />

            <article className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-24 flex flex-col z-10">
                {/* Back Navigation */}
                <Link href="/blog" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-12 group w-max">
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-wider">Back to Journal</span>
                </Link>

                {/* Article Header */}
                <header className="mb-16">
                    <div className="flex flex-wrap items-center gap-4 mb-8">
                        <span className="px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-bold border border-white/10 uppercase tracking-widest">{post.category}</span>
                        <div className="flex items-center gap-2 text-[#C3EB7A] text-sm font-bold bg-[#C3EB7A]/10 px-4 py-1.5 rounded-full border border-[#C3EB7A]/20">
                            <Clock className="w-4 h-4" /> {post.readTime}
                        </div>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-black text-white mb-8 leading-[1.1] tracking-tight">
                        {post.title}
                    </h1>

                    <p className="text-2xl text-white/60 font-medium leading-relaxed max-w-3xl mb-10">
                        {post.excerpt}
                    </p>

                    <div className="flex items-center gap-4 pt-8 border-t border-white/10">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4A90E2] to-[#357ABD] flex items-center justify-center border border-white/20 shadow-[0_0_15px_rgba(74,144,226,0.2)]">
                            <span className="text-white font-bold text-lg">{post.author.charAt(0)}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white font-bold">{post.author}</span>
                            <div className="flex items-center gap-1 text-white/40 text-sm">
                                <Calendar className="w-3 h-3" /> Published on {post.date}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Immersive Cover Image */}
                <div className="w-full aspect-[21/9] rounded-[2rem] overflow-hidden mb-16 relative border border-white/10 shadow-2xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                {/* Article Body */}
                <div className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-a:text-[#4A90E2] hover:prose-a:text-[#6AB0FF] prose-strong:text-white prose-p:text-white/75">
                    {renderContent(post.content)}
                </div>

                {/* Share & Engage Footer */}
                <div className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <span className="text-white/50 font-bold uppercase tracking-wider text-sm">Share this article:</span>
                        <a href={`https://twitter.com/intent/tweet?url=https://mochaease.com/blog/${post.slug}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#4A90E2]/20 hover:text-[#4A90E2] transition-colors text-white">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
                        </a>
                        <a href={`https://www.linkedin.com/shareArticle?mini=true&url=https://mochaease.com/blog/${post.slug}&title=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#4A90E2]/20 hover:text-[#4A90E2] transition-colors text-white">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"></path></svg>
                        </a>
                        <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + ' - https://mochaease.com/blog/' + post.slug)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#25D366]/20 hover:text-[#25D366] transition-colors text-white">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.031 0C5.394 0 0 5.394 0 12.031c0 2.113.551 4.183 1.597 6.004L0 24l6.126-1.564A11.97 11.97 0 0012.031 24c6.634 0 12.028-5.394 12.028-12.031S18.665 0 12.031 0zM12.03 22.016c-1.768 0-3.504-.452-5.045-1.306l-.361-.202-3.754.958.988-3.662-.222-.353a9.982 9.982 0 01-1.524-5.32c0-5.526 4.496-10.021 10.022-10.021s10.021 4.495 10.021 10.021-4.495 10.021-10.021 10.021zm5.548-7.55c-.304-.152-1.796-.887-2.074-.988-.278-.102-.482-.152-.685.152-.203.304-.786.988-.963 1.19-.178.203-.356.228-.66.076-1.503-.733-2.618-1.464-3.628-3.197-.209-.356.205-.331.642-1.201.076-.152.038-.28-.019-.431-.057-.152-.686-1.65-.94-2.261-.247-.594-.497-.514-.686-.523-.178-.009-.38-.012-.584-.012-.203 0-.533.076-.812.381-.279.305-1.066 1.041-1.066 2.539 0 1.498 1.091 2.946 1.243 3.149.153.203 2.148 3.28 5.204 4.598 2.053.882 2.842.94 3.961.788 1.258-.171 3.515-1.436 4.008-2.823.493-1.388.493-2.576.341-2.823-.153-.247-.559-.395-.863-.547z" clipRule="evenodd"></path></svg>
                        </a>
                    </div>

                    <Link href="/blog" className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 text-white font-bold hover:bg-white/20 transition-colors border border-white/10">
                        <BookOpen className="w-4 h-4" />
                        Explore More Articles
                    </Link>
                </div>
            </article>
        </main>
    );
}
