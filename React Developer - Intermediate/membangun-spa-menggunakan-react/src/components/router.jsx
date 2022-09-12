import { Route, Routes } from "react-router-dom";
import { AppRoutes } from "@/app/routes";

function Router() {
  return (
    <Routes>
      {AppRoutes.map(({ path, element: Element, routes: nestedRoutes }) => {
        if (nestedRoutes) {
          return (
            <Route
              key={path}
              path={path}
            >
              {nestedRoutes.map(({ path: NestedRoutePath, element: NestedRouteElement }) => (
                <Route
                  key={NestedRoutePath}
                  path={NestedRoutePath}
                  element={<NestedRouteElement />}
                />
              ))}
            </Route>
          );
        }

        return (
          <Route
            key={path}
            path={path}
            element={<Element />}
          />
        );
      })}
    </Routes>
  );
}

export default Router;
