import { Link, createFileRoute } from '@tanstack/react-router'
import BreadcrumbPlaceholder from '../components/BreadcrumbPlaceholder'
import { getTopic, labelFromSlug } from '../content.docsCatalog'

export const Route = createFileRoute('/docs/$sectionSlug/$topicSlug/$articleSlug')({
  component: ArticleRoute,
})

function ArticleRoute() {
  const { sectionSlug, topicSlug, articleSlug } = Route.useParams()
  const topic = getTopic(sectionSlug, topicSlug)
  const articleList = topic?.articles ?? [articleSlug]
  const sectionLabel = labelFromSlug(sectionSlug)
  const topicLabel = topic?.title ?? labelFromSlug(topicSlug)
  const articleLabel = labelFromSlug(articleSlug)

  const siblingArticles = articleList.filter((item) => item !== articleSlug)

  return (
    <div className="page-frame">
      <section className="hero-panel slide-up">
        <p className="hero-kicker">Level 4</p>
        <h1 className="hero-title">Article: {articleLabel}</h1>
        <p className="hero-copy">
          You are on the deepest route in this playground. All three dynamic
          params are active and ready for full breadcrumb rendering logic.
        </p>

        <div className="inline-tags">
          <span className="tag">sectionSlug: {sectionSlug}</span>
          <span className="tag">topicSlug: {topicSlug}</span>
          <span className="tag">articleSlug: {articleSlug}</span>
        </div>
      </section>

      <BreadcrumbPlaceholder
        hint="Breadcrumb component target for /docs/$sectionSlug/$topicSlug/$articleSlug."
        segments={['docs', sectionLabel, topicLabel, articleLabel]}
      />

      <section className="split-grid">
        <article className="card slide-up">
          <p className="card-meta">Current Context</p>
          <h2 className="card-title">Article Body Placeholder</h2>
          <p className="card-copy">
            Keep this space as your content region while breadcrumbs are being
            implemented in the dedicated placeholder area above.
          </p>
          <div className="card-actions">
            <Link
              to="/docs/$sectionSlug/$topicSlug"
              params={{ sectionSlug, topicSlug }}
              className="button-link"
            >
              Back To Topic
            </Link>
            <Link to="/docs" className="button-link alt">
              Back To Docs Base
            </Link>
          </div>
        </article>

        <article className="card slide-up" style={{ animationDelay: '120ms' }}>
          <p className="card-meta">Sibling Routes</p>
          <h2 className="card-title">Jump Across Articles</h2>
          <p className="card-copy">
            Validate breadcrumb updates by switching between sibling article
            pages within the same topic.
          </p>
          <div className="card-actions stack-actions">
            {(siblingArticles.length > 0 ? siblingArticles : ['next-step']).map(
              (sibling) => (
                <Link
                  key={sibling}
                  to="/docs/$sectionSlug/$topicSlug/$articleSlug"
                  params={{ sectionSlug, topicSlug, articleSlug: sibling }}
                  className="button-link alt"
                >
                  {labelFromSlug(sibling)}
                </Link>
              ),
            )}
          </div>
        </article>
      </section>
    </div>
  )
}
