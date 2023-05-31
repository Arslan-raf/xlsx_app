const { Instructor } = require('../models/models')

class InstructorController {
    async create(req, res) {
        const { name, userId } = req.body
        const instructor = await Instructor.create({ name, userId })
        return res.json(instructor)
    }

    async getAll(req, res) {
        const instructors = await Instructor.findAll()
        return res.json(instructors)
    }

    async getOne(req, res) {
        const { id } = req.params
        const instructor = await Instructor.findOne(
            {
                where: { id }
            }
        )
        return res.json(instructor)
    }
}

module.exports = new InstructorController()