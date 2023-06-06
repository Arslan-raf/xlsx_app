import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkIsAuth, loginUser } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";


export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { status } = useSelector((state) => state.auth)
    const isAuth = useSelector(checkIsAuth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (status) toast(status)
        if (isAuth) navigate('/instructor')
    }, [status, isAuth, navigate])

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            dispatch(loginUser({ email, password }))
            setEmail('')
            setPassword('')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="auth">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input
                    type="email"
                    placeholder="Введите email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}>
                </input>

                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    placeholder="Введите пароль"
                    onChange={e => setPassword(e.target.value)}>
                </input>

                <button type="submit">
                    Войти
                </button>
            </form>
            <Link to={'/registration'}>Нет аккаунта?</Link>
        </div>
    )
}

