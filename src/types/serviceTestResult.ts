import type { ServiceStatus } from './serviceStatus';

export interface ServiceTestResult {
  status: ServiceStatus;
  checked_at: string;
  latency_ms: number | null;
  message: string | null;
}
