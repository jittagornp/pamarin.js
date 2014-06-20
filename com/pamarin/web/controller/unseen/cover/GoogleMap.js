/**
 * @author jittagorn pitakmetagoon
 * create 09/06/2014
 */
define('com.pamarin.web.controller.unseen.cover.GoogleMap', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.lang.Array',
    'com.pamarin.api.model.Gps'
], function(module, Class, Array, Gps) {

    /**
     * @class GoogleMap
     */
    var GoogleMap = Class.define(module.id, {
        /**/
        constant: {
            GOOGLE_MAP_API_URL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&'
        },
        /**/
        static: {
            /**
             * @param {String} method
             */
            load: function(method) {
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = GoogleMap.constant('GOOGLE_MAP_API_URL') + 'callback=' + method;
                document.body.appendChild(script);
            }
        },
        /**/
        variable: {
            map_: null,
            mapElementId_: null,
            gps_: null,
            zoomLevel_: 10,
            markers_: null
        },
        /** 
         * @param {String} mapId
         */
        constructor: function(mapId) {
            this.mapElementId_ = mapId;
            this.map_ = new google.maps.Map(this.getMapElement(), this.getMapOptions());
            this.markers_ = new Array();
        },
        /**
         * @param {Number} level
         */
        setZoomLevel: function(level) {
            this.zoneLevel_ = level;
            this.map_.setZoom(level);
        },
        /**
         * @param {Gps} gps
         */
        setGps: function(gps) {
            this.gps_ = gps;
            this.map_.setCenter(this.gps2LatLng(gps));
        },
        /**/
        gps2LatLng: function(gps) {
            return new google.maps.LatLng(gps.getLatitude(), gps.getLongitude());
        },
        /**
         * @param {Gps} gps
         * @param {String} title
         */
        addMarker: function(gps, title) {
            var marker = new google.maps.Marker({
                position: this.gps2LatLng(gps),
                map: this.map_,
                animation: google.maps.Animation.DROP,
                title: title
            });

            this.markers_.push(marker);
        },
        /**/
        clearMarkers: function() {
            this.markers_.forEachIndex(function(marker) {
                marker.setMap(null);
            });

            this.markers_ = new Array();
        },
        /**
         * @param {Number} lat
         * @param {Number} lng 
         */
        setLatLng: function(lat, lng) {
            this.setGps(new Gps(lat, lng));
        },
        /**/
        getMap: function() {
            return this.map_;
        },
        /**/
        getMapElement: function() {
            return document.getElementById(this.mapElementId_);
        },
        /**
         * @returns {Object}
         */
        getMapOptions: function() {
            return {
                zoom: this.zoomLevel_,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                //mapTypeControlOptions: {
                //    mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
                //},
                zoomControl: true,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.SMALL,
                    position: google.maps.ControlPosition.LEFT_TOP
                },
                streetViewControl: true,
                streetViewControlOptions: {
                    position: google.maps.ControlPosition.LEFT_TOP
                },
                mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                    position: google.maps.ControlPosition.TOP_LEFT
                },
                panControl: false
            };
        },
        /**
         * @param {String} eventType
         * @param {Function} callback
         */
        addEventListener: function(eventType, callback) {
            google.maps.event.addListener(this.map_, eventType, callback);
        }
    });



    return GoogleMap;
});