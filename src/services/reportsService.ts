import * as express from 'express';
import {ReportLKAgentSale, ReportLKAgentProlongation, ReportLKAgentNextPayment} from '../models/reports';
import {REPORTS_LK_AGENT_SALE, REPORTS_LK_AGENT_PROLONGATION, REPORTS_LK_AGENT_NEXT_PAYMENT} from '../constants/reports';
import {DBService} from '../services/DBService';
import {HandlerErrorService} from '../services/handleErrorService';

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
        let errorHandler = new HandlerErrorService(this.request);
        let error = errorHandler.validateQuery(this.requiredParams);
        if (error) {
            return error;
        }
        const db = new DBService(getQuery(this.request, REPORTS_LK_AGENT_NEXT_PAYMENT));
        return await db.get(this.request.query.limit);
    }

    public async getSale(): Promise<ReportLKAgentSale> {
        let errorHandler = new HandlerErrorService(this.request);
        let error = errorHandler.validateQuery(this.requiredParams);
        if (error) {
            return error;
        }
        const db = new DBService(getQuery(this.request, REPORTS_LK_AGENT_SALE));
        return await db.get(this.request.query.limit);
    }

    public async getProlongation(): Promise<ReportLKAgentProlongation> {
        let errorHandler = new HandlerErrorService(this.request);
        let error = errorHandler.validateQuery(this.requiredParams);
        if (error) {
            return error;
        }
        const db = new DBService(getQuery(this.request, REPORTS_LK_AGENT_PROLONGATION));
        return await db.get(this.request.query.limit);
    }

}
