/** 
 * @author  jittagorn pitakmetagoon 
 * create  12/05/2013
 * 
 * update  29/05/2013 (jittagorn pitakmetagoon)
 * update  04/02/2014 (jittagorn pitakmetagoon : use Class.js)
 * 
 * @param {string} name (exception name)
 * @param {string} message (default exception message)
 */

define('com.pamarin.core.exception.Exception', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.exception.Template'
], function(module, Class, Template) {

    /**
     * @class Exception
     */
    var Exception = Class.define(module.id, (function() {

        var slice = Array.prototype.slice;

        return {
            /**
             * define Exception instance variable
             */
            variable: {
                message_: null
            },
            /**
             * @param {String} message
             * @param {T...} parameters_opt - optional
             */
            constructor: function() {
                this.message_ = Template.replace(arguments[0] || this.message_, slice.call(arguments, 1)) || 'exception';
            },
            //
            toString: function() {
                return '[' + (this.getClass && this.getClass().getName()) + '] : ' + this.message_;
            }
        };
    })());


    return Exception;
});
