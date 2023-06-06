const jwt = require('jsonwebtoken')
//проверка токена ?

const checkAuth = (req, res, next) => {
    // console.log("req.headers.authorization",req.headers.authorization);
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
    // console.log("ПРОВЕРКА!!!!!!!!", token);

    if (token) {
        try {
            // const decoded = jwt.verify(token, process.env.SECRET_KEY) //проверка токена на валидность первый параметр сам токен, 2 секретный ключ
            // //         req.user = decoded
            // //         // console.log(decoded);
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            // console.log("decoded ",decoded);
            
            req.user = decoded
            // console.log("ПРОВЕРКА!!!!!!!!", req.user);
            next()
        } catch (error) {
            return res.json({
                message: 'Нет доступа.',
            })
        }
    } else {
        return res.json({
            message: 'Почему? Нет доступа.',
        })
    }
}

module.exports = checkAuth

// module.exports = function  checkAuth(req, res, next) {
//     //интересуют только get, post, put,delete
//     if (req.method === "OPTIONS") {
//         next()
//     }

//     try {
//         const token = req.headers.authorization.split(' ')[1] // в header помещают снчала тип токена, потом сам токен => Bearer  asdafevfa
//         console.log(token);
//         if (!token) {
//             return res.status(401).json({ message: "Не авторизован" })
//         }
//         const decoded = jwt.verify(token, process.env.SECRET_KEY) //проверка токена на валидность первый параметр сам токен, 2 секретный ключ
//         req.user = decoded
//         // console.log(decoded);
//         next()
//     } catch (e) {
//         res.status(401).json({ message: "Не авторизован" })
//     }
// }