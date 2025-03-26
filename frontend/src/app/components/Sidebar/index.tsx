"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import MobileNav from "./mobileNav";
import DesktopNav from "./desktopNav";
import Footer from "./footer";

const Sidebar: React.FC<{ name: string }> = ({ name }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex lg:items-center items-start flex-col lg:border-b  lg:bg-[#1b2129] flex-shrink-0 justify-between h-fit lg:h-screen border-r-[5px] border-black border-solid">
      <div>
        <nav>
          {/* MOBILE */}

          <MobileNav
            pathname={pathname}
            isNavOpen={isNavOpen}
            setIsNavOpen={setIsNavOpen}
            name={name}
          />

          <DesktopNav name={name} pathname={pathname} />
          {/* DESKTOP */}
        </nav>
      </div>
      <Footer />
    </div>
  );
};

export default Sidebar;
