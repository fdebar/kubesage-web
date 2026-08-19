import type { AnalysisDetail } from '@/types/analysis';

export const cpuThrottlingAnalysisMock: AnalysisDetail = {
  id: 'analysis-002',
  created_at: '2026-08-18T11:08:00Z',
  duration_ms: 12341,
  incident: {
    namespace: 'production',
    pod: 'recommendation-engine-6f8c9d7f4b-k2m9p',
    phase: 'Running',
    containers: [
      {
        name: 'recommendation-engine',
        image: 'registry.example.com/recommendation-engine:3.8.0',
        ready: true,
        restart_count: 0,
        waiting_reason: null,
        waiting_message: null,
        last_exit_code: null,
        last_exit_reason: null,
      },
    ],
    events: [],
    metrics: {
      containers: [
        {
          name: 'recommendation-engine',
          cpu_usage: 0.97,
          memory_usage: 768,
          cpu_limit: 1,
          memory_limit: 1024,
          cpu_throttling_ratio: 0.42,
        },
      ],
    },
  },
  findings: [
    {
      rule: 'cpu_throttling',
      severity: 'WARNING',
      kind: 'observation',
      title: 'High CPU throttling detected',
      description:
        'The recommendation-engine container is experiencing significant CPU throttling.',
      resource: {
        api_version: 'v1',
        kind: 'Pod',
        namespace: 'production',
        name: 'recommendation-engine-6f8c9d7f4b-k2m9p',
      },
      recommendations: [
        'Review CPU requests and limits.',
        'Investigate recent changes in application workload.',
      ],
      priority: 75,
      confidence: 0.96,
      related_findings: ['high_cpu_usage', 'latency_increase'],
      caused_by: [],
      evidences: [
        {
          name: 'cpu_throttling_ratio',
          value: '0.42',
          source: 'prometheus',
          type: 'metric',
          unit: 'ratio',
          metadata: {},
        },
      ],
    },
    {
      rule: 'high_cpu_usage',
      severity: 'WARNING',
      kind: 'observation',
      title: 'CPU usage approaching container limit',
      description: 'CPU usage is consistently above 95% of the configured container limit.',
      resource: {
        api_version: 'v1',
        kind: 'Pod',
        namespace: 'production',
        name: 'recommendation-engine-6f8c9d7f4b-k2m9p',
      },
      recommendations: [
        'Review CPU resource allocation.',
        'Consider increasing the CPU limit if the workload is expected.',
      ],
      priority: 65,
      confidence: 0.93,
      related_findings: ['cpu_throttling'],
      caused_by: [],
      evidences: [
        {
          name: 'cpu_usage',
          value: '0.97',
          source: 'prometheus',
          type: 'metric',
          unit: 'cores',
          metadata: {
            limit: 1,
          },
        },
      ],
    },
  ],
  report: {
    summary:
      'KubeSage detected significant CPU throttling affecting the recommendation-engine workload.',
    root_cause:
      'The container is consistently consuming almost its entire CPU limit, resulting in CPU throttling and degraded application performance.',
    evidence: [
      'CPU usage reached 97% of the configured limit.',
      'CPU throttling ratio reached 42%.',
      'The affected container has not restarted.',
    ],
    recommendations: [
      'Review the CPU limit configured for the workload.',
      'Investigate whether the current workload is expected.',
      'Monitor request latency while CPU throttling is occurring.',
    ],
    additional_investigations: [
      'Compare CPU consumption with previous deployments.',
      'Review recent workload changes.',
    ],
  },
};
