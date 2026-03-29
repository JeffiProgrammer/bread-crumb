import { Link, createFileRoute } from '@tanstack/react-router'
import BreadcrumbPlaceholder from '../components/BreadcrumbPlaceholder'
import { getSection, getTopics, labelFromSlug } from '../content.docsCatalog'

export const Route = createFileRoute('/docs/$sectionSlug')({
  component: SectionRoute,
})

function SectionRoute() {
  const { sectionSlug } = Route.useParams()
  const section = getSection(sectionSlug)
  const topics = getTopics(sectionSlug)
  const sectionLabel = section?.title ?? labelFromSlug(sectionSlug)

  return (
    <div className="page-frame">
      <section className="hero-panel slide-up">
        <p className="hero-kicker">Level 2</p>
        <h1 className="hero-title">Section: {sectionLabel}</h1>
        <p className="hero-copy">
          Dynamic route param <code>sectionSlug</code> is active. Use this page
          to test breadcrumb labels for section-level navigation.
        </p>
      </section>

      <BreadcrumbPlaceholder
        hint="Breadcrumb component target for /docs/$sectionSlug."
        segments={['docs', sectionLabel]}
      />

      <section className="card-grid">
        {(topics.length > 0
          ? topics
          : [
              {
                slug: 'topic-not-found',
                title: 'Topic Not Found',
                articles: ['fallback-article'],
              },
            ]
        ).map((topic, index) => (
          <article
            key={topic.slug}
            className="card slide-up"
            style={{ animationDelay: `${index * 85 + 120}ms` }}
          >
            <p className="card-meta">Dynamic topicSlug</p>
            <h2 className="card-title">{topic.title}</h2>
            <p className="card-copy">
              Section param: <strong>{sectionSlug}</strong>
            </p>

            <div className="card-actions">
              <Link
                to="/docs/$sectionSlug/$topicSlug"
                params={{ sectionSlug, topicSlug: topic.slug }}
                className="button-link"
              >
                Open Topic
              </Link>
              <Link
                to="/docs/$sectionSlug/$topicSlug/$articleSlug"
                params={{
                  sectionSlug,
                  topicSlug: topic.slug,
                  articleSlug: topic.articles[0] ?? 'fallback-article',
                }}
                className="button-link alt"
              >
                Jump To Article
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
