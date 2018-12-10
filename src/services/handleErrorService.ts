import * as express from 'express';

export class HandlerErrorService {

    request: express.Request;

    constructor(request: express.Request) {
        this.request = request;
    }

    public validateQuery(requiredParams): any {
        let errorList = null;
        for (let param of requiredParams) {
            if (!this.request.query[param]) {
                if (!errorList) {
                    errorList = {};
                }
                errorList[param] = {'message': `Query parameter "${param}" is required`};
            }
        }
        if (errorList) {
            return {
                success: false,
                error: {fields: errorList, message: 'Bad request', status: 400, name: 'ValidateError'},
                data: null,
                pageCount: 0
            };
        }
        return null;
    }

}
