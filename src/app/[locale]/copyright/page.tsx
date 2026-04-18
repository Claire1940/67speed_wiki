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
  const path = '/copyright'

  return {
    title: 'Copyright Notice - 67 Speed Wiki',
    description:
      'Copyright, trademark, and fair-use notice for 67 Speed Wiki, including how to submit infringement reports.',
    keywords: [
      '67 Speed Wiki copyright',
      'DMCA',
      'copyright notice',
      'fair use',
      'trademark notice',
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
      title: 'Copyright Notice - 67 Speed Wiki',
      description: 'Copyright, trademark, and fair-use notice for 67 Speed Wiki.',
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
      title: 'Copyright Notice - 67 Speed Wiki',
      description: 'Copyright, trademark, and fair-use notice for 67 Speed Wiki.',
      images: [`${siteUrl}/og-image.jpg`],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function Copyright() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Copyright Notice</h1>
          <p className="text-slate-300 text-lg mb-2">Intellectual property, trademark, and attribution terms</p>
          <p className="text-slate-400 text-sm">Last Updated: April 18, 2026</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>1. Ownership of Site Content</h2>
            <p>
              Unless otherwise noted, original content published on 67 Speed Wiki (including text, layout, and
              compiled reference material) is owned by this site and protected by copyright law.
            </p>

            <h2>2. Game-Related Assets and Trademarks</h2>
            <p>
              67 Speed Wiki is an unofficial fan project. Game-related names, logos, media, and trademarks referenced
              on this site belong to their respective rights holders.
            </p>

            <h2>3. Fair Use Context</h2>
            <p>
              We may reference limited third-party assets for commentary, reporting, educational explanation, and
              interoperability context. We do not claim ownership of third-party copyrighted works.
            </p>

            <h2>4. Permitted and Prohibited Use</h2>
            <p>You may:</p>
            <ul>
              <li>Share links to pages on this site.</li>
              <li>Quote brief excerpts with clear attribution.</li>
              <li>Use small excerpts for non-commercial commentary with source credit.</li>
            </ul>
            <p>You may not:</p>
            <ul>
              <li>Republish full articles as your own content.</li>
              <li>Remove attribution while reposting excerpts.</li>
              <li>Use automated scraping in a way that harms site availability.</li>
            </ul>

            <h2>5. Attribution Format</h2>
            <p>
              Recommended citation format:
              {' '}
              <em>Source: 67 Speed Wiki (67speed.wiki)</em>
            </p>

            <h2>6. DMCA / Infringement Reports</h2>
            <p>
              If you believe content on this site infringes your rights, email a detailed notice including:
            </p>
            <ul>
              <li>Your legal name and contact details.</li>
              <li>Identification of the copyrighted work.</li>
              <li>URL(s) of the allegedly infringing material.</li>
              <li>A statement of good-faith belief and authority to act.</li>
            </ul>

            <h2>7. Counter-Notice</h2>
            <p>
              If content you submitted was removed by mistake, you may send a counter-notice with the required legal
              statements and identifying details.
            </p>

            <h2>8. Contact</h2>
            <p>
              Copyright and licensing questions:
              {' '}
              <a href="mailto:copyright@67speed.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                copyright@67speed.wiki
              </a>
              <br />
              DMCA notices:
              {' '}
              <a href="mailto:dmca@67speed.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                dmca@67speed.wiki
              </a>
            </p>

            <h2>9. Unofficial Site Reminder</h2>
            <p>
              67 Speed Wiki is not the official website of the 67 Speed challenge. Official products and marks remain
              the property of their owners.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 px-4 border-t border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <Link href="/" className="text-[hsl(var(--nav-theme-light))] hover:underline">
            ← Back to Home
          </Link>
        </div>
      </section>
    </div>
  )
}
