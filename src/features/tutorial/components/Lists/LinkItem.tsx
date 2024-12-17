import React from "react";

import Link from "next/link";

const LinkItem = ({
  children,
  link,
}: {
  children: React.ReactNode;
  link: string;
}) => {
  return (
    <li className="ml-2">
      <Link href={link} className="text-secondaryAccent hover:underline">
        {children}
      </Link>
    </li>
  );
};

export default LinkItem;
