import * as express from 'express';
import {AvrLockComm} from '../models/avr';
import {AVR_LOCK_COMM} from '../constants/avr';
import {DbService} from '../services/databaseService';
import {HandlerErrorService} from '../services/handleErrorService';
import {log} from '../api/log';
import {utils} from '../api/utils';

function generateQuery(table, params) {
    let hasStartDate = utils.isDateValid(params.startDateFrom) && utils.isDateValid(params.startDateTo);
    let hasEndDate = utils.isDateValid(params.endDateFrom) && utils.isDateValid(params.endDateTo);
    let condStartDate = hasStartDate ?
        `policy_begin_date between '${params.startDateFrom}' and '${params.startDateTo}' and` : '';
    let condEndDate = hasEndDate ?
        `policy_end_date between '${params.endDateFrom}' and '${params.endDateTo}' and` : '';

    return `
        select count(*)
        from ${table}
        where
            ${condStartDate}
            ${condEndDate}
            agent_agreement_id = ${params.agreementId};
        select *
        from ${table}
        where
            ${condStartDate}
            ${condEndDate}
            agent_agreement_id = ${params.agreementId}
        limit ${params.limit}
        offset ${params.page * params.limit};
    `;
}

function getQuery(request, reportType) {
    let params = request.query;
    switch (reportType) {
        case AVR_LOCK_COMM: return generateQuery('public.report_avr_locks', params);
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
