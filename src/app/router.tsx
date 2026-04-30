/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Layout } from '../shared/components/Layout';
import NotFound from '../shared/components/NotFound';
import WeatherSkeleton from '../features/weatherDashboard/components/WeatherSkeleton';

const WeatherDashboard = lazy(() => import('../features/weatherDashboard'));

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<WeatherSkeleton />}>
            <WeatherDashboard />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
