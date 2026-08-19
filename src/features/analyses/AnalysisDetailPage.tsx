import { useParams } from 'react-router-dom';
import { useAnalysis } from '@/hooks/useAnalysis';
import { LoadingState } from '@/components/common/LoadingState';
import { EmptyState } from '@/components/common/EmptyState';
import { AnalysisHeader } from '@/features/analyses/AnalysisHeader';
import { AIReportCard } from '@/features/analyses/AIReportCard';
import { FindingCard } from '@/features/findings/FindingCard';
import { IncidentSummaryCard } from '@/features/analyses/IncidentSummaryCard';
import { Link } from 'react-router-dom';

export function AnalysisDetailPage() {
  const { id } = useParams();
  const { data: analysis, isLoading, isError } = useAnalysis(id ?? '');

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError || !analysis) {
    return <EmptyState title="Unable to load the analysis" description="Analysis not found" />;
  }

  return (
    <div className="space-y-6">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
        <Link to="/history" className="text-zinc-500 transition hover:text-zinc-100">
          History
        </Link>
        <span className="text-zinc-700">/</span>
        <span className="text-zinc-300">Analysis #{id}</span>
      </nav>

      <AnalysisHeader analysis={analysis} />

      <IncidentSummaryCard analysis={analysis} />

      {analysis.report && <AIReportCard report={analysis.report} />}

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Findings</h2>
        {analysis.findings.length > 0 ? (
          analysis.findings.map((finding) => (
            <FindingCard key={`${finding.rule}-${finding.title}`} finding={finding} />
          ))
        ) : (
          <EmptyState
            title="No findings"
            description="No issues were detected during this analysis."
          />
        )}
      </div>
    </div>
  );
}
