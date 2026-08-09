import { Search } from '@/lib/icons';

type Props = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border py-16">
      <Search className="text-muted-foreground mb-4 size-10" />

      <h2 className="text-lg font-semibold">{title}</h2>

      <p className="text-muted-foreground mt-2 max-w-sm text-center">{description}</p>
    </div>
  );
}
