import React from 'react'
import MyListItem from '../components/MyListItem'
import { useMyListContext } from '../contexts/MyListProvider'
import './MyList.css'

function MyList() {
    const { myMovieList } = useMyListContext()

    return (
        <div className="my_list_screen">
            <h1>My List</h1>
            <div className="my_list">
                {myMovieList.map((movie) => (
                    <MyListItem key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    )
}

export default MyList
