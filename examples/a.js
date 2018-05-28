	var map = L.map('map', {
	    maxZoom: 14
	});
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	    maxZoom: 18,
	    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
	        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
	        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	    id: 'mapbox.streets'
	}).addTo(map);


	var photoLayer = L.photo.cluster().on('click', function(evt) {
	    var photo = evt.layer.photo,
	        template = '<img src="{url}" /></a><p>{caption}</p>';
            console.log(photo);

	    evt.layer.bindPopup(L.Util.template(template, photo), {
	        className: 'leaflet-popup-photo',
	        minWidth: "auto"
	    }).openPopup();
	});


	photoLayer.add(photos).addTo(map);
	map.fitBounds(photoLayer.getBounds());
