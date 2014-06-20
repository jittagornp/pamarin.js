/** 
 * @author  jittagorn pitakmetagoon 
 * create  12/04/2013
 * 
 * update  07/06/2013 (jittagorn pitakmetagoon : add to AMD)
 * update  08/03/2014 (jittagorn pitakmetagoon : remove unuse module)
 */
define('com.pamarin.core.util.Urls', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.lang.Array',
    'com.pamarin.core.logging.LoggerFactory',
    'com.pamarin.core.util.StringUtils',
    'com.pamarin.core.util.Assert',
    'com.pamarin.core.util.Types',
    'com.pamarin.core.context.ApplicationContext'
], function(module, Class, Array, LoggerFactory, StringUtils, Assert, Types, ApplicationContext) {

    /**
     * @class Urls
     */
    var Urls = Class.define(module.id, (function() {

        var applicationContext = ApplicationContext.getInstance();
        var contextParameters = applicationContext.getParameter('contextParameters');

        var LOG = LoggerFactory.getLogger(module.id);
        var slice = Array.prototype.slice;

        var DEFAULT_PAGE = contextParameters.defaultPage;
        var HOST = contextParameters.host + contextParameters.contextPath;
        var HOST_LENGTH = HOST.length;
        var SLASH = '/';
        var QUESTION_MARK = '?';
        var SEMICOLON = ';';


        function isEmpty(data) {
            return Types.isUndefined(data) || data.length === 0;
        }

        return {
            //
            static: {
                /**
                 * for get full path of URL browser by index position
                 * 
                 * example >>
                 * -------------------------------------------------------------------------
                 * url : https://pamarin.com/@pookradueng/photo/album/1269874564/
                 * 
                 * index == 0 --> /@pookradueng/photo/album/1269874564/
                 * index == 1 --> /photo/album/1269874564/
                 * index == 2 --> /album/1269874564/
                 * index == 3 --> /1269874564/
                 * -------------------------------------------------------------------------
                 * 
                 * @param {String} url_opt - optional
                 * @param {Number} index - path index (position) start with 0
                 * @param {String} default_opt - if not found, use this value
                 * 
                 * @returns {String} fullPath
                 */
                getFullPathIndex: function(url_opt, index, default_opt) {
                    var paths = Urls.getFullPathIndexArray(url_opt, index, default_opt);
                    var fullPath = SLASH + slice.call(paths, index).join(SLASH);
                    return fullPath === SLASH ? (SLASH + default_opt) : fullPath;
                },
                /**/
                getFullPathLastIndex: function(url_opt, index, default_opt) {
                    var paths = Urls.getFullPathIndexArray(url_opt, 0, default_opt);
                    var fullPath = SLASH + slice.call(paths, 0, index + 1).join(SLASH);
                    return fullPath === SLASH ? (SLASH + default_opt) : fullPath;
                },
                /**
                 * @param {String} url_opt
                 * @param {Number} index
                 * @param {String} default_opt
                 * 
                 * @returns {Array}
                 */
                getFullPathIndexArray: function(url_opt, index, default_opt) {
                    if (Types.isNumber(url_opt)) {
                        var temp = index;
                        index = url_opt;
                        default_opt = temp;
                        url_opt = undefined;
                    }

                    Assert.assert({
                        Number: index,
                        StringOptional: [url_opt, default_opt]
                    }, module.id + '.getFullPathIndex(String url_opt, Number index, String default_opt).');

                    return StringUtils.split(Urls.getPath(url_opt), SLASH).slice(index);
                },
                /*
                 * for get path index of browser url
                 * 
                 * example >>
                 * -------------------------------------------------------------------------
                 * url : https://pamarin.com/@pookradueng/photo/album/1269874564/
                 * path --> /@pookradueng/photo/album/1269874564/
                 * 
                 * index == 0 --> @pookradueng
                 * index == 1 --> photo
                 * index == 2 --> album
                 * index == 3 --> 1269874564
                 * -------------------------------------------------------------------------         
                 * 
                 * @param {String} url_opt - optional
                 * @param {Number} index - path index (position) start with 0
                 * @param {String} default_opt - if not found, use this value
                 * 
                 * @returns {String} path whitch match by index
                 */
                getPathIndex: function(url_opt, index, default_opt) {
                    if (Types.isNumber(url_opt)) {
                        var temp = index;
                        index = url_opt;
                        default_opt = temp;
                        url_opt = undefined;
                    }

                    Assert.assert({
                        Number: index,
                        StringOptional: [url_opt, default_opt]
                    }, module.id + '.getPathIndex(String url_opt, Number index, String default_opt).');

                    var paths = StringUtils.split(Urls.getPath(url_opt), SLASH);
                    return paths[index] || default_opt;
                },
                /**
                 * for get path of link or url, not include host name
                 * 
                 * example >>
                 * -------------------------------------------------------------------------
                 * url : https://pamarin.com/@pookradueng/post
                 * path --> /@pookradueng/post
                 *          
                 * url : https://pamarin.com#!/@pookradueng/post
                 * path --> /@pookradueng/post
                 * -------------------------------------------------------------------------          
                 *          
                 * @param {String} url_opt
                 * 
                 * @returns {String} path
                 */
                getPath: function(url_opt) {
                    Assert.assertStringOptional(url_opt, module.id + '.getPath(String url_opt).');

                    url_opt = url_opt || window.location.href;
                    var path = StringUtils.found(url_opt, HOST) ? url_opt.substr(HOST_LENGTH) : url_opt;
                    if (isEmpty(path) || path === SLASH) {
                        path = DEFAULT_PAGE;
                    }

                    path = Urls.removeQuerystring(path);
                    path = Urls.removeSessionId(path);

                    return StringUtils.startsWith(path, SLASH) ? path : (SLASH + path);
                },
                /**/
                getPathArray : function(url_opt){
                    return StringUtils.split(Urls.getPath(url_opt), SLASH);
                },
                /**
                 * @param {String} txt
                 * 
                 * @returns {Boolean} path
                 */
                contains: function(txt) {
                    Assert.assertString(txt, module.id + '.contains(String txt).');
                    
                    return window.location.href.indexOf(txt) !== -1;
                },
                /**
                 * @param {String} url
                 * @returns {String}
                 */
                removeSessionId: function(url) {
                    Assert.assertString(url, module.id + '.removeSessionId(String url).');

                    var indexOf = url.indexOf(SEMICOLON);
                    return indexOf === -1 ? url : url.substr(0, indexOf);
                },
                /**
                 * @param {String} url
                 * @returns {String}
                 */
                removeQuerystring: function(url) {
                    Assert.assertString(url, module.id + '.removeQuerystring(String url).');

                    var indexOf = url.indexOf(QUESTION_MARK);
                    return indexOf === -1 ? url : url.substr(0, indexOf);
                }
            }
        };
    })());



    return Urls;
});