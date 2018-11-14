import * as express from 'express';
import {Route, Get, Request} from 'tsoa';
import {ReportVskAgentLockCommAvr} from '../models/reports';
import {ReportsService, VSK_AGENT_LOCK_COMM_AVR} from '../services/reportsService';

@Route('report')
export class ReportsController {

    /** Get VSK_AGENT_LOCK_COMM_AVR database request */
    @Get()
    public async Get(@Request() request: express.Request): Promise<ReportVskAgentLockCommAvr> {
        const service = new ReportsService(request, VSK_AGENT_LOCK_COMM_AVR);
        return await service.get();
    }

}
