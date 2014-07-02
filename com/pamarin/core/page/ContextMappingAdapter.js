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
    'com.pamarin.core.util.Urls',
    'com.pamarin.core.util.Types'
], function(module, Class, Object, ContextMapping, StringUtils, Urls, Types) {

    /**
     * @class ContextMappingAdapter
     */
    var ContextMappingAdapter = Class.define(module.id, (function() {

        var SLASH = '/';

        return {
            /**/
            variable: {
                DEFAULT_MAPPING_NAME_: 'context',
                indexChanged_: null,
                currentPath_: null,
                defaultChildName_: null
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
                this.currentPath_ = this.getInitialPath(settings.currentPath);

                this.__super__.constructor.call(
                        this,
                        settings.name,
                        this.toContext(settings.parentContext, settings.context),
                        settings.childContextAttribute,
                        this.indexChanged_
                        );
            },
            /**
             * @param {Array[String]} currentPathArray
             * @returns {Array[String]}
             */
            getInitialPath: function(currentPathArray) {
                var defaultPathArray = Urls.getPathArray();
                if (currentPathArray) {
                    var pathArray = StringUtils.split(currentPathArray, SLASH);
                    if (pathArray.length < defaultPathArray.length) {
                        pathArray = defaultPathArray;
                    }

                    return pathArray;
                }

                return defaultPathArray;
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
                }

                return this.transformContextMapping(context);
            },
            /**/
            checkPath: function(pathArray) {
                if (this.parentContext_) {
                    var length = this.parentContext_.getOffset()
                            + this.parentContext_.getSlice();

                    for (var i = 0; i <= length; i++) {
                        if (!pathArray[i]) {
                            pathArray[i] = '{[' + this.mappingName_ + ']}';
                        }
                    }
                }
                return pathArray;
            },
            /**
             * @param {Number} index
             * @param {Array[String]} pathArray
             */
            trigChange: function(index, pathArray) {
                index = Types.isNumber(index) ? index : this.indexChanged_;

                pathArray = this.checkPath(pathArray || this.currentPath_);
                this.detect(index, pathArray, this.onReloadContext);
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
            onReloadContext: function() {
                //implements your own.
            }
        };
    })()).extends(ContextMapping);



    return ContextMappingAdapter;
});