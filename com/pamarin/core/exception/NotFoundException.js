/**
 * @author jittagorn pitakmetagoon
 * create 08/09/2013
 * 
 * update 04/02/2014 (jittagorn pitakmetagoon : use Class.js)
 */

define('com.pamarin.core.exception.NotFoundException', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.exception.Exception'
], function(module, Class, Exception) {

    /**
     * @class NotFoundException
     */
    var NotFoundException = Class.define(module.id, {
        //
        variable: {
            message_: 'not found exception'
        },
        //
        constructor: function() {
            NotFoundException.superConstructor.apply(this, arguments);
        }
    }).extends(Exception);



    return NotFoundException;
});
