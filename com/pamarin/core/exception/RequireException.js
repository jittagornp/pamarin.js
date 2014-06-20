/**
 * @author jittagorn pitakmetagoon
 * create 08/09/2013x
 * 
 * update 04/02/2014 (jittagorn pitakmetagoon : use Class.js)
 */

define('com.pamarin.core.exception.RequireException', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.exception.Exception'
], function(module, Class, Exception) {

    /**
     * @class RequireException
     */
    var RequireException = Class.define(module.id, {
        //
        variable: {
            message_: 'require exception'
        },
        //
        constructor: function() {
            RequireException.superConstructor.apply(this, arguments);
        }
    }).extends(Exception);



    return RequireException;
});