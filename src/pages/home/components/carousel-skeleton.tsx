interface CarouselSkeletonProps {
    title?: string;
}

export function CarouselSkeleton({ title }: CarouselSkeletonProps) {
    return (
        <section className="mb-8 md:mb-12 px-4 md:px-0">
            {title && (
                <div className="h-7 w-48 bg-slate-800 rounded animate-pulse mb-4 md:mb-6" />
            )}
            
            <div className="relative">
                <div className="flex gap-4 overflow-hidden">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div 
                            key={index} 
                            className="flex-shrink-0 w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px]"
                        >
                            <div className="rounded-lg overflow-hidden">
                                <div 
                                    className="w-full aspect-[2/3] bg-slate-800 animate-pulse"
                                    style={{ 
                                        animationDelay: `${index * 100}ms`,
                                    }}
                                />
                            </div>
                            <div className="mt-2 space-y-2 px-1">
                                <div className="h-4 w-3/4 bg-slate-800 rounded animate-pulse" />
                                <div className="h-3 w-1/2 bg-slate-800 rounded animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
