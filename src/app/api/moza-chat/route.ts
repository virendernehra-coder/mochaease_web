import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { MOZA_SYSTEM_PROMPT } from '@/data/moza-knowledge';
import { getPricingPlans } from '@/utils/supabase/queries';

export const dynamic = 'force-dynamic';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function POST(request: Request) {
    try {
        if (!GEMINI_API_KEY) {
            return NextResponse.json(
                { error: 'Gemini API key not configured' },
                { status: 500 }
            );
        }

        const { messages } = await request.json();

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return NextResponse.json(
                { error: 'Messages array is required' },
                { status: 400 }
            );
        }

        // Fetch dynamic pricing
        const plans = await getPricingPlans();

        // Format pricing for the AI
        let pricingContextString = '';
        if (plans && plans.length > 0) {
            // Group by tier
            const tiers = ['MochaLite', 'MochaCore', 'MochaMax'];
            tiers.forEach(tier => {
                pricingContextString += `\n### ${tier}\n`;
                const tierPlans = plans.filter(p => p.plan_name === tier);

                // Group by currency (USD, INR, IDR)
                const currencies = ['USD', 'INR', 'IDR'];
                currencies.forEach(currency => {
                    const monthly = tierPlans.find(p => p.currency === currency && p.billing_cycle === 'monthly');
                    const yearly = tierPlans.find(p => p.currency === currency && p.billing_cycle === 'yearly');

                    if (monthly && yearly) {
                        pricingContextString += `- ${currency}: ${monthly.price}/mo (Monthly plan) OR ${yearly.price}/mo (Annual plan)\n`;
                    }
                });
            });
        } else {
            pricingContextString = '*Pricing data is currently unavailable. Please ask the user to check mochaease.com/pricing for Live Prices.*';
        }

        const injectedPrompt = MOZA_SYSTEM_PROMPT.replace('[DYNAMIC_PRICING_INJECTED_HERE]', pricingContextString);

        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.0-flash',
            systemInstruction: injectedPrompt,
        });

        // Build history from previous messages (exclude the last user message)
        const history = messages.slice(0, -1).map((msg: { role: string; text: string }) => ({
            role: msg.role === 'ai' ? 'model' : 'user',
            parts: [{ text: msg.text }],
        }));

        const chat = model.startChat({ history });

        // Send the latest user message
        const lastMessage = messages[messages.length - 1];
        const result = await chat.sendMessage(lastMessage.text);
        const response = result.response.text();

        return NextResponse.json({ reply: response });
    } catch (error: unknown) {
        console.error('Moza chat error:', error);
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json(
            { error: 'Failed to get response from Moza', details: message },
            { status: 500 }
        );
    }
}
