import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

function App() {
  return (
    <React.Fragment>
      <RouterProvider router={router}></RouterProvider>
    </React.Fragment>
  );
}

export default App;
