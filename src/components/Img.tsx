import type { ComponentProps } from "react"

type Props = ComponentProps<'img'> & {
    poster_path: string | undefined
}

export function Img({ poster_path }: Props) {
    return (
        <img
            src={poster_path ?
                `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'}
        />
    )
}
