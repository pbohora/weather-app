import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { Layout } from "../shared/components/Layout";
import WeatherDashboard from "../features/weatherDashboard";
import NotFound from "../shared/components/NotFound";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={null}>
            <WeatherDashboard />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
