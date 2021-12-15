import React, { useEffect, useState } from 'react'
import {
    CloseOutlined,
    StarFilled,
    SmileFilled,
    PlusOutlined,
    CheckOutlined,
} from '@ant-design/icons'
import './MoviePopover.css'
import { Badge, Button, Popover } from 'antd'
import request from '../request'
import { useMovieContext } from '../contexts/MovieProvider'
import { useMyListContext } from '../contexts/MyListProvider'
import { getGenresFromMovie, getTrailerById } from '../utils/MovieUtils'
import YouTube from 'react-youtube'

function MoviePopover() {
    const { movie, setMovie } = useMovieContext()
    const { myMovieList, addToMyList, removeFromMyList } = useMyListContext()
    const [isShown, setIsShown] = useState(!!movie)
    const [genres, setGenres] = useState([])
    const [isAlreadyInMyList, setAlreadyInMyList] = useState(false)
    const [trailer, setTrailer] = useState()

    const { fetchMovieGenres } = request

    useEffect(() => {
        if (movie)
            setAlreadyInMyList(myMovieList.find(({ id }) => id === movie.id))
    }, [movie, myMovieList])

    useEffect(() => {
        async function fetchData() {
            const movieGenres = await getGenresFromMovie(movie)
            setGenres(movieGenres)
            const videoId = await getTrailerById(movie.id)
            setTrailer(videoId)
        }
        if (movie) fetchData()
        setIsShown(!!movie)
    }, [fetchMovieGenres, movie])

    return (
        <>
            {isShown && (
                <div className="popover">
                    <div className="popover_content">
                        <div className="popover_left_content">
                            <div className="popover_header">
                                <div>
                                    <h1>
                                        {movie.title ??
                                            movie.name ??
                                            movie.original_name}
                                    </h1>
                                    <div className="popover_badge">
                                        {genres.map((genre) => (
                                            <Badge count={genre} key={genre} />
                                        ))}
                                    </div>
                                </div>
                                <div className="popover_interaction">
                                    <div className="popover_status_group">
                                        <Popover content="Rating">
                                            <div className="popover_status">
                                                <StarFilled />
                                                {movie.vote_average}
                                            </div>
                                        </Popover>
                                        <Popover content="Vote count">
                                            <div className="popover_status">
                                                <SmileFilled />
                                                {movie.vote_count}
                                            </div>
                                        </Popover>
                                    </div>
                                    {isAlreadyInMyList ? (
                                        <Button
                                            icon={<CheckOutlined />}
                                            size="small"
                                            onClick={() => {
                                                setAlreadyInMyList(false)
                                                removeFromMyList(movie)
                                            }}
                                        >
                                            Already added to my list
                                        </Button>
                                    ) : (
                                        <Button
                                            icon={<PlusOutlined />}
                                            size="small"
                                            onClick={() => {
                                                setAlreadyInMyList(true)
                                                addToMyList(movie)
                                            }}
                                        >
                                            Add to my list
                                        </Button>
                                    )}
                                </div>
                            </div>
                            <p className="popover_description">
                                {movie.overview}
                            </p>
                        </div>
                        <div className="popover_right_content">
                            <YouTube
                                videoId={trailer}
                                className="popover_video_trailer"
                            />
                        </div>
                        <Button
                            type="text"
                            icon={<CloseOutlined />}
                            style={{
                                position: 'absolute',
                                color: 'white',
                                right: '2em',
                                top: '0.75em',
                            }}
                            onClick={() => {
                                setMovie()
                                setIsShown(false)
                            }}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default MoviePopover
