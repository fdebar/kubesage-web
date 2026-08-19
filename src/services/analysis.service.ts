import { apiClient } from './api/client';
import type { AnalysisDetail, AnalysisListResponse } from '@/types/analysis';
import { isDemoMode } from '@/config/dataSource';
import { analysisListMock } from '@/mocks/analysis/list';
import { crashLoopAnalysisMock } from '@/mocks/analysis/crashloop';
import { cpuThrottlingAnalysisMock } from '@/mocks/analysis/cpu-throttling';
import { networkFailureAnalysisMock } from '@/mocks/analysis/network';

export async function get(id: string): Promise<AnalysisDetail> {
  if (isDemoMode) {
    const analyses: Record<string, AnalysisDetail> = {
      [crashLoopAnalysisMock.id]: crashLoopAnalysisMock,
      [cpuThrottlingAnalysisMock.id]: cpuThrottlingAnalysisMock,
      [networkFailureAnalysisMock.id]: networkFailureAnalysisMock,
    };

    if (analyses[id]) return analyses[id];

    throw new Error(`Demo analysis not found: ${id}`);
  }

  const response = await apiClient.get(`/api/v1/analysis/${id}`);

  return response.data;
}

export async function list(page = 1, pageSize = 20): Promise<AnalysisListResponse> {
  if (isDemoMode) {
    return {
      ...analysisListMock,
      page,
      page_size: pageSize,
    };
  }

  const response = await apiClient.get('/api/v1/analysis', { params: { page, pageSize } });

  return response.data;
}
