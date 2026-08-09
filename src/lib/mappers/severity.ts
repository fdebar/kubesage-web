import type { Severity } from '@/types/severity';
import type { Status } from '@/types/status';

export function severityToStatus(severity: Severity): Status {
  return severity.toLowerCase() as Status;
}
