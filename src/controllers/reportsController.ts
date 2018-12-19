import * as express from 'express';
import {Route, Get, Request} from 'tsoa';
import {ReportLKAgentNextPayment, ReportLKAgentSale, ReportLKAgentProlongation} from '../models/reports';
import {ReportsService} from '../services/reportsService';

@Route('reports')
export class ReportsController {

    /** Получаем отчет next_payment из REPORTS_LK_AGENT_NUM_DOG */
    @Get('/next_payment')
    public async GetNextPayment(@Request() request: express.Request): Promise<ReportLKAgentNextPayment> {
        const service = new ReportsService(request);
        return await service.getNextPayment();
    }

    /** Получаем отчет sales из REPORTS_LK_AGENT_NUM_DOG */
    @Get('/sales')
    public async GetSale(@Request() request: express.Request): Promise<ReportLKAgentSale> {
        const service = new ReportsService(request);
        return await service.getSale();
    }

    /** Получаем отчет prolongation из REPORTS_LK_AGENT_NUM_DOG */
    @Get('/prolongation')
    public async GetProlongation(@Request() request: express.Request): Promise<ReportLKAgentProlongation> {
        const service = new ReportsService(request);
        return await service.getProlongation();
    }

}
