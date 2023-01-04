import DEFAULT_POST_CONFIG from '../configs/defaultPostConfig';
import DEFAULT_GET_CONFIG from '../configs/defaultGetConfig';
import PostParsers from '../parsers/PostParsers';
import GetParsers from "../parsers/GetParsers";

class Transformer {
    /**
     * toPostData
     * @description: Convert options object to POST data that Orion understands.
     * @param options
     * @returns {{}}
     */
    static toPostData(options = DEFAULT_POST_CONFIG) {
        const data = {};
        Object.entries(DEFAULT_POST_CONFIG).forEach(([key, defaultValue]) => {
            // Check if given option is not null
            if (typeof options[key] !== 'undefined' && options[key] !== null) {
                data[key] = PostParsers.parseByKey(key, options[key]);
            } else if (typeof defaultValue !== 'undefined' && defaultValue !== null) {
                data[key] = defaultValue;
            }
        });
        return data;
    }

    /**
     * toGetQuery
     * @description: responsible for converting the options
     * @param options
     * @returns {{}}
     */
    static toGetQuery(options = DEFAULT_GET_CONFIG) {
        let query = '?';
        Object.entries(DEFAULT_GET_CONFIG).forEach(([key]) => {
            // Check if given option is not null
            if (typeof options[key] !== 'undefined' && options[key] !== null) {
                if(query !== '?' && GetParsers.parseByKey(key, options[key], true)) {
                    query += '&';
                }
                query += GetParsers.parseByKey(key, options[key], true);
            }
        });
        return query.length > 1 ? query : '';
    }
}

export default Transformer;
