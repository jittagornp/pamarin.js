/**
 * @author jittagorn pitakmetagoon
 * create 17/06/2014
 */
define('com.pamarin.core.page.ContextBuilder', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.page.ContextBean',
    'com.pamarin.core.page.PageContextQuerystring',
    'com.pamarin.core.util.Types',
    'com.pamarin.core.util.collection.HashMap'
], function(module, Class, Page, PageContextQuerystring, Types, HashMap) {

    /**
     * @class ContextBuilder
     */
    var ContextBuilder = Class.define(module.id, {
        /**/
        variable: {
            ctx_: null
        },
        /**/
        constructor: function(id) {
            this.ctx_ = new Page(id);
        },
        /**/
        static: {
            /**/
            buildFromId: function(id) {
                return new ContextBuilder(id);
            }
        },
        /** 
         * @param {String} name
         * @returns {ContextBuilder}
         */
        andName: function(name) {
            if (name) {
                this.ctx_.setName(name);
            }

            return this;
        },
        /** 
         * @param {String} pattern
         * @returns {ContextBuilder}
         */
        andPattern: function(pattern) {
            if (pattern) {
                this.ctx_.setPattern(pattern);
            }

            return this;
        },
        /**
         * @param {Number} offset
         * @returns {ContextBuilder}
         */
        andOffset: function(offset) {
            if (Types.isNumber(offset)) {
                this.ctx_.setOffset(offset);
            }

            return this;
        },
        /**
         * @param {Number} slice
         * @returns {ContextBuilder}
         */
        andSlice: function(slice) {
            if (Types.isNumber(slice)) {
                this.ctx_.setSlice(slice);
            }

            return this;
        },
        /** 
         * @param {Object} param
         * @returns {ContextBuilder}
         */
        andParam: function(param) {
            if (param) {
                this.ctx_.setParam(HashMap.fromObject(param));
            }

            return this;
        },
        /**
         * @param {Array[String]} querystring
         * @returns {ContextBuilder}
         */
        andQuerystring: function(querystring) {
            var param = this.ctx_.getParam();
            var qstr = '';
            if (param) {
                qstr = PageContextQuerystring
                        .buildFromTemplateAndParam(querystring, param.entrySet());
            }

            this.ctx_.setQuerystring(qstr);
            return this;
        },
        /** 
         * @param {String} uri
         * @returns {ContextBuilder}
         */
        andUriPath: function(uri) {
            if (uri) {
                this.ctx_.setUriPath(uri);
            }

            return this;
        },
        /** 
         * @param {String} url
         * @returns {ContextBuilder}
         */
        andContextPath: function(url) {
            if (url) {
                this.ctx_.setContextPath(url);
            }

            return this;
        },
        /**
         * @param {Object} param
         * @returns {ContextBuilder}
         */
        andAdditionalParam: function(param) {
            if (param) {
                this.ctx_.setAdditionalParam(HashMap.fromObject(param));
            }

            return this;
        },
        /**
         * @param {Object} tab
         * @returns {ContextBuilder}
         */
        andChildContext: function(tab) {
            if (tab) {
                this.ctx_.setChildContext(tab);
            }

            return this;
        },
        /**
         * @returns {Page} 
         */
        build: function() {
            return this.ctx_;
        }
    });



    return ContextBuilder;
});