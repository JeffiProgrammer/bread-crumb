export const docsCatalog = {
  guides: {
    title: 'Guides',
    description: 'Step-by-step playbooks for building route flows quickly.',
    topics: {
      routing: {
        title: 'Routing',
        articles: ['file-based-routing', 'dynamic-segments', 'navigation-guardrails'],
      },
      loaders: {
        title: 'Loaders',
        articles: ['preloading-patterns', 'error-boundaries', 'cache-hydration'],
      },
      ui: {
        title: 'UI Patterns',
        articles: ['layout-shells', 'breadcrumb-zones', 'dense-navigation'],
      },
    },
  },
  reference: {
    title: 'Reference',
    description: 'Lookup tables for APIs, route params, and conventions.',
    topics: {
      router: {
        title: 'Router API',
        articles: ['link-component', 'route-params', 'active-link-states'],
      },
      tokens: {
        title: 'Design Tokens',
        articles: ['spacing-scale', 'typography-scale', 'semantic-colors'],
      },
      testing: {
        title: 'Testing',
        articles: ['route-smoke-tests', 'param-coverage', 'navigation-regression'],
      },
    },
  },
  playbooks: {
    title: 'Playbooks',
    description: 'Ready-made structures for product teams and internal tools.',
    topics: {
      onboarding: {
        title: 'Onboarding',
        articles: ['first-session-map', 'guided-exploration', 'context-retention'],
      },
      operations: {
        title: 'Operations',
        articles: ['runbooks', 'incident-navigation', 'audit-trails'],
      },
      growth: {
        title: 'Growth',
        articles: ['experiment-tree', 'funnel-pages', 'metric-notes'],
      },
    },
  },
} as const

export type DocsCatalog = typeof docsCatalog
type SectionData = DocsCatalog[keyof DocsCatalog]
type TopicSummary = {
  slug: string
  title: string
  articles: string[]
}

export function labelFromSlug(slug: string) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ')
}

export function getSection(sectionSlug: string): SectionData | undefined {
  return docsCatalog[sectionSlug as keyof DocsCatalog]
}

export function getTopics(sectionSlug: string) {
  const section = getSection(sectionSlug)
  if (!section) {
    return [] as TopicSummary[]
  }

  return Object.entries(section.topics).map(([slug, topic]) => ({
    slug,
    title: topic.title,
    articles: [...topic.articles],
  }))
}

export function getTopic(sectionSlug: string, topicSlug: string) {
  const section = getSection(sectionSlug)
  if (!section) {
    return null
  }

  const topicMap = section.topics as Partial<
    Record<
    string,
    {
      title: string
      articles: readonly string[]
    }
  >
  >
  const topic = topicMap[topicSlug]
  if (!topic) {
    return null
  }

  return {
    slug: topicSlug,
    title: topic.title,
    articles: [...topic.articles],
  }
}
