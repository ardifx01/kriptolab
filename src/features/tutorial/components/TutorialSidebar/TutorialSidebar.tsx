import React from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import classNames from "classnames";

import { TUTORIAL_MENU } from "../../constant";

const TutorialSidebar = () => {
  const { pathname } = useRouter();

  return (
    <div className="relative">
      <aside className="sticky top-28 min-w-[300px] space-y-3">
        {TUTORIAL_MENU.map((menu) => (
          <Link
            href={menu.link}
            key={menu.title}
            className={classNames(
              "flex items-center rounded-lg px-4 py-3 font-medium",
              pathname === menu.link
                ? "bg-cardBackground text-textPrimary"
                : "text-textSecondary",
            )}
          >
            {menu.title}
          </Link>
        ))}
      </aside>
    </div>
  );
};

export default TutorialSidebar;
