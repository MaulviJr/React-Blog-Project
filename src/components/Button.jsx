import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`
        ${bgColor} ${textColor} ${className}
        px-5 py-2 rounded-lg font-medium
        shadow-sm hover:shadow-md
        transition-all duration-200 ease-in-out
        hover:brightness-110 active:scale-95
        focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500
      `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
