import type { Severity } from './severity';

export type FindingKind = 'observation' | 'diagnosis';

export type EvidenceType =
  'metric' | 'log' | 'event' | 'pod_state' | 'container_state' | 'correlation' | 'threshold';

export interface ResourceRef {
  api_version: string | null;
  kind: string;
  namespace: string | null;
  name: string;
}

export interface Evidence {
  name: string;
  value: string | null;
  source: string | null;
  type: EvidenceType | null;
  unit: string | null;
  metadata: Record<string, unknown>;
}

export interface FindingDetail {
  rule: string;
  severity: Severity;
  kind: FindingKind;
  title: string;
  description: string;
  resource: ResourceRef | null;
  recommendations: string[];
  priority: number;
  confidence: number;
  related_findings: string[];
  caused_by: string[];
  evidences: Evidence[];
}

export interface Incident {
  namespace: string;
  pod: string;
  phase: string;
  containers: ContainerStatus[];
  events: KubernetesEvent[];
  metrics: PodMetrics | null;
}

export interface AIReport {
  summary: string;
  root_cause: string | null;
  evidence: string[];
  recommendations: string[];
  additional_investigations: string[];
}

export interface AnalysisDetail {
  id: string;
  incident: Incident;
  findings: FindingDetail[];
  report: AIReport | null;
  created_at: string;
  duration_ms: number;
}

export interface ContainerStatus {
  name: string;
  image: string;
  ready: boolean;
  restart_count: number;
  waiting_reason: string | null;
  waiting_message: string | null;
  last_exit_code: number | null;
  last_exit_reason: string | null;
}

export interface KubernetesEvent {
  type: string;
  reason: string;
  message: string;
  last_timestamp: number | null;
}

export interface ContainerMetrics {
  name: string;
  cpu_usage: number;
  memory_usage: number;
  cpu_limit: number | null;
  memory_limit: number | null;
  cpu_throttling_ratio: number | null;
}

export interface PodMetrics {
  containers: ContainerMetrics[];
}

export interface AnalysisSummary {
  id: string;
  namespace: string;
  pod: string;
  phase: string;
  highest_severity: Severity | null;
  summary: string | null;
  findings_count: number;
  duration_ms: number;
  created_at: string;
}

export interface AnalysisListResponse {
  items: AnalysisSummary[];
  total: number;
  page: number;
  page_size: number;
}
