import { cn } from '@/lib/cn';

export type PropDef = {
  /** Property name */
  name: string;
  /** TypeScript type */
  type: string;
  /** Default value (optional) */
  default?: string;
  /** Description of the property */
  description: string;
  /** Whether the prop is required */
  required?: boolean;
};

export type PropsTableProps = {
  /** Array of prop definitions */
  props: PropDef[];
  /** Optional className for styling */
  className?: string;
};

export function PropsTable({ props, className }: PropsTableProps) {
  return (
    <div
      className={cn(
        'not-prose overflow-hidden rounded-xl border border-fd-border bg-fd-card my-6',
        className,
      )}
    >
      <div className="flex items-center px-4 py-3 border-b border-fd-border bg-fd-muted/50">
        <p className="w-1/4 text-sm font-medium text-fd-muted-foreground">Prop</p>
        <p className="text-sm font-medium text-fd-muted-foreground">Type</p>
      </div>
      <div className="divide-y divide-fd-border">
        {props.map((prop) => (
          <div
            key={prop.name}
            className="group px-4 py-4 hover:bg-fd-accent/50 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="w-1/4 shrink-0">
                <code
                  className={cn(
                    'rounded-md bg-fd-muted px-2 py-1 font-mono text-xs font-medium',
                    prop.required
                      ? 'text-fd-primary'
                      : 'text-fd-muted-foreground',
                  )}
                >
                  {prop.name}
                  {!prop.required && '?'}
                </code>
              </div>
              <div className="flex-1 min-w-0 space-y-2">
                <code className="font-mono text-xs text-fd-primary">
                  {prop.type}
                </code>
                <p className="text-sm text-fd-muted-foreground leading-relaxed">
                  {prop.description}
                </p>
                {prop.default && (
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-fd-muted-foreground">Default:</span>
                    <code className="rounded bg-fd-muted px-1.5 py-0.5 font-mono text-fd-foreground">
                      {prop.default}
                    </code>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
