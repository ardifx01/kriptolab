import React from "react";

interface ParagraphProps {
  children: React.ReactNode;
}

const Paragraph = ({ children }: ParagraphProps) => {
  return (
    <p className="text-caption mb-2 max-w-[800px] text-justify">{children}</p>
  );
};

export default Paragraph;
