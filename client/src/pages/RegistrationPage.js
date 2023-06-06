import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/features/auth/authSlice";
import { Link } from "react-router-dom";

export default function RegistrationPage() {

    const [name, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch()

    //вызов функции с помощью dispatch

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(registerUser({ email, name, password }))
            setPassword('')
            setEmail('')
            setUsername('')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="auth">
            <h2>Регистрация</h2>
            {/* onSubmit={handleSubmit} */}
            <form>
                <label>Name</label>
                <input
                    type="text"
                    placeholder="Введите имя"
                    value={name}
                    onChange={e => setUsername(e.target.value)}>
                </input>

                <label>email</label>
                <input
                    type="text"
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

                <button
                    type="submit"
                    onClick={handleSubmit}
                >
                    Войти
                </button>
                <Link to={'/login'}>
                    Назад к форме авторизации
                </Link>
            </form>
        </div>
    )
}
