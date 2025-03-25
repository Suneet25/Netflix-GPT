import React from "react";

type Props = { iconName: string; className?: string };

const Icon = ({ iconName, className }: Props) => {
  return (
    <span className={`material-symbols-outlined ${className}`}>{iconName}</span>
  );
};

export default Icon;
