const sequelize = require('../db')
const { DataTypes } = require('sequelize') //класс с помощью которого описываются типы полей
/*
Sequelize - это ORM-библиотека для приложений на Node.js, которая осуществляет сопоставление таблиц в БД
 и отношений между ними с классами. При использовании Sequelize мы можем не писать SQL-запросы,
а работать с данными как с обычными объектами. 
Причем Sequelize может работать с рядом СУБД - MySQL, Postgres, MariaDB, SQLite, MS SQL Server.
*/

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" }
})

const Guest = sequelize.define('guest', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
})
const Instructor = sequelize.define('instructor', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
})

const Transport = sequelize.define('transport', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    transport_number: { type: DataTypes.STRING, unique: true, allowNull: false },
})

//????????????????/
const Rating = sequelize.define('rating', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rating_name: { type: DataTypes.INTEGER, unique: true, allowNull: false }
})

const Events = sequelize.define('events', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    event_name: { type: DataTypes.STRING, allowNull: false }
})

const GuestEvents = sequelize.define('guest_events', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

//описаниt типов связей, указываются внешние ключи
Guest.belongsTo(User) 
User.belongsTo(Guest) 

User.belongsTo(Instructor)
Instructor.belongsTo(User) 

Events.belongsTo(Transport)
Transport.belongsTo(Events) 

Events.belongsTo(Guest)
Guest.belongsTo(Events) 

Events.belongsToMany(Guest, { through: GuestEvents}) //многие ко многим
Guest.belongsToMany(Events, { through: GuestEvents })



// User.hasMany(Events)
// Events.belongsTo(User)

// User.hasMany(Events)
// Transport.hasMany(Events)
// Rating.hasMany(Events)

// User.belongsToMany(Events, { through: UserEvents}) //многие ко многим
// Events.belongsToMany(User, { through: UserEvents })

module.exports = {
    User,
    Transport,
    Rating,
    Events,
    Guest,
    Instructor
}