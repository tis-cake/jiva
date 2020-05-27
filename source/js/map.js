ymaps.ready(init);

function init() {
  var map = new ymaps.Map('map', {
    center: [55.715270, 37.355007],
    zoom: 11,
    controls: [],
    behaviors: ['drag', 'dblClickZoom']
  });

  // дефолтный маркер
  var myPlacemark = new ymaps.Placemark([55.715270, 37.355007], {}, {
    preset: 'islands#redIcon'
  });

  map.geoObjects.add(myPlacemark);
}
