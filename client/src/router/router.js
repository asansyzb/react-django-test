import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Router = ({ routes }) => {
  const authenticated = true;
  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          exact={route.exact}
          element={
            route.redirect ? (
              <Navigate to={route.redirect} replace />
            ) : (
              <Suspense fallback={route.fallback}>
                {route.layout ? (
                  <route.layout>
                    <route.component routes={route.routes}></route.component>
                  </route.layout>
                ) : (
                  <route.component routes={route.routes}></route.component>
                )}
              </Suspense>
            )
          }
        >
          {route.children &&
            route.children.map((child, index) => {
              console.log(child);
              return (
                <Route
                  path={child.path}
                  key={child.path}
                  index={child.index}
                  exact={route.exact}
                  element={
                    <Suspense fallback={child.loader}>
                      <child.component />
                    </Suspense>
                  }
                />
              );
            })}
        </Route>
      ))}
    </Routes>
  );
};

export default Router;
