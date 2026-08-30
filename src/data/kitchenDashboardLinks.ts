import { ChefHat, ClipboardList } from "lucide-react";
import type { NavLinkType } from "./dashboardLinks";

export const kitchenLinks = (restaurant: string): NavLinkType[] => {
  return [
    {
      id: "1",
      name: "Kitchen",
      path: `/restaurant/${restaurant}/kitchen`,
      icon: ChefHat,
    },
    {
      id: "2",
      name: "Orders",
      path: `/restaurant/${restaurant}/orders`,
      icon: ClipboardList,
    },
  ];
};
