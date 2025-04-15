import { createBrowserRouter } from "react-router-dom";
import { ROUTER_PATH } from "@/constants/router-path";
import ViewPage from "@/modules/konva-canvas/pages/view/view";
import NotFound from "@/pages/not-found/not-found";

export const router = createBrowserRouter([
  {
    path: ROUTER_PATH.home,
    element: <ViewPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
