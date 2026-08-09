import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { Outlet } from 'react-router-dom';

export function AppShell() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <TopBar />
        <main className="flex-1 overflow-auto bg-zinc-950 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
