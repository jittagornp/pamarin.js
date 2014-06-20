/**
 * @author jittagorn pitakmetagoon
 * create 26/01/2014
 */
define('com.pamarin.web.listener.StartControllerContextListener', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.listener.ContextListener',
    'com.pamarin.jigsaw.JigsawManager'
], function(module, Class, ContextListener, JigsawManager) {

    /**
     * @class StartControllerContextListener
     */
    var StartControllerContextListener = Class.define(module.id, {
        /**/
        start: function(webContextEvent) {
//            JigsawManager
//                    .getInstance()
//                    .startController();
        },
        /**/
        destroy: function(webContextEvent) {

        }
    }).implements(ContextListener);



    return StartControllerContextListener;
});
