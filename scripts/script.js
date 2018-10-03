function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 53.900007, lng: 27.553389000000016},
		zoom: 10
	});

	map.addListener('click', function(e) {
		addWeather(e.latLng, map, e);
  	});
}

function addWeather (latLng, map, e) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "https://api.openweathermap.org/data/2.5/weather?lat=" + e.latLng.lat() + "&lon=" + e.latLng.lng() + "&appid=a94d0a5ac08570add4b47b8da933f247", true);
	xhr.onload = function () {
		var result = JSON.parse(xhr.response);
		var tmp = Math.round(result.main.temp - 273);
		var cloudIcon = 'http://openweathermap.org/img/w/' + result.weather[0].icon + '.png';
		placeMarkerAndInfo(latLng, map, e, tmp, cloudIcon);
	}
	xhr.send();
}

function placeMarkerAndInfo(latLng, map, e, tmp, cloudIcon) {
	var marker = new google.maps.Marker({
		position: latLng,
		map: map,
		draggable: true,													
		animation: google.maps.Animation.DROP,                             
	});

	map.panTo(latLng); 														

	var contentString = ((tmp>0)?"+ ":"- ") + tmp + " °C" + '<img src="' + cloudIcon + '">';
	var infowindow = new google.maps.InfoWindow({
		content: contentString,
		position: {lat: e.latLng.lat(), lng: e.latLng.lng()},
	});

	marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
}
