/**
 * @author jittagorn pitakmetagoon
 * create 27/01/2014
 * 
 * update 04/02/2014 (jittagorn pitakmetagoon : use Class.js)
 */

define('com.pamarin.core.exception.NoSuchBeanDefinitionException', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.exception.Exception'
], function(module, Class, Exception) {

    /**
     * @class NoSuchBeanDefinitionException
     */
    var NoSuchBeanDefinitionException = Class.define(module.id, {
        //
        variable: {
            message_: 'no such bean definition exception'
        },
        //
        constructor: function() {
            NoSuchBeanDefinitionException.superConstructor.apply(this, arguments);
        }
    }).extends(Exception);



    return NoSuchBeanDefinitionException;
});