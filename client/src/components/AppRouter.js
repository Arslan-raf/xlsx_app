import React from 'react'
import { authRoutes } from '../routes'
import { Routes, Route, Link } from 'react-router-dom'
import '../css/AppRouter.css'

export default function AppRouter() {
    const isAuth = true
    return (
        <div>
            <header className='header'>
                <Link to="/">Main</Link>
                <Link to="/guest">Guests</Link>
                { isAuth &&  <Link to="/user">Users</Link>}
                { isAuth && <Link to="/instructor">Instructor</Link> }
                { isAuth && <Link to="/transport">Transport</Link> }
                { isAuth && <Link to="/event">Events</Link> }
            </header>

            <Routes>
                {
                    isAuth && authRoutes.map(({ path, element }) => {
                        return (<Route key={path} path={path} element={element}></Route>)
                    })
                }
            </Routes>
        </div>
    )
}
