export type Size = "xs" | "sm" | "md" | "lg" | "xl";

export type Variant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "circle";

export type Status = "info" | "success" | "warning" | "danger" | "default";

export type NavItemType = {
  label: string;
  href: string;
  icon?: React.ReactNode;
  active?: boolean;
};
