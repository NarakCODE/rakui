"use client";

import { Users } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/ui/avatar-group";

const teamMembers = [
  { name: "Alice", fallback: "AL", src: "https://github.com/shadcn.png" },
  { name: "Bob", fallback: "BO", src: "https://github.com/ethanniser.png" },
  { name: "Charlie", fallback: "CH", src: "https://github.com/rauchg.png" },
  { name: "Diana", fallback: "DI", src: "https://github.com/leerob.png" },
  { name: "Eve", fallback: "EV" },
  { name: "Frank", fallback: "FR" },
  { name: "Grace", fallback: "GR" },
];

export function AvatarGroupCustomOverflowDemo() {
  return (
    <div className="flex flex-col gap-8">
      {/* Custom Overflow with Avatar */}
      <div className="flex flex-col gap-3">
        <h3 className="font-medium text-sm">Custom Overflow (Avatar Style)</h3>
        <AvatarGroup
          max={4}
          renderOverflow={(count) => (
            <Avatar>
              <AvatarFallback className="bg-primary text-primary-foreground">
                +{count}
              </AvatarFallback>
            </Avatar>
          )}
        >
          {teamMembers.map((member, index) => (
            <Avatar key={index}>
              <AvatarImage src={member.src} />
              <AvatarFallback>{member.fallback}</AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>
      </div>

      {/* Custom Overflow with Icon */}
      <div className="flex flex-col gap-3">
        <h3 className="font-medium text-sm">Custom Overflow (With Icon)</h3>
        <AvatarGroup
          max={3}
          renderOverflow={(count) => (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="ml-0.5 text-xs font-medium text-muted-foreground">
                +{count}
              </span>
            </div>
          )}
        >
          {teamMembers.map((member, index) => (
            <Avatar key={index}>
              <AvatarImage src={member.src} />
              <AvatarFallback>{member.fallback}</AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>
      </div>

      {/* Custom Overflow with Tooltip */}
      <div className="flex flex-col gap-3">
        <h3 className="font-medium text-sm">
          Custom Overflow (Interactive)
        </h3>
        <AvatarGroup
          max={4}
          renderOverflow={(count) => (
            <button
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
              title={`View ${count} more members`}
            >
              +{count}
            </button>
          )}
        >
          {teamMembers.map((member, index) => (
            <Avatar key={index}>
              <AvatarImage src={member.src} />
              <AvatarFallback>{member.fallback}</AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>
      </div>

      {/* Custom Overflow with Gradient */}
      <div className="flex flex-col gap-3">
        <h3 className="font-medium text-sm">Custom Overflow (Gradient)</h3>
        <AvatarGroup
          max={3}
          renderOverflow={(count) => (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-xs font-medium text-white shadow-lg">
              +{count}
            </div>
          )}
        >
          {teamMembers.map((member, index) => (
            <Avatar key={index}>
              <AvatarImage src={member.src} />
              <AvatarFallback>{member.fallback}</AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>
      </div>
    </div>
  );
}
