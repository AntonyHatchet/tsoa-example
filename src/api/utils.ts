const isDateValid = (date) => {
    return date && /^\d{4}-\d{1,2}-\d{1,2}$/.test(date);
};

export const utils = {
    isDateValid
};
