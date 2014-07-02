/**
 * @author jittagorn pitakmetagoon
 * create 16/06/2014
 */
define('com.pamarin.core.page.PageContextQuerystring', [
    'module',
    'com.pamarin.core.lang.Object',
    'com.pamarin.core.lang.Array',
    'com.pamarin.core.lang.Class'
], function(module, Object, Array, Class) {

    /** 
     * @class PageContextQuerystring
     */
    var PageContextQuerystring = Class.define(module.id, (function() {

        function toVal(str, deft) {
            return str === '?' ? '' : deft;
        }

        function build(qstring, arr, param) {
            var concat = function(key, value) {
                if(qstring.indexOf(key + '=' + value) !== -1){
                    return;
                }
                
                qstring = qstring + toVal(qstring, '&') + key + '=' + value;
            };

            Array.forEachIndex(arr, function(tmpl) {
                //one element
                Object.forEachProperty(tmpl, function(tmplVal, tmplKey) {
                    var ex = /{(.*?)}/ig.exec(tmplVal);
                    if (ex) {
                        Object.forEachProperty(param, function(paramVal, paramKey) {
                            ex[1] === paramKey && concat(tmplKey, paramVal);
                        });
                        return;
                    }

                    concat(tmplKey, tmplVal);
                });
            });

            return toVal(qstring, qstring);
        }

        return {
            /**/
            static: {
                /**
                 * 
                 * @param {Array[String]} template
                 * @param {Object} paramObj
                 * @returns {String}
                 */
                buildFromTemplateAndParam: function(template, paramObj) {
                    var querystring = location.search;
                    if (!querystring) {
                        querystring = '?';
                    }

                    return build(querystring, template, paramObj);
                }
            }
        };
    })());



    return PageContextQuerystring;
});