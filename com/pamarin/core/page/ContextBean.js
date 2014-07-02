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
            mappingName_: null,
            pattern_: null,
            rootOffset_: 1000,
            offset_: 0,
            slice_: 1,
            param_: null,
            querystring_: null,
            fullContextPath_: null,
            contextPath_: null,
            additionalParam_: null,
            childContext_: null,
            parent_: null,
            child_: null,
            defaultChildName_: null,
            childContextAttribute_: null
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
        getMappingName: function() {
            return this.mappingName_;
        },
        /**
         * @param {String} name
         */
        setMappingName: function(name) {
            this.mappingName_ = name;
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
         * @param {Number} offset
         */
        setRootOffset: function(offset) {
            this.rootOffset_ = offset;
        },
        /**
         * @returns {Number} 
         */
        getRootOffset: function() {
            return this.rootOffset_;
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
        getFullContextPath: function() {
            return this.fullContextPath_;
        },
        /**
         * @param {String} uri
         */
        setFullContextPath: function(uri) {
            this.fullContextPath_ = uri;
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
         * @param {ContextBean} parent
         */
        setParent: function(parent) {
            this.parent_ = parent;
        },
        /**
         * @returns {ContextBean}
         */
        getParent: function() {
            return this.parent_;
        },
        /**
         * @param {ContextBean} child
         */
        setChild: function(child) {
            this.child_ = child;
        },
        /**
         * @returns {ContextBean}
         */
        getChild: function() {
            return this.child_;
        },
        /**
         * @param {String} name
         */
        setDefaultChildName: function(name) {
            this.defaultChildName_ = name;
        },
        /**
         * @returns {String}
         */
        getDefaultChildName: function() {
            var childContext = this.getChildContext();
            if (childContext && childContext.default) {
                this.defaultChildName_ = childContext.default;
            }

            return this.defaultChildName_;
        },
        /**
         * @param {String} attr
         */
        setChildContextAttribute: function(attr) {
            this.childContextAttribute_ = attr;
        },
        /**
         * @returns {String}
         */
        getChildContextAttribute: function() {
            return this.childContextAttribute_;
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