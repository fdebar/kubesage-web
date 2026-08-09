import type { Status } from '@/types/status';

interface StatusBadgeProps {
  status: Status | null;
}

const styles: Record<Status, string> = {
  running: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  failed: 'bg-red-100 text-red-800',
  succeeded: 'bg-blue-100 text-blue-800',
  healthy: 'bg-green-100 text-green-800',
  unhealthy: 'bg-red-100 text-red-800',
  unknown: 'bg-gray-100 text-gray-800',
  critical: 'bg-red-100 text-red-800',
};

export function StatusBadge({ status }: StatusBadgeProps) {
  let s = status?.toLocaleLowerCase();
  if (!s || !styles[s]) {
    s = 'unknown';
  }

  return (
    <span className={`rounded-full px-2 py-1 text-xs font-medium ${styles[s]}`}>
      {s.charAt(0).toUpperCase() + s.slice(1)}
    </span>
  );
}
