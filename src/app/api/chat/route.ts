import { NextRequest, NextResponse } from 'next/server';
import { solveActuarialProblem } from '@/lib/sympy';
import { router } from '@/lib/router';
import { checkRateLimit, getClientIp, handleAPIError, sendSecurityHeaders } from '@/lib/api';

export async function POST(req: NextRequest) {
    try {
        // Rate limiting: 30 requests per minute per IP
        const ip = getClientIp(req);
        const { allowed } = checkRateLimit(ip, 30, 60000);
        if (!allowed) {
            return sendSecurityHeaders(
                NextResponse.json(
                    { error: 'Too many requests. Please slow down.' },
                    { status: 429 }
                )
            );
        }

        const { message, history, mode } = await req.json();

        // Input validation
        if (!message || typeof message !== 'string') {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }
        if (message.length > 5000) {
            return NextResponse.json({ error: 'Message too long. Maximum 5000 characters.' }, { status: 400 });
        }

        // Connect to Router (Sprint 3)
        // Pass mode ('study' or 'tutor')
        const routerResult = await router.process(message, mode || 'study');

        // If Hybrid/Conceptual, attach graph context to response
        const graphData = routerResult.graph_context ? routerResult.graph_context : null;

        return sendSecurityHeaders(NextResponse.json({
            role: 'assistant',
            content: routerResult.content || `According to ${routerResult.source} derived for your query: "${message}"`,
            steps: routerResult.steps,
            final_answer: routerResult.final_answer,
            citations: [
                { source: routerResult.source, page: 42, confidence: 0.95 }
            ],
            graph_context: graphData // New output for Frontend Graph Visualizer
        }));

    } catch (error) {
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }
}
