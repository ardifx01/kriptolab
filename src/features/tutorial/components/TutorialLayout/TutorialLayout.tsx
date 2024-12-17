import React from "react";

import classNames from "classnames";

import Layout from "@/components/Layout/Layout";

import TutorialSidebar from "../TutorialSidebar/TutorialSidebar";

interface TutorialLayoutProps {
  children: React.ReactNode;
  title: string;
  className?: string;
}

const TutorialLayout = ({
  children,
  title,
  className,
}: TutorialLayoutProps) => {
  return (
    <Layout title={title} className={classNames("flex gap-10", className)}>
      <TutorialSidebar />
      <div>{children}</div>
    </Layout>
  );
};

export default TutorialLayout;
