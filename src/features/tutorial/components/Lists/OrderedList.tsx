import React from "react";

import { ListProps } from "./UnorderedList";

const OrderedList = ({ children }: ListProps) => {
  return (
    <ol className="text-caption mb-1.5 list-inside list-decimal space-y-0.5">
      {children}
    </ol>
  );
};

export default OrderedList;
