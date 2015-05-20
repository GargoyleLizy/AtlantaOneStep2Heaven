// Team 16 -  Atlanta

// Student number: 548771 | Student name: Hao DUAN  | Surname: Duan
// Student number: 616805 | Student name: Meng LI     | Surname: Li
// Student number: 650382 | Student name: Ming YU   | Surname: Chang
// Student number: 629341 | Student name: Yu SUN      | Surname: Sun
// Student number: 705077 | Student name: Yuxiang ZHOU  | Surname: Zhou
// Student number: 656982 | Student name: Zhenya LI | Surname: Li


var map, pointarray, heatmap;


var taxiData = [];
var infowindow=null;

function initialize() {

  //http://115.146.93.74:5984/tweet_db/_design/map/_view/dailygeo?group_level=2

  var mapOptions = {
    zoom: 13,
    center: new google.maps.LatLng(33.76666666666667,-84.41666666666667),
    mapTypeId: google.maps.MapTypeId.SATELLITE
  };

  map = new google.maps.Map(document.getElementById('map_canvas'),
      mapOptions);

  var pointArray = new google.maps.MVCArray(taxiData);

  heatmap = new google.maps.visualization.HeatmapLayer({
    data: pointArray
  });

  heatmap.setMap(map);
}

function toggleHeatmap() {
  //taxiData=[];
  var sd=document.getElementById('sd').value;

  var sd_arr=sd.split("-");

  var ed=document.getElementById('ed').value;

  var ed_arr=ed.split("-");

  if(sd_arr[2]>ed_arr[2]){
    alert("The startdate is beyonding the enddate, this could result in invaild data!");

  }else{
  //http://115.146.93.74:5984/tweet_db/_design/map/_view/dailygeo?group_level=2
  //taxiData=[];
  var contentstring="Data is processing..."
    infowindow = new google.maps.InfoWindow({content:contentstring, position: new google.maps.LatLng(33.76666666666667,-84.41666666666667)});
    infowindow.open(map);
  getJSON('http://115.146.93.74:5984/tweet_db/_design/map/_view/dailygeo?group_level=3&startkey=[[%22'+sd_arr[2]+'%22,%22May%22],[]]&endkey=[[%22'+ed_arr[2]+'%22,%22May%22],[]]').then(function(data){
        dealdata(data);
        }, function(status) { //error detection....
        alert('Something went wrong.');
      }); 
  }
}

function changeOpacity() {
 // heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
 heatmap.setMap(heatmap.getMap() ? null : map);
}

google.maps.event.addDomListener(window, 'load', initialize);

<!-- CODE FOR DEAL COUCHDB DATA-->
function dealdata(data){
  //== set json data to global

  var i=0;
  for(i in data.rows){    
    taxiData[i]=new google.maps.LatLng(data.rows[i].key[1],data.rows[i].key[2]);
  }

 heatmap.setMap(map);
 infowindow.close();
}