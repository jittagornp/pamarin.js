/**
 * @author jittagorn pitakmetagoon
 * create 12/05/2014
 */
define('com.pamarin.web.controller.unseen.UnseenController', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.controller.Controller',
    'com.pamarin.web.context.UnseenContext'
], function(module, Class, Controller, UnseenContext) {

    /**
     * @class UnseenController
     */
    var UnseenController = Class.define(module.id, {
        /**/
        static: {
            /**
             * @param {String} name
             * @param {Object} prototype
             * @returns {Controller}
             */
            define: function(name, prototype) {

                prototype.getUnseenContext = function() {
                    return UnseenContext.getInstance();
                };

                prototype.getCurrentUnseen = function() {
                    return this
                            .getUnseenContext()
                            .getCurrentUnseen();
                };

                prototype.getUnseenId = function() {
                    return this
                            .getCurrentUnseen()
                            .getUnseenId();
                };

                return Controller.define(name, prototype);
            }

        }
    });



    return UnseenController;
});