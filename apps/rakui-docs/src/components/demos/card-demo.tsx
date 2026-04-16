"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function CardDemo() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Default Variant */}
      <Card variant="default">
        <CardHeader>
          <CardTitle>Default Card</CardTitle>
          <CardDescription>
            Standard card with background color.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This is the default card style used for most content.
          </p>
        </CardContent>
      </Card>

      {/* Transparent Variant */}
      <Card variant="transparent">
        <CardHeader>
          <CardTitle>Transparent Card</CardTitle>
          <CardDescription>
            Card with no background or border.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Useful for layouts where you want minimal visual weight.
          </p>
        </CardContent>
      </Card>

      {/* Secondary Variant */}
      <Card variant="secondary">
        <CardHeader>
          <CardTitle>Secondary Card</CardTitle>
          <CardDescription>
            Card with secondary background color.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground/80">
            Use for alternative sections or grouped content.
          </p>
        </CardContent>
      </Card>

      {/* Tertiary Variant */}
      <Card variant="tertiary">
        <CardHeader>
          <CardTitle>Tertiary Card</CardTitle>
          <CardDescription>
            Card with muted background color.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Subtle styling for less prominent content.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
