import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EvidenceIcon } from './EvidenceIcon';
import type { Evidence } from '@/types/analysis';

interface EvidenceCardProps {
  evidence: Evidence;
}

export function EvidenceCard({ evidence }: EvidenceCardProps) {
  return (
    <Card className="bg-muted/30">
      <CardContent className="space-y-2 p-4">
        <div className="flex items-center justify-between">
          <EvidenceIcon type={evidence.type} />
          <span className="font-medium">{evidence.name}</span>

          {evidence.type && <Badge variant="outline">{evidence.type}</Badge>}
        </div>

        {evidence.value && (
          <p className="text-sm">
            {evidence.value}
            {evidence.unit && <> {evidence.unit}</>}
          </p>
        )}

        {evidence.source && (
          <p className="text-muted-foreground text-xs">Source: {evidence.source}</p>
        )}
      </CardContent>
    </Card>
  );
}
