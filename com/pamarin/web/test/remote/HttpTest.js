/**
 * @author jittagorn pitakmetagoon
 * create 11/05/2014
 */
define('com.pamarin.web.test.remote.HttpTest', [
    'module',
    'com.pamarin.core.logging.LoggerFactory',
    'com.pamarin.core.remote.Http'
], function(module, LoggerFactory, Http){
    
    var LOG = LoggerFactory.getLogger(module.id);
    
    var http = new Http();
    http.get('http://www.pamarin.com/service/userService').then(function(response){
        LOG.debug('http response --> {}', response);
    });
    
});