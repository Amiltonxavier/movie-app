import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { CONSTANTS } from "../../constants";

interface TVShowCarouselProps {
  title: string;
  shows: any[];
  linkToSeeAll?: string;
}

export function TVShowCarousel({ title, shows, linkToSeeAll }: TVShowCarouselProps) {
  return (
    <section className="mb-8 md:mb-12 px-4 md:px-0">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
        {linkToSeeAll && (
          <Link
            to={linkToSeeAll}
            className="text-sm text-purple-400 hover:text-purple-300 transition"
          >
            Ver todos
          </Link>
        )}
      </div>

      <div className="relative group">
        <Carousel
          opts={{
            align: "start",
            loop: true,
            dragFree: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {shows?.map((show) => (
              <CarouselItem 
                key={show.id} 
                className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1-6"
              >
                <Link
                  to={`${CONSTANTS.ROUTERS.watchTvShow.replace(':id', String(show.id))}`}
                  className="block"
                >
                  <div className="relative overflow-hidden rounded-lg group/card">
                    <img
                      src={show.poster_path 
                        ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
                        : show.poster_url
                      }
                      alt={show.name}
                      className="w-full aspect-[2/3] object-cover transition-transform duration-300 group-hover/card:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover/card:translate-y-0 transition-transform duration-300">
                      <h3 className="text-sm font-semibold text-white line-clamp-2">
                        {show.name}
                      </h3>
                      {show.vote_average !== undefined && (
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          <span className="text-xs text-slate-300">
                            {show.vote_average.toFixed(1)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
}
