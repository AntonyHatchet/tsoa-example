/* tslint:disable */
import { Controller, ValidateParam, FieldErrors, ValidateError, TsoaRoute } from 'tsoa';
import { AccountsController } from './controllers/accountsController';
import { UsersController } from './controllers/usersController';
import { ReportsController } from './controllers/reportsController';

const models: TsoaRoute.Models = {
    "User": {
        "properties": {
            "id": { "dataType": "double", "required": true },
            "email": { "dataType": "string", "required": true },
            "createdAt": { "dataType": "datetime", "required": true },
        },
    },
    "TestAccount": {
        "properties": {
            "id": { "dataType": "double", "required": true },
            "address": { "dataType": "string" },
            "name": { "dataType": "string", "required": true },
            "users": { "dataType": "array", "array": { "ref": "User" } },
            "fields": { "dataType": "array", "array": { "dataType": "string" } },
        },
    },
    "UserCreateRequest": {
        "properties": {
            "email": { "dataType": "string", "required": true },
        },
    },
    "UserUpdateRequest": {
        "properties": {
            "createdAt": { "dataType": "datetime" },
            "email": { "dataType": "string", "required": true },
        },
    },
    "ReportVskAgentLockCommAvrData": {
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
    "ReportVskAgentLockCommAvr": {
        "properties": {
            "data": { "dataType": "array", "array": { "ref": "ReportVskAgentLockCommAvrData" }, "required": true },
            "pageCount": { "dataType": "double", "required": true },
        },
    },
};

export function RegisterRoutes(app: any) {
    app.get('/v1/Accounts/Current',
        function(request: any, response: any, next: any) {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new AccountsController();


            const promise = controller.current.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/Accounts/Users',
        function(request: any, response: any, next: any) {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new AccountsController();


            const promise = controller.getUsers.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/Users/Current',
        function(request: any, response: any, next: any) {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new UsersController();


            const promise = controller.Current.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/Users/:userId',
        function(request: any, response: any, next: any) {
            const args = {
                userId: { "in": "path", "name": "userId", "required": true, "dataType": "double" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new UsersController();


            const promise = controller.Get.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/v1/Users',
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "body", "name": "request", "required": true, "ref": "UserCreateRequest" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new UsersController();


            const promise = controller.Create.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.delete('/v1/Users/:userId',
        function(request: any, response: any, next: any) {
            const args = {
                userId: { "in": "path", "name": "userId", "required": true, "dataType": "double" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new UsersController();


            const promise = controller.Delete.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.patch('/v1/Users',
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "body", "name": "request", "required": true, "ref": "UserUpdateRequest" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new UsersController();


            const promise = controller.Update.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/report',
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


            const promise = controller.Get.apply(controller, validatedArgs);
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
