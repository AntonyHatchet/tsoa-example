export const checkEmptyStringField = (field) => {
    if (typeof field !== 'string') {
        return field;
    }
    let trimedField = field.trim();
    return trimedField.length ? trimedField : null;
};
