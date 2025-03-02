export interface MovieResponse {
    id: number;
    title: string;
    original_title: string;
    overview: string;
    release_date: string;
    runtime: number;
    vote_average: number;
    vote_count: number;
    poster_path: string | null;
    backdrop_path: string | null;
    genres: Genre[];
    spoken_languages: SpokenLanguage[];
    production_companies: ProductionCompany[];
    revenue: number;
    budget: number;
    status: string;
    tagline: string;
    homepage: string;
    videos?: VideoResponse; // Vídeos (trailer)
}

export interface Genre {
    id: number;
    name: string;
}

export interface SpokenLanguage {
    iso_639_1: string;
    name: string;
}

export interface ProductionCompany {
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
}

export interface VideoResponse {
    id: number;
    results: Video[];
}

export interface Video {
    id: string;
    key: string; // Código do vídeo no YouTube/Vimeo
    name: string;
    site: "YouTube" | "Vimeo"; // Plataformas suportadas
    size: number; // Resolução do vídeo (ex: 720, 1080)
    type: "Trailer" | "Teaser" | "Clip" | "Featurette";
    official: boolean;
    published_at: string;
}

