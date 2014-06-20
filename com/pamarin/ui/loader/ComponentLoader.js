/**
 * @author jittagorn pitakmetagoon
 * create 21/09/2013
 * 
 * update 22/01/2014 (jittagorn pitakmetagoon : move to Class.js)
 */
define('com.pamarin.ui.loader.ComponentLoader', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.ui.loader.AbstractLoader',
    'com.pamarin.core.util.Types',
    'com.pamarin.core.config.Configs',
    'com.jquery.core.JQuery',
    'com.pamarin.core.filter.Filter',
    'com.pamarin.core.util.StringUtils',
    'com.pamarin.core.structural.Proxy',
    'com.pamarin.core.logging.LoggerFactory',
    'com.pamarin.core.util.collection.HashMap',
    'com.pamarin.core.creational.Singleton',
    'com.pamarin.core.util.Assert'
], function(module, Class, AbstractLoader, Types, Configs, $, Filter, StringUtils, Proxy, LoggerFactory, HashMap, Singleton, Assert) {

    /**
     * @class ComponentLoader
     * @extends AbstractLoader
     */
    var ComponentLoader = Class.define(module.id, (function() {

        var LOG = LoggerFactory.getLogger(module.id);
        var COMPONENTS = new HashMap();

        var SUCCESS = AbstractLoader.constant('SUCCESS');
        var FAIL = AbstractLoader.constant('FAIL');

        var BEFORE_REQUEST = Filter.constant('BEFORE_REQUEST');
        var AFTER_REQUEST = Filter.constant('AFTER_REQUEST');

        function filter(order, data) {
            Filter.addFilter(module.id, order, data);
        }

        return {
            /**
             * @constant
             */
            constant: {
                COMPONENT_URL: Configs.COMPONENT_URL,
                COMPONENT_SPACE: $('#pmrComponent')
            },
            /**
             * @variable
             */
            variable: {
                callback_: null,
                url_: null,
                name_: null,
                $element_: null
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
                    url: this.url_,
                    status: status,
                    html: html
                });
            },
            /**
             * @private
             * 
             * @param {String} html 
             */
            renderHtml: function(html) {
                this.$element_.append(html);
                this.afterRequestFilter(SUCCESS, html);
            },
            /**
             * @private
             * 
             * @param {String} html
             * @param {String} name
             * @param {Class} controller
             */
            startController: function(html, name, controller) {
                var instance = controller;
                if (Types.isClass(controller)) {
                    instance = Singleton.getInstance(controller);
                }
                
                if (Types.isFunction(instance.onComponentReady)) {
                    var componentContext = {
                        controller: name,
                        name: this.name_,
                        url: this.url_,
                        html: html,
                        $element: this.$element_
                    };

                    instance.onComponentReady(componentContext);

                    this.callback_ && this.callback_(instance);
                    this.chain().done(instance);
                    COMPONENTS.put(this.url_, instance);
                }
            },
            /**
             * @private
             * 
             * @param {String} response
             */
            onSuccess: function(response) {
                if (Types.isUndefined(response)) {
                    return;
                }

                var $parent = $(response);
                var isSingleElement = $parent.length === 1;

                if (!isSingleElement) {
                    return;
                }


                var $roor = $($parent);
                var controller = $roor.attr('data-controller');

                var html = $roor.html();
                this.renderHtml(html);

                if (!controller) {
                    return;
                }

                require([controller], Proxy.call(this, 'startController', html, controller));
            },
            /**
             * @private
             */
            onFail: function() {
                this.afterRequestFilter(SUCCESS, 'Error! : can\'t load component on url ' + this.url_);
            },
            /**
             * @param {String} name
             * @param {Function} callback_opt
             * 
             * @returns {When}
             */
            load: function(name, callback_opt) {
                Assert.assert({
                    String: name,
                    FunctionOptional: callback_opt
                }, module.id + '.load(String name, callback_opt).');

                name = name.replace(/\./g, '/');

                this.url_ = ComponentLoader.constant('COMPONENT_URL') + '/' + name;
                this.$element_ = ComponentLoader.constant('COMPONENT_SPACE').attr('data-level', 0);
                this.callback_ = callback_opt;

                filter(BEFORE_REQUEST, {
                    $element: this.$element_,
                    url: this.url_
                });

                //use component caching
                var mod = COMPONENTS.get(this.url_);
                if (mod) {
                    this.callback_ && this.callback_(mod);
                    return;
                }

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
                 * @param {String} name
                 * @param {Function} callback_opt
                 * 
                 * @returns {When}
                 */
                load: function(name, callback_opt) {
                    return new ComponentLoader().load(name, callback_opt);
                }
            }
        };
    })()).extends(AbstractLoader);



    return ComponentLoader;
});