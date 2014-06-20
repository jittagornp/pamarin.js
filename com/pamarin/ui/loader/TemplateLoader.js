/** 
 * for load html template(use jquery template) from web server
 * load first time only, other use from web browser cache  
 * 
 * @author  jittagorn pitakmetagoon 
 * create  22/03/2013
 * 
 * update  07/06/2013 (jittagorn pitakmetagoon : add to AMD)
 * update  07/06/2013 (jittagorn pitakmetagoon : add Filter)
 * update  08/03/2014 (jittagorn pitakmetagoon : use Class.js)
 */
define('com.pamarin.ui.loader.TemplateLoader', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.ui.loader.AbstractLoader',
    'com.pamarin.core.logging.LoggerFactory',
    'com.pamarin.core.filter.Filter',
    'com.pamarin.core.structural.Proxy',
    'com.pamarin.core.util.collection.HashMap',
    'com.pamarin.core.util.Assert',
    'com.jquery.template.JQueryTemplate'
], function(module, Class, AbstractLoader, LoggerFactory, Filter, Proxy, HashMap, Assert, $) {

    /**
     * @class TemplateLoader
     * @extends AbstractLoader
     */
    var TemplateLoader = Class.define(module.id, (function() {

        var TEMPLATE_URL = 'http://localhost:8080/unseen/template';
        var CACHES = new HashMap();

        //var LOG = LoggerFactory.getLogger(module.id);

        var SUCCESS = AbstractLoader.constant('SUCCESS');
        var FAIL = AbstractLoader.constant('FAIL');
        var BEFORE_REQUEST = Filter.constant('BEFORE_REQUEST');
        var AFTER_REQUEST = Filter.constant('BEFORE_REQUEST');

        return {
            /**
             * @variable
             */
            variable: {
                url_: null,
                html_: null,
                callback_: null
            },
            /**
             * for check template caching
             * 
             * @private
             */
            cache: function() {
                var template = $.getTmpl(this.url_);
                this.callback_ && this.callback_(template);
                this.chain().done(template);

                Filter.addFilter(module.id, AFTER_REQUEST, {
                    url: this.url_,
                    status: SUCCESS,
                    template: template
                });
            },
            /**
             * done on ajax load success
             * 
             * @private
             * @param {String} response - template ajax response from server
             */
            onSuccess: function(response) {
                CACHES.put(this.url_, true);

                $.template(this.url_, response);
                var template = $.getTmpl(this.url_);
                this.callback_ && this.callback_(template);
                this.chain().done(template);

                Filter.addFilter(module.id, AFTER_REQUEST, {
                    url: this.url_,
                    status: SUCCESS,
                    template: template
                });
            },
            /**
             * done on ajax load fail
             * 
             * @private
             */
            onFail: function() {
                this.callback_ && this.callback_(undefined);

                Filter.addFilter(module.id, AFTER_REQUEST, {
                    url: this.url_,
                    status: FAIL,
                    template: undefined
                });
            },
            /**
             * @param {String} url
             * @param {Function} callback_opt
             * 
             * @returns {Chain}
             */
            load: function(url, callback_opt) {
                Assert.assert({
                    String: url,
                    FunctionOptional: callback_opt
                }, module.id + '.load(String url, Function callback_opt).');

                this.callback_ = callback_opt;
                this.url_ = this.transformUrl(TEMPLATE_URL + url);

                Filter.addFilter(module.id, BEFORE_REQUEST, {
                    url: this.url_
                });

                if (CACHES.get(this.url_)) {
                    this.cache();
                    return;
                }

                $.ajax({
                    url: this.url_,
                    dataType: 'html',
                    cache: true,
                    //
                    success: Proxy.call(this, 'onSuccess'),
                    error: Proxy.call(this, 'onFail')
                });

                return this.chain();
            },
            /**/
            static : {
                /**/
                load : function(url, callback_opt){
                    return new TemplateLoader().load(url, callback_opt);
                }
            }
        };
    })()).extends(AbstractLoader);



    return TemplateLoader;
});