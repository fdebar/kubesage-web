import { EvidenceCard } from './EvidenceCard';
import type { Evidence } from '@/types/analysis';

interface EvidenceListProps {
  evidences: Evidence[];
}

export function EvidenceList({ evidences }: EvidenceListProps) {
  if (evidences.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h3 className="font-medium">Evidence</h3>
      <div className="space-y-2">
        {evidences.map((evidence) => (
          <EvidenceCard key={`${evidence.name}-${evidence.value}`} evidence={evidence} />
        ))}
      </div>
    </div>
  );
}
