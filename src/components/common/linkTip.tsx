import React from "react";

interface LinkTipProps {
  show: boolean;
  text: string;
  className?: string;
}

const LinkTip: React.FC<LinkTipProps> = ({ show, text, className }) => (
  <span
    className={`select-none ml-3 text-base text-[var(--sub2)] align-middle font-normal transition-opacity duration-500 text-shadow-custom ${
      show ? "opacity-100" : "opacity-0"
    } ${className || ""}`}
  >
    {text}
  </span>
);

export default LinkTip;
