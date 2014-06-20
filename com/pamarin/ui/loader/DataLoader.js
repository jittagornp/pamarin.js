/** 
 * for load json data from web server
 * @author  jittagorn pitakmetagoon 
 * create  22/03/2013
 * 
 * update  07/06/2013 (jittagorn pitakmetagoon : add to AMD)
 * update  07/06/2013 (jittagorn pitakmetagoon : add Filter)
 */
define('com.pamarin.ui.loader.DataLoader', [
    'module',
    'com.jquery.core.JQuery', 
    'com.pamarin.core.util.Urls', 
    'com.pamarin.core.config.Configs', 
    'com.pamarin.core.filter.Filter',
    'com.pamarin.core.logging.LoggerFactory'
], function(module, $, Urls, Configs, Filter, LoggerFactory) {
    var _SERVICE_URL = Configs.HOST + Configs.PREFIX_SERVICE + '/data';
    var _log = LoggerFactory.getLogger(module.id);

    var DataLoader = (function() {

        function load(path, callback) {
            path = Urls.filterPath(path);
            var url_ = _SERVICE_URL + path;

            Filter.addFilter(module.id, 'beforeRequest', {
                url: url_
            });

            $.ajax({
                url: url_,
                //dataType: 'javascript',
                cache: false,
                //
                success: function(response) {
                    callback(response);

                    Filter.addFilter(module.id, 'afterRequest', {
                        url: url_,
                        status: 'SUCCESS',
                        response: response
                    });
                }
            });
        }

        return {
            load: function(path, callback) {
                return new load(path, callback || function() {

                });
            }
        };
    })();


    return DataLoader;
});