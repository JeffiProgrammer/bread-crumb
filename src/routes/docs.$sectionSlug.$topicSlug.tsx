import { Link, createFileRoute } from '@tanstack/react-router'
import BreadcrumbPlaceholder from '../components/BreadcrumbPlaceholder'
import { getTopic, labelFromSlug } from '../content.docsCatalog'

export const Route = createFileRoute('/docs/$sectionSlug/$topicSlug')({
  component: TopicRoute,
})

function TopicRoute() {
  const { sectionSlug, topicSlug } = Route.useParams()
  const topic = getTopic(sectionSlug, topicSlug)
  const sectionLabel = labelFromSlug(sectionSlug)
  const topicLabel = topic?.title ?? labelFromSlug(topicSlug)
  const articleSlugs = topic?.articles ?? [
    'overview',
    'setup-notes',
    'final-checklist',
  ]

  return (
    <div className="page-frame">
      <section className="hero-panel slide-up">
        <p className="hero-kicker">Level 3</p>
        <h1 className="hero-title">
          Topic: {topicLabel} <span className="hero-divider">/</span> {sectionLabel}
        </h1>
        <p className="hero-copy">
          Dynamic params <code>sectionSlug</code> and <code>topicSlug</code> are
          active. This is the last level before article detail.
        </p>
      </section>

      <BreadcrumbPlaceholder
        hint="Breadcrumb component target for /docs/$sectionSlug/$topicSlug."
        segments={['docs', sectionLabel, topicLabel]}
      />

      <section className="card-grid">
        {articleSlugs.map((articleSlug, index) => (
          <article
            key={articleSlug}
            className="card slide-up"
            style={{ animationDelay: `${index * 80 + 120}ms` }}
          >
            <p className="card-meta">Dynamic articleSlug</p>
            <h2 className="card-title">{labelFromSlug(articleSlug)}</h2>
            <p className="card-copy">
              Topic param: <strong>{topicSlug}</strong>
            </p>
            <div className="card-actions">
              <Link
                to="/docs/$sectionSlug/$topicSlug/$articleSlug"
                params={{ sectionSlug, topicSlug, articleSlug }}
                className="button-link"
              >
                Open Article
              </Link>
              <Link
                to="/docs/$sectionSlug"
                params={{ sectionSlug }}
                className="button-link alt"
              >
                Back To Section
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
