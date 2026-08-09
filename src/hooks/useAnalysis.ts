import { useQuery } from '@tanstack/react-query';
import { get } from '@/services/analysis.service';

export function useAnalysis(id: string) {
  return useQuery({
    queryKey: ['analysis', id],
    queryFn: () => get(id),
    enabled: Boolean(id),
  });
}
