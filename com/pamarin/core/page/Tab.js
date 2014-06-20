/**
 * @author jittagorn pitaktagoon
 * create 13/06/2014
 */
define('com.pamarin.core.page.Tab', [
    'module',
    'com.pamarin.core.lang.Array',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.util.StringUtils',
    'com.pamarin.core.util.collection.HashMap'
], function(module, Array, Class, StringUtils, HashMap) {

    /**
     * @class Tab
     */
    var Tab = Class.define(module.id, {
        /**/
        variable: {
            id_: null,
            name_: null,
            pattern_: null,
            offset_: 0,
            slice_: 1,
            param_: null,
            querystring_: null,
            uri_: null,
            pageUrl_: null,
            additionalParam_: null,
            tab_: null
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
        getUri: function() {
            return this.uri_;
        },
        /**
         * @param {String} uri
         */
        setUri: function(uri) {
            this.uri_ = uri;
        },
        /**
         * @returns {String}
         */
        getTabUrl: function() {
            return this.pageUrl_;
        },
        /**
         * 
         * @param {String} url
         */
        setTabUrl: function(url) {
            this.pageUrl_ = url;
        },
        /**
         * @returns {Object}
         */
        getTab: function() {
            return this.tab_;
        },
        /**
         * @param {Object} tab
         */
        setTab: function(tab) {
            this.tab_ = tab;
        },
        /**
         * @returns {Map}
         */
        getQuerystringMap: function() {
            var qstr = this.getQuerystring();
            if (!qstr) {
                return null;
            }

            var map = new HashMap();
            var arr = StringUtils.split(qstr.replace('?', ''), '&');
            Array.forEachIndex(arr, function(qs) {
                var qarr = StringUtils.split(qs, '=');
                if (qarr && qarr.length === 2) {
                    map.put(qarr[0], qarr[1]);
                }
            });

            return map;
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
         * @param {Tab} obj 
         * @returns {Boolean} 
         */
        equals: function(obj) {
            if (!(obj instanceof Tab)) {
                return false;
            }

            return obj.getId() === this.getId();
        }

    });



    return Tab;
});