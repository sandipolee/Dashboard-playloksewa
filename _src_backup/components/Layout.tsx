
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-background text-on-surface">
      <Sidebar />
      <Header />
      <main className="ml-64 flex-1 pt-16 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}
