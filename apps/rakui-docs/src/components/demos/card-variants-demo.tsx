import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CardVariantsDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <Card className="w-full max-w-sm" variant="default">
        <CardHeader>
          <CardTitle>Default Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>The default card variant for most use cases</p>
        </CardContent>
      </Card>

      <Card className="w-full max-w-sm" variant="transparent">
        <CardHeader>
          <CardTitle>Transparent Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Card with no background or border.</p>
        </CardContent>
      </Card>

      <Card className="w-full max-w-sm" variant="secondary">
        <CardHeader>
          <CardTitle>Secondary Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Card with secondary background color.</p>
        </CardContent>
      </Card>

      <Card className="w-full max-w-sm" variant="tertiary">
        <CardHeader>
          <CardTitle>Tertiary Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Card with muted background color.</p>
        </CardContent>
      </Card>
    </div>
  );
}
