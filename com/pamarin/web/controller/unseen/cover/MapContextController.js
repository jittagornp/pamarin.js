/**
 * @author jittagorn pitakmetagoon
 * create 06/06/2014
 */
define('com.pamarin.web.controller.unseen.cover.MapContextController', [
    'module',
    'com.pamarin.web.controller.unseen.UnseenController',
    'com.pamarin.core.logging.LoggerFactory',
    'com.jquery.core.JQuery',
    'com.pamarin.web.controller.unseen.cover.GoogleMap',
    'com.pamarin.core.util.Delays'
], function(module, UnseenController, LoggerFactory, $, GoogleMap, Delays) {

    /**
     * @class MapContextController
     * @controller
     */
    var MapContextController = UnseenController.define(module.id, (function() {
        
        var LOG = LoggerFactory.getLogger(module.id);

        var INITIAL_MAP_METHOD_ = 'gooleMapInitial';
        var MAP_ELEMENT_ID_ = 'pmrGoogleMapCover';
        var googleMap = null;

        window[INITIAL_MAP_METHOD_] = function() {
            googleMap = new GoogleMap(MAP_ELEMENT_ID_);
        };

        var firstTimeOfPage = true;
        var centerChanged = true;
        var zoomChanged = true;

        return {
            /**/
            variable: {
                UNSEEN_COVER_SELECTOR_: '#pmrUnseenCover',
                MAP_COVER_SELECTOR_: '#' + MAP_ELEMENT_ID_,
                MAP_STORE_SELECTOR_: '#pmrMapStore',
                GOOGLE_MAP_DEFAULT_ZOOM_LEVEL_ : 10
            },
            /**/
            constructor: function() {
                this.setUpMap();

                GoogleMap.load(INITIAL_MAP_METHOD_);

                this.mapStoreListener();
                this.mapEventListener();
            },
            /**/
            mapEventListener: function() {
                Delays.run(function() {
                    googleMap.addEventListener('center_changed', function() {
                        centerChanged = true;
                    });

                    googleMap.addEventListener('zoom_changed', function() {
                        zoomChanged = true;
                    });
                }, 500);
            },
            /**/
            mapStoreListener: function() {
                var that = this;
                that.getUnseenContext()
                        .getPageContext()
                        .addContextChangeListener(function() { //one times only
                            that.cleanMap();
                            that.backupMap2Store();
                        });
            },
            /**/
            setUpMap: function() {
                var html = '<div id="' + this.MAP_COVER_SELECTOR_.replace('#', '') + '"></div>';
                $(html).appendTo(this.UNSEEN_COVER_SELECTOR_);
            },
            /**/
            start: function() {
                this.drawMap(this.restoreMap());
            },
            /**/
            drawMapMaker: function() {
                var unseen = this.getCurrentUnseen();
                var gps = unseen.getGps();
                var markerTitle = unseen.getUnseenName();

                if (centerChanged) {
                    googleMap.setGps(gps);
                    centerChanged = false;
                }

                if (zoomChanged) {
                    googleMap.setZoomLevel(this.GOOGLE_MAP_DEFAULT_ZOOM_LEVEL_);
                    zoomChanged = false;
                }

                if (firstTimeOfPage) {
                    googleMap.addMarker(gps, markerTitle);
                    firstTimeOfPage = false;
                }
            },
            /**/
            drawMap: function() {
                if (googleMap !== null) {
                    Delays.run(this.drawMapMaker, 50, this);
                    return;
                }

                var that = this;
                var interval = setInterval(function() {
                    if (googleMap !== null) {
                        clearInterval(interval);
                        that.drawMapMaker();
                    }
                }, 100);
            },
            /**/
            stop: function() {

            },
            /**/
            cleanMap: function() {
                googleMap && googleMap.clearMarkers();

                firstTimeOfPage = true;
                centerChanged = true;
                zoomChanged = true;
            },
            /**/
            backupMap2Store: function() {
                $(this.UNSEEN_COVER_SELECTOR_)
                        .find(this.MAP_COVER_SELECTOR_)
                        .appendTo(this.MAP_STORE_SELECTOR_);
            },
            /**/
            restoreMap: function() {
                var $backupMap = $(this.MAP_STORE_SELECTOR_)
                        .find(this.MAP_COVER_SELECTOR_);

                if ($backupMap.length) {
                    $backupMap.appendTo(this.UNSEEN_COVER_SELECTOR_);
                }
            }
        };
    })());



    return MapContextController;
});