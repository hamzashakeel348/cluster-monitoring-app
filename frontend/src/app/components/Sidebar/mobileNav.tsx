import React from "react";
import Image from "next/image";
import clusterIcon from "../../../assets/logo.png";

const MobileNav = ({
  isNavOpen,
  setIsNavOpen,
  pathname,
  name,
}: {
  isNavOpen: boolean;
  setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pathname: string;
  name: string;
}) => {
  return (
    <section className="flex lg:hidden ps-8 pt-8">
      <div className="space-y-2" onClick={() => setIsNavOpen((prev) => !prev)}>
        <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
        <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
        <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
      </div>

      <div
        className={`${
          isNavOpen ? "flex" : "hidden"
        } flex-col items-center justify-center fixed top-0 left-0 w-full h-full bg-gray-800 z-50`}
      >
        <div
          className="absolute top-0 right-0 p-8"
          onClick={() => setIsNavOpen(false)}
        >
          <svg
            className="h-8 w-8 text-gray-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>
        <div className="flex items-center m-4 p-6">
          <Image src={clusterIcon} alt="Cluster Icon" width={30} />
          <div className="text-lg font-bold ml-2">{name}</div>
        </div>
        <ul>
          <li
            className={`mb-6 relative ${pathname === "/" ? "bg-gray-900" : ""}`}
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
            className={`relative ${
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
      </div>
    </section>
  );
};

export default MobileNav;
