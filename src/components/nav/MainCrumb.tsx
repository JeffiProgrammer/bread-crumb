import { Link, useLocation } from '@tanstack/react-router'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '../ui/breadcrumb'

import { AnimatePresence, LayoutGroup, motion as m } from 'motion/react'
import { cn } from '#/lib/utils'

interface BreadCrumbSegment {
  label: string
  path: string
  href?: string
  params?: Record<string, string>
  isActive?: boolean
}

function MainCrumb() {
  const location = useLocation()
  if (location.pathname === '/') {
    return <p className=" font-bold">Home Page</p>
  }
  const normalizedPathname =
    location.pathname !== '/'
      ? location.pathname.replace(/\/+$/, '') || '/'
      : '/'

  const pathSegments =
    normalizedPathname === '/'
      ? []
      : normalizedPathname.split('/').filter(Boolean)

  const humanizeSegment = (segment: string) => {
    const decoded = decodeURIComponent(segment).replace(/[-_]+/g, ' ').trim()

    if (!decoded) {
      return 'Unknown'
    }

    return decoded
      .split(/\s+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  }

  const buildBreadCrumbs = (): BreadCrumbSegment[] => {
    const segments: BreadCrumbSegment[] = [{ label: 'Home', path: '/', href: '/' }]

    for (let i = 0; i < pathSegments.length; i++) {
      const rawSegment = pathSegments[i]
      const isActive = i === pathSegments.length - 1
      const path = `/${pathSegments.slice(0, i + 1).join('/')}`

      segments.push({
        label: humanizeSegment(rawSegment),
        path,
        href: isActive ? undefined : path,
        isActive,
      })
    }

    return segments
  }

  const breadcrumbs = buildBreadCrumbs()

  return (
    <Breadcrumb>
      <LayoutGroup>
        <BreadcrumbList layout>
          <AnimatePresence>
            {breadcrumbs.map((crumb, index) => (
              <m.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.25 } }}
                exit={{ opacity: 0 }}
                className="flex items-center min-w-10"
                key={crumb.path}
              >
                {index > 0 && (
                  <BreadcrumbSeparator
                    aria-hidden="true"
                    initial={{ x: -5, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.35 }}
                  />
                )}
                <BreadcrumbItem
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.25 } }}
                  className={cn(
                    `${crumb.isActive ? 'text-foreground' : 'text-muted-foreground'}`,
                  )}
                >
                  {crumb.href ? (
                    <Link to={crumb.href}>
                      {crumb.label}
                    </Link>
                  ) : (
                    <span>{crumb.label}</span>
                  )}
                </BreadcrumbItem>
              </m.div>
            ))}
          </AnimatePresence>
        </BreadcrumbList>
      </LayoutGroup>
    </Breadcrumb>
  )
}

export default MainCrumb
