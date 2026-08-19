import { apiClient } from './api/client';
import type { Finding, PaginatedResponse } from '@/types/types';
import { isDemoMode } from '@/config/dataSource';
import { mockFindings } from '@/mocks/findings';

export async function getFindings(page = 1, pageSize = 20): Promise<PaginatedResponse<Finding>> {
  if (isDemoMode) return mockFindings;

  const response = await apiClient.get(`/api/v1/findings?page=${page}&page_size=${pageSize}`);

  return response.data;
}
