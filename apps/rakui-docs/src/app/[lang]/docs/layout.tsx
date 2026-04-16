import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import { notFound } from "next/navigation";

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: React.ReactNode;
}) {
  const lang = (await params).lang;
  const tree = source.pageTree[lang];

  if (!tree) {
    notFound();
  }

  return (
    <DocsLayout
      tree={tree}
      {...baseOptions(lang)}
      sidebar={{
        enabled: true,
        // Allow collapsing sidebar on desktop
        collapsible: true,
        // Open folders by default if their level is <= 1
        defaultOpenLevel: 1,
        // Prefetch links (disable if hitting hosting limits)
        prefetch: true,
      }}
      // Tab mode: 'top' | 'auto' - where to display layout tabs
      tabMode="auto"
    >
      {children}
    </DocsLayout>
  );
}
