import ReactPlayer from 'react-player/youtube';
import type { Video } from '../types/video.types';

type Props = {
    video: Video[] | undefined
}

export function Player({ video }: Props) {
    const trailer = video
        ?.filter(v => v.site === 'YouTube' && v.type === 'Trailer' && v.official)
        ?.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()) // mais recente primeiro
        ?.find(v => v.name.toLowerCase().includes('dublado')) || // tenta dublado
        video?.find(v => v.name.toLowerCase().includes('legendado')) || // senão tenta legendado
        video?.[0]; // fallback


    return (
        <>
            {trailer ? (
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${trailer.key}`}
                    controls
                    width="100%"
                    height="100%"
                    playing={false}
                    fallback={<div>Carregando trailer...</div>}
                />
            ) : (
                <div>Nenhum trailer disponível</div>
            )}
        </>
    )
}
