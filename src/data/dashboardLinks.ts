import { LayoutDashboard, UtensilsCrossed, ShoppingBag, Users, Settings, type LucideIcon } from "lucide-react";

export type NavLinkType = {
    id: string,
    name: string,
    path: string,
    icon: LucideIcon
}

export const links = [
  {
    id: "1",
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "2",
    name: "Restaurant Menu",
    path: "/dashboard/menu",
    icon: UtensilsCrossed,
  },
  {
    id: "3",
    name: "Orders",
    path: "/dashboard/orders",
    icon: ShoppingBag,
  },
  {
    id: "4",
    name: "Staff",
    path: "/dashboard/staff",
    icon: Users,
  },
  {
    id:"5",
    name:"Settings",
    path:"/dashboard/settings",
    icon: Settings
  }
];