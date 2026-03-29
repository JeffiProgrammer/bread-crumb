import * as React from 'react'
import { Slot } from 'radix-ui'

import { cn } from '#/lib/utils'
import { ChevronRightIcon } from 'lucide-react'
import { motion as m, type HTMLMotionProps } from 'motion/react'

function Breadcrumb({ ...props }: HTMLMotionProps<'nav'>) {
  return <m.nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />
}

function BreadcrumbList({ className, ...props }: HTMLMotionProps<'ol'>) {
  return (
    <m.ol
      data-slot="breadcrumb-list"
      className={cn('inline-flex text-muted-foreground', className)}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: HTMLMotionProps<'li'>) {
  return (
    <m.li
      data-slot="breadcrumb-item"
      className={cn('inline-flex items-center gap-1.5', className)}
      {...props}
    />
  )
}

function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<'a'> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot.Root : 'a'

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn('transition-colors hover:text-foreground', className)}
      {...props}
    />
  )
}


function BreadcrumbSeparator({
  children,
  className,
  ...props
}: HTMLMotionProps<'li'>) {
  return (
    <m.li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn('[&>svg]:size-4 px-1', className)}
      {...props}
    >
      {children ?? <ChevronRightIcon />}
    </m.li>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
}
