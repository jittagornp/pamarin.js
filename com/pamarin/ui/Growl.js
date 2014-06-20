/**
 * @author  jittagorn pitakmetagoon
 * create  07/05/2013
 * update  08/05/2013 (jittagorn pitakmetagoon : check require throw Error)
 * update  22/09/2013 (jittagorn pitakmetagoon : add to AMD)
 * update  16/01/2014 (jittagorn pitakmetagoon : use Class.js)
 */

define('com.pamarin.ui.Growl', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.jquery.core.JQuery',
    'com.pamarin.core.util.Assert'
], function(module, Class, $, Assert) {

    /**
     * @class Growl
     */
    var Growl = Class.define(module.id, {
        //
        variable: {
            title_: null,
            content_: null,
            sticky_: null,
            time_: null,
            styleClass_: null,
            image_: null
        },
        //
        constructor: function(title, content) {
            Assert.assertString(title, module.id + '.constructor(String title, String content).') &&
            Assert.assertString(title, module.id + '.constructor(String title, String content).');

            this.title_ = title;
            this.content_ = content;
        },
        //
        setImage: function(image) {
            Assert.assertString(image, module.id + '.setImage(String image).');

            this.image_ = image;
            return this;
        },
        //
        setSticky: function(sticky) {
            Assert.assertBoolean(sticky, module.id + '.setSticky(Boolean sticky).');

            this.sticky_ = sticky;
            return this;
        },
        //
        setTime: function(time) {
            Assert.assertNumber(time, module.id + '.setTime(Number time).');

            this.time_ = time;
            return this;
        },
        //
        setStyleClass: function(clazz) {
            Assert.assertString(clazz, module.id + '.setStyleClass(String clazz).');

            this.styleClass = clazz;
            return this;
        },
        //
        show: function() {
            var options_ = {
                title: this.title_ || 'pamarin notification',
                text: this.content_ || 'notification content',
                sticky: this.sticky_ || false,
                time: this.time_ || 5000,
                class_name: this.styleClass || 'pmr-growl',
                image: this.image_
            };

            require(['com.jquery.growl.JQueryGritter'], function() {
                $.gritter.add(options_);
            });
        },
        //
        static: {
            //
            requireTitleAndContent: function(title, content) {
                return new Growl(title, content);
            }
        }

    });





    return Growl;
});
