"use client";

import {
  type Column,
  type ColumnDef,
  type Header,
  type Table as TanstackTable,
  flexRender,
} from "@tanstack/react-table";
import {
  ArrowDownAZ,
  ArrowUpAZ,
  ChevronDown,
  EyeOff,
  PinIcon,
} from "lucide-react";
import * as React from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface DataGridCellMeta {
  variant?: "short-text" | "long-text" | "number" | "select" | "checkbox" | "date";
  options?: { label: string; value: string }[];
  min?: number;
  max?: number;
}

interface DataGridProps<TData> {
  table: TanstackTable<TData>;
  height?: number;
  editingState?: {
    rowIndex: number | null;
    columnId: string | null;
  };
  onCellEdit?: (rowIndex: number, columnId: string, value: unknown) => void;
  onCellClick?: (rowIndex: number, columnId: string) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  className?: string;
  enableSorting?: boolean;
  enableFiltering?: boolean;
}

function DataGrid<TData>(props: DataGridProps<TData>) {
  const {
    table,
    height = 400,
    editingState,
    onCellEdit,
    onCellClick,
    onKeyDown,
    className,
    enableSorting = true,
    enableFiltering = true,
  } = props;

  const { rows } = table.getRowModel();

  const handleCellClick = React.useCallback(
    (rowIndex: number, columnId: string) => {
      onCellClick?.(rowIndex, columnId);
    },
    [onCellClick],
  );

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      onKeyDown?.(event);
    },
    [onKeyDown],
  );

  return (
    <div
      className={cn("space-y-4", className)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Global Filter */}
      {enableFiltering && (
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search all columns..."
            value={table.getState().globalFilter ?? ""}
            onChange={(e) => table.setGlobalFilter(e.target.value)}
            className="max-w-sm"
          />
        </div>
      )}

      <div
        className="relative w-full overflow-auto rounded-md border"
        style={{ height }}
      >
        <table className="w-full table-fixed caption-bottom text-sm">
          <thead className="sticky top-0 z-10 bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="h-10 border-b border-r last:border-r-0 px-0 text-left align-middle font-medium text-muted-foreground"
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder ? null : (
                      <ColumnHeaderMenu
                        header={header}
                        enableSorting={enableSorting}
                      />
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={row.id}
                className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                data-state={row.getIsSelected() ? "selected" : undefined}
              >
                {row.getVisibleCells().map((cell) => {
                  const columnId = cell.column.id;
                  const isEditing =
                    editingState?.rowIndex === rowIndex &&
                    editingState?.columnId === columnId;
                  const meta = cell.column.columnDef.meta as
                    | DataGridCellMeta
                    | undefined;
                  const value = cell.getValue();

                  return (
                    <td
                      key={cell.id}
                      className="p-0 align-middle"
                      onClick={() => handleCellClick(rowIndex, columnId)}
                    >
                      {isEditing ? (
                        <DataGridCellEditor
                          value={value}
                          meta={meta}
                          onChange={(newValue) =>
                            onCellEdit?.(rowIndex, columnId, newValue)
                          }
                          onBlur={() => {}}
                        />
                      ) : (
                        <div className="px-2 py-1.5">
                          {meta?.variant === "checkbox" ? (
                            <input
                              type="checkbox"
                              checked={Boolean(value)}
                              onChange={(e) =>
                                onCellEdit?.(rowIndex, columnId, e.target.checked)
                              }
                              className="h-4 w-4 rounded border-gray-300"
                            />
                          ) : (
                            flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )
                          )}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer: row count */}
      <div className="px-2 text-xs text-muted-foreground">
        {table.getFilteredRowModel().rows.length} row(s)
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Column Header Menu
// ---------------------------------------------------------------------------

interface ColumnHeaderMenuProps<TData> {
  header: Header<TData, unknown>;
  enableSorting: boolean;
}

function ColumnHeaderMenu<TData>({
  header,
  enableSorting,
}: ColumnHeaderMenuProps<TData>) {
  const column = header.column;
  const canSort = column.getCanSort() && enableSorting;
  const isSorted = column.getIsSorted();
  const isPinnedLeft = column.getIsPinned() === "left";
  const isPinnedRight = column.getIsPinned() === "right";
  const canHide = column.getCanHide();
  const isSelect = column.id === "select";

  // Select column — plain checkbox header, no dropdown
  if (isSelect) {
    return (
      <div className="flex items-center justify-center px-2">
        {flexRender(header.column.columnDef.header, header.getContext())}
      </div>
    );
  }

  const hasMenu = canSort || canHide;

  if (!hasMenu) {
    return (
      <div className="flex items-center gap-1 px-2 py-1.5 text-sm font-medium text-muted-foreground">
        {flexRender(header.column.columnDef.header, header.getContext())}
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex h-full w-full items-center justify-between gap-1 px-2 py-1.5 text-sm font-medium text-muted-foreground",
            "hover:bg-accent/50 hover:text-foreground transition-colors outline-none",
            isSorted && "text-foreground",
          )}
        >
          <span className="flex items-center gap-1.5 truncate">
            {isSorted === "asc" && <ArrowUpAZ className="size-3.5 shrink-0" />}
            {isSorted === "desc" && <ArrowDownAZ className="size-3.5 shrink-0" />}
            {!isSorted && null}
            {flexRender(header.column.columnDef.header, header.getContext())}
          </span>
          <ChevronDown className="size-3.5 shrink-0 opacity-50" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-40">
        {canSort && (
          <>
            <DropdownMenuItem
              onClick={() => column.toggleSorting(false)}
              className={cn(isSorted === "asc" && "text-foreground font-medium")}
            >
              <ArrowUpAZ className="size-4" />
              Sort asc
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => column.toggleSorting(true)}
              className={cn(isSorted === "desc" && "text-foreground font-medium")}
            >
              <ArrowDownAZ className="size-4" />
              Sort desc
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem
          onClick={() => column.pin(isPinnedLeft ? false : "left")}
        >
          <PinIcon className="size-4" />
          {isPinnedLeft ? "Unpin" : "Pin to left"}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => column.pin(isPinnedRight ? false : "right")}
        >
          <PinIcon className="size-4 rotate-90" />
          {isPinnedRight ? "Unpin" : "Pin to right"}
        </DropdownMenuItem>
        {canHide && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => column.toggleVisibility(false)}
            >
              <EyeOff className="size-4" />
              Hide column
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ---------------------------------------------------------------------------
// Filter Input Component
// ---------------------------------------------------------------------------

function FilterInput<TData>({ column }: { column: Column<TData> }) {
  const columnFilterValue = column.getFilterValue();
  const meta = column.columnDef.meta as DataGridCellMeta | undefined;

  // For select columns, show a dropdown
  if (meta?.variant === "select" && meta.options) {
    return (
      <Select
        value={(columnFilterValue ?? "") as string}
        onValueChange={(value) => column.setFilterValue(value || undefined)}
      >
        <SelectTrigger className="h-7 w-full border-0 bg-transparent text-xs focus:ring-0">
          <SelectValue placeholder="Filter..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All</SelectItem>
          {meta.options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  // For other columns, show a text input
  return (
    <Input
      type="text"
      placeholder="Filter..."
      value={(columnFilterValue ?? "") as string}
      onChange={(e) => column.setFilterValue(e.target.value || undefined)}
      className="h-7 w-full rounded-none border-0 bg-transparent px-1 py-0 text-xs placeholder:text-muted-foreground/50 focus-visible:ring-0"
    />
  );
}

interface DataGridCellEditorProps {
  value: unknown;
  meta?: DataGridCellMeta;
  onChange: (value: unknown) => void;
  onBlur: () => void;
}

function DataGridCellEditor({
  value,
  meta,
  onChange,
  onBlur,
}: DataGridCellEditorProps) {
  // Stop propagation on most keys so the outer grid handler doesn't intercept
  // normal typing, arrow-key cursor movement, etc. inside the editor.
  // We let Tab and Escape bubble so the grid can navigate/close the editor.
  const handleEditorKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab" && e.key !== "Escape") {
      e.stopPropagation();
    }
  };

  switch (meta?.variant) {
    case "checkbox":
      return (
        <div className="px-2 py-1.5">
          <input
            type="checkbox"
            checked={Boolean(value)}
            autoFocus
            onChange={(e) => onChange(e.target.checked)}
            onKeyDown={handleEditorKeyDown}
            className="h-4 w-4 rounded border-gray-300"
          />
        </div>
      );

    case "select":
      return (
        <Select
          value={String(value || "")}
          onValueChange={onChange}
          defaultOpen
        >
          <SelectTrigger className="h-8 w-full border-0 bg-transparent focus:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {meta.options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    case "number":
      return (
        <Input
          type="number"
          value={Number(value || 0)}
          min={meta.min}
          max={meta.max}
          autoFocus
          onChange={(e) => onChange(Number(e.target.value))}
          onBlur={onBlur}
          onKeyDown={handleEditorKeyDown}
          className="h-8 rounded-none border-0 bg-transparent px-2 py-1.5 focus-visible:ring-0"
        />
      );

    case "date":
      return (
        <Input
          type="date"
          value={String(value || "")}
          autoFocus
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          onKeyDown={handleEditorKeyDown}
          className="h-8 rounded-none border-0 bg-transparent px-2 py-1.5 focus-visible:ring-0"
        />
      );

    case "long-text":
      return (
        <textarea
          value={String(value || "")}
          autoFocus
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          onKeyDown={handleEditorKeyDown}
          className="h-20 w-full resize-none rounded-none border-0 bg-transparent px-2 py-1.5 text-sm outline-none focus:ring-0"
        />
      );

    case "short-text":
    default:
      return (
        <Input
          type="text"
          value={String(value || "")}
          autoFocus
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          onKeyDown={handleEditorKeyDown}
          className="h-8 rounded-none border-0 bg-transparent px-2 py-1.5 focus-visible:ring-0"
        />
      );
  }
}

export { DataGrid, type DataGridProps, type DataGridCellMeta };
