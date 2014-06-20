/**
 * @author jittagorn pitakmetagoon
 * create 30/01/2014
 */
define('com.pamarin.core.util.QueryStringMatcher', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.util.Types',
    'com.pamarin.core.exception.IllegalArgumentException'
], function(module, Class, Types, IllegalArgumentException) {

    /**
     * for check browser query string match with key value or key/value pairs parameter
     * 
     * @author redcrow (jittagorn pitakmetagoon)
     * create 29/11/2013
     * link http://na5cent.blogspot.com/2013/12/query-string-matcher-javascript.html
     */
    var QueryStringMatcher = Class.define(module.id, (function(window) {

        function replace(string) {
            return (string + '').replace(/\+/g, ' ');
        }

        function encode(string) {
            return encodeURIComponent(replace(string));
        }

        function decode(string) {
            return decodeURIComponent(replace(string));
        }

        function getQueryStringMap() {
            var queryStringMap = {};
            var queryStringRegExPattern = /([^&=]+)=?([^&]*)/g;
            var queryString = window.location.search.substring(1); //not include '?' notation

            var matchArray;
            while (matchArray = queryStringRegExPattern.exec(queryString)) {
                var key = decode(matchArray[1]);
                var value = decode(matchArray[2]);

                queryStringMap[key] = value;
            }

            return queryStringMap;
        }

        //hasElement implementations
        function hasOwnKey(object, value) {
            return object.hasOwnProperty(encode(value));
        }

        function hasOwnValue(object, value) {
            for (var property in object) {
                if (object.hasOwnProperty(property) 
                        && object[property] === encode(value)) {
                    return true;
                }
            }

            return false;
        }

        function hasOwnKeyValue(object, value, key) {
            for (var property in object) {
                if (object.hasOwnProperty(property) 
                        && object[property] === encode(value) 
                        && property === encode(key)) {
                    return true;
                }
            }

            return false;
        }
        //

        function matchBy(queryStrings, callback, hasElement) {
            var queryStringMap = getQueryStringMap();
            var matchAll = true;

            for (var index in queryStrings) {
                if (!hasElement(queryStringMap, queryStrings[index], index)) {
                    matchAll = false;
                    break;
                }
            }

            if (matchAll && Types.isFunction(callback)) {
                callback();
            }
        }

        return {
            //
            static: {
                /**
                 * @param {Array<String>} queryStringKeysArray
                 * @param {Function} callback
                 */
                matchByKeys: function(queryStringKeysArray, callback) {
                    if (!Types.isArray(queryStringKeysArray)) {
                        throw new IllegalArgumentException('Invalid input type parameters, ' + module.id + '.matchByKeys(Array<String> queryStringKeysArray, Function callback).');
                    }

                    matchBy(queryStringKeysArray, callback, hasOwnKey);
                },
                /**
                 * @param {Array<String>} queryStringValuesArray
                 * @param {Function} callback
                 */
                matchByValues: function(queryStringValuesArray, callback) {
                    if (!Types.isArray(queryStringValuesArray)) {
                        throw new IllegalArgumentException('Invalid input type parameters, ' + module.id + '.matchByValues(Array<String> queryStringValuesArray, Function callback).');
                    }

                    matchBy(queryStringValuesArray, callback, hasOwnValue);
                },
                /**
                 * @param {Object<String, String>} queryStringMap
                 * @param {Function} callback
                 */
                matchByKeyValuePairs: function(queryStringMap, callback) {
                    if (!Types.isObject(queryStringMap)) {
                        throw new IllegalArgumentException('Invalid input type parameters, ' + module.id + '.matchByKeyValuePairs(Object<String, String> queryStringMap, Function callback).');
                    }

                    matchBy(queryStringMap, callback, hasOwnKeyValue);
                }
            }
        };
    })(window));



    return QueryStringMatcher;
});