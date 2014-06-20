/**
 * @author  jittagorn pitakmetagoon
 * create  13/04/2013
 * 
 * update  13/04/2013 (jittagorn pitakmetagoon)
 * update  14/09/2013 (jittagorn pitakmetagoon : add to AMD)
 */
define('com.pamarin.core.util.Agents', [
    //
], function() {

    var Agents = (function(window) {
        var userAgent = window.navigator.userAgent.toLowerCase();

        var match = /(chrome)[ \/]([\w.]+)/.exec(userAgent) ||
                /(webkit)[ \/]([\w.]+)/.exec(userAgent) ||
                /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(userAgent) ||
                /(msie) ([\w.]+)/.exec(userAgent) ||
                userAgent.indexOf('compatible') < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(userAgent) || [];

        var platformMatch = /(ipad)/.exec(userAgent) ||
                /(iphone)/.exec(userAgent) ||
                /(android)/.exec(userAgent) || [];

        var name = match[1] || '';
        var version = match[2] || '';
        var platform = platformMatch[0] || '';
        var engine = '';

        if (name === 'chrome') {
            engine = 'webkit';
        } else if (name === 'webkit') {
            name = 'safari';
            engine = 'webkit';
        } else if (name === 'mozilla') {
            name = 'firefox';
            engine = 'mozilla';
        } else if (name === 'msie') {
            engine = 'trident';
        }

        var isChrome = (name === 'chrome');
        var isFirefox = (name === 'firefox');
        var isMSIE = (name === 'msie');
        var isSafari = (name === 'safari');
        var isWebkit = (engine === 'webkit');
        var isTrident = (engine === 'trident');
        var isMozilla = (engine === 'mozilla');

        return{
            getName: function() {
                return name;
            },
            getVersion: function() {
                return version;
            },
            getPlatform: function() {
                return platform;
            },
            getEngine: function() {
                return engine;
            },
            isChrome: function() {
                return isChrome;
            },
            isFirefox: function() {
                return isFirefox;
            },
            isMSIE: function() {
                return isMSIE;
            },
            isSafari: function() {
                return isSafari;
            },
            isWebkit: function() {
                return isWebkit;
            },
            isTrident: function() {
                return isTrident;
            },
            isMozilla: function() {
                return isMozilla;
            }
        };
    })(window);

    return Agents;
});

