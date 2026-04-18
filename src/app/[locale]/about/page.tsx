import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import { type Locale } from '@/i18n/routing'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://67speed.wiki'
  const path = '/about'

  return {
    title: 'About 67 Speed Wiki - Fan Guide for Records, Leaderboards, and Mobile Play',
    description:
      'Learn how 67 Speed Wiki tracks world-record races, leaderboard shifts, mobile setup guidance, privacy references, and verified source links.',
    keywords: [
      'about 67 Speed Wiki',
      '67 Speed fan wiki',
      '67 Speed leaderboard guide',
      '67 Speed world record tracking',
      '67 Speed mobile setup',
    ],
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale,
      url: locale === 'en' ? `${siteUrl}${path}` : `${siteUrl}/${locale}${path}`,
      siteName: '67 Speed Wiki',
      title: 'About 67 Speed Wiki',
      description:
        'How this fan wiki maintains practical 67 Speed guidance for records, rankings, and mobile play.',
      images: [
        {
          url: `${siteUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: '67 Speed Wiki',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'About 67 Speed Wiki',
      description:
        'How this fan wiki maintains practical 67 Speed guidance for records, rankings, and mobile play.',
      images: [`${siteUrl}/og-image.jpg`],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About 67 Speed Wiki</h1>
          <p className="text-slate-300 text-lg mb-2">
            A fan-run reference for the 67 Speed challenge ecosystem
          </p>
          <p className="text-slate-400 text-sm">Last Updated: April 18, 2026</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>What This Site Does</h2>
            <p>
              67 Speed Wiki is an unofficial fan resource focused on one job: helping readers quickly understand how
              the 67 Speed challenge works and where reliable updates are happening.
            </p>
            <p>
              We organize high-signal information into short, practical modules so players can move from setup to
              execution without digging across scattered posts and clips.
            </p>

            <h2>What We Cover</h2>
            <ul>
              <li><strong>World record tracking:</strong> Public score milestones and timeline context.</li>
              <li><strong>Leaderboard behavior:</strong> How entries appear, reset windows, and verification cues.</li>
              <li><strong>Mobile setup:</strong> iPhone/browser configuration for more stable camera tracking.</li>
              <li><strong>Troubleshooting:</strong> Fast checks for camera access, score persistence, and detection issues.</li>
              <li><strong>Privacy references:</strong> Practical summaries of published privacy statements and disclosures.</li>
              <li><strong>Creator/social context:</strong> Streamer runs, viral cycles, and trend timelines.</li>
            </ul>

            <h2>Editorial Approach</h2>
            <p>We prioritize clarity over hype and keep each article traceable to public source material.</p>
            <ul>
              <li>We cross-check timestamps when reporting score timelines.</li>
              <li>We separate confirmed platform behavior from community rumor.</li>
              <li>We update or remove outdated claims when newer evidence appears.</li>
              <li>We link back to official pages when a policy or rule is involved.</li>
            </ul>

            <h2>Community Contributions</h2>
            <p>
              Readers regularly send corrections, new leaderboard observations, and edge-case troubleshooting notes.
              If your evidence improves accuracy, we want it.
            </p>

            <h2>Important Disclaimer</h2>
            <p className="text-yellow-400/90">
              <strong>67 Speed Wiki is an unofficial fan-made website.</strong> It is not operated by the creators of
              67 Speed and is not an official product site.
            </p>
            <p>
              All third-party trademarks, names, and logos remain the property of their respective owners.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-slate-900/30 border-y border-border">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Contact</h2>
            <p>
              Send questions, corrections, or content suggestions to the addresses below. Include a source link or
              screenshot when reporting a factual issue.
            </p>
            <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">General</h3>
                <a href="mailto:contact@67speed.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  contact@67speed.wiki
                </a>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">Corrections</h3>
                <a href="mailto:support@67speed.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  support@67speed.wiki
                </a>
              </div>
            </div>
            <p className="text-slate-400 text-sm">
              <strong>Response window:</strong> Usually within 2-3 business days.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Link href="/" className="text-[hsl(var(--nav-theme-light))] hover:underline">
            ← Back to Home
          </Link>
        </div>
      </section>
    </div>
  )
}
