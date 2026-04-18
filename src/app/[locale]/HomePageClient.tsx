'use client'

import { useEffect, useState, Suspense, lazy } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  ClipboardCheck,
  Clock,
  ExternalLink,
  Gamepad2,
  Hammer,
  MessageCircle,
  Package,
  Settings,
  Sparkles,
  Star,
} from 'lucide-react'
import { useMessages } from 'next-intl'
import { VideoFeature } from '@/components/home/VideoFeature'
import { LatestGuidesAccordion } from '@/components/home/LatestGuidesAccordion'
import { NativeBannerAd, AdBanner } from '@/components/ads'
import { SidebarAd } from '@/components/ads/SidebarAd'
import { scrollToSection } from '@/lib/scrollToSection'
import { DynamicIcon } from '@/components/ui/DynamicIcon'
import type { ContentItemWithType } from '@/lib/getLatestArticles'
import type { ModuleLinkMap } from '@/lib/buildModuleLinkMap'

// Lazy load heavy components
const HeroStats = lazy(() => import('@/components/home/HeroStats'))
const FAQSection = lazy(() => import('@/components/home/FAQSection'))
const CTASection = lazy(() => import('@/components/home/CTASection'))

// Loading placeholder
const LoadingPlaceholder = ({ height = 'h-64' }: { height?: string }) => (
  <div className={`${height} bg-white/5 border border-border rounded-xl animate-pulse`} />
)

// Conditionally render text as a link or plain span
function LinkedTitle({
  linkData: _linkData,
  children,
  className,
  locale: _locale,
}: {
  linkData: { url: string; title: string } | null | undefined
  children: React.ReactNode
  className?: string
  locale: string
}) {
  return <span className={className}>{children}</span>
}

interface HomePageClientProps {
  latestArticles: ContentItemWithType[]
  moduleLinkMap: ModuleLinkMap
  locale: string
  homeVideo: HomeVideoConfig
  links: HomeExternalLinks
}

export interface HomeVideoConfig {
  videoId: string
  title: string
}

export interface HomeExternalLinks {
  officialSite: string
  officialAbout: string
  officialPrivacy: string
  officialTerms: string
  officialContact: string
  instagram: string
  youtube: string
}

export default function HomePageClient({
  latestArticles,
  moduleLinkMap,
  locale,
  homeVideo,
  links,
}: HomePageClientProps) {
  const t = useMessages() as any

  // FAQ accordion states
  const [scoreFixExpanded, setScoreFixExpanded] = useState<number | null>(null)
  const [privacyExpanded, setPrivacyExpanded] = useState<number | null>(null)
  const [deckExpanded, setDeckExpanded] = useState<number | null>(null)
  const [explainedExpanded, setExplainedExpanded] = useState<number | null>(null)
  const [tipsExpanded, setTipsExpanded] = useState<number | null>(null)

  // Scroll reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-reveal-visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 左侧广告容器 - Fixed 定位 */}
      <aside
        className="hidden xl:block fixed top-20 w-40 z-10"
        style={{ left: 'calc((100vw - 896px) / 2 - 180px)' }}
      >
        <SidebarAd type="sidebar-160x300" adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X300} />
      </aside>

      {/* 右侧广告容器 - Fixed 定位 */}
      <aside
        className="hidden xl:block fixed top-20 w-40 z-10"
        style={{ right: 'calc((100vw - 896px) / 2 - 180px)' }}
      >
        <SidebarAd type="sidebar-160x600" adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X600} />
      </aside>

      {/* 广告位 1: 移动端横幅 Sticky */}
      {/* <div className="sticky top-20 z-20 border-b border-border py-2">
        <AdBanner type="banner-320x50" adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50} />
      </div> */}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 scroll-reveal">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                            bg-[hsl(var(--nav-theme)/0.1)]
                            border border-[hsl(var(--nav-theme)/0.3)] mb-6">
              <Sparkles className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-sm font-medium">{t.hero.badge}</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {t.hero.title}
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              {t.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a
                href={links.officialSite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4
                           bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)]
                           text-white rounded-lg font-semibold text-lg transition-colors"
              >
                <Gamepad2 className="w-5 h-5" />
                {t.hero.getFreeCodesCTA}
              </a>
              <a
                href={links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4
                           border border-border hover:bg-white/10 rounded-lg
                           font-semibold text-lg transition-colors"
              >
                {t.hero.playOnSteamCTA}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Stats */}
          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      {/* 广告位 2: 原生横幅 */}
      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ''} />

      {/* Video Section */}
      <section className="px-4 py-12">
        <div className="scroll-reveal container mx-auto max-w-4xl">
          <div className="relative rounded-2xl overflow-hidden">
            <VideoFeature
              videoId={homeVideo.videoId}
              title={homeVideo.title}
              posterImage="/images/hero.webp"
            />
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <LatestGuidesAccordion articles={latestArticles} locale={locale} max={30} />

      {/* 广告位 3: 标准横幅 728×90 */}
      <AdBanner type="banner-728x90" adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90} />

      {/* Tools Grid - 16 Navigation Cards */}
      <section className="px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.tools.title}{' '}
              <span className="text-[hsl(var(--nav-theme-light))]">
                {t.tools.titleHighlight}
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">
              {t.tools.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {t.tools.cards.map((card: any, index: number) => {
              // 映射卡片索引到 section ID
              const sectionIds = [
                '67-speed-how-to-play', '67-speed-world-record', '67-speed-leaderboard', '67-speed-play-online',
                '67-speed-explained', '67-speed-ios-app', '67-speed-streamer-scores', '67-speed-tips',
                '67-speed-mobile-guide', '67-speed-score-not-saving', '67-speed-privacy-and-safety', '67-speed-web-vs-app',
                '67-speed-20-second-challenge', '67-speed-viral-trend', '67-speed-creator-story', '67-speed-device-compatibility'
              ]
              const sectionId = sectionIds[index]

              return (
                <a
                  key={index}
                  href={`#${sectionId}`}
                  onClick={(event) => {
                    event.preventDefault()
                    scrollToSection(sectionId)
                  }}
                  className="scroll-reveal group p-6 rounded-xl border border-border
                             bg-card hover:border-[hsl(var(--nav-theme)/0.5)]
                             transition-all duration-300 cursor-pointer text-left
                             hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="w-12 h-12 rounded-lg mb-4
                                  bg-[hsl(var(--nav-theme)/0.1)]
                                  flex items-center justify-center
                                  group-hover:bg-[hsl(var(--nav-theme)/0.2)]
                                  transition-colors">
                    <DynamicIcon
                      name={card.icon}
                      className="w-6 h-6 text-[hsl(var(--nav-theme-light))]"
                    />
                  </div>
                  <h3 className="font-semibold mb-2">{card.title}</h3>
                  <p className="text-sm text-muted-foreground">{card.description}</p>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* 广告位 4: 方形广告 300×250 */}
      <AdBanner type="banner-300x250" adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250} />

      {/* Module 1: Beginner Guide */}
      <section id="67-speed-how-to-play" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle linkData={moduleLinkMap['lucidBlocksBeginnerGuide']} locale={locale}>
                {t.modules.lucidBlocksBeginnerGuide.title}
              </LinkedTitle>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.lucidBlocksBeginnerGuide.intro}
            </p>
          </div>

          {/* Steps */}
          <div className="scroll-reveal space-y-4 mb-10">
            {t.modules.lucidBlocksBeginnerGuide.steps.map((step: any, index: number) => (
              <div key={index} className="flex gap-4 p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[hsl(var(--nav-theme)/0.2)] border-2 border-[hsl(var(--nav-theme)/0.5)] flex items-center justify-center">
                  <span className="text-xl font-bold text-[hsl(var(--nav-theme-light))]">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    <LinkedTitle linkData={moduleLinkMap[`lucidBlocksBeginnerGuide::steps::${index}`]} locale={locale}>
                      {step.title}
                    </LinkedTitle>
                  </h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Tips */}
          <div className="scroll-reveal p-6 bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
              <h3 className="font-bold text-lg">Quick Tips</h3>
            </div>
            <ul className="space-y-2">
              {t.modules.lucidBlocksBeginnerGuide.quickTips.map((tip: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 广告位 5: 中型横幅 468×60 */}
      <AdBanner type="banner-468x60" adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60} />

      {/* Module 2: Apotheosis Crafting */}
      <section id="67-speed-world-record" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4"><LinkedTitle linkData={moduleLinkMap['lucidBlocksApotheosisCrafting']} locale={locale}>{t.modules.lucidBlocksApotheosisCrafting.title}</LinkedTitle></h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.lucidBlocksApotheosisCrafting.intro}</p>
          </div>
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {t.modules.lucidBlocksApotheosisCrafting.cards.map((card: any, index: number) => (
              <div key={index} className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <h3 className="font-bold text-lg mb-2 text-[hsl(var(--nav-theme-light))]">
                  <LinkedTitle linkData={moduleLinkMap[`lucidBlocksApotheosisCrafting::cards::${index}`]} locale={locale}>
                    {card.name}
                  </LinkedTitle>
                </h3>
                <p className="text-muted-foreground text-sm">{card.description}</p>
              </div>
            ))}
          </div>
          <div className="scroll-reveal flex flex-wrap gap-3 justify-center">
            {t.modules.lucidBlocksApotheosisCrafting.milestones.map((m: string, i: number) => (
              <span key={i} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-sm">
                <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />{m}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Module 3: Tools and Weapons */}
      <section id="67-speed-leaderboard" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4"><LinkedTitle linkData={moduleLinkMap['lucidBlocksToolsAndWeapons']} locale={locale}>{t.modules.lucidBlocksToolsAndWeapons.title}</LinkedTitle></h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.lucidBlocksToolsAndWeapons.intro}</p>
          </div>
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.modules.lucidBlocksToolsAndWeapons.items.map((item: any, index: number) => (
              <div key={index} className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <Hammer className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                  <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">{item.type}</span>
                </div>
                <h3 className="font-bold mb-2">
                  <LinkedTitle linkData={moduleLinkMap[`lucidBlocksToolsAndWeapons::items::${index}`]} locale={locale}>
                    {item.name}
                  </LinkedTitle>
                </h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 4: Storage and Inventory */}
      <section id="67-speed-play-online" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4"><LinkedTitle linkData={moduleLinkMap['lucidBlocksStorageAndInventory']} locale={locale}>{t.modules.lucidBlocksStorageAndInventory.title}</LinkedTitle></h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.lucidBlocksStorageAndInventory.intro}</p>
          </div>
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {t.modules.lucidBlocksStorageAndInventory.solutions.map((s: any, index: number) => (
              <div key={index} className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="font-bold">
                    <LinkedTitle linkData={moduleLinkMap[`lucidBlocksStorageAndInventory::solutions::${index}`]} locale={locale}>
                      {s.name}
                    </LinkedTitle>
                  </h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">{s.role}</span>
                </div>
                <p className="text-muted-foreground text-sm">{s.description}</p>
              </div>
            ))}
          </div>
          <div className="scroll-reveal p-6 bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
              <h3 className="font-bold">Management Tips</h3>
            </div>
            <ul className="space-y-2">
              {t.modules.lucidBlocksStorageAndInventory.managementTips.map((tip: string, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Module 5: 67 Speed Explained */}
      <section id="67-speed-explained" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle linkData={moduleLinkMap['lucidBlocksQualiaAndBaseBuilding']} locale={locale}>
                {t.modules.lucidBlocksQualiaAndBaseBuilding.title}
              </LinkedTitle>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.lucidBlocksQualiaAndBaseBuilding.intro}
            </p>
          </div>
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.lucidBlocksQualiaAndBaseBuilding.items.map((item: any, index: number) => (
              <div
                key={index}
                className="border border-border rounded-xl overflow-hidden bg-white/5 hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
              >
                <button
                  onClick={() =>
                    setExplainedExpanded(explainedExpanded === index ? null : index)
                  }
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold bg-[hsl(var(--nav-theme)/0.15)] border border-[hsl(var(--nav-theme)/0.35)] text-[hsl(var(--nav-theme-light))]">
                      {index + 1}
                    </span>
                    <span className="font-semibold">
                      <LinkedTitle
                        linkData={moduleLinkMap[`lucidBlocksQualiaAndBaseBuilding::items::${index}`]}
                        locale={locale}
                      >
                        {item.question}
                      </LinkedTitle>
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform ${
                      explainedExpanded === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {explainedExpanded === index && (
                  <div className="px-5 pb-5 text-sm text-muted-foreground">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 6: 67 Speed iOS App */}
      <section id="67-speed-ios-app" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle linkData={moduleLinkMap['lucidBlocksWorldRegions']} locale={locale}>
                {t.modules.lucidBlocksWorldRegions.title}
              </LinkedTitle>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.lucidBlocksWorldRegions.intro}
            </p>
          </div>
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {t.modules.lucidBlocksWorldRegions.items.map((item: any, index: number) => {
              const cardIcons = [Gamepad2, Clock, Sparkles, ClipboardCheck, Star]
              const CardIcon = cardIcons[index % cardIcons.length]

              return (
                <div
                  key={index}
                  className="p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <CardIcon className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
                    <span className="text-xs font-semibold tracking-wide uppercase text-[hsl(var(--nav-theme-light))]">
                      {item.label}
                    </span>
                  </div>
                  <h3 className="font-bold mb-3 leading-snug">
                    <LinkedTitle
                      linkData={moduleLinkMap[`lucidBlocksWorldRegions::items::${index}`]}
                      locale={locale}
                    >
                      {item.value}
                    </LinkedTitle>
                  </h3>
                  <ul className="space-y-2">
                    {item.details.map((detail: string, detailIndex: number) => (
                      <li key={detailIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-[hsl(var(--nav-theme-light))]" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Module 7: 67 Speed Streamer Scores */}
      <section id="67-speed-streamer-scores" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle
                linkData={moduleLinkMap['lucidBlocksCreaturesAndEnemies']}
                locale={locale}
              >
                {t.modules.lucidBlocksCreaturesAndEnemies.title}
              </LinkedTitle>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.lucidBlocksCreaturesAndEnemies.intro}
            </p>
          </div>

          <div className="hidden md:block scroll-reveal overflow-x-auto rounded-xl border border-border bg-white/5">
            <table className="w-full text-left">
              <thead className="bg-[hsl(var(--nav-theme)/0.12)] border-b border-[hsl(var(--nav-theme)/0.3)]">
                <tr>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[hsl(var(--nav-theme-light))]">
                    Rank
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[hsl(var(--nav-theme-light))]">
                    Streamer
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[hsl(var(--nav-theme-light))]">
                    Best Score
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[hsl(var(--nav-theme-light))]">
                    67 Speed Highlight
                  </th>
                </tr>
              </thead>
              <tbody>
                {t.modules.lucidBlocksCreaturesAndEnemies.items.map((item: any, index: number) => (
                  <tr key={index} className="border-b border-border/60 last:border-b-0 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-4 font-semibold">{item.rank}</td>
                    <td className="px-4 py-4 font-semibold">
                      <LinkedTitle
                        linkData={moduleLinkMap[`lucidBlocksCreaturesAndEnemies::items::${index}`]}
                        locale={locale}
                      >
                        {item.streamer}
                      </LinkedTitle>
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[hsl(var(--nav-theme)/0.15)] border border-[hsl(var(--nav-theme)/0.35)] text-[hsl(var(--nav-theme-light))]">
                        {item.bestScore}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-muted-foreground">{item.highlight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden scroll-reveal grid grid-cols-1 gap-4">
            {t.modules.lucidBlocksCreaturesAndEnemies.items.map((item: any, index: number) => (
              <div
                key={index}
                className="p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[hsl(var(--nav-theme)/0.15)] border border-[hsl(var(--nav-theme)/0.35)] text-[hsl(var(--nav-theme-light))]">
                    Rank {item.rank}
                  </span>
                  <span className="text-xs text-muted-foreground">Best Score: {item.bestScore}</span>
                </div>
                <h3 className="font-bold mb-2">
                  <LinkedTitle
                    linkData={moduleLinkMap[`lucidBlocksCreaturesAndEnemies::items::${index}`]}
                    locale={locale}
                  >
                    {item.streamer}
                  </LinkedTitle>
                </h3>
                <p className="text-sm text-muted-foreground">{item.highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 8: 67 Speed Tips */}
      <section id="67-speed-tips" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle linkData={moduleLinkMap['lucidBlocksMobilityGear']} locale={locale}>
                {t.modules.lucidBlocksMobilityGear.title}
              </LinkedTitle>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.lucidBlocksMobilityGear.intro}
            </p>
          </div>
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.lucidBlocksMobilityGear.items.map((item: any, index: number) => (
              <div
                key={index}
                className="border border-border rounded-xl overflow-hidden bg-white/5 hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
              >
                <button
                  onClick={() => setTipsExpanded(tipsExpanded === index ? null : index)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <ArrowRight className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
                    <span className="font-semibold">
                      <LinkedTitle
                        linkData={moduleLinkMap[`lucidBlocksMobilityGear::items::${index}`]}
                        locale={locale}
                      >
                        {item.question}
                      </LinkedTitle>
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform ${
                      tipsExpanded === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {tipsExpanded === index && (
                  <div className="px-5 pb-5 text-sm text-muted-foreground">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 广告位 6: 移动端横幅 320×50 */}
      <AdBanner type="banner-320x50" adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50} />

      {/* Module 9: Mobile Guide */}
      <section id="67-speed-mobile-guide" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4"><LinkedTitle linkData={moduleLinkMap['lucidBlocksFarmingAndGrowth']} locale={locale}>{t.modules.lucidBlocksFarmingAndGrowth.title}</LinkedTitle></h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.lucidBlocksFarmingAndGrowth.intro}</p>
          </div>
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.lucidBlocksFarmingAndGrowth.steps.map((step: any, index: number) => (
              <div key={index} className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="flex items-start gap-3 mb-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[hsl(var(--nav-theme)/0.2)] border border-[hsl(var(--nav-theme)/0.4)] text-sm font-bold text-[hsl(var(--nav-theme-light))] flex items-center justify-center">
                    {index + 1}
                  </span>
                  <h3 className="font-bold leading-snug">
                    <LinkedTitle linkData={moduleLinkMap[`lucidBlocksFarmingAndGrowth::steps::${index}`]} locale={locale}>
                      {step.title}
                    </LinkedTitle>
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 10: Score Not Saving */}
      <section id="67-speed-score-not-saving" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4"><LinkedTitle linkData={moduleLinkMap['lucidBlocksBestEarlyUnlocks']} locale={locale}>{t.modules.lucidBlocksBestEarlyUnlocks.title}</LinkedTitle></h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.lucidBlocksBestEarlyUnlocks.intro}</p>
          </div>
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.lucidBlocksBestEarlyUnlocks.faqs.map((item: any, index: number) => (
              <div key={index} className="border border-border rounded-xl overflow-hidden bg-white/5">
                <button
                  onClick={() => setScoreFixExpanded(scoreFixExpanded === index ? null : index)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                    <span className="font-semibold">
                      <LinkedTitle
                        linkData={moduleLinkMap[`lucidBlocksBestEarlyUnlocks::faqs::${index}`]}
                        locale={locale}
                      >
                        {item.question}
                      </LinkedTitle>
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform ${
                      scoreFixExpanded === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {scoreFixExpanded === index && (
                  <div className="px-5 pb-5 text-sm text-muted-foreground">{item.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 11: Privacy and Safety */}
      <section id="67-speed-privacy-and-safety" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4"><LinkedTitle linkData={moduleLinkMap['lucidBlocksAchievementTracker']} locale={locale}>{t.modules.lucidBlocksAchievementTracker.title}</LinkedTitle></h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.lucidBlocksAchievementTracker.intro}</p>
          </div>
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.lucidBlocksAchievementTracker.faqs.map((item: any, index: number) => (
              <div key={index} className="border border-border rounded-xl overflow-hidden bg-white/5">
                <button
                  onClick={() => setPrivacyExpanded(privacyExpanded === index ? null : index)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <ClipboardCheck className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                    <span className="font-semibold">
                      <LinkedTitle
                        linkData={moduleLinkMap[`lucidBlocksAchievementTracker::faqs::${index}`]}
                        locale={locale}
                      >
                        {item.question}
                      </LinkedTitle>
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform ${
                      privacyExpanded === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {privacyExpanded === index && (
                  <div className="px-5 pb-5 text-sm text-muted-foreground">{item.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 12: Web vs App */}
      <section id="67-speed-web-vs-app" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4"><LinkedTitle linkData={moduleLinkMap['lucidBlocksSingleplayerAndPlatformFAQ']} locale={locale}>{t.modules.lucidBlocksSingleplayerAndPlatformFAQ.title}</LinkedTitle></h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.lucidBlocksSingleplayerAndPlatformFAQ.intro}</p>
          </div>
          <div className="hidden md:block scroll-reveal border border-border rounded-xl overflow-hidden bg-white/5">
            <table className="w-full text-left">
              <thead className="bg-white/10 border-b border-border">
                <tr>
                  <th className="px-4 py-3 text-sm font-bold">{t.modules.lucidBlocksSingleplayerAndPlatformFAQ.tableHeaders.aspect}</th>
                  <th className="px-4 py-3 text-sm font-bold">{t.modules.lucidBlocksSingleplayerAndPlatformFAQ.tableHeaders.web}</th>
                  <th className="px-4 py-3 text-sm font-bold">{t.modules.lucidBlocksSingleplayerAndPlatformFAQ.tableHeaders.app}</th>
                </tr>
              </thead>
              <tbody>
                {t.modules.lucidBlocksSingleplayerAndPlatformFAQ.comparisons.map((item: any, index: number) => (
                  <tr key={index} className="border-b border-border/70 last:border-b-0 align-top">
                    <td className="px-4 py-4 font-semibold">
                      <LinkedTitle linkData={moduleLinkMap[`lucidBlocksSingleplayerAndPlatformFAQ::comparisons::${index}`]} locale={locale}>
                        {item.aspect}
                      </LinkedTitle>
                    </td>
                    <td className="px-4 py-4 text-sm text-muted-foreground">{item.web}</td>
                    <td className="px-4 py-4 text-sm text-muted-foreground">{item.app}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="md:hidden scroll-reveal space-y-4">
            {t.modules.lucidBlocksSingleplayerAndPlatformFAQ.comparisons.map((item: any, index: number) => (
              <div key={index} className="p-5 border border-border rounded-xl bg-white/5">
                <div className="flex items-center gap-2 mb-3">
                  <ExternalLink className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
                  <h3 className="font-semibold">
                    <LinkedTitle linkData={moduleLinkMap[`lucidBlocksSingleplayerAndPlatformFAQ::comparisons::${index}`]} locale={locale}>
                      {item.aspect}
                    </LinkedTitle>
                  </h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold mb-1">{t.modules.lucidBlocksSingleplayerAndPlatformFAQ.tableHeaders.web}</p>
                    <p className="text-muted-foreground">{item.web}</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">{t.modules.lucidBlocksSingleplayerAndPlatformFAQ.tableHeaders.app}</p>
                    <p className="text-muted-foreground">{item.app}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 13: Steam Deck and Controller */}
      <section id="67-speed-20-second-challenge" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Gamepad2 className="w-8 h-8 text-[hsl(var(--nav-theme-light))]" />
              <h2 className="text-4xl md:text-5xl font-bold"><LinkedTitle linkData={moduleLinkMap['lucidBlocksSteamDeckAndController']} locale={locale}>{t.modules.lucidBlocksSteamDeckAndController.title}</LinkedTitle></h2>
            </div>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.lucidBlocksSteamDeckAndController.intro}</p>
          </div>
          <div className="scroll-reveal space-y-2">
            {t.modules.lucidBlocksSteamDeckAndController.faqs.map((faq: any, index: number) => (
              <div key={index} className="border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setDeckExpanded(deckExpanded === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-semibold">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform ${deckExpanded === index ? "rotate-180" : ""}`} />
                </button>
                {deckExpanded === index && (
                  <div className="px-5 pb-5 text-muted-foreground text-sm">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 14: Settings and Accessibility */}
      <section id="67-speed-viral-trend" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4"><LinkedTitle linkData={moduleLinkMap['lucidBlocksSettingsAndAccessibility']} locale={locale}>{t.modules.lucidBlocksSettingsAndAccessibility.title}</LinkedTitle></h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.lucidBlocksSettingsAndAccessibility.intro}</p>
          </div>
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.lucidBlocksSettingsAndAccessibility.settings.map((s: any, index: number) => (
              <div key={index} className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <Settings className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                  <h3 className="font-bold">
                    <LinkedTitle linkData={moduleLinkMap[`lucidBlocksSettingsAndAccessibility::settings::${index}`]} locale={locale}>
                      {s.name}
                    </LinkedTitle>
                  </h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">{s.type}</span>
                </div>
                <p className="text-muted-foreground text-sm">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 15: Updates and Patch Notes */}
      <section id="67-speed-creator-story" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4"><LinkedTitle linkData={moduleLinkMap['lucidBlocksUpdatesAndPatchNotes']} locale={locale}>{t.modules.lucidBlocksUpdatesAndPatchNotes.title}</LinkedTitle></h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.lucidBlocksUpdatesAndPatchNotes.intro}</p>
          </div>
          <div className="scroll-reveal relative pl-6 border-l-2 border-[hsl(var(--nav-theme)/0.3)] space-y-8">
            {t.modules.lucidBlocksUpdatesAndPatchNotes.entries.map((entry: any, index: number) => (
              <div key={index} className="relative">
                <div className="absolute -left-[1.4rem] w-4 h-4 rounded-full bg-[hsl(var(--nav-theme))] border-2 border-background" />
                <div className="p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">{entry.type}</span>
                    <Clock className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <h3 className="font-bold mb-1">
                    <LinkedTitle linkData={moduleLinkMap[`lucidBlocksUpdatesAndPatchNotes::entries::${index}`]} locale={locale}>
                      {entry.title}
                    </LinkedTitle>
                  </h3>
                  <p className="text-muted-foreground text-sm">{entry.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 16: Crash Fix and Troubleshooting */}
      <section id="67-speed-device-compatibility" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4"><LinkedTitle linkData={moduleLinkMap['lucidBlocksCrashFixAndTroubleshooting']} locale={locale}>{t.modules.lucidBlocksCrashFixAndTroubleshooting.title}</LinkedTitle></h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.lucidBlocksCrashFixAndTroubleshooting.intro}</p>
          </div>
          <div className="scroll-reveal space-y-4 mb-8">
            {t.modules.lucidBlocksCrashFixAndTroubleshooting.steps.map((step: any, index: number) => (
              <div key={index} className="flex gap-4 p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[hsl(var(--nav-theme)/0.2)] border-2 border-[hsl(var(--nav-theme)/0.5)] flex items-center justify-center">
                  <span className="text-xl font-bold text-[hsl(var(--nav-theme-light))]">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    <LinkedTitle linkData={moduleLinkMap[`lucidBlocksCrashFixAndTroubleshooting::steps::${index}`]} locale={locale}>
                      {step.title}
                    </LinkedTitle>
                  </h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="scroll-reveal p-6 bg-[hsl(var(--nav-theme)/0.08)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-[hsl(var(--nav-theme-light))] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-[hsl(var(--nav-theme-light))] mb-2">Still having issues?</h3>
                <p className="text-sm text-muted-foreground mb-3">Report bugs with your logs through the official channels:</p>
                <div className="flex flex-wrap gap-3">
                  <a href={links.instagram} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-sm hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                    <MessageCircle className="w-4 h-4" /> Instagram <ExternalLink className="w-3 h-3" />
                  </a>
                  <a href={links.officialContact} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-sm hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                    Official Contact <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection
          title={t.faq.title}
          titleHighlight={t.faq.titleHighlight}
          subtitle={t.faq.subtitle}
          questions={t.faq.questions}
        />
      </Suspense>

      {/* CTA Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection
          title={t.cta.title}
          description={t.cta.description}
          joinCommunity={t.cta.joinCommunity}
          joinGame={t.cta.joinGame}
          communityUrl={links.instagram}
          gameUrl={links.officialSite}
        />
      </Suspense>

      {/* Ad Banner 3 */}
      <AdBanner type="banner-728x90" adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90} />

      {/* Footer */}
      <footer className="bg-white/[0.02] border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme-light))]">
                {t.footer.title}
              </h3>
              <p className="text-sm text-muted-foreground">{t.footer.description}</p>
            </div>

            {/* Community - External Links Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.community}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href={links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.discord}
                  </a>
                </li>
                <li>
                  <a
                    href={links.officialSite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.twitter}
                  </a>
                </li>
                <li>
                  <a
                    href={links.officialAbout}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.steamCommunity}
                  </a>
                </li>
                <li>
                  <a
                    href={links.officialContact}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.steamStore}
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal - External Official Links */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href={links.officialAbout}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.about}
                  </a>
                </li>
                <li>
                  <a
                    href={links.officialPrivacy}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.privacy}
                  </a>
                </li>
                <li>
                  <a
                    href={links.officialTerms}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.terms}
                  </a>
                </li>
                <li>
                  <a
                    href={links.officialContact}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.copyrightNotice}
                  </a>
                </li>
              </ul>
            </div>

            {/* Copyright */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">{t.footer.copyright}</p>
              <p className="text-xs text-muted-foreground">{t.footer.disclaimer}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
