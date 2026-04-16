"use client";

import { AvatarGroup } from "@/components/ui/avatar-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const users = [
  {
    id: "1",
    name: "Ali Hassan",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ali",
  },
  {
    id: "2",
    name: "Fatima Zahra",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima",
  },
  {
    id: "3",
    name: "Omar Khattab",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Omar",
  },
  {
    id: "4",
    name: "Aisha Bint",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha",
  },
  {
    id: "5",
    name: "Yusuf Islam",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yusuf",
  },
];

export function AvatarGroupRtlDemo() {
  return (
    <div className="flex flex-col gap-4" dir="rtl">
      <span className="text-sm font-medium text-muted-foreground">RTL Layout</span>
      <AvatarGroup>
        {users.map((user) => (
          <Avatar key={user.id}>
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        ))}
      </AvatarGroup>
    </div>
  );
}
