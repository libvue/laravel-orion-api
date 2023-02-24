import REQUEST_CONFIG from '../../configs/request.js';
import PostParsers from './parsers/PostParsers.js';
import GetParsers from "./parsers/GetParsers.js";

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
        
        Object.entries({ ...DEFAULT_POST_CONFIG, ...data }).forEach(([key, defaultValue]) => {
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
        
        // Merge all default config files
        Object.entries({ ...DEFAULT_GET_CONFIG, ...options }).forEach(([key]) => {
            // Check if given option is not null
            if (typeof options[key] !== 'undefined' && options[key] !== null) {
                if(query !== '?' && GetParsers.parseByKey(key, options[key])) {
                    query += '&';
                }
                query += GetParsers.parseByKey(key, options[key]);
            }
        });
        return query.length > 1 ? query : '';
    }
}

export default Transformer;
