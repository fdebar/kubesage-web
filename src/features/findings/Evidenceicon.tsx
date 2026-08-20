import { Activity, FileText, Zap, Box, GitBranch, Gauge } from 'lucide-react';

interface EvidenceIconProps {
  type?: string | null;
}

export function EvidenceIcon({ type }: EvidenceIconProps) {
  switch (type) {
    case 'metric':
      return <Activity className="h-4 w-4" />;
    case 'log':
      return <FileText className="h-4 w-4" />;
    case 'event':
      return <Zap className="h-4 w-4" />;
    case 'pod_state':
      return <Box className="h-4 w-4" />;
    case 'container_state':
      return <Box className="h-4 w-4" />;
    case 'correlation':
      return <GitBranch className="h-4 w-4" />;
    case 'threshold':
      return <Gauge className="h-4 w-4" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
}
