const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;


import '@babel/polyfill';
import User from './controllers/User';
import Bank from './controllers/Bank';
import Auth from './middleware/Auth';



app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', (req, res) => {
    return res.status(200).send({ 'message': 'Hello World' });
});
app.post('/api/users', User.create);
app.post('/api/login', User.login);
app.get('/ifsc', Auth.verifyToken, Bank.getBankDetails);


app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`));