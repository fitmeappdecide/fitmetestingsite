import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DashboardSidebar } from "@/components/dashboard/Sidebar";

export const Route = createFileRoute("/app")({
  head: () => ({ meta: [{ title: "FitMe · Dashboard" }] }),
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <main className="flex-1 px-10 py-10">
        <Outlet />
      </main>
    </div>
  );
}
