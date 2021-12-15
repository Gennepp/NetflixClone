import React, { useContext, useState } from 'react'

export const MovieContext = React.createContext()

export const useMovieContext = () => useContext(MovieContext)

const MovieProvider = ({ ...props }) => {
    const [movie, setMovie] = useState()

    return <MovieContext.Provider value={{ movie, setMovie }} {...props} />
}
export default MovieProvider
