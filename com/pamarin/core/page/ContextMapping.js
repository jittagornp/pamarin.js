/**
 * @author jittagorn pitakmetagoon
 * create 19/06/2014
 */
define('com.pamarin.core.page.ContextMapping', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.lang.Object',
    'com.pamarin.core.lang.Array',
    'com.pamarin.core.util.StringUtils',
    'com.pamarin.core.util.PathTemplateParser',
    'com.pamarin.core.util.Urls',
    'com.pamarin.core.util.Types',
    'com.pamarin.core.creational.Namespace',
    'com.pamarin.core.page.ContextBuilder'
], function(module, Class, Object, Array, StringUtils, PathTemplateParser, Urls, Types, Namespace, ContextBuilder) {

    /**
     * @class ContextMapping
     */
    var ContextMapping = Class.define(module.id, (function(location) {

        var SLASH = '/';
        var CONTEXTAUL_NOTATION = SLASH + '**';
        var EMPTY_STRING = '';

        /**
         * @param {String} url
         * @returns {String}
         */
        function pathOnly(url) {
            url = Urls.removeSessionId(url);
            url = Urls.removeQuerystring(url);
            return url;
        }

        /**
         * @param {Array[String]} arr
         * @returns {Array[String]}
         */
        function pathArrayOnly(arr) {
            var path = pathOnly(arr.join(SLASH));
            return StringUtils.split(path, SLASH);
        }

        return {
            /**/
            variable: {
                DEFAULT_MAPPING_NAME_: 'context',
                DEFAULT_CHILD_ATTRIBUTE_: 'child',
                DEFAULT_CHILD_NAME_: 'home',
                DEFAULT_START_INDEX_: 0,
                DEFAULT_SLICE_SIZE_: 1,
                mappingName_: null,
                contextMapping_: null,
                parentContext_: null,
                context_: null,
                lastContextName_: null,
                startIndex_: null,
                childAttribute_: null
            },
            /**
             * @param {String} name
             * @param {Object} mapping
             * @param {String} childAttr
             */
            constructor: function(name, mapping, childAttr, index_opt) {
                this.mappingName_ = name || this.DEFAULT_MAPPING_NAME_;
                this.contextMapping_ = mapping;
                this.childAttribute_ = childAttr || this.DEFAULT_CHILD_ATTRIBUTE_;
                this.startIndex_ = Types.isNumber(index_opt)
                        ? index_opt
                        : this.DEFAULT_START_INDEX_;
            },
            /**
             * @param {Object} template
             * @param {Object} mapping
             * @returns {String}
             */
            buildContextName: function(template, mapping) {
                return this.buildFullContextPath(template, mapping);
            },
            /**
             * @param {Object} template
             * @param {Object} mapping
             * @param {Number} start_opt 
             * @returns {String}
             */
            buildUrl: function(template, mapping, start_opt, end_opt) {
                var start = Types.isNumber(start_opt)
                        ? start_opt
                        : this.toMappingOffset(mapping.offset);

                var end = Types.isNumber(end_opt)
                        ? end_opt
                        : (this.toMappingOffset(mapping.offset) + this.toMappingSlice(mapping.slice));

                return template
                        .stringArray
                        .slice(start, end)
                        .join(SLASH);
            },
            /**
             * @param {Object} context
             * @returns {String}
             */
            buildPattern: function(context) {
                if (context && context.pattern) {
                    return context.pattern;
                }

                var pattern = this.parentContext_
                        && this.parentContext_.getPattern()
                        ? this.parentContext_.getPattern()
                        : EMPTY_STRING;

                return pattern + SLASH + '{' + this.mappingName_ + '}';
            },
            /**
             * @param {Stringe} url
             * @param {String} pattern
             * @returns {Object}
             */
            buildParam: function(param, url, pattern) {
                if (!Object.isEmpty(param)) {
                    return param;
                }

                var param = null;
                if (pattern) {
                    var tmpl = PathTemplateParser.parse(url, pattern);
                    if (tmpl) {
                        param = tmpl.param;
                    }
                }

                return param;
            },
            /**
             * @param {Array[String]} arr
             * @param {String} key
             * @returns {Boolean}
             */
            foundByKey: function(arr, key) {
                return Array.forEachIndex(arr, function(obj) {
                    return !!obj[key];
                });
            },
            /**
             * @param {Map<T>} map
             * @param {Array[Object]} qstr
             * @param {Function} filter
             * @param {Object} ctx_opt
             * @returns {Array}
             */
            toArray: function(map, qstr, filter, ctx_opt) {
                if (!qstr) {
                    qstr = [];
                }

                map.forEachEntry(function(val, key) {
                    if (filter.call(ctx_opt, val, key)) {
                        var obj = {};
                        obj[key] = val;

                        qstr.push(obj);
                    }
                });

                return qstr;
            },
            /**
             * @param {Array[Object]} qstr
             * @returns {Array[Object]}
             */
            mergeQuerystring: function(qstr) {
                if (!this.parentContext_) {
                    return qstr;
                }

                var map = this.parentContext_.getQuerystringMap();
                if (map) {
                    var filter = qstr
                            ? (function(val, key) {
                                return !this.foundByKey(qstr, key);
                            })
                            : (function() {
                                return true;
                            });

                    qstr = this.toArray(map, qstr, filter, this);
                }

                return qstr;
            },
            /**
             * @param {Object} template
             * @param {Object} mapping
             * @param {Number} offset
             * @param {Number} slice
             * @returns {String}
             */
            buildContextPath: function(template, mapping, offset, slice) {
                var start_opt = this.parentContext_
                        ? this.parentContext_.getRootOffset()
                        : undefined;

                var end_opt = offset + slice;

                return SLASH + this.buildUrl(template, mapping, start_opt, end_opt);
            },
            /**
             * @param {Object} template
             * @param {Object} mapping
             * @returns {String}
             */
            buildFullContextPath: function(template, mapping) {
                return SLASH + this.buildUrl(template, mapping, 0);
            },
            /**
             * @param {String} name
             * @param {Number} offset
             * @param {Number} slice
             * @returns {String}
             */
            buildName: function(name, offset, slice) {
                var arr = StringUtils.split(name, SLASH);
                arr = arr.slice(offset, offset + slice);
                return arr.join(SLASH);
            },
            /**/
            buildRootOffset: function(offset) {
                if (this.parentContext_) {
                    offset = this.parentContext_.getOffset() < offset
                            ? this.parentContext_.getOffset()
                            : offset;

                    offset = this.parentContext_.getRootOffset() < offset
                            ? this.parentContext_.getRootOffset()
                            : offset;
                }

                return offset;
            },
            /**/
            buildDefaultName: function() {
                if (this.parentContext_) {
                    return this.parentContext_.getDefaultChildName();
                }

                return this.DEFAULT_CHILD_NAME_;
            },
            /**/
            replaceFormatName : function(format, name){
                return format.replace('{[' + this.mappingName_ + ']}', name);
            },
            /**/
            rewriteTemplate: function(template, defaultName) {
                template.string = this.replaceFormatName(template.string, defaultName);
                Array.forEachIndex(template.stringArray, function(item, index){
                    template.stringArray[index] = this.replaceFormatName(item, defaultName);
                }, this);
                
                return template;
            },
            /**
             * @param {String} id
             * @param {String} name
             * @param {Object} mapping
             * @param {Object} template
             * @returns {ContextBean}
             */
            buildContext: function(id, name, mapping, template) {
                var child = mapping[this.childAttribute_];
                if (child && child.reference) {
                    //reference to other config.
                    child = Namespace.getValue(child.reference, this.contextMapping_);
                }

                var defaultName = this.buildDefaultName();
                id = this.replaceFormatName(id, defaultName);
                name = this.replaceFormatName(name, defaultName);
                template = this.rewriteTemplate(template, defaultName);

                var offset = this.toMappingOffset(mapping.offset);
                var rootOffset = this.buildRootOffset(offset);
                var slice = this.toMappingSlice(mapping.slice);

                var fullContextPath = name;
                var contextPath = this.buildContextPath(template, mapping, offset, slice);
                var pattern = this.buildPattern(mapping);
                var param = this.buildParam(template.param, name, pattern);
                var qstr = this.mergeQuerystring(mapping.querystring);
                name = this.buildName(name, offset, slice);

                return ContextBuilder.buildContext(id)
                        .andName(name)
                        .andMappingName(this.mappingName_)
                        .andPattern(pattern)
                        .andOffset(offset)
                        .andRootOffset(rootOffset)
                        .andSlice(slice)
                        .andParam(param)
                        .andQuerystring(qstr)
                        .andFullContextPath(fullContextPath)
                        .andAdditionalParam(mapping.additionalParam)
                        .andContextPath(contextPath)
                        .andParent(this.parentContext_)
                        .andChildContext(child)
                        .andDefaultChildName(this.DEFAULT_CHILD_NAME_)
                        .andChildContextAttribute(this.childAttribute_)
                        .build();
            },
            /**
             * @param {Number offset
             * @returns {Number}
             */
            toMappingOffset: function(offset) {
                return Types.isNumber(offset)
                        ? offset
                        : this.getStartIndex();
            },
            /**
             * @param {Number} slice
             * @returns {Number}
             */
            toMappingSlice: function(slice) {
                return Types.isNumber(slice)
                        ? slice
                        : this.DEFAULT_SLICE_SIZE_;
            },
            /**
             * @returns {Number}
             */
            getStartIndex: function() {
                if (this.startIndex_ === null) {
                    this.startIndex_ = this.DEFAULT_START_INDEX_;
                }

                return this.startIndex_;
            },
            /**
             * @returns {ContextBean}
             */
            getContext: function() {
                return this.context_;
            },
            /**
             * @param {String} pattern
             * @returns {String}
             */
            addContextaul: function(pattern) {
                return StringUtils.endsWith(pattern, CONTEXTAUL_NOTATION)
                        ? pattern
                        : pattern + CONTEXTAUL_NOTATION;
            },
            /**
             * @private
             * 
             * @param {Array[String]} arr
             * @returns {String}
             */
            findByContextaul: function(arr) {
                var cx = {};
                this.contextWalking(arr, function(tmpl, mapping, id) {
                    if (!cx.tmpl || cx.tmpl.format.length < tmpl.format.length) {
                        cx.id = id;
                        cx.tmpl = tmpl;
                        cx.mapping = mapping;
                    }
                }, this.addContextaul);

                if (cx.id) {
                    cx.name = this.buildContextName(cx.tmpl, cx.mapping);
                }

                return cx;
            },
            /**
             * @param {Array[String]} arr
             * @param {Function} fn
             * @param {Function} filter
             */
            contextWalking: function(arr, fn, filter) {
                var path = arr.join(SLASH);
                filter = filter || function(pattern) {
                    return pattern;
                };

                return Object.forEachProperty(this.contextMapping_, function(mapping, id) {
                    var tmpl = PathTemplateParser.parse(path, filter(mapping.pattern));
                    if (!tmpl) {
                        return true; //continue
                    }

                    return fn.call(this, tmpl, mapping, id);
                }, this);
            },
            /** 
             * @param {Number} index
             * @param {Array[String]} arr
             * @param {Function} callback
             */
            detect: function(index, arr, callback) {
                arr = pathArrayOnly(arr);
                var notFound = this.contextWalking(arr, function(tmpl, mapping, id) {
                    var name = this.buildContextName(tmpl, mapping);
                    this.context_ = this.buildContext(
                            id,
                            name,
                            mapping,
                            tmpl
                            );

                    callback && callback(this.context_);
                    this.lastContextName_ = name + location.search;
                    return false;
                });

                if (notFound) {
                    this.otherDetect(index, arr, callback);
                }
            },
            /**
             * @param {Object} cx
             * @param {Array[String]} arr
             */
            defaultContext: function(cx, arr) {
                var start = 0;
                var end = this.getStartIndex() + this.DEFAULT_SLICE_SIZE_;
                arr = arr.slice(start, end);

                cx.id = pathOnly(arr.join(SLASH));
                cx.name = cx.id[0] === SLASH ? cx.id : SLASH + cx.id;
                cx.mapping = {};
                cx.tmpl = {
                    stringArray: arr,
                    string: cx.name
                };

                return cx;
            },
            /** 
             * @param {Number} index
             * @param {Array[String]} arr
             * @param {Function} callback
             */
            otherDetect: function(index, arr, callback) {
                var cx = this.findByContextaul(arr);
                if (!cx.name) {
                    cx = this.defaultContext(cx, arr);
                }

                this.context_ = this.buildContext(
                        cx.id,
                        cx.name,
                        cx.mapping,
                        cx.tmpl
                        );

                var name = cx.name + location.search;
                var reload = index === this.getStartIndex()
                        || name !== this.lastContextName_;

                if (reload) {
                    callback && callback(this.context_);
                }

                this.lastContextName_ = name;
            }
        };
    })(window.location));



    return ContextMapping;
});