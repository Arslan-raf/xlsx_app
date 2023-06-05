const jwt = require('jsonwebtoken')
//проверка токена ?
module.exports = function (req, res, next) {
    //интересуют только get, post, put,delete
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1] // в header помещают снчала тип токена, потом сам токен => Bearer  asdafevfa
        if (!token) {
            return res.status(401).json({ message: "Не авторизован" })
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY) //проверка токена на валидность первый параметр сам токен, 2 секретный ключ
        req.user = decoded
        next()
    } catch (e) {
        res.status(401).json({ message: "Не авторизован" })
    }
}