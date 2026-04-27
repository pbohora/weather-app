import { RouterProvider } from "react-router-dom";
import { Providers } from "./providers";
import { router } from "./router";
import "../styles/global.scss";
import { ErrorBoundary } from "../shared/components/ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <Providers>
        <RouterProvider router={router} />
      </Providers>
    </ErrorBoundary>
  );
}
