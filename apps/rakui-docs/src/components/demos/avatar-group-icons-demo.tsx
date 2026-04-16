"use client";

import { Globe, Mail, Plus, Star, Users } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/ui/avatar-group";

export function AvatarGroupIconsDemo() {
  return (
    <div className="flex flex-col gap-8">
      {/* Avatar with Action Icons */}
      <div className="flex flex-col gap-3">
        <h3 className="font-medium text-sm">With Action Icons</h3>
        <div className="flex items-center gap-4">
          <AvatarGroup max={3}>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://github.com/ethanniser.png" />
              <AvatarFallback>EN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://github.com/rauchg.png" />
              <AvatarFallback>GR</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>+2</AvatarFallback>
            </Avatar>
          </AvatarGroup>
          <button className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-dashed border-muted-foreground/30 text-muted-foreground transition-colors hover:border-primary hover:text-primary">
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Icon-only Group */}
      <div className="flex flex-col gap-3">
        <h3 className="font-medium text-sm">Icon-only Group</h3>
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
            <Users className="h-5 w-5" />
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300">
            <Star className="h-5 w-5" />
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300">
            <Globe className="h-5 w-5" />
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300">
            <Mail className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Mixed Avatars and Icons */}
      <div className="flex flex-col gap-3">
        <h3 className="font-medium text-sm">Mixed Avatars and Icons</h3>
        <AvatarGroup max={4}>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/ethanniser.png" />
            <AvatarFallback>EN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/rauchg.png" />
            <AvatarFallback>GR</AvatarFallback>
          </Avatar>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Plus className="h-5 w-5" />
          </div>
        </AvatarGroup>
      </div>

      {/* Status Indicators */}
      <div className="flex flex-col gap-3">
        <h3 className="font-medium text-sm">With Status Indicators</h3>
        <AvatarGroup max={3}>
          <div className="relative">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-background bg-green-500" />
          </div>
          <div className="relative">
            <Avatar>
              <AvatarImage src="https://github.com/ethanniser.png" />
              <AvatarFallback>EN</AvatarFallback>
            </Avatar>
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-background bg-yellow-500" />
          </div>
          <div className="relative">
            <Avatar>
              <AvatarImage src="https://github.com/rauchg.png" />
              <AvatarFallback>GR</AvatarFallback>
            </Avatar>
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-background bg-gray-400" />
          </div>
          <Avatar>
            <AvatarFallback>+2</AvatarFallback>
          </Avatar>
        </AvatarGroup>
      </div>
    </div>
  );
}
