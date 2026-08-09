import { Search, Bell } from '@/lib/icons';

export function TopBar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-6">
      <div className="flex items-center gap-3 text-sm text-zinc-400">
        <Search className="size-4" />
        Search Kubernetes resources...
      </div>

      <button>
        <Bell className="size-5 text-zinc-400" />
      </button>
    </header>
  );
}
