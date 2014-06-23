/**
 * @author jittagorn pitakmetagoon
 * create 20/06/2014
 */
define('com.pamarin.core.page.ContextMappingAdapter', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.lang.Object',
    'com.pamarin.core.page.ContextMapping',
    'com.pamarin.core.util.StringUtils',
    'com.pamarin.core.util.Urls'
], function(module, Class, Object, ContextMapping, StringUtils, Urls) {

    /**
     * @class ContextMappingAdapter
     */
    var ContextMappingAdapter = Class.define(module.id, (function() {

        var SLASH = '/';

        return {
            /**/
            variable: {
                DEFAULT_CONTEXT_NAME_: 'home',
                DEFAULT_MAPPING_NAME_: 'context',
                indexChanged_: null,
                currentPath_: null,
                mapped_: false
            },
            /**
             * @param {Object} settings = {
             *      name : '',
             *      parentContext : {}, //ContextBean
             *      context : {},
             *      childContextAttribute : ''
             * };
             */
            constructor: function(settings) {
                this.currentPath_ = settings.currentPath || Urls.getPathArray();

                this.__super__.constructor.call(
                        this,
                        settings.name,
                        this.toContext(settings.parentContext, settings.context),
                        settings.childContextAttribute,
                        this.indexChanged_
                        );
            },
            /**
             * @param {ContextBean} parentContext
             * @param {Object} context
             * @returns {Object}
             */
            toContext: function(parentContext, context) {
                if (parentContext) {
                    this.parentContext_ = parentContext;
                    context = parentContext.getChildContext();

                    if (context) {
                        context = context.mapping;
                    }

                    this.indexChanged_ = parentContext.getOffset() + parentContext.getSlice();
                    if (!this.currentPath_[this.indexChanged_]) {
                        this.currentPath_[this.indexChanged_] = this.DEFAULT_CONTEXT_NAME_;
                    }
                }

                return this.transformContextMapping(context);
            },
            /**
             * @param {Number} index
             * @param {Array[String]} pathArray
             */
            trigChange: function(index, pathArray) {
                index = this.indexChanged_ || index;
                pathArray = this.currentPath_ || pathArray;

                this.detect(index, pathArray, this.reloadContext);
                this.indexChanged_ = null;
                this.currentPath_ = null;
            },
            /**
             * @param {Number} slice
             * @param {String} pattern
             * @returns {Number}
             */
            toSlice: function(slice, pattern) {
                return slice || StringUtils.split(pattern, SLASH).length;
            },
            /**
             * @param {String} pattern
             * @returns {String}
             */
            toPattern: function(pattern) {
                if (this.parentContext_ === null) {
                    return pattern;
                }

                var startsWith = StringUtils.startsWith(pattern, this.parentContext_.getPattern());
                return startsWith
                        ? pattern :
                        this.parentContext_.getPattern() + pattern;
            },
            /**
             * @param {Object} mapping
             * @returns {Object}
             */
            cloneMapping: function(mapping) {
                var newMap = {};
                Object.forEachProperty(mapping, function(val, key) {
                    newMap[key] = Object.clone(val);
                });

                return newMap;
            },
            /**
             * @param {Object} mapping
             * @returns {Object}
             */
            transformContextMapping: function(mapping) {
                mapping = this.cloneMapping(mapping);
                Object.forEachProperty(mapping, function(map) {
                    map.slice = this.toSlice(map.slice, map.pattern);
                    map.pattern = this.toPattern(map.pattern);
                }, this);

                return mapping;
            },
            /**/
            reloadContext: function() {
                //implements your own.
            }
        };
    })()).extends(ContextMapping);



    return ContextMappingAdapter;
});
