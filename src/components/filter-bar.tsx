
type SortOption = {
    value: string;
    label: string;
};

interface FilterBarProps {
    sortBy: string
    onSortChange: (value: string) => void
    genres: { id: number; name: string }[]
    selectedGenre: number | null
    onGenreChange: (id: number | null) => void,
    data: SortOption[]

}

export function FilterBar({ sortBy, onSortChange, genres, selectedGenre, onGenreChange, data }: FilterBarProps) {
    return (
        <div className="flex flex-wrap items-center gap-4 mb-8">
            <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
                {data.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => onGenreChange(null)}
                    className={`px-3 py-1.5 rounded-full text-sm transition ${selectedGenre === null
                        ? "bg-purple-600 text-white"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                        }`}
                >
                    Todos
                </button>
                {genres.map((genre) => (
                    <button
                        key={genre.id}
                        onClick={() => onGenreChange(genre.id)}
                        className={`px-3 py-1.5 rounded-full text-sm transition ${selectedGenre === genre.id
                            ? "bg-purple-600 text-white"
                            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                            }`}
                    >
                        {genre.name}
                    </button>
                ))}
            </div>
        </div>
    )
}
