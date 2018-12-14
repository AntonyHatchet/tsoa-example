/* tslint:disable */
import { Controller, ValidateParam, FieldErrors, ValidateError, TsoaRoute } from 'tsoa';
import { AvrController } from './controllers/avrController';
import { ReportsController } from './controllers/reportsController';

const models: TsoaRoute.Models = {
    "AvrLockCommData": {
        "properties": {
            "isn": { "dataType": "double", "required": true },
            "act_item_id": { "dataType": "double", "required": true },
            "policy_no": { "dataType": "string", "required": true },
            "policy_id": { "dataType": "string", "required": true },
            "act_id": { "dataType": "double", "required": true },
            "act_no": { "dataType": "string", "required": true },
            "agent_agreement_id": { "dataType": "double", "required": true },
            "bank_statement_item_id": { "dataType": "double", "required": true },
            "source_no": { "dataType": "string", "required": true },
            "act_item_status": { "dataType": "string", "required": true },
            "policy_issue_date": { "dataType": "string", "required": true },
            "policy_begin_date": { "dataType": "string", "required": true },
            "policy_end_date": { "dataType": "string", "required": true },
            "amount_cur": { "dataType": "double", "required": true },
            "comm_cur_total": { "dataType": "double", "required": true },
            "comm_rate": { "dataType": "double", "required": true },
            "holder_name": { "dataType": "string", "required": true },
            "policy_holder_id": { "dataType": "double", "required": true },
            "agent_id": { "dataType": "double", "required": true },
            "policy_currency_id": { "dataType": "double", "required": true },
            "policy_currency_code": { "dataType": "string", "required": true },
            "item_status_id": { "dataType": "double", "required": true },
            "item_substatus_id": { "dataType": "double", "required": true },
            "main_policy_id": { "dataType": "string", "required": true },
            "oper_status": { "dataType": "double", "required": true },
            "sys_id": { "dataType": "double", "required": true },
            "case_id": { "dataType": "string", "required": true },
            "flag": { "dataType": "double", "required": true },
        },
    },
    "AvrLockComm": {
        "properties": {
            "success": { "dataType": "boolean", "required": true },
            "error": { "dataType": "any" },
            "data": { "dataType": "array", "array": { "ref": "AvrLockCommData" } },
            "pageCount": { "dataType": "double" },
        },
    },
    "ReportLKAgentNextPaymentData": {
        "properties": {
            "agent_nsi": { "dataType": "string", "required": true },
            "agent": { "dataType": "string", "required": true },
            "agent_agreement_num": { "dataType": "string", "required": true },
            "agent_agreement_id": { "dataType": "double", "required": true },
            "policy_no": { "dataType": "string", "required": true },
            "insurant": { "dataType": "string", "required": true },
            "sum_to_pay": { "dataType": "double", "required": true },
            "date_to_pay": { "dataType": "string", "required": true },
            "created": { "dataType": "string", "required": true },
        },
    },
    "ReportLKAgentNextPayment": {
        "properties": {
            "success": { "dataType": "boolean", "required": true },
            "error": { "dataType": "any" },
            "data": { "dataType": "array", "array": { "ref": "ReportLKAgentNextPaymentData" } },
            "pageCount": { "dataType": "double" },
        },
    },
    "ReportLKAgentSaleData": {
        "properties": {
            "agent_nsi": { "dataType": "string", "required": true },
            "agent": { "dataType": "string", "required": true },
            "agent_agreement_num": { "dataType": "string", "required": true },
            "agent_agreement_id": { "dataType": "double", "required": true },
            "policy_no": { "dataType": "string", "required": true },
            "ins_type": { "dataType": "string", "required": true },
            "insurant": { "dataType": "string", "required": true },
            "policy_begin_date": { "dataType": "string", "required": true },
            "policy_end_date": { "dataType": "string", "required": true },
            "policy_gpw": { "dataType": "double", "required": true },
            "commission": { "dataType": "double", "required": true },
            "created": { "dataType": "double", "required": true },
        },
    },
    "ReportLKAgentSale": {
        "properties": {
            "success": { "dataType": "boolean", "required": true },
            "error": { "dataType": "any" },
            "data": { "dataType": "array", "array": { "ref": "ReportLKAgentSaleData" } },
            "pageCount": { "dataType": "double" },
        },
    },
};

export function RegisterRoutes(app: any) {
    app.get('/v1/reports/avr',
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new AvrController();


            const promise = controller.Get.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/reports/next_payment',
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new ReportsController();


            const promise = controller.GetNextPayment.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/reports/sales',
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new ReportsController();


            const promise = controller.GetSale.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });


    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode;
                if (isController(controllerObj)) {
                    const headers = controllerObj.getHeaders();
                    Object.keys(headers).forEach((name: string) => {
                        response.set(name, headers[name]);
                    });

                    statusCode = controllerObj.getStatus();
                }

                if (data || data === false) { // === false allows boolean result
                    response.status(statusCode || 200).json(data);
                } else {
                    response.status(statusCode || 204).end();
                }
            })
            .catch((error: any) => next(error));
    }

    function getValidatedArgs(args: any, request: any): any[] {
        const fieldErrors: FieldErrors = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return ValidateParam(args[key], request.query[name], models, name, fieldErrors);
                case 'path':
                    return ValidateParam(args[key], request.params[name], models, name, fieldErrors);
                case 'header':
                    return ValidateParam(args[key], request.header(name), models, name, fieldErrors);
                case 'body':
                    return ValidateParam(args[key], request.body, models, name, fieldErrors, name + '.');
                case 'body-prop':
                    return ValidateParam(args[key], request.body[name], models, name, fieldErrors, 'body.');
            }
        });
        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }
}
