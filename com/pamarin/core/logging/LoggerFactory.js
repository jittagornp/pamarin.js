/** 
 * @author  jittagorn pitakmetagoon 
 * create  12/04/2013
 * 
 * update  07/06/2013 (jittagorn pitakmetagoon : add to AMD)
 * update  23/07/2013 (jittagorn pitakmetagoon : add disable logger)
 * update  07/01/2014 (jittagorn pitakmetagoon : move to Class.js)
 * update  22/01/2014 (jittagorn pitakmetagoon : custom css console log)
 * update  16/02/2014 (jittagorn pitakmetagoon : can use template {} for replace message format)
 */
define('com.pamarin.core.logging.LoggerFactory', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.logging.Logger'
], function(module, Class, Logger) {

    /**
     * @class LoggerFactory
     */
    var LoggerFactory = Class.define(module.id, (function() {

        return {
            //
            static: {
                //
                getLogger: function(name) {
                    return new Logger(name); ///
                }
            }
        };
    })());



    /**
     * return class LoggerFactory
     */
    return  LoggerFactory;
});