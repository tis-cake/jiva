ymaps.ready(init);

function init() {
  var map = new ymaps.Map('map', {
    center: [55.719270, 37.625007],
    zoom: 11,
    controls: [],
    behaviors: ['drag', 'dblClickZoom']
  });

  var iconParam = {
    iconLayout: 'default#image',
    iconImageHref: 'img/marker-maps.png',
    iconImageSize: [40, 45]
  }


  myPlacemark = new ymaps.Placemark([55.715270, 37.355007], {
      balloonContent: 'Рехаб 1'
  }, iconParam );

  myPlacemark2 = new ymaps.Placemark([55.719270, 37.625007], {
      balloonContent: 'Рехаб 2'
  }, iconParam );

  myPlacemark3 = new ymaps.Placemark([55.759270, 37.625007], {
      balloonContent: 'Рехаб 3'
  }, iconParam );


  map.geoObjects.add(myPlacemark);
  map.geoObjects.add(myPlacemark2);
  map.geoObjects.add(myPlacemark3);
}
