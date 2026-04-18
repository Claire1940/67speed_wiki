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
  const path = '/privacy-policy'

  return {
    title: 'Privacy Policy - 67 Speed Wiki',
    description:
      'How 67 Speed Wiki handles analytics, cookies, and limited technical data when you browse this fan-run guide site.',
    keywords: [
      '67 Speed Wiki privacy',
      'privacy policy',
      'cookies policy',
      'analytics disclosure',
      'data protection',
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
      title: 'Privacy Policy - 67 Speed Wiki',
      description: 'How 67 Speed Wiki handles analytics, cookies, and limited technical data.',
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
      title: 'Privacy Policy - 67 Speed Wiki',
      description: 'How 67 Speed Wiki handles analytics, cookies, and limited technical data.',
      images: [`${siteUrl}/og-image.jpg`],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-slate-300 text-lg mb-2">How we collect, use, and protect website data</p>
          <p className="text-slate-400 text-sm">Last Updated: April 18, 2026</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>1. Scope</h2>
            <p>
              This policy covers data handling on <strong>67speed.wiki</strong>, an unofficial fan-run information
              website. It does not govern data processing on third-party services linked from this site.
            </p>

            <h2>2. Information We Collect</h2>
            <ul>
              <li><strong>Technical logs:</strong> IP address, browser type, device type, and request timestamps.</li>
              <li><strong>Usage analytics:</strong> page views, referrers, and on-site interaction events.</li>
              <li><strong>Preferences:</strong> language selection and similar UI settings stored locally.</li>
            </ul>
            <p>We do not require account registration to browse core wiki content.</p>

            <h2>3. How We Use Data</h2>
            <ul>
              <li>Operate and secure the website.</li>
              <li>Measure content quality and improve navigation.</li>
              <li>Detect abuse, broken links, and technical issues.</li>
              <li>Understand aggregate traffic trends.</li>
            </ul>

            <h2>4. Cookies and Similar Technologies</h2>
            <p>
              We use browser storage and cookies for essential site behavior and analytics. You can clear or block
              cookies in your browser settings, but some features may work less reliably.
            </p>

            <h2>5. Analytics Providers</h2>
            <p>
              We may use third-party analytics platforms to collect aggregate usage metrics. These tools help us
              understand navigation patterns and content usefulness. We configure them to avoid collecting sensitive
              personal data whenever possible.
            </p>

            <h2>6. Third-Party Links</h2>
            <p>
              Our pages can link to external websites such as official 67 Speed pages, social channels, and video
              platforms. Their privacy practices are controlled by their own policies.
            </p>

            <h2>7. Data Retention</h2>
            <p>
              We retain analytics and technical logs only as long as reasonably needed for security, diagnostics, and
              trend analysis, then delete or aggregate them.
            </p>

            <h2>8. Children’s Privacy</h2>
            <p>
              This site is intended for a general audience and is not designed to knowingly collect personal data from
              children under 13.
            </p>

            <h2>9. International Visitors</h2>
            <p>
              If you access this site from outside the hosting region, your information may be processed in countries
              with different data-protection laws.
            </p>

            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this policy as site operations evolve. When we do, we update the “Last Updated” date on
              this page.
            </p>

            <h2>11. Unofficial Site Notice</h2>
            <p>
              67 Speed Wiki is an independent fan project and is not the official operator of the 67 Speed challenge.
              Official products and trademarks belong to their respective owners.
            </p>

            <h2>12. Contact</h2>
            <p>
              For privacy questions or requests, email
              {' '}
              <a href="mailto:privacy@67speed.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                privacy@67speed.wiki
              </a>
              .
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
