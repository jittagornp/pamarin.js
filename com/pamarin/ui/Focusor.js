/**
 * @author jittagorn pitakmetagoon
 * create 20/10/2013
 */
define('com.pamarin.ui.Focusor', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.jquery.core.JQuery',
    'com.pamarin.ui.UI',
    'com.pamarin.core.util.Types',
    'com.pamarin.core.util.UUIDGenerator',
    'com.pamarin.core.util.Assert'
], function(module, Class, $, UI, Types, UUIDGenerator, Assert) {



    /**
     * global document for binding onBlur event handler
     */
    var $document = $(document);



    /**
     * for check that an element is not focusing
     * 
     * @param {jQueryElement} $element
     * @returns {Boolean}
     */
    function isNotFocusing($element) {
        return $element.length === 0 || !$element.hasClass('pmr-focusing');
    }



    /**
     * remove active focusing and remove an even handler itself
     * @param {jQueryElement} $element 
     */
    function blurFocusing($element) {
        $element.removeClass('pmr-focusing-active').trigger({
            type: 'onBlur'
        }).off('onBlur');
    }



    /**
     * detect blur focusor element
     */
    $document.on('click', function(event) {
        var $focusingElement = $(event.target);
        if (isNotFocusing($focusingElement)) {
            $focusingElement = $focusingElement.parent('.pmr-focusing');
        }

        var clickUUID = $focusingElement.attr('data-uuid');

        var $focusors = $('.pmr-focusor.pmr-show');
        $focusors.each(function() {
            var $focusor = $(this);
            var focusorUUID = $focusor.attr('data-uuid');

            //it's not mouseenter
            if (!$focusor.hasClass('pmr-enter')) {
                var $focusings = $('.pmr-focusing');

                //it's not click on focusing element
                if (!$focusingElement.hasClass('pmr-focusing')) {
                    $focusor.removeClass('pmr-show');
                    blurFocusing($focusings);
                } else {
                    //click on fucusing element
                    if (focusorUUID !== clickUUID) {
                        $focusor.removeClass('pmr-show');
                    }

                    $focusings.each(function() {
                        var $focusing = $(this);
                        var focusingUUID = $focusing.attr('data-uuid');
                        if (focusingUUID !== clickUUID && focusorUUID !== focusingUUID) {
                            blurFocusing($focusing);
                        }
                    });
                }
            }
        });
    });




    /**
     * @class Focusor
     */
    var Focusor = Class.define(module.id, {
        //
        variable : {
          uuid_ : null,
          eventType_ : null,
          $focusingElement_ : null,
          onFocusCallback_ : null,
          onBlurCallback_ : null
        },
        //
        constructor: function(element) {
            Focusor.superConstructor.call(this, element);
            this.uuid_ = UUIDGenerator.generateUUID();
        },
        /**
         * focusing element for detect show focusor
         * 
         * @param {string | jqueryElement} element
         * @returns {Focusor}
         */
        whenClickElement: function(element) {
            this.eventType_ = 'click';
            this.$focusingElement_ = this.parseElement(element).addClass('pmr-focusing');

            return this;
        },
        /**
         * event hadler, should call when click on focusing element
         * 
         * @param {Function} callback
         * @returns {Focusor}
         */
        onFocus: function(callback) {
            Assert.assertFunction(callback, module.id + '.onFocus(Function callback).');

            this.onFocusCallback_ = callback;
            return this;
        },
        /**
         * event hadler, should call when focusor was blur
         * 
         * @param {Function} callback
         * @returns {Focusor}
         */
        onBlur: function(callback) {
            Assert.assertFunction(callback, module.id + '.onBlur(Function callback).');

            this.onBlurCallback_ = callback;
            return this;
        },
        /**
         * start focus (detect click element focusing)
         */
        focus: function() {
            var self = this;
            var element = self.$element_;

            if (Types.isUndefined(self.scope_)) {
                self.scope_ = '';
            }


            element.addClass('pmr-focusor').binding('mouseenter', self.scope_, function() {
                element.addClass('pmr-enter');
            }).binding('mouseleave', self.scope_, function() {
                element.removeClass('pmr-enter');
            }).attr('data-uuid', self.uuid_);



            self.$focusingElement_.each(function() {
                var $focusing = $(this);
                $focusing.binding(self.eventType_, self.scope_, function() {

                    //check toggle
                    if (!element.hasClass('pmr-show')) {
                        element.addClass('pmr-show');

                        //if define onFocusCallback
                        if (self.onFocusCallback_) {
                            self.onFocusCallback_($focusing, element);
                        }

                        //if define onBlurCallback
                        if (self.onBlurCallback_) {
                            $focusing.addClass('pmr-focusing-active').binding('onBlur', self.scope_, function() {
                                self.onBlurCallback_($focusing, element);
                            });
                        }
                    } else {
                        element.removeClass('pmr-show');
                        blurFocusing($focusing);
                    }
                }).attr('data-uuid', self.uuid_);
            });
        },
        //
        static: {
            /**
             * public static method which require focusor element
             * 
             * @param {string | jqueryElement} element
             * @returns {Focusor}
             */
            focusOnElement: function(element) {
                return new Focusor(element);
            }
        }
    }).extends(UI);





    /**
     * return class Focusor
     */
    return Focusor;
});