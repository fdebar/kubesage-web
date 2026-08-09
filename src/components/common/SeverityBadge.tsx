import type { Severity } from '@/types/severity';

interface SeverityBadgeProps {
  severity: Severity | null;
}

const labels: Record<Severity, string> = {
  CRITICAL: 'Critical',
  HIGH: 'High',
  WARNING: 'Warning',
  LOW: 'Low',
  INFO: 'Info',
  NONE: 'None',
};

const styles: Record<Severity, string> = {
  CRITICAL: 'bg-red-100 text-red-800',
  HIGH: 'bg-orange-100 text-orange-800',
  WARNING: 'bg-yellow-100 text-yellow-800',
  LOW: 'bg-blue-100 text-blue-800',
  INFO: 'bg-gray-100 text-gray-800',
  NONE: 'bg-gray-100 text-gray-800',
};

export function SeverityBadge({ severity }: SeverityBadgeProps) {
  let s = severity?.toUpperCase();
  if (!s || !styles[s]) {
    s = 'NONE';
  }

  return (
    <span className={`rounded-full px-2 py-1 text-xs font-medium ${styles[s]}`}>
      {labels[s].charAt(0).toUpperCase() + labels[s].slice(1)}
    </span>
  );
}
