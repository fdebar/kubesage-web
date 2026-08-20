import type { Status } from '@/types/status';

interface StatusBadgeProps {
  status: Status | null;
}

const styles: Record<Status, string> = {
  running: 'bg-green-100/10 text-green-600 dark:text-green-400',
  pending: 'bg-yellow-100/10 text-yellow-600 dark:text-yellow-400',
  failed: 'bg-red-100/10 text-red-600 dark:text-red-400',
  succeeded: 'bg-blue-100/10 text-blue-600 dark:text-blue-400',
  healthy: 'bg-green-100/10 text-green-600 dark:text-green-400',
  unhealthy: 'bg-red-100/10 text-red-600 dark:text-red-400',
  unknown: 'bg-gray-100/10 text-gray-600 dark:text-gray-400',
  critical: 'bg-red-100/10 text-red-600 dark:text-red-400',
};

const isStatus = (value: string): value is Status => value in styles;

export function StatusBadge({ status }: StatusBadgeProps) {
  const s = status?.toLocaleLowerCase();
  if (!s || !isStatus(s)) return null;

  return (
    <span className={`rounded-full px-2 py-1 text-xs font-medium ${styles[s]}`}>
      {s.charAt(0).toUpperCase() + s.slice(1)}
    </span>
  );
}
