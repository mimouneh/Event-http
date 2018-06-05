 

// Array of location objects
var attractionsData = [
    {
        "name": "djurparken- Helsingborg", 
        "address": "Rausvägen 671, 253 51 Påarp", 
        "url": " http://www.djurparken-hbg.se/", 
        "latLng": { 
            "lat": 56.036857,
            "lng": 12.791489
             
        }
    },
    {
        "name": "Coder dojo, Mindpark co-working,", 
        "address": "Bredgatan 11, 252 25 Helsingborg",
        "url": "https://mindpark.se/", 
        "latLng": { 
            "lat":  56.038352,
            "lng": 12.698627
        }
         
    },
    {
        "name": "Helsingborgs stadsteater", 
        "address": "Helsingborgs stadsteater, Karl Johans gata 1, 252 67 Helsingborg", 
        "url": "http://helsingborgsstadsteater.se/", 
        "latLng": { 
            "lat": 56.050994,
            "lng": 12.687884
            
        }
    },
    {
        "name": "Helsingborgs stadsbibliotek", 
        "address": "Bollbrogatan 1, 252 25 Helsingborg", 
        "url": "https://www.bibliotekfh.se/startsida-barn-och-unga?refId=JTsW3G&culture=sv", 
        "latLng": { 
            "lat":  56.042483,
            "lng": 12.699077
           
        }
    },
    {
        "name": "Sofiero Slottsrestaurang", 
        "address": "Sofierovägen 131, 252 84 Helsingborg", 
        "url": "https://sofiero.se/", 
        "latLng": { 
            "lat":  56.084051,
            "lng":  12.659719
             
        }
    },
    {
        "name": "dunkerskulturhus Helsingborg", 
        "address": "Kungsgatan 11, 252 21 Helsingborg", 
        "url": "https://dunkerskulturhus.se/", 
        "latLng": { 
            "lat": 56.047863,
            "lng": 12.688844
             
        }
    },
    {
       "name": "Mattecentrum i Helsingborg", 
        "address": "Studievägen 4, 252 47 Helsingborg", 
        "url": "https://www.mattecentrum.se/", 
        "latLng": { 
            "lat": 56.046651,
            "lng": 12.712125
            
        }
    },
    {
        "name": "busfabriken i helsingborg", 
        "address": "Garnisonsgatan 47, 254 66 Helsingborg", 
        "url": "http://busfabriken.se/?city=helsingborg", 
        "latLng": { 
            "lat": 56.082851,
            "lng": 12.728009
             
        }
    },
    {
        "name": "Filmstaden, Helsingborg", 
        "address": "Filmstaden, Södergatan 19, 252 25 Helsingborg", 
        "url": "https://www.sf.se/", 
        "latLng": { 
            "lat": 56.040461,
            "lng": 12.702578
             
        }
    },
    {
        "name": "Helsingborgs Symfoniorkester & Konserthus AB", 
        "address": "Roskildegatan 1, 252 21 Helsingborg", 
        "url": "http://www.helsingborgskonserthus.se/", 
        "latLng": { 
            "lat": 56.051021,
            "lng": 12.689147
             
        }
    }
];

// Add weather information. Get live data from the link below that uses JSON
var weather = "http://api.wunderground.com/api/8b2bf4a9a6f86794/conditions/q/NY/Helsingborg.json";

var temp, iconURL, icon_;


// Display the data by appending <p> DOM elements with them included
$.getJSON(weather, function(data) {

    // Notice that we added already the necessary DOM elements to append upon, i.e. <div class="forecast">
    detail = data.current_observation;
    // Subtract information from the page

    temp =  detail.temp_c;
    iconURL = detail.icon_url;
    icon_ = detail.icon;

    // Handle errors, i.e. in case of information cannot be loaded
}).error(function(e){
    $(".forecast").append('<p style="text-align: center;">Sorry! Weather Underground</p><p style="text-align: center;">Could Not Be Loaded</p>');
}).success(function(){
    viewModel.weather1('Temp: ' + temp + '° c');
    viewModel.weather2('<img style="width: 25px" src="' + iconURL + '">  ' + icon_);
});


// Global map variable. It's global cause we need to use it inside other functions below and we need it to be accesible
var map, infowindow;
var markers = [];
var wikiLink = [];


// Function that initializes the map
// Inspiration: https://developers.google.com/maps/documentation/javascript/
function initMap() {

    // Notice that we have a DOM element of id="map", thus we select it below via getElementById("");
    map = new google.maps.Map(document.getElementById('map'), {

        // Set zoom at 12 to include all the markers in the default map view. If you want it more zoomed, increase the number
        zoom: 12,

        // Original center of map
        center: {lat: 56.038352, lng: 12.698627},
        

        // "hybrid" map type looks cool and "dark" which makes it spooky. If you dislike it, you can replace it with "roadmap" or something.
        // See more types here: https://developers.google.com/maps/documentation/javascript/maptypes
        mapTypeId: 'hybrid'
    });

    // Instantiate infoWindow(). From now on, the variable infowindow should be used as InfoWindow() holder
    infowindow = new google.maps.InfoWindow();  

    // Iterate in the locations array to populate the map. Instead we can use locations.forEach(function(elem){...}); to improve efficiency
    // but a for loop will do for our purposes
    for (var i = 0; i < attractionsData.length; i++) {  

        // Populate the map with markers. "marker" will be updated each time for the particular location of lat: locations[i][4] and lng: locations[i][5]
        marker = new google.maps.Marker({
            position: {lat: attractionsData[i].latLng.lat, lng: attractionsData[i].latLng.lng},

            // Let the marker be placed on our map instance as set above
            map: map,

            // these two below provide an animation for the marker: it jumps when clicked
            draggable: true,
            animation: google.maps.Animation.DROP

        });     

        viewModel.attractions()[i].marker = marker;

        // Make markers interactive: once the event of "click" happens, do the following
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function () {    
                marker.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(function () {
                    marker.setAnimation(null);
                }, 2000);

                // Pop out the info window with particular content
                // The content will be the location's address with street view and a web link
                // Thus we are using Google Map's street view URL and we update the location in each step as per the marker
                infowindow.setContent('<div id="content">' + "<p><b>" + attractionsData[i].name + "</b></p>" + '<div id="bodyContent">'+
                                       "<p><b>Address: </b>" + attractionsData[i].address + "</p>" + '<p><b>Website: </b><a href="' 
                                       + attractionsData[i].url + '">' + attractionsData[i].name + '</a>' + '</p>' + '</div>' 
            /* Wiki API call */        +  viewModel.attractions()[i].wikiLink
                                       + '<img src="https://maps.googleapis.com/maps/api/streetview?size=150x150&location='+ attractionsData[i].latLng.lat + ',' 
                                       +  attractionsData[i].latLng.lng 
                                       + '&heading=200&pitch=0&key=AIzaSyBGpbBD1bxQdNbNB3ckPFfK1s-prjJH0tM">' + '</div>');
                
                // Now actually pop out the info window
                infowindow.open(map, marker);

                // Add more features here
                                
        }})(marker, i)); // End of task    
    }

   
    // The code below is inspired by Google Maps API: https://developers.google.com/maps/documentation/javascript/examples/places-searchbox
    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        
        

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
        
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });

        map.fitBounds(bounds);
    });
}


// Using Knockout below with html data-bind so that we can add the header's title and subtitle dynamically, and also the suggestion list
// Our view model's data are: 'title', 'subtitle', and places. We can add more if we want in the same manners

var Attraction = function(data) {
    this.name = data.name;
    this.address = data.address;
    this.url = data.url;
    this.lat = data.latLng.lat;
    this.lng = data.latLng.lng;
    this.wikiLink = data.wikiLink;
    this.filtered = ko.observable(true);
};

var viewModel = {
    title: ko.observable("<h2><b>KidZonia</b></h2>"),
    subtitle: ko.observable("<h3>Helsingborg stad underhållning platser för barn</h3>"),
    weather1: ko.observable(),
    weather2: ko.observable(),
    resetFunc: function() {
        map.setCenter({lat: 40.7484, lng: -73.9857});
    },
    query: ko.observable(''),
    filtered: ko.observable(true),
    list: function(place) {
        place.marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function () {
            place.marker.setAnimation(null);
        }, 2000);
        infowindow.setContent('<div id="content">' + "<p><b>" + place.name + "</b></p>" + '<div id="bodyContent">'+
                                       "<p><b>Address: </b>" + place.address + "</p>" + '<p><b>Website: </b><a href="' 
                                       + place.url + '">' + place.name + '</a>' + '</p>' + '</div>' 
                                       +  place.wikiLink
                                       + '<img src="https://maps.googleapis.com/maps/api/streetview?size=150x150&location='+ place.lat + ',' 
                                       +  place.lng 
                                       + '&heading=200&pitch=0&key=AIzaSyBGpbBD1bxQdNbNB3ckPFfK1s-prjJH0tM">' + '</div>');
        infowindow.open(map, place.marker);
    }
};


viewModel.attractions = ko.observableArray();


viewModel.makeAttractions = function() {
    var self = this;
    attractionsData.forEach(function(elem){
        self.attractions.push(new Attraction(elem));
    });
};


// Once the user starts searching
viewModel.search = function(value){

    // Hide markers and locations when user starts typing
    viewModel.attractions().forEach(function(elem){
        elem.marker.setVisible(false);
        elem.filtered(false);
    });

    // Check the input and populate the attractions observable array with the matching input
    for (var x in viewModel.attractions()){
        if (viewModel.attractions()[x].name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
            // Display markers and locations if in search
            viewModel.attractions()[x].filtered(true);
            viewModel.attractions()[x].marker.setVisible(true);

        } else {
            // Hide markers and locations if are not in the search
            viewModel.attractions()[x].filtered(false);
            viewModel.attractions()[x].marker.setVisible(false);
        }
    }
};

viewModel.query.subscribe(viewModel.search);

viewModel.getWikiData = function() {

    this.attractions().forEach(function(attraction){
        $.ajax({
            url: 'http://en.wikipedia.org/w/api.php',
            data: { action: 'query', list: 'search', srsearch: attraction.name, format: 'json' },
            dataType: 'jsonp'
        }).done(function(data){
            var name = attraction.name.replace(" ", "_");
            attraction.wikiLink = '<p>Wiki Title: '+ data.query.search[0].title + '</p>';
        }).fail(function(){
            console.log("ajax request to Wiki API failed!");
            alert("ajax request to Wiki API failed!");
        }); 
    });
};

viewModel.makeAttractions();

viewModel.getWikiData();

ko.applyBindings(viewModel);
