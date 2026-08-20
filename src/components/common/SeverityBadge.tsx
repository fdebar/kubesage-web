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
  CRITICAL: 'bg-red-500/10 text-red-600 dark:text-red-400',
  HIGH: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
  WARNING: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
  LOW: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
  INFO: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  NONE: 'bg-gray-500/10 text-gray-600 dark:text-gray-400',
};

const isSeverity = (value: string): value is Severity => value in styles;

export function SeverityBadge({ severity }: SeverityBadgeProps) {
  const s = severity?.toUpperCase();
  if (!s || !isSeverity(s)) return null;

  return (
    <span className={`rounded-full px-2 py-1 text-xs font-medium ${styles[s]}`}>
      {labels[s].charAt(0).toUpperCase() + labels[s].slice(1)}
    </span>
  );
}
