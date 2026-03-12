// Migration script to move JOBS_DATA to Supabase job_postings table
// Run with: node --env-file=.env.local migrate_jobs.mjs

import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_ANON_KEY;

if (!url || !key) {
    console.error('❌ Error: SUPABASE_URL or SUPABASE_ANON_KEY not found in .env.local');
    process.exit(1);
}

const supabase = createClient(url, key);

// Current hardcoded data from Apply/Description pages
const JOBS_DATA = [
    {
        id: '1',
        title: 'Senior Backend Engineer (Go)',
        department: 'Engineering',
        location: 'Bengaluru / Remote',
        country: 'India',
        type: 'Full-time',
        level: 'Senior',
        salary: "$80k - $120k + Equity",
        mission: "We are building the backbone of global commerce. As a Senior Backend Engineer, you will own the architectural integrity of our high-concurrency transaction engine, ensuring sub-100ms latency for millions of businesses.",
        challenges: [
            "Scale our real-time inventory engine to handle 100k+ events/sec.",
            "Architect a truly offline-first synchronization protocol for edge devices.",
            "Implement robust AI-driven fraud detection at the transaction layer."
        ],
        requirements: [
            "5+ years of experience with Go or similar distributed systems languages.",
            "Deep understanding of PostgreSQL and Redis performance tuning.",
            "Experience with Kubernetes and high-scale cloud-native architecture.",
            "A 'get it done' mindset for critical commerce infrastructure."
        ],
        stack: ["Go (Golang)", "PostgreSQL", "Redis", "Kafka", "K8s"]
    },
    {
        id: '5',
        title: 'Enterprise Sales Manager (Remote)',
        department: 'Growth',
        location: 'Global / Remote',
        country: 'Remote',
        type: 'Full-time',
        level: 'Senior',
        salary: "$100k - $150k OTE + Equity",
        mission: "The Future of Commerce won't build itself, and it certainly won't sell itself. You are the vanguard, bringing MochaEase's neural network of commerce to global enterprise retailers and QSR chains.",
        challenges: [
            "Own the end-to-end sales cycle for high-value enterprise accounts.",
            "Partner with Product to influence the roadmap for global franchise needs.",
            "Build and maintain a high-velocity pipeline of strategic retail partners."
        ],
        requirements: [
            "8+ years in SaaS Enterprise Sales, ideally in Fintech or Retail Tech.",
            "Proven track record of closing high-6-figure deals.",
            "Deep network within the APAC or EMEA retail ecosystem.",
            "Exceptional storytelling and complex negotiation skills."
        ],
        stack: []
    },
    {
        id: '6',
        title: 'Enterprise Sales Manager (India)',
        department: 'Growth',
        location: 'Bengaluru / Mumbai',
        country: 'India',
        type: 'Full-time',
        level: 'Senior',
        salary: "Competitive INR + Tier 1 Equity",
        mission: "India is at the forefront of digital commerce. You will lead our expansion into Bharat's largest retail chains, replacing legacy fragments with one unified, AI-powered brain.",
        challenges: [
            "Drive adoption among India's top 100 retail conglomerates.",
            "Navigate complex regulatory and operational environments for local chains.",
            "Evangelize the 'Advantages' of AI-native POS over traditional legacy software."
        ],
        requirements: [
            "7+ years selling Enterprise Tech in the Indian market.",
            "Strong relationships with CXOs in Retail, F&B, or Hospitality.",
            "In-depth knowledge of GST and Indian commerce compliance.",
            "Agile, hungry, and ready to disrupt a legacy market."
        ],
        stack: []
    },
    {
        id: '7',
        title: 'Enterprise Sales Manager (Indonesia)',
        department: 'Growth',
        location: 'Jakarta / Remote',
        country: 'Indonesia',
        type: 'Full-time',
        level: 'Senior',
        salary: "Competitive Local + Global Equity",
        mission: "Indonesia's digital economy is exploding. You will be the face of MochaEase in Jakarta, helping the nation's rising brands digitize their entire supply chain using our high-end intelligence.",
        challenges: [
            "Building our presence in the Indonesian enterprise retail market.",
            "Working with local partners to integrate MochaEase into the local ecosystem.",
            "Structuring complex multi-site deals for expanding Indonesian franchises."
        ],
        requirements: [
            "5+ years selling Enterprise SaaS in Indonesia.",
            "Fluent in Bahasa Indonesia and English.",
            "Strong local network in Retail or F&B industries.",
            "Passion for building something from the ground up."
        ],
        stack: []
    }
];

async function migrate() {
    console.log('🚀 Starting Job Postings Migration...');

    for (const job of JOBS_DATA) {
        const slug = job.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

        const { data, error } = await supabase
            .from('job_postings')
            .upsert({
                title: job.title,
                slug: slug,
                department: job.department,
                location: job.location,
                type: job.type,
                level: job.level,
                description: job.mission,
                challenges: job.challenges,
                requirements: job.requirements,
                stack: job.stack,
                salary: job.salary,
                is_active: true
            }, { onConflict: 'slug' });

        if (error) {
            console.error(`❌ Failed to migrate: ${job.title}`, error.message);
        } else {
            console.log(`✅ Migrated: ${job.title} (slug: ${slug})`);
        }
    }

    console.log('\n🏁 Migration Complete!');
}

migrate();
