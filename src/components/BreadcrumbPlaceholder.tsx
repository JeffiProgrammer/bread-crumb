type BreadcrumbPlaceholderProps = {
  hint: string
  segments: string[]
}

export default function BreadcrumbPlaceholder({
  hint,
  segments,
}: BreadcrumbPlaceholderProps) {
  return (
    <section className="crumb-slot slide-up" aria-label="Breadcrumb placeholder">
      <p className="crumb-label">Breadcrumb Placeholder</p>
      <p className="crumb-path">{hint}</p>
      <div className="crumb-chip-row">
        {segments.map((segment) => (
          <span key={segment} className="crumb-chip">
            {segment}
          </span>
        ))}
      </div>
    </section>
  )
}
