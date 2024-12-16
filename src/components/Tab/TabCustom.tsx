import React, { ReactNode, useState } from "react";

import { Tab, TabGroup, TabList, TabPanels } from "@headlessui/react";
import classNames from "classnames";

export interface TabCustomProps {
  /** to define header */
  tabs: string[];
  /** define tab content as list of Tab.Panels component
   * @example
   * ```js
   * <TabCustom>
        <Tab.Panel>Content 1</Tab.Panel>
        <Tab.Panel>Content 2</Tab.Panel>
   * </TabCustom>
   * ```
   */
  children: ReactNode;
  /** to listen change of the tabs */
  // eslint-disable-next-line no-unused-vars
  onChange?(index: number): void;
  defaultTabIndex?: number;
  /** only use this if want to make Controlled Tab */
  currentIndex?: number;
  /** for table tab use small size */
  className?: string;
  tabItemClassName?: string;
  tabPanelsClassName?: string;
  activeTabItemClassName?: string;
}

const TabCustom = ({
  tabs,
  children,
  className,
  defaultTabIndex = 0,
  tabItemClassName,
  tabPanelsClassName,
  currentIndex,
  activeTabItemClassName,
  onChange,
}: TabCustomProps) => {
  const [index, setIndex] = useState(defaultTabIndex);

  const usedIndex = currentIndex === undefined ? index : currentIndex;

  return (
    <TabGroup
      selectedIndex={usedIndex}
      defaultIndex={defaultTabIndex}
      onChange={(i) => {
        if (currentIndex === undefined) {
          setIndex(i);
        }
        onChange?.(i);
      }}
    >
      <TabList
        className={classNames(
          "text-h6 leading-h6 relative h-16 border-b-2 border-borderColor bg-cardBackground",
          className,
        )}
      >
        {tabs.map((t) => {
          return (
            <Tab
              key={t}
              className={classNames(
                "h-16 outline-none",
                tabItemClassName,
                t === tabs[usedIndex] ? activeTabItemClassName : "",
              )}
              style={{
                width: `${100 / tabs?.length}%`,
              }}
            >
              <div className="mb-0.5">{t}</div>
            </Tab>
          );
        })}
        <div
          className={classNames(
            "absolute bottom-0 h-0.5 bg-primaryAccent transition-all duration-300 ease-in-out",
          )}
          style={{
            width: `${100 / tabs?.length}%`,
            left: `${usedIndex * (100 / tabs?.length)}%`,
          }}
        />
      </TabList>
      <TabPanels className={tabPanelsClassName}>{children}</TabPanels>
    </TabGroup>
  );
};

export default TabCustom;
