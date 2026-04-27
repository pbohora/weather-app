import { Navbar } from "../Navbar";
import styles from "./Layout.module.scss";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
