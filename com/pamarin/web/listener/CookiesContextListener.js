/**
 * @author jittagorn pitakmetagoon
 * create 16/03/2014
 */
define('com.pamarin.web.listener.CookiesContextListener', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.lang.Array',
    'com.pamarin.core.listener.ContextListener',
    'com.pamarin.core.util.Cookies',
    'com.pamarin.core.logging.LoggerFactory',
    'com.pamarin.core.context.ApplicationContext'
], function(module, Class, Array, ContextListener, Cookies, LoggerFactory, ApplicationContext) {

    /**
     * @class CookiesContextListener
     * @implements ContextListener
     */
    var CookiesContextListener = Class.define(module.id, (function() {

        var LOG = LoggerFactory.getLogger(module.id);

        var applicationContext = ApplicationContext.getInstance();
        var cookies = applicationContext.getParameter('cookies') || [];

        return {
            /**
             * @override
             * @param {WebContextEvent} webContextEvent
             */
            start: function(webContextEvent) {
                Array.forEachIndex(cookies, function(cookie) {
                    new (Cookies.Serializer)(cookie);
                });
            },
            /**
             * @override
             * @param {WebContextEvent} webContextEvent
             */
            destroy: function(webContextEvent) {

            }
        };
    })()).implements(ContextListener);




    return CookiesContextListener;
});