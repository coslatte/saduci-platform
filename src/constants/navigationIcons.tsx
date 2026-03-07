import {
  FiActivity,
  FiBarChart2,
  FiHome,
  FiSettings,
  FiUsers,
} from "react-icons/fi";

export type NavigationIconKey =
  | "home"
  | "activity"
  | "barchart"
  | "users"
  | "settings";

export const NAVIGATION_ICON_REGISTRY = {
  home: FiHome,
  activity: FiActivity,
  barchart: FiBarChart2,
  users: FiUsers,
  settings: FiSettings,
} as const;
