"use server"

import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';

/**
 * Server Action to handle contact form submissions.
 * It logs the message to Supabase and sends an email notification via Resend.
 */
export async function sendContactMessage(formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
}) {
    try {
        // 1. Log to Supabase (Backup)
        const { error: dbError } = await supabase
            .from('contact_messages')
            .insert([{
                name: formData.name,
                email: formData.email,
                subject: formData.subject || "No Subject",
                message: formData.message
            }]);

        if (dbError) {
            console.error("Supabase Log Error:", dbError);
            // We continue even if DB logging fails, to try and send the email
        }

        // 2. Send Email via Resend
        // If the RESEND_API_KEY is not set, this will fail gracefully handled by the catch block
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        const { error: mailError } = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: ['sujalsawardekar27@gmail.com'],
            subject: `New Portfolio Message: ${formData.subject}`,
            reply_to: formData.email,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${formData.name}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>Subject:</strong> ${formData.subject}</p>
                <br/>
                <p><strong>Message:</strong></p>
                <p style="white-space: pre-wrap;">${formData.message}</p>
            `,
        });

        if (mailError) {
            console.error("Resend Mail Error:", mailError);
            throw new Error("Failed to send email notification.");
        }

        return { success: true };
    } catch (error: any) {
        console.error("Contact Action Error:", error);
        return { 
            success: false, 
            error: error.message || "An unexpected error occurred." 
        };
    }
}
