/**
 * @author jittagorn pitakmetagoon
 * create 12/06/2014
 */
define('com.pamarin.core.util.PathTemplateParser', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.lang.Array',
    'com.pamarin.core.util.StringUtils',
    'com.pamarin.core.util.Types',
    'com.pamarin.core.util.Urls'
], function(module, Class, Array, StringUtils, Types, Urls) {

    /**
     * @class PathTemplateParser
     * 
     * example
     * -------------------------------------------------------------------------
     * var obj = PathTemplateParser.parse('/+jittagornp/@pookradueng/photo', '/{userId^=+}/{unseenId^=@}/*');
     * 
     * obj.param = {
     *      userId : '+jittagornp',
     *      unseenId : '@pookradueng'
     * };
     */
    var PathTemplateParser = Class.define(module.id, (function() {

        var SLASH = '/';
        var UNIVERSAL = '*';
        var STARTS_WITH = '^=';
        var ENDS_WITH = '$=';
        var CONTAINS_WITH = '*=';
        var EQUALS_WITH = '=';

        return {
            /**/
            static: {
                /** 
                 * @param {String} tmpl
                 * @param {String} value
                 * @returns {String | null}
                 */
                findParam: function(tmpl, value) {

                    var indexStartWith = tmpl.indexOf(STARTS_WITH);
                    if (indexStartWith !== -1) {
                        return StringUtils.startsWith(value, tmpl.substr(indexStartWith + STARTS_WITH.length))
                                ? tmpl.substr(0, indexStartWith)
                                : null;
                    }

                    var indexEndWith = tmpl.indexOf(ENDS_WITH);
                    if (indexEndWith !== -1) {
                        return StringUtils.endsWith(value, tmpl.substr(indexEndWith + ENDS_WITH.length))
                                ? tmpl.substr(0, indexEndWith)
                                : null;
                    }

                    var indexContainsWith = tmpl.indexOf(CONTAINS_WITH);
                    if (indexContainsWith !== -1) {
                        return StringUtils.found(value, tmpl.substr(indexContainsWith + CONTAINS_WITH.length))
                                ? tmpl.substr(0, indexContainsWith)
                                : null;
                    }

                    var indexEqualsWith = tmpl.indexOf(EQUALS_WITH);
                    if (indexEqualsWith !== -1) {
                        return tmpl.substr(indexEqualsWith + EQUALS_WITH.length) === value
                                ? tmpl.substr(0, indexEqualsWith)
                                : null;
                    }

                    return tmpl;
                },
                /** 
                 * @param {String} str
                 * @returns {Array[String]}
                 */
                splitSlash: function(str) {
                    var arr = str.split(SLASH);
                    arr = Array.remove(arr, '');
                    if (arr[0] === SLASH) {
                        arr.shift();
                    }

                    return arr;
                },
                /** 
                 * @param {String} str
                 * @returns {Array[String]}
                 */
                getTemplateFormat: function(format) {
                    var str = format.replace(/\{(.+?)\}/g, function(match) {
                        return SLASH + match + SLASH;
                    });

                    return PathTemplateParser.splitSlash(str);
                },
                /**
                 * @param {String} str
                 * @param {String} format
                 * @returns {Object || null} 
                 */
                parse: function(str, format) {
                    var path = PathTemplateParser.splitSlash(str);
                    var template = PathTemplateParser.getTemplateFormat(format);

                    var formatSize;
                    var last = template.pop();
                    var isContextual = last === (UNIVERSAL + UNIVERSAL); //**
                    if (isContextual) {
                        if (template.length > path.length) {
                            return null;
                        }

                        //path = path.slice(0, template.length);
                        formatSize = template.length;
                        template.push(last);
                    } else {
                        template.push(last);
                        if (template.length !== path.length) {
                            return null;
                        }

                        formatSize = last === UNIVERSAL ? template.length - 1 : template.length;
                    }

                    var obj = {
                        string: str,
                        stringArray: path,
                        format: format,
                        formatArray: template,
                        param: {},
                        formatSize: formatSize
                    };

                    var length = path.length;
                    var foundUniversal = false;
                    for (var i = 0; i < length; i++) {
                        if (foundUniversal) {
                            break;
                        }

                        var value = template[i];
                        if (Types.isUndefined(value)) {
                            return null;
                        }

                        var templ = /^\{(.+?)\}$/g.exec(value);
                        if (!templ) {
                            var indexOf = value.indexOf(UNIVERSAL);
                            if (indexOf !== -1) {
                                var patialVal = value.substr(0, indexOf);
                                var patialPath = path[i].substr(0, indexOf);
                                if (patialVal !== patialPath) {
                                    return null;
                                }

                                foundUniversal = true;
                            } else if (value !== path[i]) {
                                return null;
                            }

                            continue;
                        }

                        var param = PathTemplateParser.findParam(templ[1], path[i]);
                        if (!param) {
                            return null;
                        }

                        obj.param[param] = Urls.getPath(path[i]).replace(SLASH, '');
                    }

                    return obj;
                }
            }
        };
    })());

    return PathTemplateParser;
});
