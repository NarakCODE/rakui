"use client";

import { CheckCircle, Info, Sparkle, Warning } from "@phosphor-icons/react";
import { Banner, BannerActions, BannerClose, BannerContent, BannerDescription, BannerIcon, Banners, BannerTitle, useBanners } from "@/components/ui/banner";
import { Button } from "@/components/ui/button";

function BannerLauncher() {
  const { onBannerAdd, onBannersClear } = useBanners();

  return (
    <div className="flex w-full max-w-lg flex-col gap-4">
      <div className="rounded-xl border border-dashed border-fd-border bg-fd-background/80 p-5">
        <Banner variant="info" className="rounded-lg border">
          <BannerIcon>
            <Info aria-hidden="true" className="size-4" />
          </BannerIcon>
          <BannerContent>
            <BannerTitle>Maintenance window scheduled</BannerTitle>
            <BannerDescription>
              The dashboard will restart at 02:00 UTC. Save your work before then.
            </BannerDescription>
          </BannerContent>
          <BannerActions>
            <Button size="sm" variant="secondary">
              View status
            </Button>
            <BannerClose />
          </BannerActions>
        </Banner>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          onClick={() =>
            onBannerAdd({
              variant: "success",
              content: ({ onClose }) => (
                <>
                  <BannerIcon>
                    <CheckCircle aria-hidden="true" className="size-4" />
                  </BannerIcon>
                  <BannerContent>
                    <BannerTitle>Deployment complete</BannerTitle>
                    <BannerDescription>
                      Production was updated successfully with zero failed checks.
                    </BannerDescription>
                  </BannerContent>
                  <BannerActions>
                    <Button size="sm" variant="secondary">
                      View release
                    </Button>
                    <BannerClose onClick={() => onClose()} />
                  </BannerActions>
                </>
              ),
              duration: 5000,
            })
          }
        >
          Success
        </Button>

        <Button
          size="sm"
          variant="secondary"
          onClick={() =>
            onBannerAdd({
              variant: "info",
              content: (
                <>
                  <BannerIcon>
                    <Sparkle aria-hidden="true" className="size-4" />
                  </BannerIcon>
                  <BannerContent>
                    <BannerTitle>New AI summaries available</BannerTitle>
                    <BannerDescription>
                      Turn long release notes into shareable summaries with one click.
                    </BannerDescription>
                  </BannerContent>
                  <BannerClose />
                </>
              ),
            })
          }
        >
          Info
        </Button>

        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            onBannerAdd({
              variant: "warning",
              priority: 10,
              content: (
                <>
                  <BannerIcon>
                    <Warning aria-hidden="true" className="size-4" />
                  </BannerIcon>
                  <BannerContent>
                    <BannerTitle>Security review required</BannerTitle>
                    <BannerDescription>
                      One environment variable is missing in production. Verify before the next deploy.
                    </BannerDescription>
                  </BannerContent>
                  <BannerClose />
                </>
              ),
            })
          }
        >
          Warning
        </Button>

        <Button size="sm" variant="ghost" onClick={onBannersClear}>
          Clear
        </Button>
      </div>
    </div>
  );
}

export function BannerDemo() {
  return (
    <Banners maxVisible={2}>
      <BannerLauncher />
    </Banners>
  );
}
