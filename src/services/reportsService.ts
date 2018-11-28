import * as express from 'express';
import {ReportLKAgentNumDog} from '../models/reports';
import {REPORTS_LK_AGENT_NUM_DOG, REPORTS_LK_AGENT_VZNOS} from '../constants/reports';
import {DBService} from '../services/DBService';

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
        const db = new DBService(this.queryString);
        return await db.get();
    }

}
