/**
 * @author  jittagorn pitakmetagoon
 * create  10/04/2013
 * 
 * update  10/04/2013 (jittagorn pitakmetagoon : add to AMD)
 * update  01/1102013 (jittagorn pitakmetagoon : add method isClass and isInterface)
 * update  06/01/2014 (jittagorn pitakmetagoon : modify method isClass and add method isClassInstance, isInstanceOfClass, isException)
 */
define('com.pamarin.core.util.Types', [
    'com.pamarin.core.lang.NativeTypes',
    'com.pamarin.core.util.LangTypes',
    'com.pamarin.core.exception.Exception'
], function(NativeTypes, LangTypes, Exception) {



    /**
     * @class Types
     * for check anything which map method type name
     */
    var Types = (function() {

        /**
         * return public static method
         */
        return {
            //
            get: function(data) {
                return NativeTypes.get(data);
            },
            /**
             * return true when data is Function
             * 
             * @param {T} data
             * @returns {Boolean}
             */
            isFunction: function(data) {
                return NativeTypes.isFunction(data);
            },
            /**
             * return true when data is Array
             * 
             * @param {T} data
             * @returns {Boolean}
             */
            isArray: function(data) {
                return NativeTypes.isArray(data);
            },
            /**
             * return true when data is Boolean
             * 
             * @param {T} data
             * @returns {Boolean}
             */
            isBoolean: function(data) {
                return NativeTypes.isBoolean(data);
            },
            /**
             * return true when data is a String
             * 
             * @param {T} data
             * @returns {Boolean}
             */
            isString: function(data) {
                return NativeTypes.isString(data);
            },
            /**
             * return true when data is a Number
             * 
             * @param {T} data
             * @returns {Boolean}
             */
            isNumber: function(data) {
                return NativeTypes.isNumber(data);
            },
            /**
             * return true when data is Object
             * 
             * @param {T} data
             * @returns {Boolean}
             */
            isObject: function(data) {
                return NativeTypes.isObject(data);
            },
            /**
             * return true when data is  Regular Expression
             * 
             * @param {T} data
             * @returns {Boolean}
             */
            isRegExp: function(data) {
                return NativeTypes.isRegExp(data);
            },
            /**
             * return true when data is Undefined
             * 
             * @param {T} data
             * @returns {Boolean}
             */
            isUndefined: function(data) {
                return NativeTypes.isUndefined(data);
            },
            /**
             * return true when data is Notdefined
             * 
             * @param {type} data
             * @returns {Boolean}
             */
            isNotdefined: function(data) {
                return NativeTypes.isNotdefined(data);
            },
            /**
             * return true when data is Defined
             * 
             * @param {type} data
             * @returns {Boolean}
             */
            isDefined: function(data) {
                return NativeTypes.isDefined(data);
            },
            /**
             * return true when data is Null
             * 
             * @param {type} data
             * @returns {Boolean}
             */
            isNull: function(data) {
                return NativeTypes.isNull(data);
            },
            /**
             * return true when data is Arguments
             * 
             * @param {type} data
             * @returns {Boolean}
             */
            isArguments: function(data) {
                return NativeTypes.isArguments(data);
            },
            /**
             * return true when data is Exception
             *
             * @param {T} data
             * @returns {Boolean}
             */
            isException: function(data) {
                return data instanceof Exception;
            },
            /**
             * return true when data is Class instance
             * 
             * @param {T} data
             * @returns {Boolean}
             */
            isClassInstance: function(data) {
                return LangTypes.isClassInstance(data);
            },
            /**
             * return true when data is Class
             * 
             * @param {T} data
             * @returns {Boolean}
             */
            isClass: function(data) {
                return LangTypes.isClass(data);
            },
            /**
             * return true when data is Interface
             * 
             * @param {T} data
             * @returns {Boolean}
             */
            isInterface: function(data) {
                return LangTypes.isInterface(data);
            },
            /**
             * return true when data is instance of input Class parameter
             * 
             * @param {T} data
             * @param {Prototype} Class 
             * @returns {Boolean}
             */
            isInstanceOfClass: function(data, Class) {
                return LangTypes.isInstanceOfClass(data, Class);
            },
            //
            isImplements: function() {
                return LangTypes.isImplements.apply(this, arguments);
            }
        };
    })();



    /**
     * return Types : is singleton
     */
    return Types;
});