import { Activity, FileText, Zap, Box, GitBranch, Gauge, type LucideIcon } from 'lucide-react';
import type { EvidenceType } from '@/types/analysis';

export function evidenceTypeIcon(type: EvidenceType | null): LucideIcon {
  switch (type) {
    case 'metric':
      return Activity;
    case 'log':
      return FileText;
    case 'event':
      return Zap;
    case 'pod_state':
      return Gauge;
    case 'container_state':
      return Box;
    case 'correlation':
      return GitBranch;
    case 'threshold':
      return Gauge;
    default:
      return FileText;
  }
}
