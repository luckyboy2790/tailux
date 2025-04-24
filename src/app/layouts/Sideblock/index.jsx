// Import Dependencies
import { Outlet } from "react-router";

// Local Imports
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

// ----------------------------------------------------------------------

export default function Sideblock() {
  return (
    <>
      <Header />
      <main className="main-content transition-content grid grid-cols-1">
        <Outlet />
      </main>
      <Sidebar />
    </>
  );
}
