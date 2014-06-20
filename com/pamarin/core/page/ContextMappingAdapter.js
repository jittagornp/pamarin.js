/**
 * @author jittagorn pitakmetagoon
 * create 20/06/2014
 */
define('com.pamarin.core.page.ContextMappingAdapter', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.lang.Object',
    'com.pamarin.core.page.ContextMapping',
    'com.pamarin.core.util.StringUtils'
], function(module, Class, Object, ContextMapping, StringUtils) {

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
             * @param {type} settings = {
             *      name : '',
             *      parentContext : {},
             *      context : {},
             *      childContextAttribute : ''
             * };
             */
            constructor: function(settings) {
                this.__super__.constructor.call(
                        this,
                        settings.name,
                        this.toContext(settings.parentContext, settings.context),
                        settings.childContextAttribute,
                        this.indexChanged_
                        );
            },
            /**/
            toContext: function(parentContext, context) {
                if (parentContext) {
                    this.parentContext_ = parentContext;
                    context = parentContext.getChildContext();
                    if (context) {
                        context = context.mapping;
                    }

                    this.indexChanged_ = parentContext.getOffset() + parentContext.getSlice();
                    this.currentPath_ = StringUtils.split(parentContext.getUriPath(), SLASH);

                    if (!this.currentPath_[this.indexChanged_]) {
                        this.currentPath_[this.indexChanged_] = this.DEFAULT_CONTEXT_NAME_;
                    }
                }

                return this.transformContextMapping(context);
            },
            /**/
            trigChange: function(index, pathArray) {
                this.detect(this.indexChanged_ || index, this.currentPath_ || pathArray, this.reloadContext);
                this.indexChanged_ = null;
                this.currentPath_ = null;
            },
            /**/
            toSlice: function(slice, pattern) {
                return slice || StringUtils.split(pattern, SLASH).length;
            },
            /**/
            toPattern: function(pattern) {
                if (this.parentContext_ === null) {
                    return pattern;
                }

                var startsWith = StringUtils.startsWith(pattern, this.parentContext_.getPattern())
                return startsWith ? pattern : this.parentContext_.getPattern() + pattern;
            },
            /**/
            transformContextMapping: function(mapping) {
                mapping = Object.clone(mapping);
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