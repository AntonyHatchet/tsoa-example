import {checkEmptyStringField} from './check-empty-string';

export const pickEmpty = (obj) => {
    for (let propName in obj) {
        if (obj[propName] === null
            || obj[propName] === undefined
            || checkEmptyStringField(obj[propName]) === null) {
            delete obj[propName];
        }
    }
    return obj;
};
