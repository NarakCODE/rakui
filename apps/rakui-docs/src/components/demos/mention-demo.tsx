"use client";

import * as React from "react";
import {
  MentionRoot,
  MentionLabel,
  MentionInput,
  MentionPortal,
  MentionContent,
  MentionItem,
} from "@/components/ui/mention";

const users = [
  {
    id: "1",
    name: "Olivia Martin",
    email: "olivia@email.com",
  },
  {
    id: "2",
    name: "Isabella Nguyen",
    email: "isabella@email.com",
  },
  {
    id: "3",
    name: "Emma Wilson",
    email: "emma@email.com",
  },
  {
    id: "4",
    name: "Jackson Lee",
    email: "jackson@email.com",
  },
  {
    id: "5",
    name: "William Kim",
    email: "will@email.com",
  },
];

export function MentionDemo() {
  return (
    <MentionRoot className="w-full max-w-[400px] **:data-tag:rounded **:data-tag:bg-blue-200 **:data-tag:py-px **:data-tag:text-blue-950 dark:**:data-tag:bg-blue-800 dark:**:data-tag:text-blue-50">
      <MentionLabel>Mention users</MentionLabel>
      <MentionInput
        placeholder="Type @ to mention someone..."
        asChild
      >
        <textarea />
      </MentionInput>
      <MentionPortal>
        <MentionContent>
          {users.map((user) => (
            <MentionItem
              key={user.id}
              value={user.name}
            >
              <span className="text-sm">{user.name}</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                {user.email}
              </span>
            </MentionItem>
          ))}
        </MentionContent>
      </MentionPortal>
    </MentionRoot>
  );
}
