import { useQuery } from '@tanstack/react-query';
import { getFindings } from '@/services/findings.service';

export function useFindings(page = 1, pageSize = 20) {
  return useQuery({
    queryKey: ['findings', page, pageSize],
    queryFn: () => getFindings(page, pageSize),
  });
}
