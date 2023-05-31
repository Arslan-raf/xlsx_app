const { Guest } = require('../models/models')

class GuestController {
    async create(req, res) {
        const { name, userId } = req.body
        const guest = await Guest.create({ name, userId })
        return res.json(guest)
    }

    async getAll(req, res) {
        const guests = await Guest.findAll()
        return res.json(guests)
    }

    async getOne(req, res) {
        const { id } = req.params
        const guest = await Guest.findOne(
            {
                where: { id },
            }
        )
        return res.json(guest)
    }

}
module.exports = new GuestController()