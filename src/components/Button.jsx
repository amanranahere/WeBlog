import React from "react";

export default function Button({
  children,
  type = "button",
  bgColor = "",
  textColor = "",
  className = "",
  ...props
}) {
  return (
    <button
      className={`px-4 py-2 relative w-1/2 border-0 bg-gray-500/20 rounded-xl shadow-[inset_0_0_0_0_#333] transition ease-out duration-300 text-lg outline-none hover:shadow-[inset_300px_0_0_0_#333] hover:text-white cursor-pointer active:scale-90 ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
