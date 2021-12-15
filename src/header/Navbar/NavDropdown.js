import React from 'react'
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route, Link
//   } from 'react-router-dom';
import Profile from '../../screen/Profile'
import './Nav.css'
import { useHistory } from 'react-router-dom'

function NavDropdown() {
    const history = useHistory()

    return (
        <div class="dropdown-content">
            <br />
            <p className="view" onClick={() => history.push('/Profile')}>
                view profile
            </p>{' '}
            <br />
            <p className="view" onClick={() => history.push('/Mylist')}>
                my list
            </p>
            <br />
        </div>
    )
}

export default NavDropdown
