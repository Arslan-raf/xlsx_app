require('dotenv').config() //??
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')

const router = require('./routes/index')
const path = require('path')

const PORT = process.env.PORT || 4000

const app = express()
app.use(cors())
app.use(express.json()) // для того чтобы приложение могло парсить json


app.use('/api', router)

const start = async () => {
    try {
        await sequelize.authenticate() //подключение в БД
        await sequelize.sync() //сверять состояние БД со схемой данных
        app.listen(PORT, () => console.log(`PORT: ${PORT} `))
    } catch (e) {
        console.log(e);
    }
}

start()