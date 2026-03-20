import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
    page: number
    totalPages: number
    pageSize: number
    onPageChange: (page: number) => void
    onPageSizeChange: (size: number) => void
    loading?: boolean
}

const PAGE_SIZES = [10, 20, 40]

export function Pagination({
    page,
    totalPages,
    pageSize,
    onPageChange,
    onPageSizeChange,
}: PaginationProps) {
    const displayPages = Math.min(totalPages, 500)
    const hasPrev = page > 1
    const hasNext = page < totalPages

    return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <div className="flex items-center gap-2">
                <span className="text-sm text-slate-400">Por página:</span>
                <select
                    value={pageSize}
                    onChange={(e) => {
                        onPageSizeChange(Number(e.target.value))
                        onPageChange(1)
                    }}
                    className="bg-slate-800 border border-slate-600 rounded px-3 py-1 text-sm cursor-pointer"
                >
                    {PAGE_SIZES.map(size => (
                        <option key={size} value={size}>{size}</option>
                    ))}
                </select>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => onPageChange(page - 1)}
                    disabled={!hasPrev}
                    className="p-2 rounded-full border border-slate-600 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition"
                    aria-label="Página anterior"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                <select
                    value={page}
                    onChange={(e) => onPageChange(Number(e.target.value))}
                    className="bg-slate-800 border border-slate-600 rounded px-3 py-1 text-sm cursor-pointer"
                >
                    {Array.from({ length: Math.min(displayPages, 50) }, (_, i) => i + 1).map(p => (
                        <option key={p} value={p}>{p}</option>
                    ))}
                    {displayPages > 50 && (
                        <>
                            {Array.from({ length: Math.min(Math.floor((displayPages - 50) / 100) + 1, 5) }, (_, i) => 51 + i * 100).map(p => (
                                <option key={p} value={p}>{p}</option>
                            ))}
                        </>
                    )}
                </select>

                <span className="text-sm text-slate-400">
                    de {displayPages}{totalPages > 500 ? '+' : ''}
                </span>

                <button
                    onClick={() => onPageChange(page + 1)}
                    disabled={!hasNext}
                    className="p-2 rounded-full border border-slate-600 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition"
                    aria-label="Próxima página"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}
