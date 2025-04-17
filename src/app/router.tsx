import { createBrowserRouter } from "react-router-dom";
import { ROUTER_PATH } from "@/constants/router-path";
import ViewPage from "@/modules/konva-canvas/pages/view/view";
import NotFound from "@/pages/not-found/not-found";
import LoginPage from "@/modules/auth/pages/login-page/login-page";
import RegisterPage from "@/modules/auth/pages/register-page/register-page";

export const router = createBrowserRouter([
  {
    path: ROUTER_PATH.home,
    element: <ViewPage />,
  },
  {
    path: ROUTER_PATH.signin,
    element: <LoginPage />,
  },
  {
    path: ROUTER_PATH.signup,
    element: <RegisterPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
