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
    'com.pamarin.core.exception.IllegalStateException',
    'com.pamarin.jigsaw.JigsawContextBean',
    'com.pamarin.core.util.collection.ArrayList',
    'com.pamarin.core.util.collection.HashMap',
    'com.pamarin.core.logging.LoggerFactory'
], function(module, Class, Array, $, Singleton, StringUtils, IllegalStateException, JigsawContext, ArrayList, HashMap, LoggerFactory) {

    /**
     * @class JigsawManager
     */
    var JigsawManager = Class.define(module.id, (function() {

        var LOG = LoggerFactory.getLogger(module.id);

        return {
            /**/
            variable: {
                CONTROLLER_ATTRIBUTE_: 'data-controller',
                CONTROLLER_STATE_ATTRIBUTE_: 'data-ctrll-state',
                controllers_: null
            },
            /**/
            constructor: function() {
                throw new IllegalStateException('can\'t initialize \'{}\' instance by new operation.', module.id);
            },
            /**/
            findJigsawScoped: function($element) {
                var scopedElement = $element.parents('[data-scoped]')[0];
                return scopedElement ? $(scopedElement).attr('data-scoped') : 'context';
            },
            /**/
            getJigsawSeletor: function() {
                return '[' + this.CONTROLLER_ATTRIBUTE_ + ']:not([' + this.CONTROLLER_STATE_ATTRIBUTE_ + '=started])';
            },
            /**/
            scanController: function(scoped) {
                var controllers = [];
                var that = this;
                $(this.getJigsawSeletor()).each(function() {
                    var $element = $(this);
                    var controllerScoped = that.findJigsawScoped($element);
                    if (scoped === controllerScoped) {
                        var ctrls = $element.attr(that.CONTROLLER_ATTRIBUTE_);
                        var arr = StringUtils.split(ctrls, ',');
                        Array.forEachIndex(arr, function(ctrl) {
                            ctrl = ctrl.trim();
                            !!ctrl && controllers.push({
                                $element: $element,
                                controller: ctrl,
                                scoped: controllerScoped
                            });
                        });
                    }
                });

                return controllers;
            },
            /**/
            startControllerByScoped: function(scoped) {
                var that = this;
                var controllers = this.scanController(scoped);
                Array.forEachIndex(controllers, function(ctrl) {
                    require([ctrl.controller], function(Ctrl) {
                        var instance = Singleton.getInstance(Ctrl);
                        instance.getJigsawContext = (function(ctx) {
                            return function() {
                                return ctx;
                            };
                        })(JigsawContext.fromObject(ctrl));

                        if (instance.onStart) {
                            instance.onStart();
                            ctrl.$element.attr(that.CONTROLLER_STATE_ATTRIBUTE_, 'started');
                            LOG.info('controller {} started.', instance.getClass().getName());
                        }

                        that.registerController(ctrl, instance);
                    });
                });
            },
            /**/
            stopControllerByScoped: function(scopedChanged) {
                var controllers = this.getControllers();
                if (controllers) {
                    controllers.forEachEntry(function(controllerScoped, scopedKey) {
                        if (scopedChanged === scopedKey) {
                            controllerScoped.forEachEntry(function(instance) {
                                if (instance.onStop) {
                                    instance.onStop();
                                    LOG.info('controller {} stoped.', instance.getClass().getName());
                                }
                            });

                            controllerScoped.clear();
                        }
                    });
                }
            },
            /**/
            registerController: function(ctrl, controller) {
                if (!this.controllers_) {
                    this.controllers_ = new HashMap();
                }

                if (!this.controllers_.get(ctrl.scoped)) {
                    this.controllers_.put(ctrl.scoped, new ArrayList());
                }

                this.controllers_.get(ctrl.scoped).add(controller);
            },
            /**/
            getControllers: function() {
                return this.controllers_;
            },
            /**/
            static: {
                /**/
                getInstance: function() {
                    return Singleton.getInstance(JigsawManager);
                }
            }
        };
    })());

    return JigsawManager;
});