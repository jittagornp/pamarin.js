/**
 * @author jittagorn pitakmetagoon
 * create 03/01/2014
 * 
 * update 04/02/2014 (jittagorn pitakmetagoon : use Class.js)
 */

define('com.pamarin.core.exception.IllegalArgumentException', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.exception.Exception'
], function(module, Class, Exception) {

    /**
     * @class IllegalArgumentException
     */
    var IllegalArgumentException = Class.define(module.id, {
        //
        variable: {
            message_: 'illegal argument exception'
        },
        //
        constructor: function() {
            IllegalArgumentException.superConstructor.apply(this, arguments);
        }
    }).extends(Exception);



    return IllegalArgumentException;
});