'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function submitApplication(formData: FormData) {
    const supabase = await createClient();

    const jobId = formData.get('job_id') as string;
    const jobTitle = formData.get('job_title') as string;
    const department = formData.get('department') as string;
    const fullName = formData.get('full_name') as string;
    const email = formData.get('email') as string;
    const linkedinUrl = formData.get('linkedin_url') as string;
    const githubUrl = formData.get('github_url') as string;
    const portfolioUrl = formData.get('portfolio_url') as string;
    const resumeUrl = formData.get('resume_url') as string;

    const { error } = await supabase
        .from('job_applications')
        .insert([
            {
                job_id: jobId,
                job_title: jobTitle,
                department: department,
                full_name: fullName,
                email: email,
                linkedin_url: linkedinUrl,
                github_url: githubUrl,
                portfolio_url: portfolioUrl,
                resume_url: resumeUrl,
                status: 'pending'
            }
        ]);

    if (error) {
        console.error('Submission error:', error);
        return { success: false, error: error.message };
    }

    revalidatePath(`/careers/${jobId}`);
    return { success: true };
}
