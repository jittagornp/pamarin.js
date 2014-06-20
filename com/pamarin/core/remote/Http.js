/**
 * @author jittagorn pitakmegaoon
 * create 12/05/2014
 */
define('com.pamarin.core.remote.Http', [
    'module',
    'com.pamarin.core.proxy.ProxyChain',
    'com.pamarin.core.util.Delays'
], function(module, ProxyChain, Delays) {

    /**
     * @class Http
     */
    var Http = ProxyChain.makeProxy(module.id, {
        /**/
        get: function(chain, url) {
            Delays.run(chain.done, 50, chain);

            return 500;
        },
        /**/
        post: function(chain, url) {
            Delays.run(chain.done, 50, chain);
        }
    });


    return Http;
});