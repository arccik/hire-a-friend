import DashboardMenu from "./DashboardMenu";
import DashboardStats from "./DashboardStats";
import DashboardIncome from "./DashboardIncome";
import DashboardUsersTable from "./DashboardUsersTable";

export default function Dashboard() {
  return (
    <div className="relative min-h-screen w-full bg-black py-4 text-slate-300 antialiased">
      <div className="mx-auto my-10 grid max-w-7xl grid-cols-12 gap-2 px-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14">
        <DashboardMenu />
        <div id="content" className="col-span-9 rounded-lg bg-white/10 p-6">
          <DashboardStats />
          <DashboardIncome />
          <DashboardUsersTable />
        </div>
      </div>
    </div>
  );
}
