/**
 * @author jittagorn pitakmetagoon
 * create 08/09/2013
 * 
 * update 04/02/2014 (jittagorn pitakmetagoon : use Class.js)
 */

define('com.pamarin.core.exception.BeanNotFoundException', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.exception.NotFoundException'
], function(module, Class, NotFoundException) {

    /**
     * @class BeanNotFoundException
     */
    var BeanNotFoundException = Class.define(module.id, {
        //
        variable: {
            message_: 'bean not found exception'
        },
        //
        constructor: function() {
            BeanNotFoundException.superConstructor.apply(this, arguments);
        }
    }).extends(NotFoundException);



    return BeanNotFoundException;
});