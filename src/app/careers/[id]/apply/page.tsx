import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import ApplyClient from './ApplyClient';

export default async function ApplyPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();

    // Fetch basic job context server-side for security and validation
    const { data: job, error } = await supabase
        .from('job_postings')
        .select('id, title, department')
        .eq('id', id)
        .single();

    if (error || !job) {
        return notFound();
    }

    return <ApplyClient initialJob={job} />;
}
