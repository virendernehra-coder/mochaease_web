import { createClient } from '@/utils/supabase/server';
import CareersClient from './CareersClient';

export default async function CareersPage() {
    const supabase = await createClient();

    const { data: jobs, error } = await supabase
        .from('job_postings')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching missions server-side:', error);
    }

    return <CareersClient initialJobs={(jobs as any[]) || []} />;
}
