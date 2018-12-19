import * as express from 'express';
import {AvrLockComm} from '../models/avr';
import {AVR_LOCK_COMM} from '../constants/avr';
import {DbService} from '../services/databaseService';
import {HandlerErrorService} from '../services/handleErrorService';
import {log} from '../api/log';

function getQuery(request, reportType) {
    let param = request.query;
    switch (reportType) {
        case AVR_LOCK_COMM: return `
            select count(*)
            from public.report_avr_locks
            where
                policy_begin_date between '${param.startDateFrom}' and '${param.startDateTo}' and
                policy_end_date between '${param.endDateFrom}' and '${param.endDateTo}' and
                agent_agreement_id = ${param.agreementId};
            select *
            from public.report_avr_locks
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
        log.debug('REQUEST [Avr::Service:get]: Debug', {request: this.request.originalUrl, method: 'GET'});
        let errorHandler = new HandlerErrorService(this.request);
        let error = errorHandler.validateQuery(this.requiredParams);
        if (error) {
            log.warn('QUERY [Avr::Service:get]: Warning', {response: error, method: 'GET', code: 400});
            return error;
        }
        const queryString = getQuery(this.request, AVR_LOCK_COMM);
        log.debug('DB QUERY [Avr::Service:get]: Debug', {sql_query: queryString});
        const db = new DbService(queryString);
        const response = await db.get(this.request.query.limit);
        log.debug('RESPONSE [Avr::Service:get]: Debug', {response: response, method: 'GET'});
        return response;
    }

}
