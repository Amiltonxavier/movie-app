interface SkeletonGridProps {
    count?: number
    columns?: string
}

export function SkeletonGrid({ count = 10, columns = "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" }: SkeletonGridProps) {
    return (
        <div className={`grid ${columns} gap-6`}>
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="animate-pulse">
                    <div className="bg-slate-800 rounded-lg aspect-[2/3] mb-3" />
                    <div className="h-4 bg-slate-800 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-slate-800 rounded w-1/2" />
                </div>
            ))}
        </div>
    )
}
