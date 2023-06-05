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

    async delete(req, res) {
        try {
            const instructor_id = req.params.id
            // console.log(req.params);
            // console.log(instructor_id);
            await Instructor.destroy({
                where: {
                    id: instructor_id
                }
            });
            return res.json({ message: 'Deleted' })
        }
        catch (error) {
            return res.json({ message: 'Ошибка при удалении' })
        }
    }

    async update(req, res) {
        try {
            // console.log(req.body);
            const { id } = req.params
            const {name} = req.body

            await Instructor.update({
                name: name
            }, {
                where: {
                    id: id
                }
            });

            return res.json({ message: 'Updated' })
        }
        catch (error) {
            return res.json({ message: 'Ошибка при update' })
        }
    }
}

module.exports = new InstructorController()