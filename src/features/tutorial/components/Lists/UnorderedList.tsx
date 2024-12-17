import React from "react";

export interface ListProps {
  children: React.ReactNode;
}

const UnorderedList = ({ children }: ListProps) => {
  return (
    <ul className="text-caption mb-1.5 list-inside list-disc space-y-0.5">
      {children}
    </ul>
  );
};

export default UnorderedList;
