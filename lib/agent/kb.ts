import type { KbEntry } from "../support-kit/types";
export type { KbEntry };

export const KB: KbEntry[] = [
  {
    id: "what",
    title: "What Dunner does",
    keywords: ["Dunner", "invoice-reminder", "what", "product", "about", "Chase late invoices without the awkwardness"],
    body: "Chase late invoices without the awkwardness. Dunner writes 3 professional reminder emails to chase late invoices from a client, amount, and days overdue — so freelancers ask for money without the awkwardness.",
    source: "Dunner product definition",
    tags: [],
  },
  {
    id: "features",
    title: "Dunner features",
    keywords: ["features", "feature", "can", "does", "3 tones", "Professional copy", "Copy-ready", "No awkwardness"],
    body: "Dunner includes: 3 tones; Professional copy; Copy-ready; No awkwardness. It does not add capabilities that are not listed here.",
    source: "Dunner feature list",
    tags: [],
  },
  {
    id: "pricing",
    title: "Dunner pricing",
    keywords: ["price", "pricing", "plan", "cost", "billing", "subscription", "monthly", "yearly"],
    body: "Listed prices for Dunner: $19/month and $190/year. Checkout uses the in-app checkout route. This assistant cannot change a subscription or issue a refund.",
    source: "Dunner pricing fields",
    tags: [],
  },
  {
    id: "howto",
    title: "How to use Dunner",
    keywords: ["how", "start", "use", "tool", "run", "Write reminders"],
    body: "Open Dunner and use Write reminders. The form asks for: Client name; Amount owed; Days overdue; Tone.",
    source: "Dunner tool fields",
    tags: [],
  },
  {
    id: "faq-1",
    title: "What is Dunner?",
    keywords: ["What", "is", "Dunner?"],
    body: "A tool that writes 3 professional reminder emails to chase late invoices from a client, amount, and days overdue.",
    source: "Dunner FAQ",
    tags: [],
  },
  {
    id: "faq-2",
    title: "How many reminders do I get?",
    keywords: ["How", "many", "reminders", "do", "I", "get?"],
    body: "It returns 3 ready-to-send emails with built-in escalation.",
    source: "Dunner FAQ",
    tags: [],
  },
  {
    id: "faq-3",
    title: "Can I pick the tone?",
    keywords: ["Can", "I", "pick", "the", "tone?"],
    body: "It offers 3 tones so you match the client relationship while staying professional.",
    source: "Dunner FAQ",
    tags: [],
  },
  {
    id: "honesty",
    title: "What this assistant will not claim",
    keywords: ["legal", "advice", "guarantee", "demo", "human", "refund", "support"],
    body: "Answers about Dunner are decision support only, not legal, tax, accessibility-certification, or compliance sign-off. This assistant does not invent integrations, SSO, CSV export, or Slack connections unless they are already in the product description. If live AI is unavailable, the product must not pretend a demo result is live. Say you want a human and leave an email if you need a person.",
    source: "Dunner support policy",
    tags: ["compliance"],
  },
];

function normalize(s: string): string {
  return (s || "").toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ");
}
function toWords(s: string): string[] {
  return normalize(s).split(/\s+/).map((w) => w.trim()).filter(Boolean);
}
function cjkBigrams(s: string): string[] {
  const grams: string[] = [];
  const han = /[\u4e00-\u9fff]/;
  for (const w of toWords(s)) {
    if (han.test(w) && w.length >= 2) {
      for (let i = 0; i < w.length - 1; i++) grams.push(w.slice(i, i + 2));
    }
  }
  return grams;
}
function scoreEntry(entry: KbEntry, query: string): number {
  const q = normalize(query);
  const qWords = new Set(toWords(q));
  const qGrams = new Set(cjkBigrams(q));
  let s = 0;
  for (const kw of entry.keywords) {
    const k = kw.toLowerCase();
    if (q.includes(k)) s += 3;
  }
  for (const tw of toWords(entry.title)) {
    if (qWords.has(tw)) s += 2;
  }
  const idx = normalize(entry.keywords.join(" ") + " " + entry.title + " " + entry.body.slice(0, 400));
  for (const g of qGrams) if (idx.includes(g)) s += 0.5;
  return s;
}

export interface RetrieveResult {
  entries: KbEntry[];
  topScore: number;
}

export function retrieve(query: string, topK = 4, entries: KbEntry[] = KB): RetrieveResult {
  const scored = entries
    .map((e) => ({ e, s: scoreEntry(e, query) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, topK);
  return { entries: scored.map((x) => x.e), topScore: scored.length ? scored[0].s : 0 };
}

export function isComplianceRelated(entries: KbEntry[]): boolean {
  return entries.some((e) => e.tags.includes("compliance"));
}
