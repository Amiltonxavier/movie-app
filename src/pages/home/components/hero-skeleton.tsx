export function HeroSkeleton() {
    return (
        <section className="relative h-[300px] sm:h-[400px] md:h-[600px] lg:h-[700px] overflow-hidden bg-slate-900">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-20" />
            <div className="absolute inset-0 animate-pulse bg-slate-800" />
            
            <div className="absolute bottom-0 left-0 right-0 z-30 p-4 md:p-8 lg:p-12 max-w-3xl">
                <div className="space-y-3 md:space-y-4">
                    <div className="flex items-center gap-2 md:gap-3">
                        <div className="h-6 w-24 bg-slate-700 rounded animate-pulse" />
                    </div>
                    
                    <div className="h-8 sm:h-10 md:h-14 lg:h-16 w-3/4 bg-slate-700 rounded animate-pulse" />
                    
                    <div className="flex items-center gap-3 md:gap-4">
                        <div className="h-5 w-16 bg-slate-700 rounded animate-pulse" />
                        <div className="h-5 w-12 bg-slate-700 rounded animate-pulse" />
                    </div>
                    
                    <div className="hidden md:block space-y-2 max-w-xl">
                        <div className="h-4 w-full bg-slate-700 rounded animate-pulse" />
                        <div className="h-4 w-2/3 bg-slate-700 rounded animate-pulse" />
                    </div>
                    
                    <div className="flex gap-2 md:gap-4 pt-2">
                        <div className="h-10 md:h-12 w-32 md:w-40 bg-slate-700 rounded-lg animate-pulse" />
                        <div className="h-10 md:h-12 w-28 md:w-32 bg-slate-700 rounded-lg animate-pulse" />
                    </div>
                </div>
            </div>
        </section>
    );
}
