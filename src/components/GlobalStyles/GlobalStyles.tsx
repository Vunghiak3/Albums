import type { ReactNode } from "react";
import "./GlobalStyles.css";

interface GlobalStylesProps {
  children: ReactNode;
}

function GlobalStyles({ children }: GlobalStylesProps) {
  return children;
}

export default GlobalStyles;
