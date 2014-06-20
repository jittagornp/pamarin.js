/**
 * @author jittagorn pitakmetagoon
 * create 07/06/2014
 */
define('com.pamarin.data.domain.PageImpl', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.data.domain.Chunk',
    'com.pamarin.data.domain.Page'
], function(module, Class, Chunk, Page) {

    /**
     * @class PageImpl
     * @extends Chunk
     * @implements Page
     */
    var PageImpl = Class.define(module.id, {
        /**/
        variable: {
            total_: 0
        },
        /**/
        constructor: function(content, pageable, total) {
            if (arguments.length < 3) {
                pageable = null;
                total = content ? content.size() : 0;
            }

            this.__super__.constructor.call(this, content, pageable);
            this.total_ = total;
        },
        /**
         * @returns {Number}
         */
        getTotalPages: function() {
            return this.getSize() === 0 ? 1 : parseInt(Math.ceil(this.total_ / this.getSize()));
        },
        /**
         * @returns {Number}
         */
        getTotalElements: function() {
            return this.total_;
        },
        /**
         * @returns {Boolean} 
         */
        hasNext: function() {
            return this.getNumber() + 1 < this.getTotalPages();
        }
    }).extends(Chunk).implements(Page);


    return PageImpl;
});