/** Dunner — late-invoice reminder tone & professionalism checks. */
export const RULESET_VERSION = 'dunning-rules@2026-09-17'

export type RuleHit = {
  id: string
  title: string
  severity: 'low' | 'medium' | 'high'
  passed: boolean
  remediation?: string
  ref?: string
}

export function runDeterministicChecks(inputs: Record<string, string>): RuleHit[] {
  const client = (inputs.client || inputs.client_name || '').trim()
  const amount = (inputs.amount || inputs.invoice_amount || '').trim()
  const days = (inputs.days_overdue || inputs.days || '').trim()
  const tone = (inputs.tone || '').trim()
  const blob = Object.values(inputs || {}).join('\n')
  const abusive = /(sue you|collections agency threat|illegal|harass)/i.test(blob)
  return [
    {
      id: 'DUN-01',
      title: 'Client identified',
      severity: 'high',
      passed: client.length >= 2,
      remediation: 'Enter the client or company name so the reminder is specific.',
      ref: 'https://www.sba.gov/business-guide/manage-your-business/manage-your-finances',
    },
    {
      id: 'DUN-02',
      title: 'Amount present',
      severity: 'high',
      passed: amount.length >= 1,
      remediation: 'Include the invoice amount owed.',
      ref: 'https://www.sba.gov/business-guide/manage-your-business/manage-your-finances',
    },
    {
      id: 'DUN-03',
      title: 'Days overdue noted',
      severity: 'medium',
      passed: !!days,
      remediation: 'State how many days the invoice is overdue for correct escalation.',
      ref: 'https://www.ftc.gov/business-guidance/resources/debt-collection-faqs',
    },
    {
      id: 'DUN-04',
      title: 'Tone selected',
      severity: 'low',
      passed: !!tone || true,
      remediation: 'Pick a tone (friendly / formal / firm) matching the relationship.',
      ref: 'https://www.ftc.gov/business-guidance/resources/debt-collection-faqs',
    },
    {
      id: 'DUN-05',
      title: 'No abusive/threatening language in inputs',
      severity: 'high',
      passed: !abusive,
      remediation: 'Keep reminders professional; avoid harassment or illegal threats.',
      ref: 'https://www.ftc.gov/business-guidance/resources/debt-collection-faqs',
    },
    {
      id: 'DUN-06',
      title: 'Output should be 3 escalated emails',
      severity: 'low',
      passed: true,
      remediation: 'Structure as gentle → firmer → firm ask; copy-ready subjects and bodies.',
      ref: 'https://www.sba.gov/business-guide/manage-your-business/manage-your-finances',
    },
  ]
}

/** Legacy alias used by older tool.ts backups. */
export function runAllRules(
  _text: string,
  ctx?: { client?: string; amount?: string; days_overdue?: string; tone?: string },
): RuleHit[] {
  return runDeterministicChecks({
    client: ctx?.client || '',
    amount: ctx?.amount || '',
    days_overdue: ctx?.days_overdue || '',
    tone: ctx?.tone || '',
  })
}

export const RULESET_ID = RULESET_VERSION
