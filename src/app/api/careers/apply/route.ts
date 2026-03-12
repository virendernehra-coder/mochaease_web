import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();

        const jobId = formData.get('jobId') as string;
        const jobTitle = formData.get('jobTitle') as string;
        const department = formData.get('department') as string;
        const fullName = formData.get('fullName') as string;
        const email = formData.get('email') as string;
        const linkedin = formData.get('linkedin') as string;
        const github = formData.get('github') as string;
        const portfolio = formData.get('portfolio') as string;
        const file = formData.get('file') as File;

        if (!jobId || !fullName || !email || !file) {
            return NextResponse.json(
                { success: false, error: 'Required mission data missing.' },
                { status: 400 }
            );
        }

        const supabase = await createClient();

        // 1. Upload Resume to Storage
        const fileExt = file.name.split('.').pop();
        const fileName = `${jobId}-${Date.now()}.${fileExt}`;

        const { data: storageData, error: storageError } = await supabase.storage
            .from('mochaease_job_applications')
            .upload(fileName, file);

        if (storageError) {
            console.error('------- MISSION FAILURE: STORAGE ERROR -------');
            console.error('Error Code:', (storageError as any).code);
            console.error('Error Message:', storageError.message);
            console.error('Bucket Name:', 'mochaease_job_applications');
            console.error('File Name:', fileName);
            console.error('-------------------------------------------');

            return NextResponse.json(
                { success: false, error: `Storage Error: ${storageError.message}` },
                { status: 500 }
            );
        }

        // 2. Get Public URL
        const { data: { publicUrl } } = supabase.storage
            .from('mochaease_job_applications')
            .getPublicUrl(fileName);

        // 3. Insert into job_applications table
        const { error: insertError } = await supabase
            .from('job_applications')
            .insert({
                job_id: jobId,
                job_title: jobTitle,
                department: department,
                full_name: fullName,
                email: email,
                linkedin_url: linkedin,
                github_url: github,
                portfolio_url: portfolio,
                resume_url: publicUrl
            });

        if (insertError) {
            console.error('Database Error:', insertError);
            return NextResponse.json(
                { success: false, error: 'Failed to record dossier in intelligence hub.' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, message: 'Dossier transmitted successfully.' });

    } catch (error) {
        console.error('Apply API Error:', error);
        return NextResponse.json(
            { success: false, error: 'Neural network timeout. Please try again.' },
            { status: 500 }
        );
    }
}
