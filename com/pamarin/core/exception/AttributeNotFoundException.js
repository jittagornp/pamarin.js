/**
 * @author jittagorn pitakmetagoon
 * create 08/09/2013
 * 
 * update 04/02/2014 (jittagorn pitakmetagoon : use Class.js)
 */

define('com.pamarin.core.exception.AttributeNotFoundException', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.exception.NotFoundException'
], function(module, Class, NotFoundException) {

    /**
     * @class AttributeNotFoundException
     */
    var AttributeNotFoundException = Class.define(module.id, {
        //
        variable: {
            message_: 'attribute not found exception'
        },
        //
        constructor: function() {
            AttributeNotFoundException.superConstructor.apply(this, arguments);
        }
    }).extends(NotFoundException);



    return AttributeNotFoundException;
});