import { Pool } from 'pg';
import { Client } from 'pg';
import keys from './config/keys';



if (process.env.NODE_ENV === 'production') {
    const client = new Client({
        connectionString: keys.DATABASE_URL,
        ssl: true
    });

    module.exports = {
        query(text, params) {
            return new Promise((resolve, reject) => {
                client.query(text, params)
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    })
            })
        }
    }

} else {
    const pool = new Pool({
        connectionString: keys.DATABASE_URL
    });

    module.exports = {
        query(text, params) {
            return new Promise((resolve, reject) => {
                pool.query(text, params)
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    })
            })
        }
    }
}