import * as express from 'express';
import {Route, Get, Request} from 'tsoa';
import {AvrLockComm} from '../models/avr';
import {AvrService} from '../services/avrService';

@Route('avr')
export class AvrController {

    /** Получаем отчет AVR_LOCK_COMM */
    @Get()
    public async Get(@Request() request: express.Request): Promise<AvrLockComm> {
        const service = new AvrService(request);
        return await service.get();
    }

}
