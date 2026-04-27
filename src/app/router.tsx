import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { Layout } from "../shared/components/Layout";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={null}>
            <></>
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <div>404 — Page not found</div>,
  },
]);
