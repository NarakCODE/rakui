export interface MasonryBaseProps {
  columnWidth?: number;
  columnCount?: number;
  maxColumnCount?: number;
  gap?: number | { column: number; row: number };
  itemHeight?: number;
  overscan?: number;
  linear?: boolean;
}

export interface MasonryProps extends MasonryBaseProps {
  asChild?: boolean;
  fallback?: React.ReactNode;
  defaultWidth?: number;
  defaultHeight?: number;
  scrollFps?: number;
  className?: string;
  style?: React.CSSProperties;
}

export interface MasonryItemProps {
  asChild?: boolean;
  style?: React.CSSProperties;
  className?: string;
}
