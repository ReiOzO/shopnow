import {
  ChartNoAxesCombined,
    LayoutDashboard,
    MessageCircleCode,
    Newspaper,
    Shapes,
    ShieldCheck,
    ShoppingBag,
    Tag,
    UsersRound,
  } from "lucide-react";
  
  export const navLinks = [
    {
      url: "/",
      icon: <LayoutDashboard />,
      label: "Dashboard",
    },
    {
      url: "/collections",
      icon: <Shapes />,
      label: "Collections",
    },
    {
      url: "/products",
      icon: <Tag />,
      label: "Products",
    },
    {
      url: "/orders",
      icon: <ShoppingBag />,
      label: "Orders",
    },
    {
      url: "/reviews",
      icon: <MessageCircleCode />,
      label: "Reviews",
    },
    {
      url: "/articles",
      icon: <Newspaper />,
      label: "Articles",
    },
    {
      url: "/statistics",
      icon: <ChartNoAxesCombined />,
      label: "Statistics",
    },
    {
      url: "/customers",
      icon: <UsersRound />,
      label: "Customers",
    },
    {
      url: "/",
      icon: <ShieldCheck />,
      label: "Admin",
    },
  ];