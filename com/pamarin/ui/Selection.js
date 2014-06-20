/**
 * @author jittagorn pitakmetagoon
 * create 06/10/2013
 */
define('com.pamarin.ui.Selection', [
    'module',
    'com.jquery.core.JQuery',
    'com.pamarin.core.util.Types',
    'com.pamarin.core.exception.IllegalArgumentException',
    'com.pamarin.core.lang.Class',
    'com.pamarin.ui.UI',
    'com.pamarin.core.structural.Proxy'
], function(module, $, Types, IllegalArgumentException, Class, UI, Proxy) {

    /**
     * @class Selection
     */
    var Selection = Class.define(module.id, {
        //
        variable : {
            callbackChange_ : null
        },
        //
        constructor: function(element) {
            Selection.superConstructor.call(this, element);
        },
        //        
        onSelectChange: function(callback) {
            if (!Types.isFunction(callback)) {
                throw new IllegalArgumentException('Invalid input type parameters,' + module.id + '.onSelectChange(Function callback)');
            }

            this.callbackChange_ = callback;
            return this;
        },
        //

        get: function() {
            //lazy load chosen
            require(['com.jquery.chosen.JQueryChosen'], Proxy.call(this, function() {
                this.$element_.chosen({
                    disable_search_threshold: 10
                }).change(function() {
                    this.callbackChange_($(this).val());
                });
            }));

            return this.$element_;
        }
    }).extends(UI);



    return {
        selectOnElement: function(element) {
            return new Selection(element);
        }
    };
});