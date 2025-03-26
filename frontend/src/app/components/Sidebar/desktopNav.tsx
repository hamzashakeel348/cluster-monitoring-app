import React from "react";
import Image from "next/image";
import clusterIcon from "../../../assets/logo.png";

interface DesktopNavProps {
  pathname?: string;
  name: string;
}

const DesktopNav = ({ pathname, name }: DesktopNavProps) => {
  return (
    <ul className="hidden lg:flex lg:flex-col lg:w-64">
      <a
        href="/"
        className="flex items-center m-4 p-1 pb-3 border-b border-[#0Ea5e977]"
      >
        <Image src={clusterIcon} alt="Cluster Icon" width={30} />
        <div className="text-lg font-bold ml-2">{name}</div>
      </a>
      <li
        className={`mb-1 ml-2 relative ${
          pathname === "/" ? "bg-gray-900" : ""
        }`}
      >
        <a
          href="/"
          className='flex items-center text-white block py-2 px-4 rounded relative before:content-["•"] before:mr-2'
        >
          Performance Metrics
        </a>
        {pathname === "/" && (
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-sky-500" />
        )}
      </li>

      <li
        className={`ml-2 relative ${
          pathname === "/snapshot-policy" ? "bg-gray-900" : ""
        }`}
      >
        <a
          href="/snapshot-policy"
          className='flex items-center text-white block py-2 px-4 rounded relative before:content-["•"] before:mr-2'
        >
          Edit Snapshot Policy
        </a>
        {pathname === "/snapshot-policy" && (
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-sky-500" />
        )}
      </li>
    </ul>
  );
};

export default DesktopNav;
