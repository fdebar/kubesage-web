import type { Status } from '@/types/status';

export const statusClasses: Record<Status, string> = {
  healthy: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  warning: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
  critical: 'bg-red-500/15 text-red-400 border-red-500/20',
  info: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  unknown: 'bg-zinc-500/15 text-zinc-400 border-zinc-500/20',
};
