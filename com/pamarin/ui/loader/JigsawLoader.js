/** 
 * @author  jittagorn pitakmetagoon 
 * create  22/03/2013
 * 
 * update  11/04/2013 (jittagorn pitakmetagoon)
 * update  07/06/2013 (jittagorn pitakmetagoon : add to AMD)
 * update  08/06/2013 (jittagorn pitakmetagoon : add Filter)
 * update  19/09/2013 (jittagorn pitakmetagoon : automatic start controller chain jigsaw loaded)
 * update  21/01/2014 (jittagorn pitakmetagoon : move to Class.js)
 * update  10/03/2014 (jittagorn pitakmetagoon : add static filter path)
 */
define('com.pamarin.ui.loader.JigsawLoader', [
    'module',
    'com.pamarin.core.lang.Object',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.lang.Array',
    'com.jquery.core.JQuery',
    'com.pamarin.core.util.Types',
    'com.pamarin.core.util.StringUtils',
    'com.pamarin.core.filter.Filter',
    'com.pamarin.core.structural.Proxy',
    'com.pamarin.core.util.Assert',
    'com.pamarin.core.creational.Singleton',
    'com.pamarin.core.logging.LoggerFactory',
    'com.pamarin.ui.loader.AbstractLoader',
    'com.pamarin.core.exception.IllegalArgumentException',
    'com.pamarin.core.behavioral.Chain',
    'com.pamarin.core.context.ApplicationContext',
    'com.pamarin.core.annotation.$$Scoped'
], function(module, Object, Class, Array, $, Types, StringUtils, Filter, Proxy, Assert, Singleton, LoggerFactory, AbstractLoader, IllegalArgumentException, Chain, ApplicationContext, $$Scoped) {

    /**
     * @class JigsawLoader
     * @extends AbstractLoader
     */
    var JigsawLoader = Class.define(module.id, (function() {

        var LOG = LoggerFactory.getLogger(module.id);

        var SUCCESS = AbstractLoader.constant('SUCCESS');
        var FAIL = AbstractLoader.constant('FAIL');

        var BEFORE_REQUEST = Filter.constant('BEFORE_REQUEST');
        var AFTER_REQUEST = Filter.constant('AFTER_REQUEST');

        var filterCallback = null;

        function singleLoad(selector, url, callback_opt) {
            var loader = new JigsawLoader();
            filterCallback && loader.filterPath(filterCallback);
            loader.load(selector, url, callback_opt);

            return loader.chain();
        }

        function multipleLoad(object, callback_opt) {
            Assert.assertFunctionOptional(callback_opt, module.id + '.multipleLoad(Object object, Function callback_opt).');

            var objSize = Object.findOwnSize(object);
            var responses = {};
            var chain = new Chain();

            Object.forEachProperty(object, function(url, selector) {
                singleLoad(selector, url).then(function(resp) {
                    responses[resp.$element.selector] = resp;

                    if (--objSize === 0) {
                        callback_opt && callback_opt(responses);
                        chain.done(responses);
                    }
                });
            });

            return chain;
        }

        return {
            /**
             * @constant
             */
            constant: {
                JIGSAW_URL: ApplicationContext.getInstance().getParameter('ui.jigsaws.contextPath')
            },
            /**
             * @variable
             */
            variable: {
                $element_: null,
                url_: null,
                callback_: null
            },
            /**
             * @private
             * 
             * @param {String} status
             * @param {innerHtml} html
             */
            afterRequestFilter: function(status, html) {
                Filter.addFilter(module.id, AFTER_REQUEST, {
                    $element: this.$element_,
                    jigsawURL: this.url_,
                    status: status,
                    html: html
                });
            },
            /**
             * @private
             * 
             * @param {String} html
             */
            renderHtml: function(html, callback) {
                callback && this.$element_.one('DOMNodeInserted', callback);
                this.$element_.html(html);

                var response = {
                    html: html,
                    $element: this.$element_
                };

                this.callback_ && this.callback_(response);
                this.chain().done(response);

                this.afterRequestFilter(SUCCESS, html);
            },
            /**
             * @returns {Boolean} 
             */
            isSingleton: function(Class) {
                var annotations = Class.prototype.getClass().getAnotations();
                var length = annotations.length;
                for (var i = 0; i < length; i++) {
                    var anott = annotations[i];
                    if (anott.isPresent($$Scoped) && anott.value.name === $$Scoped.value.name.singleton) {
                        return true;
                    }
                }

                return false;
            },
            /**
             * for initail controller chain jigsaw loaded
             * 
             * @private
             * 
             * @param {jQuery} innerHtml
             * @param {String} name
             * @param {Object} controller - jigsaw controller
             */
            startController: function(innerHtml, name, rendered, controller) {
                if (!rendered.status) {
                    this.renderHtml(innerHtml);
                    rendered.status = true;
                }

                if (!Types.isClass(controller)) {
                    return;
                }

                var instance = this.isSingleton(controller)
                        ? Singleton.getInstance(controller, undefined)
                        : new controller();
                instance.__jigsawCalled__ = false;

                if (Types.isFunction(instance.onJigsawReady)) {
                    var jigsawContext = {
                        controller: name,
                        url: this.url_,
                        html: innerHtml,
                        $element: this.$element_
                    };

                    instance.getJigsawContext = (function(ctx) {
                        return function() {
                            return ctx;
                        };
                    })(jigsawContext);

                    instance.onJigsawReady();
                }
            },
            /**
             * done on ajax load success
             * 
             * @private
             * @param {String} response
             */
            onSuccess: function(response) {
                if (!response) {
                    return;
                }

                var $parent = $(response);
                var isSingleElement = $parent.length === 1;

                if (!isSingleElement) {
                    this.renderHtml(response);
                    return;
                }

                var $root = $($parent);
                var controller = $root.attr('data-controller');
                if (!controller) {
                    controller = '';
                }

                var contrls = StringUtils.split(controller, ',');
                if (!contrls.length) {
                    this.renderHtml(response);
                    return;
                }

                var that = this;
                var html = $root.html();
                var rendered = {status: false};
                Array.forEachIndex(contrls, function(ctrl) {
                    ctrl = ctrl.trim();
                    var proxy = Proxy.call(that, that.startController, html, ctrl, rendered);
                    require([ctrl], proxy);
                });
            },
            /**
             * done on ajax load success
             * 
             * @private
             */
            onFail: function() {
                var message = 'Error! : can\'t load jigsaw on url ' + this.url_;
                this.$element_.html(message);
                this.afterRequestFilter(FAIL, message);
            },
            /** 
             * @param {String} selector
             * @param {String} url
             * @param {Function} callback_opt
             */
            load: function(selector, url, callback_opt) {
                Assert.assert({
                    String: [selector, url],
                    FunctionOptional: callback_opt
                }, module.id + '.load(String selector, String url, Function callback_opt).');

                url = this.transformUrl(url);
                this.$element_ = $(selector);
                this.url_ = JigsawLoader.constant('JIGSAW_URL') + url;
                this.callback_ = callback_opt;

                Filter.addFilter(module.id, BEFORE_REQUEST, {
                    selector: this.$element_,
                    url: this.url_
                });

                $.ajax({
                    url: this.url_,
                    dataType: 'html',
                    cache: true,
                    success: Proxy.call(this, 'onSuccess'),
                    error: Proxy.call(this, 'onFail')
                });

                return this.chain();
            },
            /**
             * @static
             */
            static: {
                /** 
                 * @param {String} selector
                 * @param {String} url
                 * @param {Function} callback_opt
                 * 
                 * @returns {When}
                 */
                load: function(selector, url, callback_opt) {
                    if (Types.isString(selector)) {
                        return singleLoad(selector, url, callback_opt);
                    }

                    if (Types.isObject(selector)) {
                        return multipleLoad(selector, url);
                    }

                    throw new IllegalArgumentException(module.id + '.load(String selector, String url, String callback_opt).');
                },
                /**
                 * @param {Function} callback
                 * 
                 * @returns {JigsawLoader}
                 */
                filterPath: function(callback) {
                    Assert.assertFunction(callback, module.id + '.filterPath(Function callback).');

                    filterCallback = callback;
                    return JigsawLoader;
                }
            }
        };
    })()).extends(AbstractLoader);



    /**
     * return class JigsawLoader
     */
    return JigsawLoader;
});