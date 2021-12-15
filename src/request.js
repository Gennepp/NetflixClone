const API_KEY = '4b0b7d4078e0ec2b8fed4abb82d9f943'
const url = 'https://api.themoviedb.org/3/'

const request = {
    fetchTrending: `${url}trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `${url}discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchTopRated: `${url}movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `${url}discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `${url}discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `${url}discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `${url}discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `${url}discover/movie?api_key=${API_KEY}&with_genres=99`,
    fetchMovieGenres: `${url}genre/movie/list?api_key=${API_KEY}&language=en-US`,
    fetchMovieTrailer: `${url}movie/{id}/videos?api_key=${API_KEY}&language=en-US`,
    fetchTvShowTrailer: `${url}tv/{id}/videos?api_key=${API_KEY}&language=en-US`,
}

export default request
