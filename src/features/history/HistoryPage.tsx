import { useState } from 'react';

import { PageHeader } from '@/components/common/PageHeader';
import { LoadingState } from '@/components/common/LoadingState';
import { EmptyState } from '@/components/common/EmptyState';
import { useAnalyses } from '@/hooks/useAnalyses';
import { AnalysisTable } from './AnalysisTable';
import { Pagination } from '@/components/common/Pagination';

export function HistoryPage() {
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const { data, isLoading, isError } = useAnalyses(page, pageSize);

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return (
      <EmptyState
        title="Unable to load history"
        description="An error occurred while loading analyses."
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title="History" description="History of Kubernetes analyses" />

      {!data || data.items.length === 0 ? (
        <EmptyState title="No analyses" description="No historical analysis available." />
      ) : (
        <>
          <AnalysisTable analyses={data.items} />

          <Pagination
            total={data.total}
            page={data.page}
            pageSize={data.page_size}
            onChange={setPage}
          />
        </>
      )}
    </div>
  );
}
