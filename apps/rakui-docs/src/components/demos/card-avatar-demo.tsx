"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function CardAvatarDemo() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <CardTitle>shadcn</CardTitle>
              <CardDescription>@shadcn</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Creator of shadcn/ui and maintainer of various open source projects.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full">
            Follow
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://github.com/rauchg.png" />
              <AvatarFallback>GR</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <CardTitle>Guillermo Rauch</CardTitle>
              <CardDescription>@rauchg</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            CEO at Vercel and creator of Next.js and Socket.io.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full">
            Follow
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://github.com/leerob.png" />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <CardTitle>Lee Robinson</CardTitle>
              <CardDescription>@leerob</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            VP of Product at Vercel and advocate for developers.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full">
            Follow
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
