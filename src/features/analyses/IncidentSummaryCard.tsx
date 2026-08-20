import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Box, Server, Activity, Clock3 } from '@/lib/icons';

import type { AnalysisDetail } from '@/types/analysis';

interface IncidentSummaryCardProps {
  analysis: AnalysisDetail;
}

export const IncidentSummaryCard = ({ analysis }: IncidentSummaryCardProps) => (
  <Card className="ks-card">
    <CardHeader>
      <CardTitle>Incident Summary</CardTitle>
    </CardHeader>

    <CardContent className="grid gap-4 md:grid-cols-4">
      <SummaryItem icon={Box} label="Namespace" value={analysis.incident.namespace} />
      <SummaryItem icon={Server} label="Pod" value={analysis.incident.pod} />
      <SummaryItem icon={Activity} label="Phase" value={analysis.incident.phase} />
      <SummaryItem icon={Clock3} label="Duration" value={`${analysis.duration_ms} ms`} />
    </CardContent>
  </Card>
);

function SummaryItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="h-5 w-5" />
      <div>
        <p className="text-muted-foreground text-sm">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}
