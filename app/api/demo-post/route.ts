import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { content, language } = await req.json();

    if (!content || typeof content !== 'string' || !content.trim()) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    if (content.length > 280) {
      return NextResponse.json({ error: 'Content too long (max 280 characters)' }, { status: 400 });
    }

    const webhookUrl = process.env.N8N_X_POST_WEBHOOK_URL;

    if (!webhookUrl) {
      return NextResponse.json({ unconfigured: true }, { status: 200 });
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        content: content.trim(),
        language: language || 'en',
        source: 'portfolio-demo',
      }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok || !data) {
      return NextResponse.json({ error: 'Workflow failed to respond' }, { status: 500 });
    }

    // n8n returns 422 when content is rejected by AI
    if (response.status === 422 || data.error) {
      return NextResponse.json({ error: data.error || 'Content rejected by AI' }, { status: 422 });
    }

    return NextResponse.json({
      success: true,
      url: data.url || data.tweet_url || data.link || null,
    });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
