import axios from 'axios'
import request from '../request'

export const getGenresFromMovie = async (movie) => {
    const { fetchMovieGenres } = request
    const allGenres = (await axios.get(fetchMovieGenres)).data.genres
    return allGenres
        .filter((genre) => movie.genre_ids.includes(genre.id))
        .map(({ name }) => name)
}

export const getTrailerById = async (id) => {
    const { fetchMovieTrailer, fetchTvShowTrailer } = request
    try {
        const movieTrailers = (
            await axios.get(fetchMovieTrailer.replace('{id}', id))
        ).data.results
        if (movieTrailers.length === 0)
            throw new Error(`This id:${id} type is not movie`)

        const { key } =
            movieTrailers.filter(isOfficialTrailer) && movieTrailers[0]

        return key
    } catch (error) {
        try {
            const tvShowTrailers = (
                await axios.get(fetchTvShowTrailer.replace('{id}', id))
            ).data.results
            if (tvShowTrailers.length === 0)
                throw new Error(`This id:${id} type is not tv show`)

            const { key } =
                tvShowTrailers.filter(isOfficialTrailer) && tvShowTrailers[0]

            return key
        } catch (e) {
            throw new Error(`Found no trailers by id:${id}`)
        }
    }
}

const OFFICIAL_TRAILER_PROPERTY = {
    official: true,
    site: 'Youtube',
    type: 'Trailer',
}

const OFFICIAL_TRAILER = /.*Official Trailer.*/gi

const isOfficialTrailer = (movieTrailer) => {
    const { name, type, official, site } = movieTrailer
    return (
        official === OFFICIAL_TRAILER_PROPERTY.official &&
        site === OFFICIAL_TRAILER_PROPERTY.site &&
        type === OFFICIAL_TRAILER_PROPERTY.type &&
        name.includes(OFFICIAL_TRAILER)
    )
}
