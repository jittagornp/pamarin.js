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
            buildContext: function(id) {
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
         * @param {String} name
         * @returns {ContextBuilder}
         */
        andMappingName: function(name) {
            if (name) {
                this.ctx_.setMappingName(name);
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
         * @param {Number} offset
         * @returns {ContextBuilder}
         */
        andRootOffset: function(offset) {
            if (Types.isNumber(offset)) {
                this.ctx_.setRootOffset(offset);
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
         * @param {String} path
         * @returns {ContextBuilder}
         */
        andFullContextPath: function(path) {
            if (path) {
                this.ctx_.setFullContextPath(path);
            }

            return this;
        },
        /** 
         * @param {String} path
         * @returns {ContextBuilder}
         */
        andContextPath: function(path) {
            if (path) {
                this.ctx_.setContextPath(path);
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
         * @param {ContextBean} context
         * @returns {ContextBuilder}
         */
        andParent: function(context) {
            if (context) {
                this.ctx_.setParent(context);
            }

            return this;
        },
        /**
         * @param {String} name
         * @returns {ContextBuilder}
         */
        andDefaultChildName: function(name) {
            if (name) {
                this.ctx_.setDefaultChildName(name);
            }

            return this;
        },
        /**
         * @param {String} attr
         * @returns {ContextBuilder}
         */
        andChildContextAttribute: function(attr) {
            if (attr) {
                this.ctx_.setChildContextAttribute(attr);
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