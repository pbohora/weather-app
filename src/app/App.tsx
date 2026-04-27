import { RouterProvider } from "react-router-dom";
import { Providers } from "./providers";
import { router } from "./router";
import "../styles/global.scss";

export default function App() {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
}
