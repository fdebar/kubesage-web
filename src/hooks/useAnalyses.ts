import { useQuery } from '@tanstack/react-query';
import { list } from '@/services/analysis.service';

export function useAnalyses(page: number = 1, pageSize: number = 20) {
  return useQuery({
    queryKey: ['analyses', page, pageSize],
    queryFn: () => list(page, pageSize),
    placeholderData: (previous) => previous,
  });
}
