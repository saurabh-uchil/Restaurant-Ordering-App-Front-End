import { ChefHat, ClipboardList, CookingPot, Plus, RefreshCcw, Users } from "lucide-react";

export const actions = [
  {
    title: "Add Menu Item",
    description: "Create a new menu item",
    icon: Plus,
    path: "/dashboard/menu/add",
  },
  {
    title: "Add Staff",
    description: "Invite restaurant staff",
    icon: Users,
    path: "/dashboard/staff",
  },
  {
    title: "View Orders",
    description: "Manage customer orders",
    icon: ClipboardList,
    path: "/dashboard/orders",
  },
  {
    title: "Kitchen Display",
    description: "View live kitchen orders",
    icon: ChefHat,
    path: "/dashboard/kitchen",
  },
];


export const statsMock = [
  {
    name: "Menu Items",
    stats: 32,
    icon: CookingPot,
    trend: "4 added this week",
    trendType: "positive" as const,
  },
  {
    name: "Staff",
    stats: 8,
    icon: Users,
    trend: "1 added this week",
    trendType: "positive" as const,
  },
  {
    name: "Orders Today",
    stats: 24,
    icon: ClipboardList,
    trend: "18% vs yesterday",
    trendType: "positive" as const,
  },
  {
    name: "Active Orders",
    stats: 5,
    icon: RefreshCcw,
    trend: "2 waiting · 3 preparing",
    trendType: "warning" as const,
  },
];