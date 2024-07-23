import { ReactNode } from "react";

export interface INavItems {
  children: ReactNode, 
  onClick?: () => void;
  navLink: string
}

