export type FindingKind = 'observation' | 'diagnosis';

export type FindingSeverity = 'INFO' | 'LOW' | 'WARNING' | 'HIGH' | 'CRITICAL';

export type FindingResourceKind = 'Pod' | 'Deployment' | 'StatefulSet' | 'DaemonSet' | 'Node';

export interface FindingResource {
  api_version: string | null;
  kind: string;
  name: string;
  namespace: string | null;
}

export interface Finding {
  id: string;
  analysis_id: string;
  rule: string;
  kind: FindingKind;
  severity: FindingSeverity;
  title: string;
  description: string;
  resource: FindingResource | null;
  created_at: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  page_size: number;
}
