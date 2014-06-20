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
            /**/
            constructor: function(name, mapping, childName, index_opt) {
                this.mappingName_ = name || this.DEFAULT_MAPPING_NAME_;
                this.contextMapping_ = mapping;
                this.childName_ = childName || this.DEFAULT_CHILD_NAME_;
                this.startIndex_ = index_opt || this.DEFAULT_START_INDEX_;
            },
            /**/
            toContextName: function(template, mapping) {
                var start = mapping.offset || this.getStartIndex();
                var end = start + (mapping.slice || this.DEFAULT_SLICE_SIZE_);

                return template
                        .stringArray
                        .slice(start, end)
                        .join(SLASH);
            },
            /**/
            buildPattern: function(context) {
                if (context && context.pattern) {
                    return context.pattern;
                }

                var pattern = this.parentContext_
                        && this.parentContext_.getPattern()
                        ? this.parentContext_.getPattern()
                        : '';

                return pattern + SLASH + '{' + this.mappingName_ + '}';
            },
            /**/
            buildParam: function(url, pattern) {
                var param = null;
                if (!pattern) {
                    var tmpl = PathTemplateParser.parse(url, pattern);
                    if (tmpl) {
                        param = tmpl.param;
                    }
                }

                return param;
            },
            /**/
            findByKey: function(arr, key) {
                return Array.forEachIndex(arr, function(obj) {
                    return !!obj[key];
                });
            },
            /**/
            toArray: function(map, qstr, filter) {
                map.forEachEntry(function(val, key) {
                    if (filter(val, key)) {
                        var obj = {};
                        obj[key] = val;

                        qstr.push(obj);
                    }
                }, this);
            },
            /**/
            mergeQuerystring: function(qstr) {
                if (!this.parentContext_) {
                    return qstr;
                }

                var map = this.parentContext_.getQuerystringMap();
                if (map) {
                    if (qstr) {
                        this.toArray(map, qstr, function(val, key) {
                            return !this.findByKey(qstr, key);
                        });
                    } else {
                        qstr = [];
                        this.toArray(map, qstr, function(val, key) {
                            return true;
                        });
                    }
                }

                return qstr;
            },
            /**/
            buildContext: function(id, name, mapping, template) {
                var child = mapping[this.childName_];
                if (child && child.reference) {
                    //reference to other config.
                    child = Namespace.getValue(child.reference, this.contextMapping_);
                }

                var start = mapping.offset || this.getStartIndex();
                var end = mapping.slice || this.DEFAULT_SLICE_SIZE_;

                var url = Urls.getPath(template.stringArray
                        .slice(0, start + end)
                        .join(SLASH));

                var pattern = this.buildPattern(mapping);
                var param = template.param
                        ? template.param
                        : this.buildParam(url, pattern);

                return ContextBuilder.buildFromId(id)
                        .andName(name)
                        .andPattern(pattern)
                        .andOffset(start)
                        .andSlice(end)
                        .andParam(param)
                        .andQuerystring(this.mergeQuerystring(mapping.querystring))
                        .andUriPath(Urls.getPath(template.string))
                        .andAdditionalParam(mapping.additionalParam)
                        .andContextPath(url)
                        .andChildContext(child)
                        .build();
            },
            /**/
            setStartIndex: function(index) {
                this.startIndex_ = index;
            },
            /**/
            getStartIndex: function() {
                if (this.startIndex_ === null) {
                    this.startIndex_ = this.DEFAULT_START_INDEX_;
                }

                return this.startIndex_;
            },
            /**/
            getContext: function() {
                return this.context_;
            },
            /**/
            setMappingContext: function(ctx) {
                this.contextMapping_ = ctx;
            },
            /**
             * @private
             * 
             * @param {Array[String]} arr
             * @returns {String}
             */
            findNameByContextaul: function(arr) {
                var rs = {};

                var path = arr.join(SLASH);
                Object.forEachProperty(this.contextMapping_, function(mapping, id) {
                    var pattern = StringUtils.endsWith(mapping.pattern, CONTEXTAUL_NOTATION)
                            ? mapping.pattern
                            : mapping.pattern + CONTEXTAUL_NOTATION;

                    var tmpl = PathTemplateParser.parse(path, pattern);
                    if (!tmpl) {
                        return true; //continue
                    }

                    if (!rs.tmpl || rs.tmpl.format.length < tmpl.format.length) {
                        rs.id = id;
                        rs.tmpl = tmpl;
                        rs.mapping = mapping;
                        rs.name = this.toContextName(rs.tmpl, rs.mapping);
                    }
                }, this);

                if (rs.id) {
                    this.context_ = this.buildContext(
                            rs.id,
                            rs.name,
                            rs.mapping,
                            rs.tmpl
                            );
                }

                return rs.name;
            },
            /**/
            detect: function(index, arr, callback) {
                var called = false;

                var path = arr.join(SLASH);
                Object.forEachProperty(this.contextMapping_, function(mapping, id) {
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
                    called = true;

                    return false;
                }, this);

                if (!called) {
                    var name = this.findNameByContextaul(arr);
                    if (!name) {
                        arr = arr.slice(0, this.getStartIndex() + this.DEFAULT_SLICE_SIZE_);
                        name = pathOnly(arr.join(SLASH));

                        var tmpl = {stringArray: [name], string: SLASH + name};
                        this.context_ = this.buildContext(
                                name,
                                name,
                                {},
                                tmpl
                                );
                    }

                    var foceReload = index === this.getStartIndex()
                            || name !== this.lastContextName_;

                    if (foceReload) {
                        callback && callback(this.context_);
                    }

                    this.lastContextName_ = name;
                }
            }
        };
    })());



    return ContextMapping;
});