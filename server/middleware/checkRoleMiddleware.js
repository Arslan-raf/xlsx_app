const jwt = require('jsonwebtoken')

//принимает параметром роль а не реквест респонз,
// то есть вызываем функцию туда передаем роль и она возвращает уже мидлвеар
module.exports = function (role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }

        try {
            const token = req.headers.authorization.split(' ')[1] // в header помещают снчала типа токена потом сам токен Bearer  asdafevfa
            if (!token) {
                return res.status(403).json({ message: "Не авторизован" })
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY) //первый параметр сам токен, 2 секретный ключ
            //выцепть роль пользователя и сравнить ее с ролью которую мы передали в мидлваре
            if (decoded.role !== role) {
                return res.status(403).json({ message: 'Нет доступа' })
            }
            req.user = decoded
            next()
        } catch (e) {
            res.status(403).json({ message: "Не авторизован" })
        }
    }
}




