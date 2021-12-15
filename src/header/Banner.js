import React, { useState, useEffect } from 'react'
import axios, * as others from 'axios'
import request from '../request'
import './Banner.css'
import { useHistory } from 'react-router'

function Banner() {
    const [movie, setMovie] = useState([]) //change banner every refresh
    const history = useHistory()

    useEffect(() => {
        async function fetchData() {
            const requests = await axios.get(request.fetchNetflixOriginals)
            setMovie(
                requests.data.results[
                    Math.floor(Math.random() * requests.data.results.length - 1)
                ]
            )
            return requests
        }
        fetchData()
    }, [])

    console.log('movie', movie)

    return (
        <header
            className="banner"
            style={{
                backgroundSize: 'cover',
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
                backgroundPosition: 'center center',
                position: 'relative',
            }}
        >
            <div className="banner_left_fade" />
            <div className="banner_contents">
                <h1 className="banner_title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                {/* <div className="button_group">
                    <button className="banner_button">
                        Play {movie[1]?.backdrop_path}
                    </button>
                    <button
                        className="banner_button"
                        onClick={() => history.push('/mylist')}
                    >
                        My List
                    </button>
                </div> */}
                {/* 
            <h1 className="banner_descrip">{truncate(movie?.overview, 150)}</h1> */}
                <h1 className="banner_descrip">{movie?.overview}</h1>
                <div className="button_group">
                    {/* <button className="banner_button">
                        Play {movie[1]?.backdrop_path}
                    </button> */}
                    {/* <button
                        className="banner_button"
                        onClick={() => history.push('/mylist')}
                    >
                        My List
                    </button> */}
                </div>
            </div>

            <div className="banner_fade" />
        </header>
    )
}

export default Banner
