import { Skeleton } from 'antd'
import { useState } from 'react'
import { IMAGE_BASE_URL, POSTER_RATIO } from '../constants/MoviePoster'
import { useMovieContext } from '../contexts/MovieProvider'

function MoviePoster({ movie, isLargeRow, displayLoading }) {
    const { SMALL, LARGE } = POSTER_RATIO
    const posterRatio = isLargeRow ? LARGE : SMALL

    const [isLoading, setLoading] = useState(true)
    const [isError, setError] = useState(false)
    const { setMovie } = useMovieContext()

    return (
        <div className="movie_poster">
            {displayLoading && isLoading ? (
                <div style={{ paddingRight: '10px' }}>
                    <Skeleton.Button style={posterRatio} active />
                </div>
            ) : null}
            <img
                className={`row_poster ${isLargeRow && 'row_posterLarge'}`}
                style={{
                    ...posterRatio,
                    ...(isLoading && { display: 'none' }),
                    ...(isError && { cursor: 'auto', transform: 'none' }),
                }}
                src={`${IMAGE_BASE_URL}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                onClick={() => !isError && setMovie(movie)}
                onLoad={() => {
                    setLoading(false)
                }}
                onError={() => {
                    setLoading(false)
                    setError(true)
                }}
                alt={movie.title ?? movie.name ?? movie.original_name}
            />
            <p>{movie.title ?? movie.name ?? movie.original_name}</p>
        </div>
    )
}
export default MoviePoster
