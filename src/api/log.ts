// const axios = require('axios');
import * as util from 'util';
// import {generateReqId} from './generate-req-id';
import { serverName } from './get-server-name';
import { pickEmpty } from './pick-empty';

const CONSOLE_FONT_COLOR_RED = `\x1b[31m`;
const CONSOLE_FONT_COLOR_YELLOW = `\x1b[33m`;
const CONSOLE_FONT_COLOR_DEBUG = `\x1b[34m`;
const CONSOLE_RESET = `\x1b[0m`;
const utilInspectOptions = {
    showHidden: false,
    depth: null,
    maxArrayLength: null
};
const start = Date.now();
// TODO: Send to logger service
const isDev = true;
// const isDev = process.env.NODE_ENV !== 'production';

const logToConsole = (data, logLevel) => {
    let time = '';

    if (isDev) {
        time = Math.round((Date.now() - start) / 1000) + ':';
    }

    switch (logLevel) {
        case 'DEBUG':
            {
                console.log(CONSOLE_FONT_COLOR_YELLOW, time, CONSOLE_FONT_COLOR_DEBUG, data, CONSOLE_RESET);
                break;
            }
        case 'INFO':
        case 'WARN':
            {
                console.log(CONSOLE_FONT_COLOR_YELLOW, time, data, CONSOLE_RESET);
                break;
            }
        case 'ERROR':
        case 'FATAL':
            {
                console.log(CONSOLE_FONT_COLOR_YELLOW, time, CONSOLE_FONT_COLOR_RED, data, CONSOLE_RESET);
                break;
            }
        default:
            {
                console.log(CONSOLE_FONT_COLOR_YELLOW, time, CONSOLE_RESET, data);
                break;
            }
    }
};

const sendToLogger = (data, logLevel) => {
    data = pickEmpty(data);
    data.server_id = serverName;
    if (isDev) {
        data = util.inspect(data, utilInspectOptions); // deeply extract large complicated objects
        return logToConsole(data, logLevel);
    }
    // TODO: Send to logger service
    /*return axios({
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'x-request-id': generateReqId()
            },
            url: 'https://logs.kube-test.isina.com/logs',
            data
        })
        .catch((er) => {
            console.error(CONSOLE_RESET, 'LOG server not responding, status:', er.response.status);
            logToConsole(data);
        });*/
};

const debug = (message, data) => {
    if (typeof (data) === 'undefined') { data = {}; }
    data.message = message;
    data.logLevel = 'DEBUG';
    return sendToLogger(data, data.logLevel);
};

const info = (message, data) => {
    if (typeof (data) === 'undefined') { data = {}; }
    data.message = message;
    data.logLevel = 'INFO';
    return sendToLogger(data, data.logLevel);
};

const warn = (message, data) => {
    if (typeof (data) === 'undefined') { data = {}; }
    data.message = message;
    data.logLevel = 'WARN';
    return sendToLogger(data, data.logLevel);
};

const error = (message, data) => {
    if (typeof (data) === 'undefined') { data = {}; }
    data.message = message;
    data.logLevel = 'ERROR';
    return sendToLogger(data, data.logLevel);
};

const fatal = (message, data) => {
    if (typeof (data) === 'undefined') { data = {}; }
    data.message = message;
    data.logLevel = 'FATAL';
    return sendToLogger(data, data.logLevel);
};

export const log = {
    debug,
    info,
    warn,
    error,
    fatal
};

