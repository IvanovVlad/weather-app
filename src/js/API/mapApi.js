export function renderMap(latitude, longitude) {
    function initMap(latitude, longitude) {
        if (typeof window.myMap !== 'undefined') {
            window.myMap.setCenter([latitude, longitude], 10);
        } 
        else {
            window.myMap = new ymaps.Map("map", {
                center: [latitude, longitude],
                zoom: 10,
                controls: []
            });
            myMap.behaviors.disable('drag');
            myMap.behaviors.disable('scrollZoom');
            myMap.behaviors.disable('DblClickZoom');
        }
    }
    ymaps.ready(function () {
        initMap(latitude, longitude);
    });
}