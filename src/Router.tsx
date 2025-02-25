import {
  Route,
  Routes,
  Navigate,
  useLocation,
  useSearchParams,
} from "react-router";
import { Suspense, lazy } from "react";

import { storageGetKey, storageGetLatest } from "src/services/localStorage";
import {
  getUrl,
  getReactRouterPath,
  IDENTIFIERS,
} from "src/services/urlsHelper";
import { DashboardLayout } from "./features/dashboard/Layout/DasboardLayout";
const OverviewPage = lazy(
  () => import("./features/dashboard/Overview/OverviewPage")
);

const NotificationsPage = lazy(() => import("src/features/Notifications"));
const EvView = lazy(() => import("src/features/dashboard/EvView"));
const NotFoundPage = lazy(() => import("./features/dashboard/NotFoundPage"));

type RouterParamsProps =
  | { children: React.ReactElement; element?: never }
  | { element: React.ReactElement; children?: never };

const RouterParams: React.FC<RouterParamsProps> = ({ children, element }) => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const storedValues = storageGetLatest(storageGetKey(pathname), {});

  return (
    <Suspense fallback={<>Loading...</>}>
      {!searchParams.toString() && Object.keys(storedValues).length ? (
        <Navigate to={getUrl(pathname as IDENTIFIERS, storedValues)} />
      ) : (
        children || element
      )}
    </Suspense>
  );
};

export function Router() {
  return (
    <Routes>
      <Route
        path={getReactRouterPath(IDENTIFIERS.HOME)}
        element={<DashboardLayout />}
      >
        <Route
          path={getReactRouterPath(IDENTIFIERS.HOME)}
          element={<RouterParams element={<OverviewPage />} />}
        />
        <Route
          path={getReactRouterPath(IDENTIFIERS.NOTIFICATIONS)}
          element={<RouterParams element={<NotificationsPage />} />}
        />
        <Route
          path={getReactRouterPath(IDENTIFIERS.EV_VIEW)}
          element={<RouterParams element={<EvView />} />}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
