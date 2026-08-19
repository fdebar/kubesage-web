import { isDemoMode } from '@/config/dataSource';
import { settingsMock, settingsServiceTestMock } from '@/mocks/settings';
import type { ServiceTestResult } from '@/types/serviceTestResult';
import type { Settings } from '@/types/settings';

import { apiClient } from './api/client';

export type SettingsService = 'prometheus' | 'loki' | 'opentelemetry' | 'ai';

export async function getSettings(): Promise<Settings> {
  if (isDemoMode) return settingsMock;

  const response = await apiClient.get('/settings');

  return response.data;
}

export async function testService(service: SettingsService): Promise<ServiceTestResult> {
  if (isDemoMode) return settingsServiceTestMock;

  const response = await apiClient.post(`/settings/services/${service}/test`);

  return response.data;
}
