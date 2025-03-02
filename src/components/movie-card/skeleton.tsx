export function MovieCardSkeleton() {
    return (
        <div className="movie-card cursor-pointer duration-150 transition-transform hover:scale-110 animate-pulse">
            {/* Placeholder  export default MovieCardSkeleton; para imagem do pôster */}
            <div className="w-full h-72 bg-dark-200 rounded-lg"></div>

            <div className="mt-4">
                {/* Placeholder para o título */}
                <div className="h-6 w-3/4 bg-dark-300 rounded-md mb-3"></div>

                <div className="content flex items-center gap-2">
                    {/* Placeholder para a estrela e rating */}
                    <div className="w-5 h-5 bg-dark-300 rounded-full"></div>
                    <div className="h-4 w-8 bg-dark-300 rounded-md"></div>

                    <span className="text-dark-300">•</span>

                    {/* Placeholder para idioma */}
                    <div className="h-4 w-10 bg-dark-300 rounded-md"></div>

                    <span className="text-dark-300">•</span>

                    {/* Placeholder para o ano */}
                    <div className="h-4 w-12 bg-dark-300 rounded-md"></div>
                </div>
            </div>
        </div>
    );
};


