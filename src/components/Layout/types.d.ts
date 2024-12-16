import React from "react";

export interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  fullWidth?: boolean;
  simple?: boolean;
}

export interface NavLinkType {
  link: string;
  title: string;
}
