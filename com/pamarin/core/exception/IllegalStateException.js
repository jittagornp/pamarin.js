/**
 * @author jittagorn pitakmetagoon
 * create 22/03/2014
 */
define('com.pamarin.core.exception.IllegalStateException', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.exception.Exception'
], function(module, Class, Exception) {

    /**
     * @class IllegalStateException
     * @extends Exception
     */
    var IllegalStateException = Class.define(module.id, {
        /**/
        variable: {
            message_: 'illegal state exception'
        },
        /**/
        constructor: function() {
            IllegalStateException.superConstructor.apply(this, arguments);
        }
    }).extends(Exception);



    return IllegalStateException;
});