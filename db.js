import { Pool } from 'pg';
import keys from './config/keys';



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