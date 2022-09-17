import PropTypes from "prop-types";
import { Route, Routes } from "react-router-dom";
import { PublicRoute, PrivateRoute } from "@/app/route";
import Error404Page from "@/pages/error-page";

export function Router({ token, lang }) {
  return (
    <Routes>
      {token ? (
        <>
          {PrivateRoute.map(({ path, element: Element }) => (
            <Route
              path={path}
              element={<Element />}
              key={path}
            />
          ))}
        </>
      ) : (
        <>
          {PublicRoute.map(({ path, element: Element }) => (
            <Route
              path={path}
              element={<Element />}
              key={path}
            />
          ))}
        </>
      )}

      <Route path="*" element={<Error404Page lang={lang} />} />
    </Routes>
  );
}

Router.propTypes = {
  token: PropTypes.string,
  lang: PropTypes.string,
};
