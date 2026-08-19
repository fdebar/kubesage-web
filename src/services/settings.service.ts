import { isDemoMode } from '@/config/dataSource';
import { settingsMock } from '@/mocks/settings';
import type { Settings } from '@/types/settings';

import { apiClient } from './api/client';

export async function getSettings(): Promise<Settings> {
  if (isDemoMode) return settingsMock;

  const response = await apiClient.get('/api/v1/settings');

  return response.data;
}
