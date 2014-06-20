/**
 * @author jittagorn pitakmetagoon
 * create 08/09/2013
 * 
 * update 04/02/2014 (jittagorn pitakmetagoon : use Class.js)
 */

define('com.pamarin.core.exception.ClassNotFoundException', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.exception.NotFoundException'
], function(module, Class, NotFoundException) {

    /**
     * @class ClassNotFoundException
     */
    var ClassNotFoundException = Class.define(module.id, {
        //
        variable: {
            message_: 'class not found exception'
        },
        //
        constructor: function() {
            ClassNotFoundException.superConstructor.apply(this, arguments);
        }
    }).extends(NotFoundException);



    return ClassNotFoundException;
});