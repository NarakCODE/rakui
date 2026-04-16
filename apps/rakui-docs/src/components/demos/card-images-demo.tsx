"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const cards = [
  {
    title: "Mountain Landscape",
    description: "Beautiful mountain view at sunset",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
  },
  {
    title: "Ocean Waves",
    description: "Peaceful ocean waves on a sunny day",
    image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&h=250&fit=crop",
  },
  {
    title: "Forest Path",
    description: "Serene forest trail in autumn",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&fit=crop",
  },
];

export function CardImagesDemo() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <Card key={card.title} className="overflow-hidden">
          <img
            src={card.image}
            alt={card.title}
            className="h-48 w-full object-cover"
          />
          <CardHeader>
            <CardTitle>{card.title}</CardTitle>
            <CardDescription>{card.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Explore the beauty of nature with this stunning photography
              collection.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              View Details
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
