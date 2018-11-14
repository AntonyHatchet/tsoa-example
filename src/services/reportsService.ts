import * as express from 'express';
import {ReportVskAgentLockCommAvr} from '../models/reports';
import {DB, dbConfig} from '../api/db';

export const VSK_AGENT_LOCK_COMM_AVR = 0;

function getQuery(request, requestType) {
    let param = request.query,
        table = requestType === 0 ? 'vsk_agent_lock_comm_avr' : 'vsk_agent_lock_comm_avr';
    switch (requestType) {
        case VSK_AGENT_LOCK_COMM_AVR: return `
            select count(*) from ${dbConfig.schema}.${table};
            select *
            from ${dbConfig.schema}.${table}
            where
                policy_begin_date between '${param.startDateFrom}' and '${param.startDateTo}' and
                policy_end_date between '${param.endDateFrom}' and '${param.endDateTo}' and
                agent_agreement_id = ${param.agreementId}
            limit ${param.limit}
            offset ${param.page * param.limit}
        `;
        default: return '';
    }
}

export class ReportsService {

    request: express.Request;
    requestType: number;
    queryString: string;

    constructor(request: express.Request, requestType: number) {
        this.request = request;
        this.requestType = requestType;
        this.queryString = getQuery(request, requestType);
    }

    public async get(): Promise<ReportVskAgentLockCommAvr> {
        return new Promise<ReportVskAgentLockCommAvr> ((resolve, reject) => {
            let db = new DB();
            db.query(this.queryString, response => {

                if (response.success) {
                    let data = [],
                        pageCount = response.data[0].rows[0].count;

                    for (let row of response.data[1].rows) {
                        let keys = Object.keys(row),
                            obj = {};

                        for (let key of keys) {
                            obj[key] = row[key];
                        }

                        data.push(obj);
                    }

                    resolve({ data: data, pageCount: pageCount });
                } else {
                    reject(response.data);
                }
            });

        });
    }
}
