import type { User } from "@/lib/auth";

export function isAdmin(user: User | null | undefined): boolean {
  return !!user && user.role === "Administrador";
}

export default isAdmin;
