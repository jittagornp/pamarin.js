/**
 * @author jittagorn pitakmetagoon
 * create 23/02/2014
 */
define('com.pamarin.core.util.Router', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.lang.Array',
    'com.pamarin.core.context.ApplicationContext',
    'com.pamarin.core.util.Assert',
    'com.pamarin.core.util.Types',
    'com.pamarin.core.util.StringUtils',
    'com.pamarin.core.util.collection.ArrayList',
    'com.jquery.core.JQuery',
    'com.pamarin.core.util.PathTemplateParser'
], function(module, Class, Array, ApplicationContext, Assert, Types, StringUtils, ArrayList, $, PathTemplateParser) {

    /**
     * @class Router
     */
    var Router = Class.define(module.id, (function(window) {

        var applicationContext = ApplicationContext.getInstance();
        var contextParameters = applicationContext.getParameter('contextParameters');
        var host = contextParameters.host + contextParameters.contextPath;
        var defaultPage = contextParameters.defaultPage;

        var hostLength = host.length;
        var pushState = Types.isFunction(window.history.pushState);
        var PREFIX_HASH = '#!/';
        var SLASH = '/';
        var HASH = '#';
        var PREFIX_HASH_LENGTH = PREFIX_HASH.length;

        var $window = $(window);
        var $document = $(document);
        var callbacks = new ArrayList();
        var oldPath = getFullPathArray();
        var maxLevel = -1;
        var startTime = (new Date()).getTime();
        var RELOAD_MINUTE = 5;

        $window.bind('popstate', function() {
            pushState && listener();
        });

        //Old browser <= IE9
        window.onhashchange = function() {
            !pushState && listener();
        };

        function reloadPage() {
            var endTime = (new Date()).getTime();
            if ((endTime - startTime) > 1000 * 60 * RELOAD_MINUTE) {
                return true;
            }

            return false;
        }

        function onRouteAt(caller, index, newPath, oldPath) {
            if (caller.level === index) {
                return onRoute(caller, index, newPath, oldPath, {});
            }

            return true;
        }

        function onRouteWith(caller, index, newPath, oldPath) {
            var templ = PathTemplateParser.parse(newPath.join('/'), caller.format);
            if (templ) {
                return onRoute(caller, index, newPath, oldPath, templ.param);
            }

            return true;
        }

        function onRoute(caller, index, newPath, oldPath, param) {
            return caller.callback({
                index: index,
                befores: oldPath || [],
                afters: newPath || [],
                parameter: param || {}
            });
        }

        function removeCallbacks(level) {
            var itr = callbacks.iterator();
            while (itr.hasNext()) {
                var caller = itr.next();
                if (level <= caller.removeAt) {
                    itr.remove();
                }
            }
        }

//        function removeEvents(start, end) {
//            for (var i = start; i < end; i++) {
//                var clazz = 'evb' + '-' + i;
//                var event = '.' + clazz;
//
//                $(event).off(event).removeClass(clazz);
//                $window.off(event);
//                $document.off(event);
//            }
//        }

        function listener() {
            var newPath = getFullPathArray();
            var length = (newPath.length > oldPath.length) ? newPath.length : oldPath.length;

            for (var index = 0; index < length; index++) {
                if (oldPath[index] === newPath[index]) {
                    continue;
                }

                if (index === 0 && reloadPage()) {
                    window.location.reload(true);
                    return;
                }

                callbacks.forEachEntry(function(caller) {
                    var method = Types.isNumber(caller.level) && Types.isUndefined(caller.format) ? onRouteAt :
                            Types.isString(caller.format) ? onRouteWith :
                            Types.isUndefined(caller.level) && Types.isUndefined(caller.format) ? onRoute :
                            undefined;

                    if (method) {
                        return method(caller, index, newPath, oldPath);
                    }

                    return true;
                });

                removeCallbacks(index);
                //removeEvents(index, length);
                oldPath = newPath;
                break;
            }
        }

        function getFullPathArray() {
            var paths = StringUtils.split(getPath(), SLASH);
            if (paths.length === 0) {
                var path = defaultPage;
                if (defaultPage[0] === SLASH) {
                    path = defaultPage.substr(1);
                }

                paths = [path];
            }

            return paths;
        }

        function getPath(link) {
            link = link || window.location.href;

            var url = link.substr(hostLength);
            var indexOf = url.indexOf(HASH);

            if (pushState) {
                url = indexOf !== -1 ? url.substr(0, indexOf) : url;
            } else {
                url = url.substr(indexOf + PREFIX_HASH_LENGTH);
            }

            return StringUtils.startsWith(url, SLASH) ? url : [SLASH, url].join('');
        }

        return {
            //
            static: {
                /**
                 * @param {Number} loadMinute
                 * 
                 * @returns {Router}
                 */
                setReloadMinute: function(loadMinute) {
                    Assert.assertNumber(loadMinute, module.id + '.setReloadMinute(Number loadMinute).');

                    RELOAD_MINUTE = loadMinute;
                    return Router;
                },
                /**
                 * @param {Boolean} pshState
                 * 
                 * @returns {Router}
                 */
                setPushState: function(pshState) {
                    Assert.assertBoolean(pshState, module.id + '.setPushState(Boolean pshState).');

                    pushState = pshState;
                    return Router;
                },
                /**
                 * @param {String} hst
                 * 
                 * @returns {Router}
                 */
                setHost: function(hst) {
                    Assert.assertString(hst, module.id + '.setHost(String hst).');

                    host = hst;
                    hostLength = host.length;
                    return Router;
                },
                /**
                 * @param {String} page
                 * 
                 * @returns {Router}
                 */
                setDefaultPage: function(page) {
                    Assert.assertString(page, module.id + '.setDefaultPage(String page).');

                    defaultPage = page;
                    return Router;
                },
                /**
                 * example >>
                 * -------------------------------------------------------------
                 * Router.onReoute(functoin(data){
                 * 
                 * });
                 * -------------------------------------------------------------
                 * 
                 * @param {Function} callback
                 * @param {Number} removeAt_opt - optional
                 * 
                 * @returns {Router}
                 */
                onRoute: function(callback, removeAt_opt) {
                    Assert.assert({
                        Function: callback,
                        NumberOptional: removeAt_opt
                    }, module.id + '.onRoute(Function callback, Number removeAt_opt).');

                    callbacks.add({
                        level: undefined,
                        format: undefined,
                        callback: callback,
                        reportAt: Types.isUndefined(removeAt_opt) ? -1 : removeAt_opt
                    });

                    return Router;
                },
                /**
                 * example >>
                 * -------------------------------------------------------------
                 * Router.onRouteAt(1, functoin(data){
                 * 
                 * });
                 * -------------------------------------------------------------
                 * 
                 * @param {Number} level
                 * @param {Function} callback
                 * @param {Number} removeAt_opt - optional
                 * 
                 * @returns {Router}
                 */
                onRouteAt: function(level, callback, removeAt_opt) {
                    Assert.assert({
                        Number: level,
                        Function: callback,
                        NumberOptional: removeAt_opt
                    }, module.id + '.onRouteAt(Number level, Function callback, Number removeAt_opt).');

                    callbacks.add({
                        level: level,
                        format: undefined,
                        callback: callback,
                        removeAt: Types.isUndefined(removeAt_opt) ? level : removeAt_opt
                    });

                    if (maxLevel < level) {
                        maxLevel = level;
                    }

                    return Router;
                },
                /**
                 * example >>
                 * -------------------------------------------------------------
                 * Router.onRouteWith('/{username}/photo/album/{photoId}', function(data){
                 *     console.log(data.parameter);
                 * });
                 * -------------------------------------------------------------
                 * 
                 * @param {String} routeFormat
                 * @param {Function} callback
                 * @param {Number} removeAt_opt - optional
                 * 
                 * @returns {Router}
                 */
                onRouteWith: function(routeFormat, callback, removeAt_opt) {
                    Assert.assert({
                        String: routeFormat,
                        Function: callback,
                        NumberOptional: removeAt_opt
                    }, module.id + '.onRouteWith(String routeFormat, Function callback, Number removeAt_opt).');

                    callbacks.add({
                        level: undefined,
                        format: routeFormat,
                        callback: callback,
                        removeAt: Types.isUndefined(removeAt_opt) ? -1 : removeAt_opt
                    });

                    return Router;
                },
                /**
                 * example >>
                 * -------------------------------------------------------------
                 * Router.routeTo('/+jittagornp/aboute/');
                 * -------------------------------------------------------------
                 * 
                 * @param {String} path
                 * 
                 * @returns {Router}
                 */
                routeTo: function(path) {
                    Assert.assertString(path, module.id + '.routeTo(String path).');
                    if (StringUtils.startsWith(path, host)) {
                        path = getPath(path);
                    }

                    path = StringUtils.startsWith(path, SLASH) ? path : '/' + path;
                    if (pushState) {
                        window.history.pushState(null, null, host + path);
                        $window.trigger("popstate");
                    } else {
                        window.location.hash = PREFIX_HASH + path;
                    }

                    return Router;
                }
            }
        };
    })(window));



    return Router;
});