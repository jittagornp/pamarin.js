/**
 * @author jittagorn pitakmetagoon
 * create 06/01/2014
 * 
 * update 04/02/2014 (jittagorn pitakmetagoon : use Class.js)
 */

define('com.pamarin.core.exception.MethodNotFoundException', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.exception.NotFoundException'
], function(module, Class, NotFoundException) {

    /**
     * @class MethodNotFoundException
     */
    var MethodNotFoundException = Class.define(module.id, {
        //
        variable: {
            message_: 'method not found exception'
        },
        //
        constructor: function() {
            MethodNotFoundException.superConstructor.apply(this, arguments);
        }
    }).extends(NotFoundException);



    return MethodNotFoundException;
});