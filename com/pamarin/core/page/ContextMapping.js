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
    'com.pamarin.core.creational.Namespace',
    'com.pamarin.core.page.ContextBuilder'
], function(module, Class, Object, Array, StringUtils, PathTemplateParser, Urls, Namespace, ContextBuilder) {

    /**
     * @class ContextMapping
     */
    var ContextMapping = Class.define(module.id, (function() {

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

        return {
            /**/
            variable: {
                DEFAULT_MAPPING_NAME_: 'context',
                DEFAULT_CHILD_NAME_: 'child',
                DEFAULT_START_INDEX_: 0,
                DEFAULT_SLICE_SIZE_: 1,
                mappingName_: null,
                contextMapping_: null,
                parentContext_: null,
                context_: null,
                lastContextName_: null,
                startIndex_: null,
                childName_: null
            },
            /**
             * @param {String} name
             * @param {Object} mapping
             * @param {String} childName
             */
            constructor: function(name, mapping, childName, index_opt) {
                this.mappingName_ = name || this.DEFAULT_MAPPING_NAME_;
                this.contextMapping_ = mapping;
                this.childName_ = childName || this.DEFAULT_CHILD_NAME_;
                this.startIndex_ = index_opt || this.DEFAULT_START_INDEX_;
            },
            /**
             * @param {Object} template
             * @param {Object} mapping
             * @returns {String}
             */
            toContextName: function(template, mapping) {
                return this.buildUrl(template, mapping);
            },
            /**
             * @param {Object} template
             * @param {Object} mapping
             * @param {Number} start_opt 
             * @returns {String}
             */
            buildUrl: function(template, mapping, start_opt) {
                var start = mapping.offset || this.getStartIndex();
                var end = start + (mapping.slice || this.DEFAULT_SLICE_SIZE_);

                return template
                        .stringArray
                        .slice(start_opt || start, end)
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
            buildParam: function(url, pattern) {
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
             * @param {String} id
             * @param {String} name
             * @param {Object} mapping
             * @param {Object} template
             * @returns {ContextBean}
             */
            buildContext: function(id, name, mapping, template) {
                var child = mapping[this.childName_];
                if (child && child.reference) {
                    //reference to other config.
                    child = Namespace.getValue(child.reference, this.contextMapping_);
                }

                var contextPath = this.buildUrl(template, mapping, 0);
                var pattern = this.buildPattern(mapping);
                var param = template.param
                        ? template.param
                        : this.buildParam(contextPath, pattern);

                return ContextBuilder.buildFromId(id)
                        .andName(name)
                        .andPattern(pattern)
                        .andOffset(mapping.offset || this.getStartIndex())
                        .andSlice(mapping.slice || this.DEFAULT_SLICE_SIZE_)
                        .andParam(param)
                        .andQuerystring(this.mergeQuerystring(mapping.querystring))
                        .andUriPath(Urls.getPath(template.string))
                        .andAdditionalParam(mapping.additionalParam)
                        .andContextPath(contextPath)
                        .andChildContext(child)
                        .build();
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
                var rs = {};
                var path = arr.join(SLASH);
                var fn = function(mapping, id) {
                    var tmpl = PathTemplateParser.parse(path, addContextaul(mapping.pattern));
                    if (!tmpl) {
                        return true; //continue
                    }

                    if (!rs.tmpl || rs.tmpl.format.length < tmpl.format.length) {
                        rs.id = id;
                        rs.tmpl = tmpl;
                        rs.mapping = mapping;
                        rs.name = this.toContextName(rs.tmpl, rs.mapping);
                    }
                };

                Object.forEachProperty(this.contextMapping_,fn, this);
                return rs;
            },
            /** 
             * @param {Number} index
             * @param {Array[String]} arr
             * @param {Function} callback
             */
            detect: function(index, arr, callback) {
                var path = arr.join(SLASH);
                var fn = function(mapping, id) {
                    var tmpl = PathTemplateParser.parse(path, mapping.pattern);
                    if (!tmpl) {
                        return true; //continue
                    }

                    this.lastContextName_ = this.toContextName(tmpl, mapping);
                    this.context_ = this.buildContext(
                            id,
                            this.lastContextName_,
                            mapping,
                            tmpl
                            );

                    callback && callback(this.context_);
                    return false;

                };

                if (Object.forEachProperty(this.contextMapping_, fn, this)) {
                    this.otherDetect(index, arr, callback);
                }
            },
            /** 
             * @param {Number} index
             * @param {Array[String]} arr
             * @param {Function} callback
             */
            otherDetect: function(index, arr, callback) {
                var obj = this.findByContextaul(arr);
                if (!obj.name) {
                    arr = arr.slice(0, this.getStartIndex() + this.DEFAULT_SLICE_SIZE_);
                    obj.id = pathOnly(arr.join(SLASH));
                    obj.name = obj.id;
                    obj.mapping = {};
                    obj.tmpl = {stringArray: [obj.name], string: SLASH + obj.name};
                }

                this.context_ = this.buildContext(
                        obj.id,
                        obj.name,
                        obj.mapping,
                        obj.tmpl
                        );

                var foceReload = index === this.getStartIndex()
                        || obj.name !== this.lastContextName_;

                if (foceReload) {
                    callback && callback(this.context_);
                }

                this.lastContextName_ = obj.name;
            }
        };
    })());



    return ContextMapping;
});
