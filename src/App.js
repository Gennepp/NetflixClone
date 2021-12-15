import React from 'react'
import 'antd/dist/antd.css'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HomeScreen from './screen/HomeScreen'
import Profile from './screen/Profile'
import MyList from './screen/MyList'
import MovieProvider from './contexts/MovieProvider'
import MyListProvider from './contexts/MyListProvider'

function App() {
    return (
        <div className="app">
            <MyListProvider>
                <MovieProvider>
                    <Router>
                        <Switch>
                            <Route exact path="/">
                                <HomeScreen />
                            </Route>
                            <Route exact path="/Profile">
                                <Profile />
                            </Route>
                            <Route exact path="/Mylist">
                                <MyList />
                            </Route>
                        </Switch>
                    </Router>
                </MovieProvider>
            </MyListProvider>
        </div>
    )
}

export default App
