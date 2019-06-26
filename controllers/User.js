import uuidv4 from 'uuid/v4';
import db from '../db';
import Utility from './Utility';

const User = {
    /**
     * Create A User
     * @param {object} req 
     * @param {object} res
     * @returns {object} user object 
     */
    async create(req, res) {
        if (!req.body.email || !req.body.password) {
            return res.status(400).send({ 'message': 'Some values are missing' });
        }
        if (!Utility.isValidEmail(req.body.email)) {
            return res.status(400).send({ 'message': 'Please enter a valid email address' });
        }
        const hashPassword = Utility.hashPassword(req.body.password);

        const createQuery = `INSERT INTO
      users(id, email, password)
      VALUES($1, $2, $3)
      returning *`;
        const values = [
            uuidv4(),
            req.body.email,
            hashPassword,
        ];

        try {
            const { rows } = await db.query(createQuery, values);
            return res.status(201).send({ 'message': "User registered successfully" });
        } catch (error) {
            if (error.routine === '_bt_check_unique') {
                return res.status(400).send({ 'message': 'User with that EMAIL already exists' })
            }
            return res.status(400).send(error);
        }
    },
    /**
     * Login
     * @param {object} req 
     * @param {object} res
     * @returns {object} user object 
     */
    async login(req, res) {
        if (!req.body.email || !req.body.password) {
            return res.status(400).send({ 'message': 'Some values are missing' });
        }
        if (!Utility.isValidEmail(req.body.email)) {
            return res.status(400).send({ 'message': 'Please enter a valid email address' });
        }
        const text = 'SELECT * FROM users WHERE email = $1';
        try {
            const { rows } = await db.query(text, [req.body.email]);
            if (!rows[0]) {
                return res.status(400).send({ 'message': 'The credentials you provided is incorrect' });
            }
            if (!Utility.comparePassword(rows[0].password, req.body.password)) {
                return res.status(400).send({ 'message': 'The credentials you provided is incorrect' });
            }
            const token = Utility.generateToken(rows[0].id);
            return res.status(200).send({ token });
        } catch (error) {
            console.log(error);
            return res.status(400).send(error)
        }
    }
}

export default User;