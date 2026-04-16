"use client";

import {
  SpinnerIcon,
  EnvelopeIcon,
  PlusIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import * as React from "react";
import { Button } from "@/components/ui/button";

export function ButtonDemo() {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Variants */}
      <div className="flex flex-wrap items-center gap-3">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="danger-soft">Danger Soft</Button>
      </div>

      {/* Sizes */}
      <div className="flex items-center gap-3">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>

      {/* With Icons */}
      <div className="flex flex-wrap items-center gap-3">
        <Button>
          <EnvelopeIcon />
          Email
        </Button>
        <Button variant="secondary">
          <PlusIcon />
          Add
        </Button>
        <Button variant="danger">
          <TrashIcon />
          Delete
        </Button>
      </div>

      {/* Icon Only */}
      <div className="flex items-center gap-3">
        <Button isIconOnly variant="tertiary">
          <EnvelopeIcon />
        </Button>
        <Button isIconOnly variant="secondary">
          <PlusIcon />
        </Button>
        <Button isIconOnly variant="danger">
          <TrashIcon />
        </Button>
      </div>

      {/* Loading State */}
      <div className="flex flex-wrap items-center gap-3">
        <Button isPending>
          {({ isPending }) => (
            <>
              {isPending ? <SpinnerIcon className="animate-spin" /> : null}
              Loading...
            </>
          )}
        </Button>
        <Button isPending={isLoading} onPress={handleLoading}>
          {({ isPending }) => (
            <>
              {isPending ? <SpinnerIcon className="animate-spin" /> : <PlusIcon />}
              {isPending ? "Saving..." : "Save Changes"}
            </>
          )}
        </Button>
      </div>

      {/* Disabled */}
      <div className="flex flex-wrap items-center gap-3">
        <Button isDisabled>Disabled</Button>
        <Button isDisabled variant="secondary">
          Secondary
        </Button>
        <Button isDisabled variant="outline">
          Outline
        </Button>
      </div>

      {/* Full Width */}
      <div className="w-full max-w-xs">
        <Button fullWidth>Full Width</Button>
      </div>
    </div>
  );
}
