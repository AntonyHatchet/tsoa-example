import * as Pool from 'pg-pool';

export const VSK_AGENT_LOCK_COMM_AVR = 0;

export const dbConfig = {
    driver: 'pg',
    schema: 'avr',
    host: 'localhost',
    database: 'portal',
    user: 'postgres',
    password: '123qweQWE',
    // ssl: true,
    port: 5432,
    max: 100, // max number of connection can be open to database
    idleTimeoutMillis: 3000 // how long a client is allowed to remain idle before being closed
    // connectionTimeoutMillis: 1000 // return an error after 1 second if connection could not be established
};

export class DB {

    public query(queryString, callback) {
        let pool = new Pool(dbConfig);
        pool.connect().then(client => {
            client.query(`${queryString}`)
            .then(response => {
                callback({success: true, data: response});
            })
            .catch(e => {
                callback({success: true, data: e});
            });
        });
    }

}
