import * as express from 'express';
import {ReportLKAgentNumDog} from '../models/reports';
import {DB} from '../api/db';
import {REPORTS_LK_AGENT_NUM_DOG, REPORTS_LK_AGENT_VZNOS} from '../constants/reports';

function getQuery(request) {
    let param = request.query;
    switch (Number(param.reportType)) {
        case REPORTS_LK_AGENT_NUM_DOG: return `
            select count(*) from reports.LK_agent_num_dog;
            select * from reports.LK_agent_num_dog
            limit ${param.limit}
            offset ${param.page * param.limit}
        `;
        case REPORTS_LK_AGENT_VZNOS: return `
            select count(*) from reports.LK_agent_vznos;
            select * from reports.LK_agent_vznos
            limit ${param.limit}
            offset ${param.page * param.limit}
        `;
        default: return '';
    }
}

export class ReportsService {

    request: express.Request;
    queryString: string;

    constructor(request: express.Request) {
        this.request = request;
        this.queryString = getQuery(request);
    }

    public async get(): Promise<ReportLKAgentNumDog> {
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
