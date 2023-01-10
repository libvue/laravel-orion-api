/**
 * ensureType
 * @description: Responsible for transforming strings back to their original type.
 *               We get the string from the query<string> ;-)
 * @param value
 * @returns {*|number|boolean}
 */
export default function ensureType(value) {
    if (parseFloat(value)) {
        return parseFloat(value);
    }
    if (value === 'true') {
        return true;
    }
    if (value === 'false') {
        return false;
    }
    return value;
}
