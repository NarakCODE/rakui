"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldGroup,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export function CardWithFormDemo() {
  const [agreed, setAgreed] = useState(false);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>
          Enter your details to create a new account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel>Full Name</FieldLabel>
            <Input placeholder="John Doe" />
          </Field>

          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input type="email" placeholder="john@example.com" />
            <FieldDescription>
              We&apos;ll never share your email with anyone.
            </FieldDescription>
          </Field>

          <Field>
            <FieldLabel>Password</FieldLabel>
            <Input type="password" placeholder="••••••••" />
          </Field>

          <Field orientation="horizontal" className="items-start gap-3">
            <Checkbox
              id="terms"
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked === true)}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept terms
              </label>
              <p className="text-sm text-muted-foreground">
                I agree to the terms of service and privacy policy.
              </p>
            </div>
          </Field>

          <Button className="w-full" isDisabled={!agreed}>
            Create Account
          </Button>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
