import { Link, createFileRoute } from '@tanstack/react-router'
import BreadcrumbPlaceholder from '../components/BreadcrumbPlaceholder'
import { docsCatalog } from '../content.docsCatalog'

export const Route = createFileRoute('/docs')({
  component: DocsIndexRoute,
})

function DocsIndexRoute() {
  return (
    <div className="page-frame">
      <section className="hero-panel slide-up">
        <p className="hero-kicker">Level 1</p>
        <h1 className="hero-title">Documentation Base Route</h1>
        <p className="hero-copy">
          This route is your static anchor. From here, navigation branches into
          dynamic section, topic, and article segments.
        </p>
      </section>

      <BreadcrumbPlaceholder
        hint="Breadcrumb component target for /docs."
        segments={['docs']}
      />

      <section className="card-grid">
        {Object.entries(docsCatalog).map(([sectionSlug, section], index) => {
          const topicEntries = Object.entries(section.topics) as Array<
            [string, { title: string; articles: readonly string[] }]
          >
          const firstTopic = topicEntries[0]?.[0] ?? 'routing'
          const firstArticle = topicEntries[0]?.[1].articles[0] ?? 'overview'

          return (
            <article
              key={sectionSlug}
              className="card slide-up"
              style={{ animationDelay: `${index * 80 + 130}ms` }}
            >
              <p className="card-meta">Dynamic sectionSlug</p>
              <h2 className="card-title">{section.title}</h2>
              <p className="card-copy">{section.description}</p>

              <div className="card-actions">
                <Link
                  to="/docs/$sectionSlug"
                  params={{ sectionSlug }}
                  className="button-link"
                >
                  Open /{sectionSlug}
                </Link>
                <Link
                  to="/docs/$sectionSlug/$topicSlug/$articleSlug"
                  params={{
                    sectionSlug,
                    topicSlug: firstTopic,
                    articleSlug: firstArticle,
                  }}
                  className="button-link alt"
                >
                  Deep Link
                </Link>
              </div>
            </article>
          )
        })}
      </section>
    </div>
  )
}
