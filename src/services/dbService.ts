import {DB} from '../api/db';

export class DBService {

    queryString: string;

    constructor(queryString) {
        this.queryString = queryString;
    }

    public async get(): Promise<any> {
        const db = new DB();
        const response = await db.query(this.queryString);
        if (response.success) {
            let data = [];
            let pageCount = response.data && response.data.length > 0 ? response.data[0].rows[0].count : 0;

            let rows = response.data && response.data.length > 1 ? response.data[1].rows : [];
            for (let row of rows) {
                let keys = Object.keys(row);
                let obj = {};

                for (let key of keys) {
                    obj[key] = row[key];
                }

                data.push(obj);
            }

            return {success: true, data: data, pageCount: pageCount};
        } else {
            return {success: false, error: response.data};
        }
    }

}
