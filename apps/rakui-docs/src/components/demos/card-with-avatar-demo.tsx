"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const users = [
  {
    name: "Alex Johnson",
    role: "Product Designer",
    status: "Online",
    initials: "AJ",
    image: "",
  },
  {
    name: "Sarah Chen",
    role: "Engineering Lead",
    status: "Away",
    initials: "SC",
    image: "",
  },
  {
    name: "Mike Ross",
    role: "Frontend Developer",
    status: "Offline",
    initials: "MR",
    image: "",
  },
];

export function CardWithAvatarDemo() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {users.map((user) => (
        <Card key={user.name}>
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar size="lg">
              <AvatarImage src={user.image} alt={user.name} />
              <AvatarFallback>{user.initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <CardTitle className="text-base">{user.name}</CardTitle>
              <CardDescription>{user.role}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span
                className={`size-2 rounded-full ${
                  user.status === "Online"
                    ? "bg-green-500"
                    : user.status === "Away"
                    ? "bg-amber-500"
                    : "bg-slate-400"
                }`}
              />
              <span className="text-sm text-muted-foreground">{user.status}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
