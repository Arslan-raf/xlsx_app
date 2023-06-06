const { User } = require('../models/models')
const bcrypt = require('bcrypt') //????????????
const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY, //2 параметр секретный ключ
        { expiresIn: '24h' } //3 параметр опции, сколько живет токен
    )
}


class UserController {
    async registration(req, res, next) {
        const { name, email, password, role } = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await User.findOne({ where: { email } })
        if (candidate) {
            return res.json({
                message: 'Данный email уже занят.',
            })
            // return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5) //хеширование, первый параметр сам пароль, 2 - сколько раз хешировать
        const user = await User.create({ name, email, role, password: hashPassword })
        const token = generateJwt(user.id, user.email, user.role)
        // return res.json({ token })
        return res.json({
            user,
            token,
            message: 'Регистрация прошла успешно.',
        })
    }

    async login(req, res, next) {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email } })
        if (!user) {
            // return next(ApiError.internal('Пользователь не найден'))
            return res.json({
                message: 'Пользователь не найден.',
            })
        }
        let comparePassword = bcrypt.compareSync(password, user.password) //сравнение паролей
        if (!comparePassword) {
            // return next(ApiError.internal('Указан неверный пароль'))
            return res.json({
                message: 'Указан неверный пароль.',
            })
        }
        const token = generateJwt(user.id, user.email, user.role)
        // return res.json({ token })
        return res.json({
            user,
            token,
            message: 'Авторизация прошла успешно.',
        })
    }

    //проверка авторизован ли пользователь
    async check(req, res) {
        // const token = generateJwt(req.user.id, req.user.email, req.user.role)
        // return res.json({ token })
        try {
            // console.log(req.user.id);
            const user = await User.findByPk(req.user.id)
            // console.log(user);

            if (!user) {
                return res.json({
                    message: 'Такого юзера не существует.',
                })
            }

            const token = generateJwt(req.user.id, req.user.email, req.user.role)
            
            res.json({
                user,
                token,
            })
        }
        catch (error) {
            res.json({ message: 'Нет доступа.' })
        }
    }

    async getAll(req, res) {
        const users = await User.findAll()
        return res.json(users)
    }
}

module.exports = new UserController()