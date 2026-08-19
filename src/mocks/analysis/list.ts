import type { AnalysisListResponse } from '@/types/analysis';

export const analysisListMock: AnalysisListResponse = {
  items: [
    {
      id: 'analysis-001',
      namespace: 'production',
      pod: 'payment-service-7c48f4b7c6-2xf8n',
      phase: 'CrashLoopBackOff',
      highest_severity: 'CRITICAL',
      summary: 'Memory exhaustion causing repeated container restarts.',
      findings_count: 6,
      duration_ms: 18432,
      created_at: '2026-08-18T14:32:00Z',
    },
    {
      id: 'analysis-002',
      namespace: 'production',
      pod: 'recommendation-engine-6f8c9d7f4b-k2m9p',
      phase: 'Running',
      highest_severity: 'WARNING',
      summary: 'High CPU throttling detected on the application containers.',
      findings_count: 4,
      duration_ms: 12341,
      created_at: '2026-08-18T11:08:00Z',
    },
    {
      id: 'analysis-003',
      namespace: 'staging',
      pod: 'user-api-7d6f8b9c5d-r7x2m',
      phase: 'Running',
      highest_severity: 'HIGH',
      summary: 'Network connectivity issues detected between services.',
      findings_count: 5,
      duration_ms: 9876,
      created_at: '2026-08-17T18:44:00Z',
    },
  ],
  total: 3,
  page: 1,
  page_size: 20,
};
