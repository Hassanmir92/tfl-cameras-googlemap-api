$(function(){
  var map, infowindow, latlngObject;
  function addInfoWindowForCamera(marker, camera){
    // this handles the creating and displaying the infowindow 
    // If an infowindow is already open , it closes it before opening a new one
    google.maps.event.addListener(marker, "click", function(){
      if(infowindow){
        infowindow.close();
      } 
      infowindow = new google.maps.InfoWindow({
        content: "<img src='http://www.tfl.gov.uk/tfl/livetravelnews/trafficcams/cctv/"+camera.file+"'><p>"+camera.location+"("+camera.postcode+")</p>", 
        position: latlngObject
      })
      map.panTo(marker.getPosition());
      infowindow.open(map, marker);
    })

  }

  function createMarkerForCamera(camera){
    // here we define a marker object and add it to the map 
    // then we attach an info window to the marker 
    latlngObject = new google.maps.LatLng(camera["lat"], camera["lng"])
    var marker = new google.maps.Marker({
      position: latlngObject
    });
    marker.setMap(map)

    addInfoWindowForCamera(marker, camera);
  }


  function mapCameras(cameras){
    // this method goes through each object in the array returned by the server and delegates the creation of the marker to another method... 
    $.each(cameras, function(i, item){
      createMarkerForCamera(item)
    })
  }

  function initialize(){
    // This method creates the map and do an ajax call to get the cameras data
    var mapOptions = {
      zoom: 11,
      center: new google.maps.LatLng(51.52, -0.115)
    };
    map = new google.maps.Map($('#map-canvas')[0], mapOptions);

    var cameras;

    $.ajax({
      type: "GET",
      url: "http://localhost:3000/cameras.json",
      dataType: 'json'
    }).done(function(data){
      mapCameras(data);
    })
  }

  
  initialize()
});