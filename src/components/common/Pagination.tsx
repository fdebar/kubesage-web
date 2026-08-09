import { Button } from '@/components/ui/button';

interface Props {
  total: number;
  page: number;
  pageSize: number;
  onChange(page: number): void;
}

export function Pagination({ total, page, pageSize, onChange }: Props) {
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="flex items-center justify-between">
      <span>
        Page {page} / {Number.isNaN(totalPages) ? 1 : totalPages}
      </span>

      <div className="flex gap-2">
        <Button disabled={page <= 1} onClick={() => onChange(page - 1)}>
          Previous
        </Button>

        <Button
          disabled={page >= totalPages || Number.isNaN(totalPages)}
          onClick={() => onChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
