import { FileJson2, Heart, LayoutGrid, Trash } from "lucide-react";

export const MenuData = [
  {
    label: "All Snippets",
    icon: <LayoutGrid />,
    href: "/dashboard/home",
    path: "home",
  },
  {
    label: "Favorites",
    icon: <Heart />,
    href: "/dashboard/favorites",
    path: "favorites",
  },
  { label: "Trash", icon: <Trash />, href: "/dashboard/trash", path: "trash" },
];

export const oldMenu = [
  {
    type: "Quick Links",
    items: [
      {
        label: "All Snippets",
        icon: <LayoutGrid />,
        href: "/dashboard",
        path: "dashboard",
      },
      {
        label: "Favorites",
        icon: <Heart />,
        href: "/dashboard/favorites",
        path: "favorites",
      },
      {
        label: "Trash",
        icon: <Trash />,
        href: "/dashboard/trash",
        path: "trash",
      },
    ],
  },
  {
    type: "Languages",
    items: [
      {
        label: "Javascript",
        icon: <FileJson2 />,
        href: "/languages/javascript",
        path: "languages/javascript",
      },
      {
        label: "Python",
        icon: <FileJson2 />,
        href: "/languages/python",
        path: "languages/python",
      },
      {
        label: "C++",
        icon: <FileJson2 />,
        href: "/languages/c++",
        path: "languages/c++",
      },
    ],
  },
];
