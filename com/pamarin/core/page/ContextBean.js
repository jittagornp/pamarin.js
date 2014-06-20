/**
 * @author jittagorn pitaktagoon
 * create 13/06/2014
 */
define('com.pamarin.core.page.ContextBean', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.util.Querystrings'
], function(module, Class, Querystrings) {

    /**
     * @class ContextBean
     */
    var ContextBean = Class.define(module.id, {
        /**/
        variable: {
            id_: null,
            name_: null,
            pattern_: null,
            offset_: 0,
            slice_: 1,
            param_: null,
            querystring_: null,
            uriPath_: null,
            contextPath_: null,
            additionalParam_: null,
            childContext_: null
        },
        /** 
         * @param {String} id
         */
        constructor: function(id) {
            this.id_ = id || null;
        },
        /**
         * @returns {String}
         */
        getId: function() {
            return this.id_;
        },
        /**
         * @param {String} id
         */
        setId: function(id) {
            this.id_ = id;
        },
        /**
         * @returns {String}
         */
        getName: function() {
            return this.name_;
        },
        /**
         * @param {String} name
         */
        setName: function(name) {
            this.name_ = name;
        },
        /**
         * @returns {String}
         */
        getPattern: function() {
            return this.pattern_;
        },
        /**
         * @param {String} pattern 
         */
        setPattern: function(pattern) {
            this.pattern_ = pattern;
        },
        /**
         * @returns {Number} 
         */
        getOffset: function() {
            return this.offset_;
        },
        /**
         * @param {Number} offset
         */
        setOffset: function(offset) {
            this.offset_ = offset;
        },
        /**
         * @returns {Number} 
         */
        getSlice: function() {
            return this.slice_;
        },
        /**
         * @param {String} slice 
         */
        setSlice: function(slice) {
            this.slice_ = slice;
        },
        /**
         * @returns {Object} 
         */
        getParam: function() {
            return this.param_;
        },
        /**
         * @param {Object} param 
         */
        setParam: function(param) {
            this.param_ = param;
        },
        /**
         * @returns {Object} 
         */
        getQuerystring: function() {
            return this.querystring_;
        },
        /**
         * @param {Object} qstr 
         */
        setQuerystring: function(qstr) {
            this.querystring_ = qstr;
        },
        /**
         * @returns {String}
         */
        getUriPath: function() {
            return this.uriPath_;
        },
        /**
         * @param {String} uri
         */
        setUriPath: function(uri) {
            this.uriPath_ = uri;
        },
        /**
         * @returns {String}
         */
        getContextPath: function() {
            return this.contextPath_;
        },
        /**
         * 
         * @param {String} url
         */
        setContextPath: function(url) {
            this.contextPath_ = url;
        },
        /**
         * @returns {Object}
         */
        getChildContext: function() {
            return this.childContext_;
        },
        /**
         * @param {Object} tab
         */
        setChildContext: function(tab) {
            this.childContext_ = tab;
        },
        /**
         * @returns {Map}
         */
        getQuerystringMap: function() {
            return Querystrings.toMap(this.getQuerystring());
        },
        /**
         * @returns {Map}
         */
        getAdditionalParam: function() {
            return this.additionalParam_;
        },
        /**
         * @param {Map} param
         */
        setAdditionalParam: function(param) {
            this.additionalParam_ = param;
        },
        /**
         * @param {ContextBean} obj 
         * @returns {Boolean} 
         */
        equals: function(obj) {
            if (!(obj instanceof ContextBean)) {
                return false;
            }

            return obj.getId() === this.getId();
        }

    });



    return ContextBean;
});