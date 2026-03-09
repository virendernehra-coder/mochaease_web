import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { getBlogPostBySlug } from '@/data/blog';
import NetworkBackground from '@/components/NetworkBackground';
import { Clock, Calendar, ArrowLeft, BookOpen } from 'lucide-react';
import Link from 'next/link';

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

async function getPost(slug: string) {
    // Try Supabase first
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('blog_translations')
            .select(`
                id,
                slug_localized,
                title,
                excerpt,
                content_html,
                seo_description,
                seo_keywords,
                published_at,
                blogs!inner (
                    id,
                    featured_image,
                    author,
                    tags
                )
            `)
            .eq('slug_localized', slug)
            .eq('language_code', 'en')
            .eq('is_published', true)
            .single();

        if (!error && data) {
            const blog = Array.isArray(data.blogs) ? data.blogs[0] : data.blogs;
            const tags = (blog as { tags?: string[] })?.tags ?? [];
            return {
                title: data.title,
                excerpt: data.excerpt ?? '',
                content_html: data.content_html ?? '',
                seo_description: data.seo_description ?? data.excerpt ?? '',
                seo_keywords: data.seo_keywords ?? tags,
                featured_image: (blog as { featured_image?: string })?.featured_image ?? null,
                category: tags[0] ?? 'Product Updates',
                read_time: '5 min read',
                published_at: data.published_at ?? new Date().toISOString(),
                author: (blog as { author?: string })?.author ?? 'MochaEase Team',
                slug: data.slug_localized,
            };
        }
    } catch (err) {
        console.warn('Supabase article fetch failed, using static fallback:', err);
    }

    // Fall back to static data
    const staticPost = getBlogPostBySlug(slug);
    if (!staticPost) return null;

    // Convert markdown-style content to simple HTML paragraphs
    const content_html = staticPost.content
        .split('\n')
        .map((line) => {
            const t = line.trim();
            if (!t) return '';
            if (t.startsWith('## ')) return `<h2>${t.slice(3)}</h2>`;
            if (t.startsWith('### ')) return `<h3>${t.slice(4)}</h3>`;
            if (t.startsWith('* ') || t.startsWith('- ')) return `<li>${t.slice(2)}</li>`;
            return `<p>${t.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')}</p>`;
        })
        .join('\n');

    return {
        title: staticPost.title,
        excerpt: staticPost.excerpt,
        content_html,
        seo_description: staticPost.excerpt,
        seo_keywords: staticPost.keywords,
        featured_image: staticPost.coverImage,
        category: staticPost.category,
        read_time: staticPost.readTime,
        published_at: new Date(staticPost.date).toISOString(),
        author: staticPost.author,
        slug: staticPost.slug,
    };
}

// Dynamically generate SEO Metadata specific to this article
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        return { title: 'Post Not Found | MochaEase' };
    }

    const imageUrl = post.featured_image
        ? (post.featured_image.startsWith('http') ? post.featured_image : `https://mochaease.com${post.featured_image}`)
        : 'https://mochaease.com/blog/blog_ai_inventory_1773002441722.png';

    return {
        title: post.title,
        description: post.seo_description,
        keywords: post.seo_keywords,
        authors: [{ name: post.author }],
        openGraph: {
            title: post.title,
            description: post.seo_description,
            url: `https://mochaease.com/blog/${post.slug}`,
            siteName: 'MochaEase',
            images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }],
            type: 'article',
            publishedTime: new Date(post.published_at).toISOString(),
            authors: [post.author],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.seo_description,
            images: [imageUrl],
        },
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        notFound();
    }

    const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

    return (
        <main className="flex min-h-screen flex-col items-center overflow-x-hidden relative bg-[#050505] selection:bg-[#C3EB7A]/30">
            <NetworkBackground />
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
                            <Clock className="w-4 h-4" /> {post.read_time}
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
                                <Calendar className="w-3 h-3" /> Published on {formatDate(post.published_at)}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Immersive Cover Image */}
                {post.featured_image && (
                    <div className="w-full aspect-[21/9] rounded-[2rem] overflow-hidden mb-16 relative border border-white/10 shadow-2xl">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                )}


                {/* Premium Article Body */}
                <style>{`
                  .article-body {
                    font-size: 1.125rem;
                    line-height: 1.85;
                    color: rgba(255,255,255,0.72);
                    font-weight: 400;
                  }
                  .article-body h2 {
                    font-size: 1.875rem;
                    font-weight: 800;
                    color: #ffffff;
                    margin-top: 3.5rem;
                    margin-bottom: 1.25rem;
                    padding-bottom: 0.75rem;
                    border-bottom: 1px solid rgba(255,255,255,0.08);
                    letter-spacing: -0.02em;
                    line-height: 1.2;
                  }
                  .article-body h3 {
                    font-size: 1.375rem;
                    font-weight: 700;
                    color: rgba(255,255,255,0.9);
                    margin-top: 2.5rem;
                    margin-bottom: 0.875rem;
                    padding-left: 1rem;
                    border-left: 3px solid #C3EB7A;
                    line-height: 1.3;
                  }
                  .article-body p {
                    margin-bottom: 1.625rem;
                    color: rgba(255,255,255,0.68);
                    font-size: 1.125rem;
                    line-height: 1.85;
                  }
                  .article-body ul {
                    margin: 1.75rem 0 2rem 0;
                    padding: 0;
                    list-style: none;
                    display: flex;
                    flex-direction: column;
                    gap: 0.875rem;
                  }
                  .article-body li {
                    display: flex;
                    align-items: flex-start;
                    gap: 0.875rem;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 0.875rem;
                    padding: 1rem 1.25rem;
                    font-size: 1.0625rem;
                    color: rgba(255,255,255,0.7);
                    line-height: 1.65;
                  }
                  .article-body li::before {
                    content: "→";
                    color: #C3EB7A;
                    font-weight: 800;
                    font-size: 1rem;
                    flex-shrink: 0;
                    margin-top: 0.05rem;
                  }
                  .article-body strong {
                    color: #ffffff;
                    font-weight: 700;
                  }
                  .article-body em {
                    color: rgba(255,255,255,0.85);
                    font-style: italic;
                  }
                  .article-body a {
                    color: #4A90E2;
                    text-decoration: underline;
                    text-underline-offset: 3px;
                    transition: color 0.2s;
                  }
                  .article-body a:hover { color: #6AB0FF; }
                  .article-body blockquote {
                    margin: 2.5rem 0;
                    padding: 1.5rem 2rem;
                    background: rgba(195,235,122,0.05);
                    border-left: 4px solid #C3EB7A;
                    border-radius: 0 1rem 1rem 0;
                    font-size: 1.2rem;
                    font-style: italic;
                    color: rgba(255,255,255,0.8);
                  }
                  .article-body code {
                    background: rgba(255,255,255,0.08);
                    padding: 0.15rem 0.45rem;
                    border-radius: 0.35rem;
                    font-size: 0.9em;
                    color: #C3EB7A;
                    font-family: monospace;
                  }
                `}</style>
                <div
                    className="article-body max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content_html }}
                />


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
