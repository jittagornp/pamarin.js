/**
 * @author jittagorn pitakmetagoon
 * create 28/09/2013
 * 
 * update 04/02/2014 (jittagorn pitakmetagoon : use Class.js)
 */

define('com.pamarin.core.exception.NullPointerException', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.exception.Exception'
], function(module, Class, Exception) {

    /**
     * @class NullPointerException
     */
    var NullPointerException = Class.define(module.id, {
        //
        variable: {
            message_: 'null pointer exception'
        },
        //
        constructor: function() {
            NullPointerException.superConstructor.apply(this, arguments);
        }
    }).extends(Exception);



    return NullPointerException;
});
