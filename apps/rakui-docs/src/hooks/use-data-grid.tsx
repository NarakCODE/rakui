"use client";

import {
  type ColumnDef,
  type Row,
  type Table as TanstackTable,
  type TableState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

export interface UseDataGridOptions<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  onDataChange?: (data: TData[]) => void;
  onRowAdd?: () => { rowIndex: number; columnId: string } | void;
  getRowId?: (row: TData) => string;
  initialState?: Partial<TableState>;
  enablePaste?: boolean;
  enableSorting?: boolean;
  enableFiltering?: boolean;
}

export interface UseDataGridReturn<TData> {
  table: TanstackTable<TData>;
  searchState: {
    isOpen: boolean;
    searchTerm: string;
    currentMatch: number;
    totalMatches: number;
  };
  editingState: {
    rowIndex: number | null;
    columnId: string | null;
  };
  setEditingCell: (rowIndex: number | null, columnId: string | null) => void;
  updateCell: (rowIndex: number, columnId: string, value: unknown) => void;
  goToCell: (direction: "up" | "down" | "left" | "right") => void;
  addRow: () => void;
  deleteRow: (rowIndex: number) => void;
  handleKeyDown: (event: React.KeyboardEvent) => void;
  getSelectedRowIndices: () => number[];
  toggleRowSelection: (rowIndex: number) => void;
  selectAllRows: () => void;
  clearSelection: () => void;
}

export function useDataGrid<TData>(
  options: UseDataGridOptions<TData>,
): UseDataGridReturn<TData> {
  const {
    columns,
    data,
    onDataChange,
    onRowAdd,
    getRowId,
    initialState,
    enablePaste = false,
    enableSorting = true,
    enableFiltering = true,
  } = options;

  const [editingState, setEditingState] = React.useState<{
    rowIndex: number | null;
    columnId: string | null;
  }>({
    rowIndex: null,
    columnId: null,
  });

  const [searchState, setSearchState] = React.useState({
    isOpen: false,
    searchTerm: "",
    currentMatch: 0,
    totalMatches: 0,
  });

  const [selectedRows, setSelectedRows] = React.useState<Set<number>>(
    new Set(),
  );

  const [sorting, setSorting] = React.useState(
    initialState?.sorting ?? []
  );

  const [columnFilters, setColumnFilters] = React.useState(
    initialState?.columnFilters ?? []
  );

  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns: [
      {
        id: "select",
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
        size: 40,
        minSize: 40,
        maxSize: 40,
        enableSorting: false,
        enableColumnFilter: false,
      },
      ...columns,
    ],
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
    getRowId,
    initialState,
    state: {
      ...initialState,
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    enableSorting,
    enableColumnFilters: enableFiltering,
    enableGlobalFilter: enableFiltering,
  });

  const setEditingCell = React.useCallback(
    (rowIndex: number | null, columnId: string | null) => {
      setEditingState({ rowIndex, columnId });
    },
    [],
  );

  const updateCell = React.useCallback(
    (rowIndex: number, columnId: string, value: unknown) => {
      if (!onDataChange) return;

      const newData = [...data];
      if (rowIndex >= 0 && rowIndex < newData.length) {
        const row = newData[rowIndex];
        if (row) {
          const column = columns.find((col) => {
            if ("accessorKey" in col && typeof col.accessorKey === "string") {
              return col.accessorKey === columnId;
            }
            return false;
          });
          const accessorKey = column && "accessorKey" in column
            ? (column as { accessorKey: string }).accessorKey
            : columnId;
          (newData[rowIndex] as Record<string, unknown>)[accessorKey] = value;
          onDataChange(newData);
        }
      }
    },
    [data, onDataChange, columns],
  );

  const goToCell = React.useCallback(
    (direction: "up" | "down" | "left" | "right") => {
      const { rowIndex, columnId } = editingState;
      if (rowIndex === null || columnId === null) return;

      const flatColumns = table.getAllLeafColumns();
      const columnIndex = flatColumns.findIndex((col) => col.id === columnId);
      if (columnIndex === -1) return;

      let newRowIndex = rowIndex;
      let newColumnIndex = columnIndex;

      switch (direction) {
        case "up":
          newRowIndex = Math.max(0, rowIndex - 1);
          break;
        case "down":
          newRowIndex = Math.min(data.length - 1, rowIndex + 1);
          break;
        case "left":
          newColumnIndex = Math.max(0, columnIndex - 1);
          break;
        case "right":
          newColumnIndex = Math.min(flatColumns.length - 1, columnIndex + 1);
          break;
      }

      const newColumn = flatColumns[newColumnIndex];
      if (newColumn) {
        setEditingState({
          rowIndex: newRowIndex,
          columnId: newColumn.id,
        });
      }
    },
    [editingState, table, data.length],
  );

  const addRow = React.useCallback(() => {
    if (onRowAdd) {
      const result = onRowAdd();
      if (result) {
        setEditingState({
          rowIndex: result.rowIndex,
          columnId: result.columnId,
        });
      }
    }
  }, [onRowAdd]);

  const deleteRow = React.useCallback(
    (rowIndex: number) => {
      if (!onDataChange) return;
      const newData = data.filter((_, index) => index !== rowIndex);
      onDataChange(newData);
      setEditingState({ rowIndex: null, columnId: null });
    },
    [data, onDataChange],
  );

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      const { rowIndex, columnId } = editingState;

      // Handle search shortcut (Cmd/Ctrl + F)
      if ((event.metaKey || event.ctrlKey) && event.key === "f") {
        event.preventDefault();
        setSearchState((prev) => ({ ...prev, isOpen: true }));
        return;
      }

      // Handle add row (Cmd/Ctrl + Enter)
      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        event.preventDefault();
        addRow();
        return;
      }

      // Handle delete row (Cmd/Ctrl + Backspace)
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key === "Backspace" &&
        rowIndex !== null
      ) {
        event.preventDefault();
        deleteRow(rowIndex);
        return;
      }

      // Navigation when editing
      if (rowIndex !== null && columnId !== null) {
        switch (event.key) {
          case "Enter":
            event.preventDefault();
            goToCell("down");
            break;
          case "Tab":
            event.preventDefault();
            goToCell(event.shiftKey ? "left" : "right");
            break;
          case "ArrowUp":
            if (!event.shiftKey) {
              event.preventDefault();
              goToCell("up");
            }
            break;
          case "ArrowDown":
            if (!event.shiftKey) {
              event.preventDefault();
              goToCell("down");
            }
            break;
          case "ArrowLeft":
            if (!event.shiftKey) {
              event.preventDefault();
              goToCell("left");
            }
            break;
          case "ArrowRight":
            if (!event.shiftKey) {
              event.preventDefault();
              goToCell("right");
            }
            break;
          case "Escape":
            event.preventDefault();
            setEditingState({ rowIndex: null, columnId: null });
            break;
        }
      }
    },
    [editingState, addRow, deleteRow, goToCell],
  );

  const getSelectedRowIndices = React.useCallback(() => {
    return Array.from(selectedRows);
  }, [selectedRows]);

  const toggleRowSelection = React.useCallback((rowIndex: number) => {
    setSelectedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(rowIndex)) {
        newSet.delete(rowIndex);
      } else {
        newSet.add(rowIndex);
      }
      return newSet;
    });
  }, []);

  const selectAllRows = React.useCallback(() => {
    setSelectedRows(new Set(data.map((_, index) => index)));
  }, [data]);

  const clearSelection = React.useCallback(() => {
    setSelectedRows(new Set());
  }, []);

  return {
    table,
    searchState,
    editingState,
    setEditingCell,
    updateCell,
    goToCell,
    addRow,
    deleteRow,
    handleKeyDown,
    getSelectedRowIndices,
    toggleRowSelection,
    selectAllRows,
    clearSelection,
  };
}
