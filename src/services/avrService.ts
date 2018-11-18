import * as express from 'express';
import {AvrLockComm} from '../models/avr';
import {AVR_LOCK_COMM} from '../constants/avr';
import {DBService} from '../services/DBService';

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
        const db = new DBService(this.queryString);
        return await db.get();
    }

}
