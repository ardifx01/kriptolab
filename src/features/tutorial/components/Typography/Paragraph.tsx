import React from "react";

import classNames from "classnames";

interface ParagraphProps {
  children: React.ReactNode;
  className?: string;
}

const Paragraph = ({ children, className }: ParagraphProps) => {
  return (
    <p
      className={classNames(
        "mb-2 max-w-[800px] text-justify text-caption",
        className,
      )}
    >
      {children}
    </p>
  );
};

export default Paragraph;
