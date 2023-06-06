import React, { useEffect } from 'react'
import { authRoutes, otherRoutes } from '../routes'
import { Routes, Route, Link } from 'react-router-dom'
import '../css/AppRouter.css'
import { useDispatch, useSelector } from 'react-redux'
import { getMe, checkIsAuth, logout } from '../redux/features/auth/authSlice'
// import {toast} from 'react-toastify'

export default function AppRouter() {

    const isAuth = useSelector(checkIsAuth)
    const dispatch = useDispatch()

    const logoutHandler = ()=>{
        dispatch(logout())
        window.localStorage.removeItem('token')
        // toast('Вы вышли из системы')
        console.log("window.localStorage", window.localStorage);
    }

    console.log(isAuth);
    // const isAuth = false

    return (
        <div>
            <header className='header'>
                <Link to="/">Main</Link>
                <Link to="/login">Авторизация</Link>

                {
                    isAuth && (<ul className='nav_ul'>
                        <Link className='link_item' to="/guest">Guests</Link>
                        <Link className='link_item' to="/user">Users</Link>
                        <Link className='link_item' to="/instructor">Instructor</Link>
                        <Link className='link_item' to="/transport">Transport</Link>
                        <Link className='link_item' to="/event">Events</Link>
                    </ul>)
                }

                {
                    isAuth && (<button onClick={logoutHandler}>Выйти</button>)
                }

            </header>

            <Routes>
                {
                    isAuth && authRoutes.map(({ path, element }) => {
                        return (<Route key={path} path={path} element={element}></Route>)
                    })
                }
                {
                    otherRoutes.map(({ path, element }) => {
                        return (<Route key={path} path={path} element={element}></Route>)
                    })
                }
            </Routes>
        </div>
    )
}

