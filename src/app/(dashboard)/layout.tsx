import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background text-on-surface">
      <Sidebar />
      <Header />
      <main className="ml-64 flex-1 pt-16 flex flex-col">{children}</main>
    </div>
  );
}
