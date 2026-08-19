import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { isDemoMode } from '@/config/dataSource';

export function DemoBadge() {
  if (!isDemoMode) return null;

  return (
    <Tooltip>
      <TooltipTrigger>
        <Badge
          variant="outline"
          className="cursor-help gap-1.5 border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-400"
        >
          <span className="size-1.5 rounded-full bg-amber-400" />
          <span className="text-[10px] font-semibold tracking-[0.20em] text-amber-400 uppercase">
            Demo
          </span>
        </Badge>
      </TooltipTrigger>

      <TooltipContent>KubeSage is running with mock data</TooltipContent>
    </Tooltip>
  );
}
