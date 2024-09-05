import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", placeholder = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="group w-full mt-8 relative">
      {label && (
        <label
          className="absolute text-lg text-gray-400 top-1 left-4 transform -translate-y-1/2 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-1/2  placeholder-shown:text-black peer-focus:top-0 peer-valid:top-0"
          htmlFor={id}
        >
          {label}
        </label>
      )}

      <input
        type={type}
        className={`peer px-3 py-5 rounded-xl bg-white text-xl text-black outline-none 
                    focus:bg-gray-50 focus:border-gray-400 duration-200 border border-gray-200 w-full ${className}`}
        ref={ref}
        {...props}
        id={id}
        placeholder={`${placeholder}`}
      />
    </div>
  );
});

export default Input;
