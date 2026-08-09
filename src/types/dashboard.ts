import type { Severity } from './severity';

export interface ClusterStatus {
  name: string;
  version: string;
  status: 'healthy' | 'warning' | 'critical';
}

export interface DashboardMetrics {
  pods: number;
  nodes: number;
  analyses: number;
  findings: number;
  health_score: number;
}

export interface SeveritySummary {
  critical: number;
  high: number;
  warning: number;
  low: number;
  info: number;
}

export interface AnalysisSummary {
  id: string;
  namespace: string;
  pod: string;
  severity: Severity | null;
  created_at: string;
  duration_ms: number;
}

export interface DashboardOverview {
  cluster: ClusterStatus;
  metrics: DashboardMetrics;
  severities: SeveritySummary;
  recent_analyses: AnalysisSummary[];
}
