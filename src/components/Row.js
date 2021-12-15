import React, { useState, useEffect } from 'react'
import axios, * as others from 'axios'
import './Row.css'
import Youtube from 'react-youtube'
import MoviePoster from './MoviePoster'

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([])
    const maxNumberOfSkeletons = 10

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(fetchUrl)
            // console.log(requests.data.results);
            setMovies(response.data.results)
            return response
        }
        fetchData()
    }, [fetchUrl]) // [] run once when row load and dont run it again

    console.log(movies)

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row_posters">
                {movies.map((movie, index) => (
                    <MoviePoster
                        key={`${title}-${movie.id}`}
                        isLargeRow={isLargeRow}
                        movie={movie}
                        displayLoading={index <= maxNumberOfSkeletons}
                    />
                ))}
            </div>
        </div>
    )
}

export default Row
