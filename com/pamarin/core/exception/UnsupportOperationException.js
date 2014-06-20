/**
 * @author jittagorn pitakmetagoon
 * create 24/10/2013
 * 
 * update 04/02/2014 (jittagorn pitakmetagoon : use Class.js)
 */

define('com.pamarin.core.exception.UnsupportOperationException', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.exception.Exception'
], function(module, Class, Exception) {

    /**
     * @class UnsupportOperationException
     */
    var UnsupportOperationException = Class.define(module.id, {
        //
        variable: {
            message_: 'unsupport operation exception'
        },
        //
        constructor: function() {
            UnsupportOperationException.superConstructor.apply(this, arguments);
        }
    }).extends(Exception);



    return UnsupportOperationException;
});

