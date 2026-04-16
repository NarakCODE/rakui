"use client";

import {
  CaretDownIcon,
  GitForkIcon,
  QrCodeIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  StarIcon,
  PushPinIcon,
  CaretLeftIcon,
  CaretRightIcon,
  ImageIcon,
  VideoCameraIcon,
  DotsThreeIcon,
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
  TextAlignJustifyIcon,
} from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ButtonGroupDemo() {
  return (
    <div className="flex flex-col items-start gap-6">
      {/* 1. Primary Split Button */}
      <ButtonGroup>
        <Button>Merge pull request</Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon">
              <CaretDownIcon weight="bold" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuItem className="flex-col items-start gap-1 py-2">
              <span className="font-medium">Create a merge commit</span>
              <span className="text-xs text-muted-foreground">
                All commits from this branch will be added to the base branch
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex-col items-start gap-1 py-2">
              <span className="font-medium">Squash and merge</span>
              <span className="text-xs text-muted-foreground">
                The 14 commits from this branch will be combined into one commit
                in the base branch
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex-col items-start gap-1 py-2">
              <span className="font-medium">Rebase and merge</span>
              <span className="text-xs text-muted-foreground">
                The 14 commits from this branch will be rebased and added to the
                base branch
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>

      {/* 2. Top Row Utility Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Fork */}
        <ButtonGroup>
          <Button variant="secondary">
            <GitForkIcon size={16} />
            Fork
            <span className="flex items-center justify-center bg-blue-500/10 text-blue-500 text-xs rounded-full px-2 py-0.5 ml-1">
              24
            </span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon">
                <CaretDownIcon weight="bold" size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Create new fork</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ButtonGroup>

        {/* Scan to pay */}
        <ButtonGroup>
          <Button variant="secondary" size="icon">
            <QrCodeIcon size={18} />
          </Button>
          <Button variant="secondary">Scan to pay</Button>
        </ButtonGroup>

        {/* Like / Dislike */}
        <ButtonGroup>
          <Button variant="secondary">
            <ThumbsUpIcon size={16} />
            2.4K
          </Button>
          <Button variant="secondary" size="icon">
            <ThumbsDownIcon size={16} />
          </Button>
        </ButtonGroup>

        {/* Star */}
        <ButtonGroup>
          <Button variant="secondary">
            <StarIcon size={16} />
            Star
          </Button>
          <Button variant="secondary">
            <span className="flex items-center justify-center bg-blue-500/10 text-blue-500 text-xs rounded-full px-2 py-0.5">
              104
            </span>
          </Button>
        </ButtonGroup>

        {/* Pinned */}
        <ButtonGroup>
          <Button variant="secondary">
            <PushPinIcon size={16} />
            Pinned
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon">
                <CaretDownIcon weight="bold" size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Unpin</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ButtonGroup>
      </div>

      {/* 3. Previous / Next */}
      <ButtonGroup>
        <Button variant="secondary">
          <CaretLeftIcon size={16} />
          Previous
        </Button>
        <Button variant="secondary">
          Next
          <CaretRightIcon size={16} />
        </Button>
      </ButtonGroup>

      {/* 4. Media Selector */}
      <ButtonGroup>
        <Button variant="secondary">
          <ImageIcon size={18} />
          Photos
        </Button>
        <Button variant="secondary">
          <VideoCameraIcon size={18} />
          Videos
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon">
              <DotsThreeIcon weight="bold" size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Documents</DropdownMenuItem>
            <DropdownMenuItem>Audio</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>

      {/* 5. Text Alignment (Words) */}
      <ButtonGroup>
        <Button variant="secondary">Left</Button>
        <Button variant="secondary">Center</Button>
        <Button variant="secondary">Right</Button>
      </ButtonGroup>

      {/* 6. Text Alignment (Icons) */}
      <ButtonGroup>
        <Button variant="secondary" size="icon">
          <TextAlignLeftIcon size={18} />
        </Button>
        <Button variant="secondary" size="icon">
          <TextAlignCenterIcon size={18} />
        </Button>
        <Button variant="secondary" size="icon">
          <TextAlignRightIcon size={18} />
        </Button>
        <Button variant="secondary" size="icon">
          <TextAlignJustifyIcon size={18} />
        </Button>
      </ButtonGroup>
    </div>
  );
}
