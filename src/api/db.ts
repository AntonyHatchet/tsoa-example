import * as Pool from 'pg-pool';
import { log } from './log';

export const dbConfig = {
    driver:  process.env.DB_DRIVER,
    host:  process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    // ssl: true,
    max: 100, // max number of connection can be open to database
    idleTimeoutMillis: 3000 // how long a client is allowed to remain idle before being closed
    // connectionTimeoutMillis: 1000 // return an error after 1 second if connection could not be established
};

export class DB {

    public async query(queryString) {
        try {
            const pool = new Pool(dbConfig);
            const client = await pool.connect();
            try {
                const response = await client.query(queryString);
                client.release();
                log.debug('DB RESPONSE [DB::Service:DB.query]: Debug', {db_response: response});
                return {success: true, data: response};
            } catch (e) {
                client.release();
                log.error('SQL [DB::Service:DB.query]: Error', {
                    stack_trace: e,
                    sql_query: `"${queryString.trim()}"`,
                    code: e.code
                });
                return {success: false, message: 'DB query failed', data: e};
            }
        } catch (e) {
            log.error('DB CONNECT [DB::Service:DB.query]: Error', {
                db_server: `${e.address}:${e.port}`,
                code: e.code
            });
            return {success: false, message: 'DB connection failed', data: e};
        }
    }

}
