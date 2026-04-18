import { getLatestArticles } from '@/lib/getLatestArticles'
import { buildModuleLinkMap } from '@/lib/buildModuleLinkMap'
import type { Language } from '@/lib/content'
import type { Metadata } from 'next'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import { type Locale } from '@/i18n/routing'
import HomePageClient from './HomePageClient'

interface PageProps {
  params: Promise<{ locale: string }>
}

const HOME_VIDEO = {
  videoId: 'f_x48HBX_KA',
  title: 'I DID THE 67 SPEED CHALLENGE',
}

const HOME_LINKS = {
  officialSite: 'https://67speed.com',
  officialAbout: 'https://67speed.com/about',
  officialPrivacy: 'https://67speed.com/privacy',
  officialContact: 'https://67speed.com/contact',
  instagram: 'https://www.instagram.com/67.speed/',
  youtube: 'https://www.youtube.com/watch?v=f_x48HBX_KA',
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://67speed.wiki'
  const heroImageUrl = new URL('/images/hero.webp', siteUrl).toString()
  const path = '/'
  const title = '67 Speed - world record, leaderboard & mobile guide'
  const description =
    'Track 67 Speed world records, leaderboard updates, mobile play tips, privacy details, and app info in one fast guide for the viral camera-based challenge.'

  return {
    title,
    description,
    keywords: [
      '67 Speed',
      '67 challenge',
      '67 Speed world record',
      '67 Speed leaderboard',
      '67 Speed app',
      '67 Speed meaning',
      'camera challenge game',
      'arm speed test',
    ],
    openGraph: {
      type: 'website',
      url: locale === 'en' ? siteUrl : `${siteUrl}/${locale}`,
      siteName: '67 Speed',
      title,
      description,
      images: [
        {
          url: heroImageUrl,
          width: 1920,
          height: 1080,
          alt: '67 Speed Hero Image',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [heroImageUrl],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://67speed.wiki'
  const heroImageUrl = new URL('/images/hero.webp', siteUrl).toString()

  // 服务器端获取最新文章数据
  const latestArticles = await getLatestArticles(locale as Language, 30)
  const moduleLinkMap = await buildModuleLinkMap(locale as Language)

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": siteUrl,
        "name": "67 Speed",
        "description":
          '67 Speed fan wiki with leaderboard guides, world-record tracking, gameplay tips, and official links for the viral camera challenge.',
        "image": {
          "@type": "ImageObject",
          "url": heroImageUrl,
          "width": 1920,
          "height": 1080,
          "caption": "67 Speed Hero Image",
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${siteUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        "name": "67 Speed",
        "alternateName": "67 Speed Wiki",
        "url": siteUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${siteUrl}/android-chrome-512x512.png`,
          "width": 512,
          "height": 512,
        },
        "image": {
          "@type": "ImageObject",
          "url": heroImageUrl,
          "width": 1920,
          "height": 1080,
        },
        "sameAs": [
          HOME_LINKS.officialSite,
          HOME_LINKS.officialAbout,
          HOME_LINKS.officialContact,
          HOME_LINKS.instagram,
          HOME_LINKS.youtube,
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomePageClient
        latestArticles={latestArticles}
        moduleLinkMap={moduleLinkMap}
        locale={locale}
        homeVideo={HOME_VIDEO}
        links={HOME_LINKS}
      />
    </>
  )
}
