/** 
 * @author  jittagorn pitakmetagoon 
 * create  10/06/2013
 */
define('com.pamarin.ui.Rolling', [
    'module',
    'com.jquery.core.JQuery',
    'com.pamarin.core.util.Types',
    'com.pamarin.core.lang.Class',
    'com.pamarin.ui.UI',
    'com.pamarin.core.exception.RequireException',
    'com.pamarin.core.context.IntervalContext',
    'com.pamarin.core.structural.Proxy'
], function(module, $, Types, Class, UI, RequireException, IntervalContext, Proxy) {

    /**
     * @class Rolling
     */
    var Rolling = Class.define(module.id, {
        //
        variable: {
            rollingSpeed_: 10000,
            speedAnimationTime_: 4,
            roll_: true
        },
        //
        constructor: function(element) {
            Rolling.superConstructor.call(this, element);
        },
        //        
        start: function() {
            if (Types.isUndefined(this.scope_)) {
                throw new RequireException('Require data ' + module.id + '.withScope(Number scope)');
            }

            this.$element_.binding('mouseenter', this.scope_, Proxy.call(this, function() {
                this.roll_ = false;
            }));

            this.$element_.binding('mouseleave', this.scope_, Proxy.call(this, function() {
                this.roll_ = true;
            }));

            var intervalReference = setInterval(Proxy.call(this, function() {
                if (!this.roll_) {
                    return;
                }

                var $allItem = this.$element_.find('li.pmr-rolling-item');
                var $firstItem = this.$element_.find('li.pmr-rolling-item:first');
                var $lastItem = this.$element_.find('li.pmr-rolling-item:last');

                var lastItemHeight = $lastItem.height();
                var animateComplete = function() {
                    $lastItem.hide();
                    $lastItem.insertBefore($firstItem);
                    $lastItem.fadeIn('slow');
                    $allItem.css({
                        'top': 0
                    });
                };

                $allItem.animate({
                    top: lastItemHeight + 10//margin
                }, lastItemHeight * this.speedAnimationTime_, animateComplete);
            }), this.rollingSpeed_);

            IntervalContext.getInstance().addInterval(this.scope_, intervalReference);
        },
        //
        itemHover: function(callbackOver, callbackOut) {
            var mouseover = function() {
                if (callbackOver) {
                    callbackOver($(this));
                }
            };

            var mouseout = function() {
                if (callbackOut) {
                    callbackOut($(this));
                }
            };

            this.$element_.find('li.pmr-rolling-item')
                    .binding('mouseover', this.scope_, mouseover)
                    .binding('mouseout', this.scope_, mouseout);

            return this;
        }
    }).extends(UI);



    return {
        rollOnElement: function(element) {
            return new Rolling(element);
        }
    };
});
