/**
 * @author jittagorn pitakmetagoon
 * create 08/09/2013
 * 
 * update 04/02/2014 (jittagorn pitakmetagoon : use Class.js)
 */

define('com.pamarin.core.exception.InvalidTypeException', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.exception.Exception'
], function(module, Class, Exception) {

    /**
     * @class InvalidTypeException
     */
    var InvalidTypeException = Class.define(module.id, {
        //
        variable: {
            message_: 'invalid type exception'
        },
        //
        constructor: function() {
            InvalidTypeException.superConstructor.apply(this, arguments);
        }
    }).extends(Exception);



    return InvalidTypeException;
});

