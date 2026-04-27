import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={null}>
        <></>
      </Suspense>
    ),
  },
  {
    path: "*",
    element: <div>404 — Page not found</div>,
  },
]);
