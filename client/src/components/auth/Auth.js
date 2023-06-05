import React, { useState } from "react"
import PropTypes from 'prop-types';

async function loginUser(credentials) {
    return fetch('http://localhost:4000/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

export default function Auth({ setToken }) {

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        });
        setToken(token);
    }

    return (
        <div className="auth">
            <h2>Авторизация</h2>
            <form onSubmit={handleSubmit}>
                <label>Login</label>
                <input type="text" placeholder="Введите логин" onChange={e => setUserName(e.target.value)}></input>

                <label>Password</label>
                <input type="password" placeholder="Введите пароль" onChange={e => setPassword(e.target.value)}></input>

                <button type="submit">
                    Войти
                </button>
            </form>
        </div>
    )
}

Auth.propTypes = {
    setToken: PropTypes.func.isRequired
}