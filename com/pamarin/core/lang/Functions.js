/** 
 * @author  jittagorn pitakmetagoon 
 * create  28/01/2014
 */
define('com.pamarin.core.lang.Functions', [
    'module',
    'com.pamarin.core.lang.Array',
    'com.pamarin.core.lang.NativeTypes'
], function(module, Array, NativeTypes) {

    /**
     * @class Functions
     */
    var Funtions = (function() {

        //This regex is from require.js
        var FUNCTION_ARGUMENT_REGEX_PATTERN = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;

        return {
            /**
             * regular expression pattern for get arguments name in the function
             */
            FUNCTION_ARGUMENT_REGEX_PATTERN: FUNCTION_ARGUMENT_REGEX_PATTERN,
            /**
             * for get arguments name of input function parameter
             * code from http://stackoverflow.com/questions/20058391/javascript-dependency-injection
             *
             * @param {Function} func
             * @throws Error
             * @returns {Array<String>} - array of arguments name
             */
            getArgumentsName: function(func) {
                if (!NativeTypes.isFunction(func)) {
                    throw new Error(module.id + '.getArgumentsName(Function func) - func is not function.');
                }

                var argsName = func.toString().match(FUNCTION_ARGUMENT_REGEX_PATTERN)[1].split(',');
                Array.forEachIndex(argsName, function(item, index) {
                    argsName[index] = item.trim().replace('\n/**/', '');
                });

                Array.remove(argsName, '');

                return argsName;
            }
        };
    })();



    return Funtions;
});
