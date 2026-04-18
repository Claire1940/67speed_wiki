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
  const path = '/terms-of-service'

  return {
    title: 'Terms of Service - 67 Speed Wiki',
    description:
      'Terms governing access to 67 Speed Wiki, including acceptable use, intellectual property, and liability limits.',
    keywords: [
      '67 Speed Wiki terms',
      'terms of service',
      'acceptable use policy',
      'copyright terms',
      'user agreement',
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
      title: 'Terms of Service - 67 Speed Wiki',
      description: 'Terms governing access to 67 Speed Wiki.',
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
      title: 'Terms of Service - 67 Speed Wiki',
      description: 'Terms governing access to 67 Speed Wiki.',
      images: [`${siteUrl}/og-image.jpg`],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-slate-300 text-lg mb-2">Terms and conditions for using 67 Speed Wiki</p>
          <p className="text-slate-400 text-sm">Last Updated: April 18, 2026</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By using 67 Speed Wiki (the “Website”), you agree to these Terms of Service. If you do not agree,
              please stop using the Website.
            </p>

            <h2>2. Service Description</h2>
            <p>
              67 Speed Wiki is an unofficial, fan-operated information site. We publish guides, summaries, and
              reference material about 67 Speed gameplay, records, leaderboard behavior, and related community trends.
            </p>

            <h2>3. Unofficial Project Notice</h2>
            <p>
              This Website is independent and is not an official product of the 67 Speed creators. Third-party names,
              logos, and trademarks belong to their respective owners.
            </p>

            <h2>4. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the Website for unlawful activity.</li>
              <li>Attempt unauthorized access to systems or data.</li>
              <li>Upload malware, spam, or abusive content.</li>
              <li>Run abusive scraping that harms availability.</li>
              <li>Misrepresent affiliation with this Website.</li>
            </ul>

            <h2>5. Intellectual Property</h2>
            <p>
              Original text, layouts, and compilations on this Website are protected by applicable copyright law.
              Game-related assets and trademarks referenced on this Website remain the property of their respective
              rights holders.
            </p>

            <h2>6. Content Accuracy</h2>
            <p>
              We aim for accuracy, but content can become outdated as leaderboard behavior, policies, and challenge
              trends change. You are responsible for verifying critical information with official sources.
            </p>

            <h2>7. External Links</h2>
            <p>
              The Website may link to third-party pages such as official game websites, social platforms, and video
              hosts. We do not control those services and are not responsible for their content or policies.
            </p>

            <h2>8. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, 67 Speed Wiki is not liable for indirect, incidental, special,
              consequential, or punitive damages arising from Website use or inability to use the Website.
            </p>

            <h2>9. Changes to Terms</h2>
            <p>
              We may update these Terms. Changes take effect when posted on this page. Continued use after updates
              means you accept the revised Terms.
            </p>

            <h2>10. Governing Law</h2>
            <p>
              These Terms are governed by applicable law in the jurisdiction where the Website operator is based,
              without regard to conflict-of-law principles.
            </p>

            <h2>11. Contact</h2>
            <p>
              Questions about these Terms can be sent to
              {' '}
              <a href="mailto:legal@67speed.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                legal@67speed.wiki
              </a>
              .
            </p>

            <h2>12. Acknowledgment</h2>
            <p>
              By using the Website, you confirm that you have read and agreed to these Terms of Service.
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
