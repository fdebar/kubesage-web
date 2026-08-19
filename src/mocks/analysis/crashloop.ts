import type { AnalysisDetail } from '@/types/analysis';

export const crashLoopAnalysisMock: AnalysisDetail = {
  id: 'analysis-001',
  created_at: '2026-08-18T14:32:00Z',
  duration_ms: 18432,
  incident: {
    namespace: 'production',
    pod: 'payment-service-7c48f4b7c6-2xf8n',
    phase: 'CrashLoopBackOff',
    containers: [
      {
        name: 'payment-service',
        image: 'registry.example.com/payment-service:2.4.1',
        ready: false,
        restart_count: 247,
        waiting_reason: 'CrashLoopBackOff',
        waiting_message: 'Back-off restarting failed container payment-service',
        last_exit_code: 137,
        last_exit_reason: 'OOMKilled',
      },
    ],
    events: [
      {
        type: 'Warning',
        reason: 'BackOff',
        message: 'Back-off restarting failed container payment-service',
        last_timestamp: 1755527520,
      },
      {
        type: 'Warning',
        reason: 'OOMKilled',
        message: 'Container payment-service was killed due to memory limit',
        last_timestamp: 1755527460,
      },
    ],
    metrics: {
      containers: [
        {
          name: 'payment-service',
          cpu_usage: 0.82,
          memory_usage: 1980,
          cpu_limit: 1,
          memory_limit: 2048,
          cpu_throttling_ratio: 0.12,
        },
      ],
    },
  },
  findings: [
    {
      rule: 'crashloop_backoff',
      severity: 'CRITICAL',
      kind: 'observation',
      title: 'Container repeatedly restarting',
      description:
        'The payment-service container restarted 247 times and is currently in CrashLoopBackOff.',
      resource: {
        api_version: 'v1',
        kind: 'Pod',
        namespace: 'production',
        name: 'payment-service-7c48f4b7c6-2xf8n',
      },
      recommendations: [
        'Inspect the previous container termination reason.',
        'Review memory consumption before the restart loop began.',
      ],
      priority: 100,
      confidence: 0.99,
      related_findings: ['oomkilled', 'memory_pressure'],
      caused_by: [],
      evidences: [
        {
          name: 'restart_count',
          value: '247',
          source: 'kubernetes',
          type: 'container_state',
          unit: null,
          metadata: {},
        },
      ],
    },
    {
      rule: 'oomkilled',
      severity: 'CRITICAL',
      kind: 'diagnosis',
      title: 'Container terminated due to memory exhaustion',
      description:
        'The payment-service container exceeded its configured memory limit and was terminated by the kernel.',
      resource: {
        api_version: 'v1',
        kind: 'Pod',
        namespace: 'production',
        name: 'payment-service-7c48f4b7c6-2xf8n',
      },
      recommendations: [
        'Review the application memory usage.',
        'Investigate potential memory leaks.',
        'Consider rolling back the latest deployment.',
      ],
      priority: 95,
      confidence: 0.97,
      related_findings: ['crashloop_backoff', 'memory_pressure'],
      caused_by: [],
      evidences: [
        {
          name: 'last_exit_reason',
          value: 'OOMKilled',
          source: 'kubernetes',
          type: 'container_state',
          unit: null,
          metadata: {},
        },
        {
          name: 'memory_usage',
          value: '1980',
          source: 'prometheus',
          type: 'metric',
          unit: 'MiB',
          metadata: {
            limit: 2048,
          },
        },
      ],
    },
    {
      rule: 'memory_pressure',
      severity: 'HIGH',
      kind: 'diagnosis',
      title: 'Memory consumption approaching container limit',
      description: 'The container is consuming approximately 97% of its configured memory limit.',
      resource: {
        api_version: 'v1',
        kind: 'Pod',
        namespace: 'production',
        name: 'payment-service-7c48f4b7c6-2xf8n',
      },
      recommendations: [
        'Investigate memory growth over time.',
        'Review recent application changes.',
      ],
      priority: 85,
      confidence: 0.94,
      related_findings: ['oomkilled'],
      caused_by: [],
      evidences: [
        {
          name: 'memory_usage_ratio',
          value: '0.967',
          source: 'prometheus',
          type: 'threshold',
          unit: 'ratio',
          metadata: {
            usage_mib: 1980,
            limit_mib: 2048,
          },
        },
      ],
    },
  ],
  report: {
    summary:
      'KubeSage detected a CrashLoopBackOff caused by repeated OOMKilled events in the payment-service container.',
    root_cause:
      'The payment-service container exceeded its 2 GiB memory limit. The evidence suggests abnormal memory growth following the deployment of version 2.4.1.',
    evidence: [
      '247 container restarts were detected.',
      'The last container termination reason was OOMKilled.',
      'Memory usage reached approximately 97% of the configured limit.',
      'The affected container is running payment-service version 2.4.1.',
    ],
    recommendations: [
      'Rollback payment-service to version 2.4.0.',
      'Investigate memory growth introduced in version 2.4.1.',
      'Review the container memory limit and application memory configuration.',
    ],
    additional_investigations: [
      'Compare memory consumption with the previous application version.',
      'Inspect application logs around the first OOMKilled event.',
      'Review recent code changes related to memory allocation.',
    ],
  },
};
