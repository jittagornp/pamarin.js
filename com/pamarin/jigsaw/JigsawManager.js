/**
 * @author jittagorn pitakmetagoon
 * create 15/06/2014
 */
define('com.pamarin.jigsaw.JigsawManager', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.lang.Array',
    'com.jquery.core.JQuery',
    'com.pamarin.core.creational.Singleton',
    'com.pamarin.core.util.StringUtils',
    'com.pamarin.core.exception.IllegalStateException'
], function(module, Class, Array, $, Singleton, StringUtils, IllegalStateException) {

    /**
     * @class JigsawManager
     */
    var JigsawManager = Class.define(module.id, {
        /**/
        variable: {
            CONTROLLER_ATTRIBUTE_: 'data-controller'
        },
        /**/
        constructor: function() {
            throw new IllegalStateException('can\'t initial this class by new operation.');
        },
        /**/
        scanController: function() {
            var controllers = [];
            var that = this;
            $('[' + this.CONTROLLER_ATTRIBUTE_ + ']').each(function() {
                var $element = $(this);
                var ctrls = $element.attr(that.CONTROLLER_ATTRIBUTE_);
                var arr = StringUtils.split(ctrls, ',');
                Array.forEachIndex(arr, function(ctrl) {
                    ctrl = ctrl.trim();
                    !!ctrl && controllers.push(ctrl);
                });
            });

            return controllers;
        },
        /**/
        startController: function() {
            var controllers = this.scanController();
            Array.forEachIndex(controllers, function(ctrl) {
                require([ctrl], function(Ctrl) {
                    var instance = Singleton.getInstance(Ctrl);
                    if (instance.onJigsawReady) {
                        instance.onJigsawReady();
                    }
                });
            });
        },
        /**/
        static: {
            /**/
            getInstance: function() {
                return Singleton.getInstance(JigsawManager);
            }
        }
    });

    return JigsawManager;
});