import type { ServiceStatus } from './serviceStatus';

export interface ServiceTestResult {
  status: ServiceStatus;
  checkedAt: Date;
  latencyMs?: number;
}
