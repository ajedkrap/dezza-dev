"use client";

import { useNavigationMode } from "@/hooks/useNavigationMode";
import SidebarNav from "./SidebarNav";
import BottomTabNav from "./BottomTabNav";
import TopBarNav from "./TopBarNav";

const GlassNav = () => {
  const mode = useNavigationMode();

  switch (mode) {
    case "sidebar":
      return <SidebarNav />;
    case "bottom-tab":
      return <BottomTabNav />;
    case "top-bar":
      return <TopBarNav />;
  }
};

export default GlassNav;
