import { NextRequest, NextResponse } from 'next/server';

import { getContent, Language, profile } from '@/data/portfolioData';

type ChatPayload = {
  message?: string;
  language?: Language;
  [key: string]: unknown;
};

const buildProfileContext = (language: Language) => {
  const content = getContent(language);
  const projectTitles = content.projects.items
    .map((item) => `- ${item.title} : ${item.description}`)
    .join('\n');
  const skillsByCategory = content.skills.categories
    .map((category) => `- ${category.title} : ${category.items.join(', ')}`)
    .join('\n');

  return JSON.stringify({
    profile: {
      name: profile.name,
      role: content.hero.role,
      email: profile.email,
      github: profile.github,
      linkedin: profile.linkedin,
    },
    about: {
      title: content.about.title,
      intro: content.about.intro,
      positioning: content.about.positioning,
      mission: content.about.missionStatement,
      values: content.about.valueProps,
    },
    skills: skillsByCategory,
    projects: projectTitles,
      process: content.method.steps.map((step) => `- ${step.title} : ${step.description}`).join('\n'),
    language,
  });
};

const normalizeLanguage = (value?: string): Language =>
  value === 'fr' ? 'fr' : 'en';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ChatPayload;
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

    const message = typeof body.message === 'string' ? body.message.trim() : '';
    if (!message) {
      return NextResponse.json({ error: 'message requis' }, { status: 400 });
    }

    const language = normalizeLanguage(body.language);
    const profileContext = buildProfileContext(language);
    const systemPrompt =
      language === 'fr'
        ? `Tu es ALexOps, assistant du portfolio de ${profile.name}. Réponds uniquement sur son profil professionnel, ses compétences, méthodes, projets, expériences et prestations. Réponds en français, de façon concise, claire et actionnable. Si la question sort du profil, réponds poliment en restant centré.e sur ce qui concerne son activité.`
        : `You are ALexOps, the portfolio assistant for ${profile.name}. Answer only about his/her professional profile, skills, methods, projects, and services. Respond briefly, clearly, and practically in English. If the question is outside this profile, politely redirect to profile-related topics.`;

    const payload = {
      ...body,
      type: 'agent',
      source: 'portfolio-chat',
      language,
      profileContext,
      systemPrompt,
    };

    const n8nResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responsePayload = await n8nResponse
      .json()
      .catch(async () => ({ raw: await n8nResponse.text() }));

    if (!n8nResponse.ok) {
      return NextResponse.json(
        { error: 'Le workflow n8n n’a pas répondu correctement', details: responsePayload },
        { status: 502 },
      );
    }

    return NextResponse.json(responsePayload);
  } catch {
    return NextResponse.json({ error: 'Payload invalide' }, { status: 400 });
  }
}
