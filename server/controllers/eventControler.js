const { Events } = require('../models/models')

class EventControler {
    async create(req, res) {
        const { event_name } = req.body
        const event = await Events.create({ event_name}) //userId, transportId
        return res.json(event)
    }
    async getAll(req, res) {

    }
    async getOne(req, res) {

    }
}

module.exports = new EventControler()