# Workflows n8n (import prêt)

## Workflow livré
- `portfolio-contact-agent-workflow.json`
  - Webhook unique: `/webhook/portfolio-contact`
  - Modes supportés: `contact`, `agent`, `voice`
  - Triage + IA (OpenAI) + routage notifications (Slack + Email + Notion si configurés)

### Déploiement
1. Ouvre n8n → Workflow → Import From File/JSON
2. Charge `portfolio-contact-agent-workflow.json`
3. Configure les identifiants:
   - `openAiApi` pour le nœud AI
   - `slackApi` pour les notifications
   - `gmailSmtp` ou `smtp` pour l'email
   - `notionApi` pour l'enregistrement des leads (optionnel)
4. Copie l'URL du webhook actif
5. Mets cette valeur dans la variable `N8N_WEBHOOK_URL` du site

### Appel côté site
- POST vers `/api/contact` pour le formulaire classique (`type: contact`)
- POST vers `/api/chat` pour le chatbot (payload minimal : `message`, `language`)
- Le point `/api/chat` envoie au webhook :
  - `type: agent`
  - `source: portfolio-chat`
  - `language`
  - `message`
  - `systemPrompt` et `profileContext` construits côté site

### Exemples payload

Contact:
```json
{
  "type": "contact",
  "name": "Alexia",
  "email": "alexia@example.com",
  "message": "Je souhaiterais démarrer une mission d’automatisation."
}
```

Chat agent:
```json
{
  "type": "agent",
  "name": "Alexia",
  "email": "alexia@example.com",
  "message": "Peux-tu auditer ce flux CI/CD ?"
}
```

Voix / appel:
```json
{
  "type": "voice",
  "name": "Système téléphonique",
  "phone": "+33600000000",
  "message": "Demande de rappel après 18h"
}
```
