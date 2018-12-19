import * as express from 'express';
import {ReportLKAgentSale, ReportLKAgentProlongation, ReportLKAgentNextPayment} from '../models/reports';
import {REPORTS_LK_AGENT_SALE, REPORTS_LK_AGENT_PROLONGATION, REPORTS_LK_AGENT_NEXT_PAYMENT} from '../constants/reports';
import {DbService} from '../services/databaseService';
import {HandlerErrorService} from '../services/handleErrorService';
import {log} from '../api/log';

function getQuery(request, reportType) {
    let param = request.query;
    switch (reportType) {
        // reports.LK_agent_num_dog
        case REPORTS_LK_AGENT_SALE: return `
            select count(*) from public.report_sales
            where
                agent_agreement_id = ${param.agreementId} and
                agent_agreement_num = '${param.agreementNum}';
            select * from reports.LK_agent_num_dog
            where
                agent_agreement_id = ${param.agreementId} and
                agent_agreement_num = '${param.agreementNum}'
            limit ${param.limit}
            offset ${param.page * param.limit};
        `;
        // reports.LK_agent_num_dog
        case REPORTS_LK_AGENT_PROLONGATION: return `
            select count(*) from public.report_prolongation
            where
                agent_agreement_id = ${param.agreementId} and
                agent_agreement_num = '${param.agreementNum}';
            select * from reports.LK_agent_num_dog
            where
                agent_agreement_id = ${param.agreementId} and
                agent_agreement_num = '${param.agreementNum}'
            limit ${param.limit}
            offset ${param.page * param.limit};
        `;
        // reports.LK_agent_vznos
        case REPORTS_LK_AGENT_NEXT_PAYMENT: return `
            select count(*) from public.report_pays_graph
            where
                agent_agreement_id = ${param.agreementId} and
                agent_agreement_num = '${param.agreementNum}';
            select * from reports.LK_agent_vznos
            where
                agent_agreement_id = ${param.agreementId} and
                agent_agreement_num = '${param.agreementNum}'
            limit ${param.limit}
            offset ${param.page * param.limit};
        `;
        default: return '';
    }
}

export class ReportsService {

    request: express.Request;
    queryString: string;
    requiredParams = ['agreementId', 'agreementNum', 'limit', 'page'];

    constructor(request: express.Request) {
        this.request = request;
    }

    public async getNextPayment(): Promise<ReportLKAgentNextPayment> {
        log.debug('REQUEST [Reports::Service:getNextPayment]: Debug', {request: this.request.originalUrl, method: 'GET'});
        let errorHandler = new HandlerErrorService(this.request);
        let error = errorHandler.validateQuery(this.requiredParams);
        if (error) {
            log.warn('QUERY [Reports::Service:getNextPayment]: Warning', {response: error, method: 'GET', code: 400});
            return error;
        }
        const queryString = getQuery(this.request, REPORTS_LK_AGENT_NEXT_PAYMENT);
        log.debug('DB QUERY [Reports::Service:getNextPayment]: Debug', {sql_query: queryString});
        const db = new DbService(queryString);
        const response = await db.get(this.request.query.limit);
        log.debug('RESPONSE [Reports::Service:getNextPayment]: Debug', {response: response, method: 'GET'});
        return response;
    }

    public async getSale(): Promise<ReportLKAgentSale> {
        log.debug('REQUEST [Reports::Service:getSale]: Debug', {request: this.request.originalUrl, method: 'GET'});
        let errorHandler = new HandlerErrorService(this.request);
        let error = errorHandler.validateQuery(this.requiredParams);
        if (error) {
            log.warn('QUERY [Reports::Service:getSale]: Warning', {response: error, method: 'GET', code: 400});
            return error;
        }
        const queryString = getQuery(this.request, REPORTS_LK_AGENT_SALE);
        log.debug('DB QUERY [Reports::Service:getSale]: Debug', {sql_query: queryString});
        const db = new DbService(queryString);
        const response = await db.get(this.request.query.limit);
        log.debug('RESPONSE [Reports::Service:getSale]: Debug', {response: response, method: 'GET'});
        return response;
    }

    public async getProlongation(): Promise<ReportLKAgentProlongation> {
        log.debug('REQUEST [Reports::Service:getProlongation]: Debug', {request: this.request.originalUrl, method: 'GET'});
        let errorHandler = new HandlerErrorService(this.request);
        let error = errorHandler.validateQuery(this.requiredParams);
        if (error) {
            log.warn('QUERY [Reports::Service:getProlongation]: Warning', {response: error, method: 'GET', code: 400});
            return error;
        }
        const queryString = getQuery(this.request, REPORTS_LK_AGENT_PROLONGATION);
        log.debug('DB QUERY [Reports::Service:getProlongation]: Debug', {sql_query: queryString});
        const db = new DbService(queryString);
        const response = await db.get(this.request.query.limit);
        log.debug('RESPONSE [Reports::Service:getProlongation]: Debug', {response: response, method: 'GET'});
        return response;
    }

}
