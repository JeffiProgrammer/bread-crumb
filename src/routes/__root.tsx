import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import ThemeToggle from '../components/ThemeToggle'
import '../styles.css'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <Link to="/" className="brand-mark">
            Bread-Crumb Field Manual
          </Link>

          <nav className="topnav" aria-label="Primary">
            <Link
              to="/"
              className="topnav-link"
              activeProps={{ className: 'topnav-link is-active' }}
            >
              Portal
            </Link>
            <Link
              to="/docs"
              className="topnav-link"
              activeProps={{ className: 'topnav-link is-active' }}
            >
              Docs Base
            </Link>
            <Link
              to="/docs/$sectionSlug/$topicSlug/$articleSlug"
              params={{
                sectionSlug: 'guides',
                topicSlug: 'routing',
                articleSlug: 'file-based-routing',
              }}
              className="topnav-link"
            >
              Deep Route
            </Link>
          </nav>

          <ThemeToggle />
        </div>
      </header>

      <div className="layout-wrap">
        <aside className="docs-rail" aria-label="Quick navigation">
          <p className="rail-kicker">Quick Jump</p>
          <h2 className="rail-title">Route Depth Playground</h2>
          <p className="rail-copy">
            Use these links to move from static to dynamic segments and validate
            breadcrumb behavior.
          </p>

          <div className="rail-links">
            <Link to="/docs" className="rail-link">
              <strong>/docs</strong>
              <small>Base index</small>
            </Link>

            <Link
              to="/docs/$sectionSlug"
              params={{ sectionSlug: 'guides' }}
              className="rail-link"
            >
              <strong>/docs/guides</strong>
              <small>Section layer</small>
            </Link>

            <Link
              to="/docs/$sectionSlug/$topicSlug"
              params={{ sectionSlug: 'guides', topicSlug: 'routing' }}
              className="rail-link"
            >
              <strong>/docs/guides/routing</strong>
              <small>Topic layer</small>
            </Link>

            <Link
              to="/docs/$sectionSlug/$topicSlug/$articleSlug"
              params={{
                sectionSlug: 'guides',
                topicSlug: 'routing',
                articleSlug: 'file-based-routing',
              }}
              className="rail-link"
            >
              <strong>/docs/guides/routing/file-based-routing</strong>
              <small>Article layer</small>
            </Link>

            <Link
              to="/docs/$sectionSlug/$topicSlug/$articleSlug"
              params={{
                sectionSlug: 'reference',
                topicSlug: 'router',
                articleSlug: 'route-params',
              }}
              className="rail-link"
            >
              <strong>/docs/reference/router/route-params</strong>
              <small>Alt branch</small>
            </Link>
          </div>
        </aside>

        <main className="content-zone">
          <Outlet />
        </main>
      </div>

      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'TanStack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </div>
  )
}
