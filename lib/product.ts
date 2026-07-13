export interface InputField {
  key: string
  label: string
  type: 'input' | 'textarea' | 'select'
  placeholder?: string
  options?: string[]
}

export const PRODUCT = {
  name: "Dunner",
  slug: "invoice-reminder",
  tagline: "Chase late invoices without the awkwardness",
  description: "Enter client, amount, days overdue and tone; get 3 ready-to-send reminder emails that stay professional. For freelancers who hate asking for money.",
  toolTitle: "Write reminders",
  resultLabel: "Your reminders",
  ctaLabel: "Generate reminders",
  features: [
  "3 tones",
  "Professional copy",
  "Copy-ready",
  "No awkwardness"
],
  inputs: [
  {
    "key": "client",
    "label": "Client name",
    "type": "input",
    "placeholder": "e.g. Acme Co"
  },
  {
    "key": "amount",
    "label": "Amount owed",
    "type": "input",
    "placeholder": "$1,200"
  },
  {
    "key": "days",
    "label": "Days overdue",
    "type": "input",
    "placeholder": "14"
  },
  {
    "key": "tone",
    "label": "Tone",
    "type": "select",
    "options": [
      "Friendly",
      "Firm",
      "Final"
    ]
  }
] as InputField[],
  systemPrompt: "You are a freelance finance coach. Given client, amount, days overdue, and tone, write a professional reminder email. Keep it non-confrontational; escalate only with Final tone.",
  pricing: [
  {
    "tier": "Free",
    "price": "$0",
    "desc": "Unlimited"
  },
  {
    "tier": "Pro",
    "price": "$9/mo",
    "desc": "Sequences, history"
  },
  {
    "tier": "Team",
    "price": "$29/mo",
    "desc": "Brand voice, API"
  }
],
  mock: (inputs: Record<string, string>): string => {
  const client = inputs['client'] || 'Client'
  const amt = inputs['amount'] || '$0'
  const days = inputs['days'] || '0'
  const tone = inputs['tone'] || 'Friendly'
  const base = [
    'Hi ' + client + ', just a gentle nudge - invoice for ' + amt + ' is ' + days + ' days out. No rush, just want to keep our books tidy. Thanks!',
    'Hi ' + client + ', following up on the ' + amt + ' invoice (' + days + ' days). Let me know if anything is stuck on your end and I will resend the link.',
    'Hi ' + client + ', final reminder: ' + amt + ' is now ' + days + ' days overdue. Please settle at your earliest convenience so we can keep working together smoothly.'
  ]
  const idx = tone === 'Final' ? 2 : tone === 'Firm' ? 1 : 0
  return 'REMINDER (' + tone + ') for ' + client + '\n\n' + base[idx] + '\n\n--- (Mock draft. Add OPENAI_API_KEY for tone-tuned, multi-thread sequences.)'
}
}
