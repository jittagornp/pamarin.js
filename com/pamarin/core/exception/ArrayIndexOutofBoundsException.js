/**
 * @author jittagorn pitakmetagoon
 * create 04/11/2013
 * 
 * update 04/02/2014 (jittagorn pitakmetagoon : use Class.js)
 */

define('com.pamarin.core.exception.ArrayIndexOutofBoundsException', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.exception.Exception'
], function(module, Class, Exception) {

    /**
     * @class ArrayIndexOutofBoundsException
     */
    var ArrayIndexOutofBoundsException = Class.define(module.id, {
        /**/
        variable: {
            message_: 'array index out of bounds exception'
        },
        /**/
        constructor: function() {
            this.__super__.constructor.apply(this, arguments);
        }
    }).extends(Exception);



    return ArrayIndexOutofBoundsException;
});