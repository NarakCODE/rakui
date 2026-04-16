import Link from 'next/link';
import { Bodoni_Moda, IBM_Plex_Mono, Instrument_Sans } from 'next/font/google';
import { ArrowRightIcon, BookOpenIcon, LanguagesIcon, SparklesIcon } from 'lucide-react';
import { appName, docsRoute, gitConfig } from '@/lib/shared';

const display = Bodoni_Moda({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-display',
});

const body = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-body',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
});

const copy = {
  en: {
    eyebrow: 'Design system documentation',
    title: 'Components with a sharper point of view.',
    summary:
      'Rakui is a documentation home for reusable UI pieces, implementation details, and the decisions that keep a design system coherent as it grows.',
    primaryCta: 'Open the docs',
    secondaryCta: 'View repository',
    statA: 'Locale-aware docs',
    statB: 'Feedback-ready pages',
    statC: 'Fumadocs foundation',
    note: 'Built for fast scanning, exact implementation notes, and multilingual growth.',
    strip: 'A quiet home layout with a sharper landing page.',
  },
  km: {
    eyebrow: 'ឯកសាររចនាប្រព័ន្ធ',
    title: 'ឯកសារកុំពូនិនท์ដែលមានទិសដៅច្បាស់លាស់។',
    summary:
      'Rakui ជាទំព័រដើមសម្រាប់ឯកសារ UI ដែលផ្តោតលើកុំពូនិន្ទដែលអាចប្រើឡើងវិញ ការអនុវត្តជាក់ស្តែង និងសេចក្តីសម្រេចរចនាដែលរក្សាប្រព័ន្ធឲ្យស្ថិតស្ថេរ។',
    primaryCta: 'បើកឯកសារ',
    secondaryCta: 'មើល repo',
    statA: 'ឯកសារគាំទ្រភាសាច្រើន',
    statB: 'ទំព័រគាំទ្រ feedback',
    statC: 'បង្កើតលើ Fumadocs',
    note: 'បង្កើតសម្រាប់អានលឿន ឯកសារអនុវត្តច្បាស់ និងការពង្រីកច្រើនភាសា។',
    strip: 'Home layout សាមញ្ញ ប៉ុន្តែមាន landing page ច្បាស់ន័យជាងមុន។',
  },
} as const;

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = copy[lang as keyof typeof copy] ?? copy.en;
  const docsHref = `/${lang}${docsRoute}`;
  const githubHref = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;

  return (
    <main
      className={`${display.variable} ${body.variable} ${mono.variable} relative isolate overflow-hidden bg-[#f7f1e8] text-[#1f1713]`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,rgba(210,75,47,0.22),transparent_58%)]" />
        <div className="absolute -left-24 top-40 h-72 w-72 rounded-full bg-[#dfc8aa]/40 blur-3xl" />
        <div className="absolute right-0 top-28 h-[28rem] w-[28rem] rounded-full bg-[#d24b2f]/8 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(31,23,19,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(31,23,19,0.04)_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <section className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-7xl flex-col px-6 pb-14 pt-14 sm:px-8 lg:px-12">
        <div className="grid flex-1 gap-8 lg:grid-cols-[minmax(0,1.15fr)_24rem] lg:items-start xl:gap-12">
          <div className="flex flex-col justify-center">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-[#1f1713]/15 bg-white/65 px-4 py-2 text-[0.72rem] uppercase tracking-[0.28em] text-[#6f5b51]">
                {t.eyebrow}
              </span>
              <span className="rounded-full bg-[#1f1713] px-3 py-1.5 text-[0.72rem] uppercase tracking-[0.2em] text-[#f7f1e8]">
                {lang.toUpperCase()}
              </span>
            </div>

            <h1
              className="max-w-5xl text-5xl leading-[0.92] tracking-[-0.05em] text-[#1b1411] sm:text-6xl lg:text-7xl xl:text-[6.5rem]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {t.title}
            </h1>

            <p
              className="mt-6 max-w-2xl text-base leading-8 text-[#5d4d45] sm:text-lg"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {t.summary}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href={docsHref}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#1f1713] px-6 py-3 text-sm font-medium text-[#f7f1e8] transition-transform duration-200 hover:-translate-y-0.5"
              >
                <BookOpenIcon className="h-4 w-4" />
                {t.primaryCta}
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <a
                href={githubHref}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center rounded-full border border-[#1f1713]/15 bg-white/70 px-6 py-3 text-sm font-medium text-[#1f1713] backdrop-blur transition-colors duration-200 hover:bg-white"
              >
                {t.secondaryCta}
              </a>
            </div>

            <div className="mt-12 grid gap-3 sm:grid-cols-3">
              {[t.statA, t.statB, t.statC].map((item, index) => (
                <div
                  key={item}
                  className="rounded-[1.6rem] border border-[#1f1713]/10 bg-white/70 px-4 py-4 backdrop-blur"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <div
                    className="text-[0.68rem] uppercase tracking-[0.26em] text-[#8c776b]"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    0{index + 1}
                  </div>
                  <div className="mt-2 text-sm font-medium text-[#2c201a]">{item}</div>
                </div>
              ))}
            </div>
          </div>

          <aside className="relative lg:pt-12">
            <div className="absolute -left-6 top-6 hidden h-28 w-28 rounded-full border border-[#1f1713]/10 bg-white/40 lg:block" />
            <div className="relative overflow-hidden rounded-[2rem] border border-[#1f1713]/10 bg-[#fdf9f2]/90 p-5 shadow-[0_30px_80px_rgba(73,43,27,0.12)] backdrop-blur">
              <div className="flex items-center justify-between border-b border-[#1f1713]/10 pb-4">
                <div>
                  <p
                    className="text-[0.68rem] uppercase tracking-[0.26em] text-[#8c776b]"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    Home layout
                  </p>
                  <p className="mt-2 text-lg font-medium text-[#231914]">{t.strip}</p>
                </div>
                <SparklesIcon className="h-5 w-5 text-[#d24b2f]" />
              </div>

              <div className="mt-5 space-y-4">
                <div className="rounded-[1.5rem] bg-[#1f1713] p-5 text-[#f7f1e8]">
                  <div
                    className="text-[0.7rem] uppercase tracking-[0.24em] text-[#d8c6ba]"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    Structure
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[#f3e8de]">
                    A clean navbar shell from Fumadocs on top, with a custom landing composition underneath.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  <div className="rounded-[1.5rem] border border-[#1f1713]/10 bg-[#efe2cf] p-4">
                    <LanguagesIcon className="h-5 w-5 text-[#8d3b22]" />
                    <p className="mt-3 text-sm font-medium text-[#2b1e18]">
                      Locale-first routing keeps entry points aligned with the active language.
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] border border-[#1f1713]/10 bg-white p-4">
                    <BookOpenIcon className="h-5 w-5 text-[#8d3b22]" />
                    <p className="mt-3 text-sm font-medium text-[#2b1e18]">
                      Docs, markdown export, OG images, and feedback now follow the same route structure.
                    </p>
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-dashed border-[#1f1713]/15 bg-white/60 p-4">
                  <p
                    className="text-[0.68rem] uppercase tracking-[0.26em] text-[#8c776b]"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    Next stop
                  </p>
                  <Link
                    href={docsHref}
                    className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-[#1f1713] underline decoration-[#d24b2f] underline-offset-4"
                  >
                    Explore components and implementation notes
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-10 grid gap-4 border-t border-[#1f1713]/10 pt-6 sm:grid-cols-[1.35fr_1fr]">
          <div className="rounded-[1.75rem] border border-[#1f1713]/10 bg-white/70 p-5 backdrop-blur">
            <p
              className="text-[0.68rem] uppercase tracking-[0.26em] text-[#8c776b]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Philosophy
            </p>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#57473f] sm:text-[0.95rem]">
              Documentation should feel composed, not assembled. This home layout keeps the framework-level navbar
              minimal and spends the design budget on hierarchy, readability, and a landing page with actual editorial
              character.
            </p>
          </div>
          <div className="rounded-[1.75rem] bg-[#d24b2f] p-5 text-[#fff8f2]">
            <p
              className="text-[0.68rem] uppercase tracking-[0.26em] text-[#ffd5c7]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Repository
            </p>
            <p className="mt-3 text-sm leading-7 text-[#fff1ea]">
              Source, docs content, and layout decisions stay visible in one place for faster iteration.
            </p>
            <a
              href={githubHref}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4"
            >
              github.com/{gitConfig.user}/{gitConfig.repo}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
