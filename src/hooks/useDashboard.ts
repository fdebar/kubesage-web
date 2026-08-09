import { useQuery } from '@tanstack/react-query';
import { getDashboardOverview } from '@/services/dashboard.service';

export function useDashboard() {
  return useQuery({
    queryKey: ['dashboard', 'overview'],
    queryFn: () => getDashboardOverview(),
    refetchInterval: 30000,
  });
}
