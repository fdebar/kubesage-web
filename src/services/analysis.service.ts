import { apiClient } from './api/client';
import type { AnalysisDetail, AnalysisListResponse } from '@/types/analysis';

export async function get(id: string): Promise<AnalysisDetail> {
  const response = await apiClient.get(`/api/v1/analysis/${id}`);

  return response.data;
}

export async function list(page = 1, pageSize = 20): Promise<AnalysisListResponse> {
  const response = await apiClient.get('/api/v1/analysis', { params: { page, pageSize } });

  return response.data;
}
