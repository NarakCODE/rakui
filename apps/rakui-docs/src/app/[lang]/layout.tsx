import { ConsoleFilter } from '@/components/console-filter';

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: React.ReactNode;
}) {
  const lang = (await params).lang;

  return (
    <div lang={lang} className="contents">
      <ConsoleFilter />
      {children}
    </div>
  );
}
