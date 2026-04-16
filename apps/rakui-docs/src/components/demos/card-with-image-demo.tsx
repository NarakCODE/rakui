"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CurrencyDollar, X } from "@phosphor-icons/react";
import Link from "next/link";

export function CardWithImageDemo() {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="grid w-full max-w-2xl grid-cols-12 gap-4 p-4">
        {/* Row 1: Large Product Card - Available Soon */}
        <Card className="col-span-12 flex h-auto min-h-38 flex-col sm:flex-row">
          <div className="relative h-35 w-full shrink-0 overflow-hidden rounded-2xl sm:h-35 sm:w-35">
            <img
              alt="Cherries"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover select-none"
              loading="lazy"
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/cherries.jpeg"
            />
          </div>
          <div className="flex flex-1 flex-col gap-3 p-4 sm:p-0 sm:pl-4">
            <CardHeader className="gap-1 p-0 relative">
              <CardTitle className="pr-8 text-base">
                Become an ACME Creator!
              </CardTitle>
              <CardDescription>
                Lorem ipsum dolor sit amet consectetur. Sed arcu donec id
                aliquam dolor sed amet faucibus etiam.
              </CardDescription>
              <button
                aria-label="Close banner"
                className="absolute top-0 right-0 inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </CardHeader>
            <div className="mt-auto flex w-full flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">
                  Only 10 spots
                </span>
                <span className="text-xs text-muted-foreground">
                  Submission ends Oct 10.
                </span>
              </div>
              <Button size="sm" className="w-full sm:w-auto">
                Apply Now
              </Button>
            </div>
          </div>
        </Card>

        {/* Row 2 */}
        <div className="col-span-12 grid grid-cols-12 gap-4">
          {/* Left Column */}
          <div className="col-span-12 grid grid-cols-12 gap-4 lg:col-span-6">
            {/* Top Card */}
            <Card className="col-span-12 relative">
              <div className="absolute top-3 right-3 z-10">
                <button
                  aria-label="Close notification"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              </div>
              <CardHeader className="gap-3">
                <div className="flex items-start gap-3">
                  <CurrencyDollar
                    aria-label="Dollar sign icon"
                    className="size-8 shrink-0 text-green-500"
                    role="img"
                  />
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-medium uppercase text-muted-foreground">
                      PAYMENT
                    </span>
                    <CardTitle className="pr-8 text-sm sm:text-base">
                      You can now withdraw on crypto
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Add your wallet in settings to withdraw
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <div className="px-6 pb-6">
                <Link
                  aria-label="Go to settings"
                  href="#"
                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  Go to settings
                </Link>
              </div>
            </Card>
            {/* Bottom cards */}
            <div className="col-span-12 grid grid-cols-12 gap-4">
              {/* Left Card */}
              <Card className="col-span-12 gap-2 sm:col-span-6">
                <CardHeader>
                  <Avatar size="lg" className="rounded-xl">
                    <AvatarImage
                      alt="Demo 1"
                      src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo1.jpg"
                    />
                    <AvatarFallback>JK</AvatarFallback>
                  </Avatar>
                </CardHeader>
                <CardContent className="mt-1">
                  <p className="text-sm font-medium leading-4">Indie Hackers</p>
                  <p className="text-xs text-muted-foreground">148 members</p>
                </CardContent>
                <div className="flex items-center gap-2 px-6 pb-6">
                  <Avatar size="xs">
                    <AvatarImage
                      alt="John"
                      src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg"
                    />
                    <AvatarFallback>JK</AvatarFallback>
                  </Avatar>
                  <p className="text-xs text-muted-foreground">By John</p>
                </div>
              </Card>
              {/* Right Card */}
              <Card className="col-span-12 gap-2 sm:col-span-6">
                <CardHeader>
                  <Avatar size="lg" className="rounded-xl">
                    <AvatarImage
                      alt="Demo 2"
                      src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo2.jpg"
                    />
                    <AvatarFallback>AB</AvatarFallback>
                  </Avatar>
                </CardHeader>
                <CardContent className="mt-1">
                  <p className="text-sm font-medium leading-4">AI Builders</p>
                  <p className="text-xs text-muted-foreground">362 members</p>
                </CardContent>
                <div className="flex items-center gap-2 px-6 pb-6">
                  <Avatar size="xs">
                    <AvatarImage
                      alt="Martha"
                      src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
                    />
                    <AvatarFallback>M</AvatarFallback>
                  </Avatar>
                  <p className="text-xs text-muted-foreground">By Martha</p>
                </div>
              </Card>
            </div>
          </div>
          {/* Right Column */}
          <Card className="col-span-12 min-h-50 overflow-hidden rounded-3xl lg:col-span-6 relative">
            {/* Background image */}
            <img
              alt="NEO Home Robot"
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/neo2.jpeg"
            />

            {/* Header */}
            <CardHeader className="relative z-10">
              <CardTitle className="text-xs font-semibold tracking-wide text-black/70">
                NEO
              </CardTitle>
              <CardDescription className="text-sm font-medium text-black/50">
                Home Robot
              </CardDescription>
            </CardHeader>

            {/* Footer */}
            <div className="relative z-10 mt-auto flex items-center justify-between p-6">
              <div>
                <div className="text-sm font-medium text-black">
                  Available soon
                </div>
                <div className="text-xs text-black/60">Get notified</div>
              </div>
              <Button
                size="sm"
                variant="secondary"
                className="bg-white text-black hover:bg-white/90"
              >
                Notify me
              </Button>
            </div>
          </Card>
        </div>

        {/* Row 3 */}
        <div className="col-span-12 grid grid-cols-12 gap-4">
          {/* Left Column: Card */}
          <Card className="relative col-span-12 h-62.5 sm:h-75 md:col-span-8 md:h-87.5 overflow-hidden">
            <img
              alt="NEO Home Robot"
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/neo1.jpeg"
            />

            <div className="relative z-10 mt-auto flex items-end justify-between p-6">
              <div>
                <div className="text-base font-medium text-black sm:text-lg">
                  NEO
                </div>
                <div className="text-xs font-medium text-black/50 sm:text-sm">
                  $499/m
                </div>
              </div>
              <Button
                size="sm"
                variant="secondary"
                className="bg-white text-black hover:bg-white/90"
              >
                Get now
              </Button>
            </div>
          </Card>

          {/* Right Column: Cards Stack */}
          <div className="col-span-12 flex flex-col gap-2 md:col-span-4 md:justify-between md:gap-0 md:py-2">
            {/* 1 */}
            <Card className="flex flex-row gap-3 p-1" variant="transparent">
              <img
                alt="Futuristic Robot"
                className="aspect-square h-16 w-16 shrink-0 select-none rounded-xl object-cover sm:h-20 sm:w-20"
                loading="lazy"
                src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/robot1.jpeg"
              />
              <div className="flex flex-1 flex-col justify-center gap-1">
                <CardTitle className="text-sm">Bridging the Future</CardTitle>
                <CardDescription className="text-xs">
                  Today, 6:30 PM
                </CardDescription>
              </div>
            </Card>
            {/* 2 */}
            <Card className="flex flex-row gap-3 p-1" variant="transparent">
              <img
                alt="Avocado"
                className="aspect-square h-16 w-16 shrink-0 select-none rounded-xl object-cover sm:h-20 sm:w-20"
                loading="lazy"
                src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/avocado.jpeg"
              />
              <div className="flex flex-1 flex-col justify-center gap-1">
                <CardTitle className="text-sm">Avocado Hackathon</CardTitle>
                <CardDescription className="text-xs">
                  Wed, 4:30 PM
                </CardDescription>
              </div>
            </Card>
            {/* 3 */}
            <Card className="flex flex-row gap-3 p-1" variant="transparent">
              <img
                alt="Sound Electro event"
                className="aspect-square h-16 w-16 shrink-0 select-none rounded-xl object-cover sm:h-20 sm:w-20"
                loading="lazy"
                src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/oranges.jpeg"
              />
              <div className="flex flex-1 flex-col justify-center gap-1">
                <CardTitle className="text-sm">
                  Sound Electro | Beyond art
                </CardTitle>
                <CardDescription className="text-xs">
                  Fri, 8:00 PM
                </CardDescription>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
