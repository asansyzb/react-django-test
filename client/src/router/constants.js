import { lazy } from "react";
import Loader from "../components/Loader";

const ROUTES = {
  TRACKS: "/tracks",
  PLAYLISTS: "/playlists",
  SIGNIN: "sign-in",
};

export const routes = [
  {
    path: "/",
    exact: true,
    component: lazy(() => import("../pages/Home")),
    fallback: <Loader />,
    children: [
      {
        path: ROUTES.TRACKS,
        component: lazy(() => import("../components/Tracks")),
        // layout: lazy(() => import("../pages/Home")),
        fallback: <Loader />,
      },
      {
        exact: true,
        path: ROUTES.PLAYLISTS,
        component: lazy(() => import("../components/Playlists")),
        // layout: lazy(() => import("../pages/Home")),
        fallback: <Loader />,
      },
      {
        path: `${ROUTES.PLAYLISTS}/:id`,
        component: lazy(() => import("../components/Playlists/Playlist")),
        // layout: lazy(() => import("../pages/Home")),
        fallback: <Loader />,
      },
    ],
  },
  {
    path: "*",
    component: lazy(() => import("../pages/NotFound")),
    fallback: <Loader />,
  },
];

export default ROUTES;
