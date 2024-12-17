import React from "react";

import classNames from "classnames";

import { TitleProps } from "./MainTitle";

const SectionTitle = ({ id, children, className }: TitleProps) => {
  return (
    <h2
      id={id}
      className={classNames(
        "mb-3 text-2xl font-medium text-textPrimary",
        className,
      )}
    >
      {children}
    </h2>
  );
};

export default SectionTitle;
