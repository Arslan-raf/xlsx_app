const { Transport } = require ('../models/models');

class TransportControler {
    async create(req, res) {
        const { transport_number } = req.body
        console.log(req.body);
        const transport = await Transport.create({ transport_number })
        return res.json(transport)
    }

    async getAll(req, res) {
        const transports = await Transport.findAll()
        return res.json(transports)
    }
}

module.exports = new TransportControler()