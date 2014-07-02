/**
 * @author  jittagorn pitakmetagoon
 * create  13/04/2013
 * 
 * update  13/04/2013 (jittagorn pitakmetagoon)
 * update  10/04/2013 (jittagorn pitakmetagoon : add to AMD)
 */
define('com.pamarin.core.util.StringUtils', [
    'module',
    'com.pamarin.core.lang.Array',
    'com.pamarin.core.util.Types',
    'com.pamarin.core.exception.InvalidTypeException'
], function(module, Array, Types, InvalidTypeException) {

    function replaceNotation(string) {
        string = string + '';
        string = string.replace(/\//g, '\\/')
                .replace(/\@/g, '\\@')
                .replace(/\?/g, '\\?')
                .replace(/\$/g, '\\$')
                .replace(/\&/g, '\\&')
                .replace(/\-/g, '\\-')
                .replace(/\{/g, '\\{')
                .replace(/\^/g, '\\^')
                .replace(/\}/g, '\\}')
                .replace(/\=/g, '\\=')
                .replace(/\*/g, '\\*')
                .replace(/\+/g, '\\+');

        return string;
    }

    var StringUtils = {
        /**/
        found: function(string, item) {
            if (typeof string !== 'string') {
                return false;
            }

            return string.indexOf(item) !== -1;
        },
        /**
         * for check string start with
         * such as StringUtils.startsWith('/@pookradueng', '/@') will return true, other return false 
         * 
         * @param {string} string
         * @param {string} withString
         * @returns {boolean}
         */
        startsWith: function(string, withString) {
            //string = replaceNotation(string);
            withString = replaceNotation(withString);

            return (new RegExp('^(' + withString + ')')).test(string);
        },
        /**
         * for check string end with
         * such as StringUtils.endsWith('pookradueng', 'eng') will return true, other return false
         * 
         * @param {string} string
         * @param {string} withString
         * @returns {boolean}
         */
        endsWith: function(string, withString) {
            //string = replaceNotation(string);
            withString = replaceNotation(withString);

            return (new RegExp('(' + withString + ')$')).test(string);
        },
        /**
         * for split string (not return empty string)
         * 
         * @param {string} string
         * @param {string} splitBy
         * @returns {array of string}
         */
        split: function(string, splitBy) {
            if (!Types.isString(string)) {
                throw new InvalidTypeException('first argument of ' + module.id + '.split(string{} string, {string} splitBy) is not string');
            }

            string = string || '';
            splitBy = splitBy || '';

            return Array.remove(string.split(splitBy), '');
        },
        /**
         * for transform first chracter of string to upper case
         * 
         * @param {String} string
         * @returns {String}
         */
        toUpperCaseFirstCharacter: function(string) {
            if (Types.isUndefined(string) || string.length === 0) {
                return '';
            }

            if (string.length === 1) {
                return string[0].toUpperCase();
            }

            if (string.length > 1) {
                return string[0].toUpperCase() + string.substring(1);
            }

            return string;
        }
    };

    return StringUtils;
});
