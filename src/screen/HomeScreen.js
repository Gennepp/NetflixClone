import React from 'react'
import Row from '../components/Row'
import request from '../request'
import Banner from '../header/Banner'
import MoviePopover from '../components/MoviePopover'
import './HomeScreen.css'
import Login from '../header/Navbar/loginV2'

function HomeScreen() {
    const {
        fetchActionMovies,
        fetchComedyMovies,
        fetchDocumentaries,
        fetchHorrorMovies,
        fetchNetflixOriginals,
        fetchRomanceMovies,
        fetchTopRated,
    } = request
    const rowProps = [
        {
            title: 'NETFLIX ORIGINALS',
            fetchUrl: fetchNetflixOriginals,
            isLargeRow: true,
        },
        {
            title: 'Top Rated',
            fetchUrl: fetchTopRated,
        },
        {
            title: 'Action Movies',
            fetchUrl: fetchActionMovies,
        },
        {
            title: 'Comedy Movies',
            fetchUrl: fetchComedyMovies,
        },
        {
            title: 'Horror Movie',
            fetchUrl: fetchHorrorMovies,
        },
        {
            title: 'Romance Movie',
            fetchUrl: fetchRomanceMovies,
        },
        {
            title: 'Documentaries',
            fetchUrl: fetchDocumentaries,
        },
    ]

    return (
        <div className="home_screen">
            <Login />

            {/* <Nav/> */}
            <Banner />
            <div className="content">
                {rowProps.map((rowProp, i) => (
                    <Row {...rowProp} key={`${rowProp.title}-${i}`} />
                ))}
                <MoviePopover />
            </div>
        </div>
    )
}

export default HomeScreen
