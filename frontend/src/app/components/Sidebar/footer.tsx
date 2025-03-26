import React from "react";

const Footer = () => {
  return (
    <footer className="hidden lg:flex items-center text-white mb-4 relative w-[90%] pt-3 border-t border-[#0Ea5e977]">
      <div className="flex items-center justify-center w-10 h-10 bg-[#0Ea5e977] rounded-full mr-2">
        <span className="text-white font-bold">H</span>
      </div>
      <span>Hamza</span>
      <div className="absolute bottom-0 right-0">
        <button className="text-gray-400 hover:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
