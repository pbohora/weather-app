import { ErrorBoundary } from "../ErrorBoundary";
import { Navbar } from "../Navbar";
import styles from "./Layout.module.scss";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className={styles.layout}>
      <ErrorBoundary>
        <Navbar />
        <main className={styles.main}>
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </main>
      </ErrorBoundary>
    </div>
  );
}
