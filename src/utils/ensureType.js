/**
 * ensureType
 * @description: Responsible for transforming strings back to their original type.
 *               We get the string from the query<string> ;-)
 * @param value
 * @returns {*|number|boolean}
 */
export default function ensureType(value) {
    if (parseInt(value, 10)) {
        return parseInt(value, 10);
    }
    if (value === 'true') {
        return true;
    }
    if (value === 'false') {
        return false;
    }
    return value;
}
