import {Route, Get} from 'tsoa';

@Route('')
export class CommonController {

    /** Тест на доступность сервиса */
    @Get('/HealthCheck')
    public GetHealthCheck(): Promise<any> {
        return Promise.resolve({message: 'ok'});
    }

}
