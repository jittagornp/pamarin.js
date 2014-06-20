/**
 * @author jittagorn pitakmetagoon
 * create 20/02/2014
 */

define('com.pamarin.core.exception.AssertException', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.exception.Exception'
], function(module, Class, Exception) {

    /**
     * @class AssertException
     */
    var AssertException = Class.define(module.id, {
        //
        variable : {
            message_ : 'assert exception'
        },
        //
        constructor: function() {
            AssertException.superConstructor.apply(this, arguments);
        }
    }).extends(Exception);



    return AssertException;
});
