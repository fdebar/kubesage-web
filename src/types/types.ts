export type FindingSeverity = 'critical' | 'warning' | 'info';

export type FindingStatus = 'active' | 'resolved';

export type FindingResourceKind = 'Pod' | 'Deployment' | 'StatefulSet' | 'DaemonSet' | 'Node';

export interface FindingResource {
  kind: FindingResourceKind;
  name: string;
  namespace?: string;
}

export interface Finding {
  id: string;

  title: string;
  description: string;

  severity: FindingSeverity;
  status: FindingStatus;

  resource: FindingResource;

  firstSeen: string;
  lastSeen: string;

  analysisId: string;
}
