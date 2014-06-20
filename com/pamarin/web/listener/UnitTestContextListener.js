/**
 * @author jittagorn pitakmetagoon
 * create 26/01/2014
 */
define('com.pamarin.web.listener.UnitTestContextListener', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.listener.ContextListener',
    'com.pamarin.core.context.ApplicationContext'
], function(module, Class, ContextListener, ApplicationContext) {

    /**
     * @class RegisterCommandContextListener
     */
    var UnitTestContextListener = Class.define(module.id, (function() {
        //
        return {
            //
            start: function(webContextEvent) {
                var tests = ApplicationContext
                        .getInstance()
                        .getParameter('tests');
                
                require(tests);
            },
            //
            destroy: function(webContextEvent) {

            }
        };
    })()).implements(ContextListener);



    return UnitTestContextListener;
});
