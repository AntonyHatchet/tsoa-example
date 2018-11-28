import * as express from 'express';
import {Route, Get, Request} from 'tsoa';
import {ReportLKAgentNumDog} from '../models/reports';
import {ReportsService} from '../services/reportsService';

@Route('report')
export class ReportsController {

    /** Получаем отчет REPORTS_LK_AGENT_NUM_DOG */
    @Get()
    public async Get(@Request() request: express.Request): Promise<ReportLKAgentNumDog> {
        const service = new ReportsService(request);
        return await service.get();
    }

}
