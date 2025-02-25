import { Outlet } from "react-router";
import { Header } from "../Header/Header";
import "./DashboardLayout.scss";
import classNames from "classnames";
import { useTypedSelector } from "src/hooks";

export function DashboardLayout() {
  const isOnline = useTypedSelector((state) => state.layout.isOnline);
  return (
    <div
      className={classNames("dashboard__wrapper", {
        "dashboard__wrapper--offline": !isOnline,
      })}
    >
      <Header />
      <main className="dashboard-content-area">
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
