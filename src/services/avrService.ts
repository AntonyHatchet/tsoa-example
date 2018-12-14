import * as express from 'express';
import {AvrLockComm} from '../models/avr';
import {AVR_LOCK_COMM} from '../constants/avr';
import {DbService} from '../services/databaseService';
import {HandlerErrorService} from '../services/handleErrorService';

function getQuery(request, reportType) {
    let param = request.query;
    switch (reportType) {
        case AVR_LOCK_COMM: return `
            select count(*)
            from avr.vsk_agent_lock_comm_avr
            where
                policy_begin_date between '${param.startDateFrom}' and '${param.startDateTo}' and
                policy_end_date between '${param.endDateFrom}' and '${param.endDateTo}' and
                agent_agreement_id = ${param.agreementId};
            select *
            from avr.vsk_agent_lock_comm_avr
            where
                policy_begin_date between '${param.startDateFrom}' and '${param.startDateTo}' and
                policy_end_date between '${param.endDateFrom}' and '${param.endDateTo}' and
                agent_agreement_id = ${param.agreementId}
            limit ${param.limit}
            offset ${param.page * param.limit};
        `;
        default: return '';
    }
}

export class AvrService {

    request: express.Request;
    queryString: string;
    requiredParams = ['agreementId', 'limit', 'page'];

    constructor(request: express.Request) {
        this.request = request;
    }

    public async get(): Promise<AvrLockComm> {
        let errorHandler = new HandlerErrorService(this.request);
        let error = errorHandler.validateQuery(this.requiredParams);
        if (error) {
            return error;
        }
        const db = new DbService(getQuery(this.request, AVR_LOCK_COMM));
        return await db.get(this.request.query.limit);
    }

}
