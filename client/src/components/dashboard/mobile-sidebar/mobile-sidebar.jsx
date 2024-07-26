"use client";
import { MenuData } from "@/data/menu";
import useStatus from "@/hooks/useStatus";
import { MenuIcon, X } from "lucide-react";
import { useEffect, useRef } from "react";
import Menu from "../sidebar/menu";
import Logo from "@/components/public/header/logo";

const MobileSidebar = () => {
  const { status, toggleStatus } = useStatus();
  const asideRef = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (!asideRef.current) {
        return;
      }
      if (!asideRef.current.contains(event.target)) {
        toggleStatus();
      }
    };
    document.addEventListener("click", handler, true);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  return (
    <div className="block sm:hidden">
      <button onClick={toggleStatus}>{!status ? <MenuIcon /> : <X />}</button>
      {status && (
        <aside
          ref={asideRef}
          className="sidebar fixed inset-0 z-10 overflow-y-auto bg-white max-w-44 px-2 py-2 divide-y-2 grid grid-row-6 border-r-2 border-gray-200 md:hidden"
        >
          <Logo href={"/dashboard/home"} />
          <Menu menu={MenuData} />
        </aside>
      )}
    </div>
  );
};

export default MobileSidebar;
