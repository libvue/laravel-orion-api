import REQUEST_CONFIG from '../configs/request';
import PostParsers from '../parsers/PostParsers';
import GetParsers from "../parsers/GetParsers";

const DEFAULT_POST_CONFIG = REQUEST_CONFIG.post;
const DEFAULT_GET_CONFIG = REQUEST_CONFIG.get;

class Transformer {
    /**
     * toPostData
     * @description: Convert options object to POST data that Orion understands.
     * @param data
     * @returns {{}}
     */
    static toPostData(data = DEFAULT_POST_CONFIG) {
        const transformedData = {};
        
        // Walk through each key in the DEFAULT_POST_CONFIG object.
        Object.entries(DEFAULT_POST_CONFIG).forEach(([key, defaultValue]) => {
            // Check if given option is not null
            if (typeof data[key] !== 'undefined' && data[key] !== null) {
                transformedData[key] = PostParsers.parseByKey(key, data[key]);
            } else if (typeof defaultValue !== 'undefined' && defaultValue !== null) {
                transformedData[key] = defaultValue;
            }
        });
        return transformedData;
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
