import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#0f1117] text-[#e1e3e9]">
      <Sidebar />
      <main className="ml-[190px] flex-1 flex flex-col">{children}</main>
    </div>
  );
}
