import { apiClient } from './api/client';
import type { DashboardOverview } from '@/types/dashboard';

export async function getDashboardOverview(): Promise<DashboardOverview> {
  const response = await apiClient.get('/api/v1/dashboard/overview');

  return response.data;
}
