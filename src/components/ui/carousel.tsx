import * as React from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "../../lib/utils"

type EmblaOptionsType = Parameters<typeof useEmblaCarousel>[0]

interface CarouselProps {
  opts?: EmblaOptionsType
  plugins?: any[]
  orientation?: "horizontal" | "vertical"
  setApi?: (api: any) => void
  children: React.ReactNode
  className?: string
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
  orientation: "horizontal" | "vertical"
} | null

const CarouselContext = React.createContext<CarouselContextProps>(null)

const useCarousel = () => {
  const context = React.useContext(CarouselContext)
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }
  return context
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ orientation = "horizontal", plugins, setApi, opts, children, className }, ref) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const onSelect = React.useCallback((api: any) => {
      if (!api) return
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback(() => {
      api?.scrollNext()
    }, [api])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
    )

    React.useEffect(() => {
      if (!api) return
      onSelect(api)
      api.on("reInit", onSelect)
      api.on("select", onSelect)
      return () => {
        api?.off("select", onSelect)
      }
    }, [api, onSelect])

    React.useEffect(() => {
      if (setApi) {
        setApi(api)
      }
    }, [api, setApi])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api,
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
          orientation,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-label="carousel"
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  { className?: string; children: React.ReactNode; curved?: boolean }
>(({ className, children, curved = true }, ref) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div className="relative">
      {curved && (
        <>
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 z-20 bg-gradient-to-r from-black to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 z-20 bg-gradient-to-l from-black to-transparent pointer-events-none" />
        </>
      )}
      <div ref={carouselRef} className="overflow-hidden">
        <div
          ref={ref}
          className={cn(
            "flex",
            orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
            className
          )}
          style={{
            paddingLeft: orientation === "horizontal" ? "1rem" : undefined,
            paddingTop: orientation === "vertical" ? "1rem" : undefined,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

interface CarouselItemProps {
  className?: string
  children: React.ReactNode
}

const CarouselItem = React.forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ className, children }, ref) => {
    const { orientation } = useCarousel()

    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cn(
          "min-w-0 shrink-0 grow-0 basis-full",
          orientation === "horizontal" ? "pl-4" : "pt-4",
          className
        )}
      >
        {children}
      </div>
    )
  }
)
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  { className?: string; disabled?: boolean }
>(({ className, disabled }, ref) => {
  const { scrollPrev, canScrollPrev } = useCarousel()

  return (
    <button
      ref={ref}
      onClick={scrollPrev}
      disabled={disabled || !canScrollPrev}
      className={cn(
        "absolute h-8 w-8 rounded-full p-0 flex items-center justify-center transition-colors",
        "bg-black/50 hover:bg-black/70 text-white border border-white/20",
        "disabled:opacity-30 disabled:cursor-not-allowed",
        "left-2 md:left-4 top-1/2 -translate-y-1/2 z-30",
        className
      )}
      aria-label="Slide anterior"
    >
      <ChevronLeft className="h-4 w-4" />
    </button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  { className?: string; disabled?: boolean }
>(({ className, disabled }, ref) => {
  const { scrollNext, canScrollNext } = useCarousel()

  return (
    <button
      ref={ref}
      onClick={scrollNext}
      disabled={disabled || !canScrollNext}
      className={cn(
        "absolute h-8 w-8 rounded-full p-0 flex items-center justify-center transition-colors",
        "bg-black/50 hover:bg-black/70 text-white border border-white/20",
        "disabled:opacity-30 disabled:cursor-not-allowed",
        "right-2 md:right-4 top-1/2 -translate-y-1/2 z-30",
        className
      )}
      aria-label="Próximo slide"
    >
      <ChevronRight className="h-4 w-4" />
    </button>
  )
})
CarouselNext.displayName = "CarouselNext"

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}
