import { ResAuthUser } from "@/types/ResAuthUser";

export function Navigation({ user }: { user: ResAuthUser | null }) {
  return (
    <header className="h-16 bg-blue-500 flex items-center px-4 shadow-md">
      {user?.username ?? "Username not found"}
    </header>
  );
}
