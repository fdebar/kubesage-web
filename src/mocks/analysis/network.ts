import type { AnalysisDetail } from '@/types/analysis';

export const networkFailureAnalysisMock: AnalysisDetail = {
  id: 'analysis-003',
  created_at: '2026-08-17T18:44:00Z',
  duration_ms: 9876,
  incident: {
    namespace: 'staging',
    pod: 'user-api-7d6f8b9c5d-r7x2m',
    phase: 'Running',
    containers: [
      {
        name: 'user-api',
        image: 'registry.example.com/user-api:5.2.0',
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
          name: 'user-api',
          cpu_usage: 0.31,
          memory_usage: 412,
          cpu_limit: 1,
          memory_limit: 1024,
          cpu_throttling_ratio: 0.01,
        },
      ],
    },
  },
  findings: [
    {
      rule: 'dns_resolution_failure',
      severity: 'HIGH',
      kind: 'diagnosis',
      title: 'DNS resolution failures detected',
      description:
        'The user-api pod is unable to consistently resolve an internal Kubernetes service.',
      resource: {
        api_version: 'v1',
        kind: 'Pod',
        namespace: 'staging',
        name: 'user-api-7d6f8b9c5d-r7x2m',
      },
      recommendations: [
        'Verify CoreDNS availability.',
        'Check Kubernetes service discovery configuration.',
        'Inspect DNS-related errors in application logs.',
      ],
      priority: 85,
      confidence: 0.95,
      related_findings: ['connection_timeout', 'http_5xx_errors'],
      caused_by: [],
      evidences: [
        {
          name: 'dns_errors',
          value: '37',
          source: 'loki',
          type: 'log',
          unit: 'errors',
          metadata: {},
        },
      ],
    },
    {
      rule: 'connection_timeout',
      severity: 'HIGH',
      kind: 'observation',
      title: 'Service connection timeouts',
      description: 'Multiple requests from user-api to an internal service timed out.',
      resource: {
        api_version: 'v1',
        kind: 'Pod',
        namespace: 'staging',
        name: 'user-api-7d6f8b9c5d-r7x2m',
      },
      recommendations: [
        'Verify the target service is available.',
        'Check network policies and service endpoints.',
      ],
      priority: 70,
      confidence: 0.91,
      related_findings: ['dns_resolution_failure'],
      caused_by: ['dns_resolution_failure'],
      evidences: [
        {
          name: 'connection_timeouts',
          value: '18',
          source: 'loki',
          type: 'log',

          unit: 'errors',

          metadata: {},
        },
      ],
    },
  ],
  report: {
    summary: 'KubeSage detected service connectivity problems affecting the user-api pod.',
    root_cause:
      'The incident is most likely related to DNS resolution failures within the staging cluster, resulting in service connection timeouts.',
    evidence: [
      '37 DNS resolution errors were detected.',
      '18 service connection timeouts were observed.',
      'The affected pod remained healthy from a CPU and memory perspective.',
    ],
    recommendations: [
      'Check CoreDNS health and logs.',
      'Verify the target Kubernetes service and endpoints.',
      'Review network policies affecting the namespace.',
    ],
    additional_investigations: [
      'Inspect CoreDNS metrics.',
      'Verify service endpoints.',
      'Check recent networking configuration changes.',
    ],
  },
};
