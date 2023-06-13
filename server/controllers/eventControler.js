const { Events } = require('../models/models')

class EventControler {
    async create(req, res) {
        try {
            const { event_name, instructor_id, start_date, end_date, transportId, comment } = req.body
            console.log(
                "event:", event_name,
                " instructor_id:", instructor_id,
                " start_date:", start_date,
                " end_date:", end_date,
                " transportId:", transportId,
                " comment:", comment
            );
            const eventIsUsed = await Events.findOne(
                {
                    where: { event_name }
                }
            )

            if (eventIsUsed) {
                return res.json({ message: "Мероприятие уже существует" })
            }

            const event = await Events.create({ event_name, start_date, end_date, comment, transportId, instructorId: instructor_id }) //userId, transportId
            // console.log("eventeventevent",event);
            return res.json(event)

        } catch (error) {
            return res.json({ message: "Не удалось создать мероприятие" })
        }
    }

    async getAll(req, res) {
        try {
            const events = await Events.findAll() //userId, transportId
            return res.json(events)
        } catch (error) {
            return res.json({ message: "ошибка" })
        }
    }

    async getOne(req, res) {

    }

    async delete(req, res) {
        try {
            const event_id = req.params.id
            // console.log(req.params.id);
            // console.log(event_id);
            await Events.destroy({
                where: {
                    id: event_id
                }
            });
            return res.json({ message: 'Deleted' })
        }
        catch (e) {
            return res.json({ message: 'Ошибка удаления' })
        }

    }


    async update(req, res) {
        try {
            const event_id = req.params.id
            const { event_name, start_date, end_date, comment, transportId, instructorId } = req.body
            // console.log(req.params.id);
            // console.log(event_name, start_date, end_date, comment, transportId, instructorId);
            const event = await Events.findOne(
                {
                    where: { id: event_id }
                }
            )
            // console.log(event);
            if (!event) {
                return res.json({ message: 'Мероприятия не существует' })
            }

            await Events.update(
                {
                    event_name: event_name,
                    start_date: start_date,
                    end_date: end_date,
                    comment: comment,
                    transportId: transportId,
                    instructorId: instructorId
                },
                {
                    where: {
                        id: event_id
                    }
                });

            return res.json({ message: 'Отредактирован' })
        }
        catch (e) {
            return res.json({ message: 'Ошибка редактирования' })
        }

    }
}

module.exports = new EventControler()