import db from '../db';

const Bank = {

    async getBankDetails(req, res) {
        const text = 'SELECT * FROM indian_banks WHERE ifsc = $1';
        try {
            const { rows } = await db.query(text, [req.body.ifsc]);
            if (!rows[0]) {
                return res.status(404).send({ 'message': 'Bank not found' });
            }
            return res.status(200).send(rows[0]);
        } catch (error) {
            return res.status(400).send(error)
        }

    },

    async getBranchDetails(req, res) {
        const text = 'SELECT * FROM indian_banks WHERE bank_name = $1 AND city = $2';
        try {
            const { rows } = await db.query(text, [req.body.bank_name, req.body.city]);
            if (!rows[0]) {
                return res.status(404).send({ 'message': 'Bank not found' });
            }
            return res.status(200).send(rows);
        } catch (error) {
            return res.status(400).send(error)
        }

    }
}

export default Bank;