import React from "react";

import classNames from "classnames";

export interface TitleProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
}

const MainTitle = ({ id, children, className }: TitleProps) => {
  return (
    <h1
      id={id}
      className={classNames(
        "mb-3 text-3xl font-semibold text-textPrimary",
        className,
      )}
    >
      {children}
    </h1>
  );
};

export default MainTitle;
