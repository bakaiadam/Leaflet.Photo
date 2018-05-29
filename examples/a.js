	    //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
    function calcCrow(lat1, lon1, lat2, lon2) 
    {
      var R = 6371; // km
      var dLat = toRad(lat2-lat1);
      var dLon = toRad(lon2-lon1);
      var lat1 = toRad(lat1);
      var lat2 = toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d;
    }

    // Converts numeric degrees to radians
    function toRad(Value) 
    {
        return Value * Math.PI / 180;
    }
	
	
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
            lat=photo.lat;
            lng=photo.lng;
                        items2=[photo.url]
            for (index = 0; index < photos.length; ++index) {
            if (photo.url==photos[index].url) continue;
    dist=calcCrow(lat,lng,photos[index].lat,photos[index].lng);
    if (dist<1)
      items2.push(photos[index].url)
    
}

            $.SimpleLightbox.open({
    items: items2
});
/*
	    evt.layer.bindPopup(L.Util.template(template, photo), {
	        className: 'leaflet-popup-photo',
	        minWidth: "auto"
	    }).openPopup();
	    */
	}
	
	
	);


	photoLayer.add(photos).addTo(map);
	map.fitBounds(photoLayer.getBounds());
