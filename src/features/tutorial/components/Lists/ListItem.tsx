import React from "react";

const ListItem = ({ children }: { children: React.ReactNode }) => {
  return <li className="ml-2">{children}</li>;
};

export default ListItem;
