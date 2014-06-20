/**
 * @author jittagorn pitakmetagoon
 * create 26/01/2014
 */
define('com.pamarin.web.listener.RegisterCommandContextListener', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.listener.ContextListener',
    'com.pamarin.core.util.Delays'
], function(module, Class, ContextListener, Delays) {

    /**
     * @class RegisterCommandContextListener
     */
    var RegisterCommandContextListener = Class.define(module.id, (function() {
        //
        return {
            //
            start: function(webContextEvent) {
                Delays.run(function() {
                    require(['com.pamarin.web.controller.RegisterCommand']);
                }, 5000);
            },
            //
            destroy: function(webContextEvent) {

            }
        };
    })()).implements(ContextListener);



    return RegisterCommandContextListener;
});
