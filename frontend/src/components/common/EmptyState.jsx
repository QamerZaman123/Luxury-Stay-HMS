export default function EmptyState({ title = "Nothing to show", description }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <p className="font-serif text-[22px] text-charcoal">{title}</p>
      {description ? <p className="mt-2 max-w-sm text-[13px] text-muted">{description}</p> : null}
    </div>
  );
}
