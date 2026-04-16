"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/ui/avatar-group";

const allUsers = [
  { name: "User 1", fallback: "U1", src: "https://github.com/shadcn.png" },
  { name: "User 2", fallback: "U2", src: "https://github.com/ethanniser.png" },
  { name: "User 3", fallback: "U3", src: "https://github.com/rauchg.png" },
  { name: "User 4", fallback: "U4", src: "https://github.com/leerob.png" },
  { name: "User 5", fallback: "U5", src: "https://github.com/evilrabbit.png" },
  { name: "User 6", fallback: "U6" },
  { name: "User 7", fallback: "U7" },
  { name: "User 8", fallback: "U8" },
  { name: "User 9", fallback: "U9" },
  { name: "User 10", fallback: "U10" },
];

export function AvatarGroupTruncationDemo() {
  return (
    <div className="flex flex-col gap-8">
      {/* No Truncation */}
      <div className="flex flex-col gap-3">
        <h3 className="font-medium text-sm">No Truncation (5 avatars)</h3>
        <AvatarGroup>
          {allUsers.slice(0, 5).map((user, index) => (
            <Avatar key={index}>
              <AvatarImage src={user.src} />
              <AvatarFallback>{user.fallback}</AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>
      </div>

      {/* Truncated to 3 */}
      <div className="flex flex-col gap-3">
        <h3 className="font-medium text-sm">Truncated to 3 (showing +7)</h3>
        <AvatarGroup max={3}>
          {allUsers.map((user, index) => (
            <Avatar key={index}>
              <AvatarImage src={user.src} />
              <AvatarFallback>{user.fallback}</AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>
      </div>

      {/* Truncated to 5 */}
      <div className="flex flex-col gap-3">
        <h3 className="font-medium text-sm">Truncated to 5 (showing +5)</h3>
        <AvatarGroup max={5}>
          {allUsers.map((user, index) => (
            <Avatar key={index}>
              <AvatarImage src={user.src} />
              <AvatarFallback>{user.fallback}</AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>
      </div>

      {/* Small avatars with truncation */}
      <div className="flex flex-col gap-3">
        <h3 className="font-medium text-sm">Small Size with Truncation</h3>
        <AvatarGroup max={4} size="sm">
          {allUsers.map((user, index) => (
            <Avatar key={index} size="sm">
              <AvatarFallback>{user.fallback}</AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>
      </div>
    </div>
  );
}
