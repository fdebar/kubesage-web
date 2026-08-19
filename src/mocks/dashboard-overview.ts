import type { DashboardOverview } from '@/types/dashboard';

export const dashboardOverviewMock: DashboardOverview = {
  cluster: {
    name: 'production-eu',
    version: '1.34.2',
    status: 'healthy',
  },
  metrics: {
    pods: 247,
    nodes: 12,
    analyses: 189,
    findings: 1248,
    health_score: 98,
  },
  severities: {
    critical: 12,
    high: 28,
    warning: 67,
    low: 103,
    info: 214,
  },
  recent_analyses: [
    {
      id: 'analysis-001',
      namespace: 'production',
      pod: 'payment-service-7c48f4b7c6-2xf8n',
      severity: 'CRITICAL',
      created_at: '2026-08-18T14:32:00Z',
      duration_ms: 18432,
    },
    {
      id: 'analysis-002',
      namespace: 'production',
      pod: 'recommendation-engine-6f8c9d7f4b-k2m9p',
      severity: 'WARNING',
      created_at: '2026-08-18T11:08:00Z',
      duration_ms: 12341,
    },
    {
      id: 'analysis-003',
      namespace: 'staging',
      pod: 'user-api-7d6f8b9c5d-r7x2m',
      severity: 'HIGH',
      created_at: '2026-08-17T18:44:00Z',
      duration_ms: 9876,
    },
  ],
};
