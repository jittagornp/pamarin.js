/**
 * @author jittagorn pitakmetagoon
 * create 09/10/2013
 */
define('com.pamarin.ui.Typing', [
    'module',
    'com.pamarin.core.util.Types',
    'com.pamarin.core.lang.Class',
    'com.pamarin.ui.UI',
    'com.pamarin.core.structural.Proxy',
    'com.pamarin.core.util.Assert'
], function(module, Types, Class, UI, Proxy, Assert) {

    /**
     * @class Typing
     */
    var Typing = Class.define(module.id, {
        //
        variable: {
            delay_: null,
            callback_: null
        },
        //
        constant: {
            DELAY: 300
        },
        //
        constructor: function(element) {
            Typing.superConstructor.call(this, element);
            this.delay_ = Typing.constant('DELAY');
        },
        //
        withDelay: function(delay) {
            Assert.assertNumber(delay, module.id + '.withDelay(Number delay).');
            
            this.delay_ = delay;
            return this;
        },
        //
        onTyped: function(callback) {
            Assert.assertFunction(callback, module.id + '.onTyped(Function callback).');

            this.callback_ = callback;
            return this;
        },
        //
        get: function() {
            var timeoutReference;
            
            this.getElement().binding('keyup', this.getScope(), Proxy.call(this, function() {
                if (timeoutReference) {
                    window.clearTimeout(timeoutReference);
                }

                timeoutReference = setTimeout(function() {
                    window.clearTimeout(timeoutReference);
                    //...
                    if (Types.isFunction(this.callback_)) {
                        this.callback_(this.getElement().val(), this.getElement());
                    }
                    //...
                }, this.delay_);
            }));
        },
        //
        static: {
            //
            typedOnElement: function(element) {
                return new Typing(element);
            }
        }
    }).extends(UI);



    return Typing;
});