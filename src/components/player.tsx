import { useState, useRef } from 'react'
import ReactPlayer from 'react-player/youtube'
import type { Video } from '../types/video.types'
import { Play, Pause, ChevronDown, Video as VideoIcon } from 'lucide-react'

type Props = {
    video: Video[] | undefined
}

type VideoFilter = 'all' | 'Trailer' | 'Teaser' | 'Clip' | 'Featurette'

export function Player({ video }: Props) {
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
    const [showOptions, setShowOptions] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const [filter, setFilter] = useState<VideoFilter>('all')
    const playerRef = useRef<ReactPlayer>(null)

    const youtubeVideos = video?.filter(v => v.site === 'YouTube') || []

    const filteredVideos = filter === 'all'
        ? youtubeVideos
        : youtubeVideos.filter(v => v.type === filter)

    const currentVideo = selectedVideo || getDefaultTrailer(youtubeVideos)

    function getDefaultTrailer(videos: Video[]): Video | null {
        return (
            videos.find(v => v.type === 'Trailer' && v.official && v.name.toLowerCase().includes('dublado')) ||
            videos.find(v => v.type === 'Trailer' && v.official && v.name.toLowerCase().includes('legendado')) ||
            videos.find(v => v.type === 'Trailer' && v.official) ||
            videos.find(v => v.type === 'Trailer') ||
            videos[0] ||
            null
        )
    }

    const filterOptions: { value: VideoFilter; label: string }[] = [
        { value: 'all', label: 'Todos' },
        { value: 'Trailer', label: 'Trailers' },
        { value: 'Teaser', label: 'Teasers' },
        { value: 'Clip', label: 'Clipes' },
        { value: 'Featurette', label: 'Featurettes' },
    ]

    if (!currentVideo) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-400">
                Nenhum vídeo disponível
            </div>
        )
    }

    return (
        <div
            className="relative w-full h-full bg-black rounded-lg overflow-hidden group"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <ReactPlayer
                ref={playerRef}
                url={`https://www.youtube.com/watch?v=${currentVideo.key}`}
                controls
                width="100%"
                height="100%"
                playing={isHovering}
                fallback={<div className="w-full h-full flex items-center justify-center bg-slate-900">Carregando...</div>}
            />

            <div className={`absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 text-xs rounded ${
                            currentVideo.type === 'Trailer' ? 'bg-red-600' :
                            currentVideo.type === 'Teaser' ? 'bg-yellow-600' :
                            currentVideo.type === 'Clip' ? 'bg-blue-600' : 'bg-purple-600'
                        }`}>
                            {currentVideo.type}
                        </span>
                        {currentVideo.official && (
                            <span className="px-2 py-0.5 text-xs rounded bg-green-600">
                                Oficial
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-300">
                            {currentVideo.name}
                        </span>
                        <span className="text-xs text-slate-400">
                            {new Date(currentVideo.published_at).toLocaleDateString('pt-BR')}
                        </span>
                    </div>
                </div>
            </div>

            {filteredVideos.length > 1 && (
                <div className="absolute bottom-16 right-4">
                    <div className="relative">
                        <button
                            onClick={() => setShowOptions(!showOptions)}
                            className="flex items-center gap-2 px-3 py-2 bg-slate-800/90 hover:bg-slate-700 rounded-lg text-sm transition"
                        >
                            <VideoIcon className="w-4 h-4" />
                            <span>Vídeos ({youtubeVideos.length})</span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${showOptions ? 'rotate-180' : ''}`} />
                        </button>

                        {showOptions && (
                            <div className="absolute bottom-full right-0 mb-2 w-80 bg-slate-900 border border-slate-700 rounded-lg shadow-xl overflow-hidden z-50">
                                <div className="flex flex-wrap gap-1 p-2 border-b border-slate-700">
                                    {filterOptions.map(opt => (
                                        <button
                                            key={opt.value}
                                            onClick={() => setFilter(opt.value)}
                                            className={`px-2 py-1 text-xs rounded transition ${
                                                filter === opt.value
                                                    ? 'bg-purple-600 text-white'
                                                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                            }`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>

                                <div className="max-h-64 overflow-y-auto">
                                    {filteredVideos.map((v) => (
                                        <button
                                            key={v.id}
                                            onClick={() => {
                                                setSelectedVideo(v)
                                                setShowOptions(false)
                                            }}
                                            className={`w-full flex items-center gap-3 p-3 text-left hover:bg-slate-800 transition ${
                                                currentVideo?.id === v.id ? 'bg-slate-800 border-l-2 border-purple-500' : ''
                                            }`}
                                        >
                                            <div className="relative w-24 h-14 flex-shrink-0 bg-slate-700 rounded overflow-hidden">
                                                <img
                                                    src={`https://img.youtube.com/vi/${v.key}/mqdefault.jpg`}
                                                    alt={v.name}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                                    <Play className="w-6 h-6 text-white fill-white" />
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-white truncate">{v.name}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className={`px-1.5 py-0.5 text-[10px] rounded ${
                                                        v.type === 'Trailer' ? 'bg-red-600' :
                                                        v.type === 'Teaser' ? 'bg-yellow-600' :
                                                        v.type === 'Clip' ? 'bg-blue-600' : 'bg-purple-600'
                                                    }`}>
                                                        {v.type}
                                                    </span>
                                                    <span className="text-xs text-slate-400">
                                                        {v.size}p
                                                    </span>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                    <span className="flex items-center gap-1">
                        {isHovering ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                        Pause/Play automático
                    </span>
                    <span>•</span>
                    <span>{currentVideo.key}</span>
                </div>
            </div>
        </div>
    )
}
