/**
 * @author  jittagorn pitakmetagoon
 * create  04/02/2014
 */
define('com.pamarin.core.lang.NativeTypes', [
    //
], function() {

    /**
     * @class NativeTypes
     * for check anything which map method type name
     */
    var NativeTypes = (function() {

        function is(data, type) {
            return Object.prototype.toString.call(data) === '[object ' + type + ']';
        }

        /**
         * return public static method
         */
        return {
            //
            get: function(data) {
                return Object.prototype.toString.call(data).replace(/(\[object\s)|\]/g, '');
            },
            /**
             * is true when data is Function
             * 
             * @param {T} data
             * 
             * @returns {Boolean}
             */
            isFunction: function(data) {
                return is(data, 'Function');
            },
            /**
             * is true when data is Array
             * 
             * @param {T} data
             * 
             * @returns {Boolean}
             */
            isArray: function(data) {
                return is(data, 'Array');
            },
            /**
             * is true when data is Boolean
             * 
             * @param {T} data
             * 
             * @returns {Boolean}
             */
            isBoolean: function(data) {
                return is(data, 'Boolean');
            },
            /**
             * is true when data is String
             * 
             * @param {T} data
             * 
             * @returns {Boolean}
             */
            isString: function(data) {
                return is(data, 'String');
            },
            /**
             * is true when data is Number
             * 
             * @param {T} data
             * 
             * @returns {Boolean}
             */
            isNumber: function(data) {
                return is(data, 'Number');
            },
            /**
             * is true when data is Object
             * 
             * @param {T} data
             * 
             * @returns {Boolean}
             */
            isObject: function(data) {
                return is(data, 'Object');
            },
            /**
             * is true when data is  Regular Expression
             * 
             * @param {T} data
             * 
             * @returns {Boolean}
             */
            isRegExp: function(data) {
                return is(data, 'RegExp');
            },
            /**
             * is true when data is Undefined
             * 
             * @param {T} data
             * 
             * @returns {Boolean}
             */
            isUndefined: function(data) {
                return is(data, 'Undefined');
            },
            /**
             * is true when data is Null
             * 
             * @param {T} data
             * 
             * @returns {Boolean}
             */
            isNull: function(data) {
                return is(data, 'Null');
            },
            /**
             * is true when data is Notdefined
             * 
             * @param {T} data
             * 
             * @returns {Boolean}
             */
            isNotdefined: function(data) {
                return this.isUndefined(data) || this.isNull(data);
            },
            /**
             * is true when data is Defined
             * 
             * @param {T} data
             * @returns {Boolean}
             */
            isDefined: function(data) {
                return !this.isNotdefined(data);
            },
            /**
             * is true when data is Arguments
             * 
             * @param {T} data
             * @returns {Boolean}
             */
            isArguments: function(data) {
                return is(data, 'Arguments');
            }
        };
    })();



    return NativeTypes;
});