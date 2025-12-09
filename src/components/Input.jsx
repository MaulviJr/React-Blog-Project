import React, { forwardRef, useId } from "react";

const Input = forwardRef(
  ({ label, type = "text", className = "", ...props }, ref) => {
    const id = useId(); // ✅ fixed: should be a function call

    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-black"
          >
            {label}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          type={type}
          className={`px-4 py-2 rounded-lg border border-gray-300 
                      focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                      outline-none transition-all duration-200 
                       ${className}`}
          {...props}
        />
      </div>
    );
  }
);

export default Input;
