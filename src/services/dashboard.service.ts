import { apiClient } from './api/client';
import type { DashboardOverview } from '@/types/dashboard';
import { isDemoMode } from '@/config/dataSource';
import { dashboardOverviewMock } from '@/mocks/dashboard-overview';

export async function getDashboardOverview(): Promise<DashboardOverview> {
  if (isDemoMode) return dashboardOverviewMock;

  const response = await apiClient.get('/api/v1/dashboard/overview');

  return response.data;
}
