import { NextRequest, NextResponse } from 'next/server';

type ContactPayload = {
  type?: string;
  name?: string;
  email?: string;
  message?: string;
  question?: string;
  language?: string;
  source?: string;
  [key: string]: unknown;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactPayload;
    const webhookUrl = process.env.N8N_WEBHOOK_URL;

    if (!webhookUrl) {
      return NextResponse.json(
        {
          error:
            'Variable d’environnement N8N_WEBHOOK_URL manquante. Configure-la dans .env.local',
        },
        { status: 500 },
      );
    }

    const normalizedPayload: ContactPayload = {
      ...body,
      type: body.type || 'contact',
      source: body.source || 'portfolio',
      receivedAt: new Date().toISOString(),
    };

    const n8nResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(normalizedPayload),
    });

    if (!n8nResponse.ok) {
      const details = await n8nResponse.text();
      return NextResponse.json(
        { error: 'Le workflow n8n n’a pas répondu correctement', details },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Payload invalide' }, { status: 400 });
  }
}
