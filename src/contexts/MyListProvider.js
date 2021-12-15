import React, { useContext, useState } from 'react'

export const MyListContext = React.createContext()

export const useMyListContext = () => useContext(MyListContext)

const MyListProvider = ({ ...props }) => {
    const [myMovieList, setMyMovieList] = useState(
        JSON.parse(localStorage.getItem('MyList')) ?? []
    )

    const addToMyList = (newMovie) => {
        if (myMovieList.find(({ id }) => id === newMovie.id)) return
        myMovieList.push(newMovie)
        localStorage.setItem('MyList', JSON.stringify(myMovieList))
        setMyMovieList(myMovieList)
    }

    const removeFromMyList = (newMovie) => {
        const newList = myMovieList.filter(({ id }) => id !== newMovie.id)
        localStorage.setItem('MyList', JSON.stringify(newList))
        setMyMovieList(newList)
    }

    return (
        <MyListContext.Provider
            value={{ myMovieList, addToMyList, removeFromMyList }}
            {...props}
        />
    )
}
export default MyListProvider
