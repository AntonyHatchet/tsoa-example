import * as express from 'express';
import {AvrLockComm} from '../models/avr';
import {DB} from '../api/db';
import {AVR_LOCK_COMM} from '../constants/avr';

function getQuery(request) {
    let param = request.query;
    switch (Number(param.reportType)) {
        case AVR_LOCK_COMM: return `
            select count(*) from avr.vsk_agent_lock_comm_avr;
            select *
            from avr.vsk_agent_lock_comm_avr
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

export class AvrService {

    request: express.Request;
    queryString: string;

    constructor(request: express.Request) {
        this.request = request;
        this.queryString = getQuery(request);
    }

    public async get(): Promise<AvrLockComm> {
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
