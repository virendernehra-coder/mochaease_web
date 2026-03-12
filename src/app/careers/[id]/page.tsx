import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import JobDescriptionClient from './JobDescriptionClient';

export default async function JobDescriptionPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: job, error } = await supabase
        .from('job_postings')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !job) {
        console.error('Error fetching mission server-side:', error);
        return notFound();
    }

    const formattedJob = {
        id: job.id,
        title: job.title,
        department: job.department,
        location: job.location,
        type: job.type,
        level: job.level,
        salary: job.salary,
        mission: job.description,
        challenges: job.challenges as string[],
        requirements: job.requirements as string[],
        stack: job.stack as string[]
    };

    return <JobDescriptionClient job={formattedJob} />;
}
