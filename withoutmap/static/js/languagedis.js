// Team 16 -  Atlanta

// Student number: 548771 | Student name: Hao DUAN  | Surname: Duan
// Student number: 616805 | Student name: Meng LI     | Surname: Li
// Student number: 650382 | Student name: Ming YU   | Surname: Chang
// Student number: 629341 | Student name: Yu SUN      | Surname: Sun
// Student number: 705077 | Student name: Yuxiang ZHOU  | Surname: Zhou
// Student number: 656982 | Student name: Zhenya LI | Surname: Li


var geoXml = null;
var geoXmlDoc = null;
var map = null;
var myLatLng = null;
var myGeoXml3Zoom = true;
var infowindow = null;
var filename = "http://arc.garc.opendata.arcgis.com/datasets/ad5209eef1e1460c9e39d4b0a8829c0a_65.kml";
var cdata={};  
var edata={};
      
    function initialize() {

      //get opt from couchdb
       getJSON('http://115.146.93.74:5984/tweet_db/_design/map/_view/languagedis?group_level=1').then(function(data){
        dealdata4select(data);
        }, function(status) { //error detection....
        alert('Something went wrong.');
      });

       //get lang details
       getJSON('http://115.146.93.74:5984/tweet_db/_design/map/_view/languagedis?group_level=2').then(function(data){
        storedata(data);
        }, function(status) { //error detection....
        alert('Something went wrong.');
      });

       getJSON('http://115.146.93.74:5984/tweet_db/_design/language/_view/languageemotion?group_level=1').then(function(data){
        emotiondata(data);
        }, function(status) { //error detection....
        alert('Something went wrong.');
      });

      // Map style
      var styles = [
    {
      stylers: [
        { hue: "#00ffe6" },
        { saturation: -20 }
      ]
    },{
      featureType: "road",
      elementType: "geometry",
      stylers: [
        { lightness: 100 },
        { visibility: "simplified" }
      ]
    },{
      featureType: "road",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    }
  ];

      var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"}); 

      myLatLng = new google.maps.LatLng(33.76666666666667,-84.41666666666667);
      
                var myOptions = {
                    center: myLatLng,
                    zoom: 12,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    mapTypeControlOptions: {mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']}
                };
                map = new google.maps.Map(document.getElementById("map_canvas"),
                      myOptions);
                map.mapTypes.set('map_style', styledMap);
                map.setMapTypeId('map_style');
                //infowindow = new google.maps.InfoWindow({});

   geoXml = new geoXML3.parser({
                    map: map,
                    //infoWindow: infowindow,
                    singleInfoWindow: true,
                    suppressInfoWindows: true,
                    zoom: myGeoXml3Zoom,
                    afterParse: useTheData
                });
                geoXml.parse(filename);

                //select for lang
                var select = document.getElementById('selectlang');
                select.onchange = function(){
                  showlang(select.value);
                };

    };



var highlightOptions = {fillColor: "#A52A2A", strokeColor: "#000000", fillOpacity: 0.8, strokeWidth: 10};
var highlightLineOptions = {strokeColor: "#FFFF00", strokeWidth: 10};
function kmlHighlightPoly(pm) {
   for (var i=0;i<geoXmlDoc.placemarks.length;i++) {
     var placemark = geoXmlDoc.placemarks[i];
     if (i == pm) {
       if (placemark.polygon) placemark.polygon.setOptions(highlightOptions);
       if (placemark.polyline) placemark.polyline.setOptions(highlightLineOptions);
     } else {
       if (placemark.polygon) placemark.polygon.setOptions(placemark.polygon.normalStyle);
       if (placemark.polyline) placemark.polyline.setOptions(placemark.polyline.normalStyle);
     }
   }
}


function highlightPoly(poly, polynum) {
/*  
  google.maps.event.addListener(poly,"mouseover",function(event) {
    if (poly instanceof google.maps.Polygon) {
      poly.setOptions(highlightOptions);
    } else if (poly instanceof google.maps.Polyline) {
      poly.setOptions(highlightLineOptions);
    };
        
  });
  google.maps.event.addListener(poly,"mouseout",function() {
    poly.setOptions(poly.normalStyle);
  });
*/
}

function useTheData(doc){
  var currentBounds = map.getBounds();
  if (!currentBounds) currentBounds=new google.maps.LatLngBounds();

  geoXmlDoc = doc[0];
  for (var i = 0; i < geoXmlDoc.placemarks.length; i++) {

    var placemark = geoXmlDoc.placemarks[i];
    if (placemark.polygon) {

      var normalStyle = {
          strokeColor: placemark.polygon.get('strokeColor'),
          strokeWeight: placemark.polygon.get('strokeWeight'),
          strokeOpacity: placemark.polygon.get('strokeOpacity'),
          fillColor: placemark.polygon.get('fillColor'),
          fillOpacity: placemark.polygon.get('fillOpacity')
          };
      placemark.polygon.normalStyle = normalStyle;

      highlightPoly(placemark.polygon, i);
    }

  }

};
            

   function hide_kml(){

            geoXml.hideDocument();  

   }

   function unhide_kml(){

            geoXml.showDocument();  

   }

   function hide_markers_kml(){
     for (var i=0;i<geoXmlDoc.markers.length;i++) {
       geoXmlDoc.markers[i].setVisible(false);
     }
   }

   function unhide_markers_kml(){
     for (var i=0;i<geoXmlDoc.markers.length;i++) {
       geoXmlDoc.markers[i].setVisible(true);
     }
   }
   function hide_polys_kml(){
     for (var i=0;i<geoXmlDoc.gpolylines.length;i++) {
       geoXmlDoc.gpolylines[i].setMap(null);
     }
   }

   function unhide_polys_kml(){
     for (var i=0;i<geoXmlDoc.gpolylines.length;i++) {
       geoXmlDoc.gpolylines[i].setMap(map);
     }
   }

   //for show lang in districts
   function showlang(optvalue){
    var i=0;
    var dis_arr=[];
    var j=0;
    //CLEAR HIGHLIGHTPOLY
    kmlHighlightPoly(99);
    for(i in cdata.rows){
      var langkey=cdata.rows[i].key[0];
      if(langkey==optvalue){
        dis_arr[j]=cdata.rows[i].key[1];
        j=j+1;
      }
    }
    //console.log(dis_arr);
    //alert("This is language: "+optvalue+". The show districts are "+dis_arr)
    makepiechart(optvalue);
    highlightDistrict4select(dis_arr);
   }

   function highlightDistrict4select(dis_val){
    var pm;
    for(var j=0;j<dis_val.length;j++){
      pm=dis_val[j]-1;
      var placemark = geoXmlDoc.placemarks[pm];
      if (placemark.polygon) placemark.polygon.setOptions(highlightOptions);
      if (placemark.polyline) placemark.polyline.setOptions(highlightLineOptions);
    }    
   }

<!-- CODE FOR DEAL COUCHDB DATA-->
function dealdata4select(data){
  var i=0;
  var sel=document.getElementById('selectlang');
  for(i in data.rows){
    var opt = document.createElement('option');  
    opt.appendChild(document.createTextNode(data.rows[i].key));  
    opt.setAttribute("value",data.rows[i].key);
    //opt.style.fontSize ="25px";  
    sel.appendChild(opt);
  }
}

function storedata(data){
  cdata=data;
}

function emotiondata(data){
  edata=data;
}

function makepiechart(optvalue){

  var myChart = echarts.init(document.getElementById('echart4emotion')); 
  var opt_value=optvalue;
              var datasets=[];
              var i=0;
              //alert("!!!");
              for(i in edata.rows){
                if(opt_value==edata.rows[i].key[0]){
                  //alert(edata.rows[i].value.op);
                 // datasets=[{name:edata.rows[i].value[0],value:edata.rows[i].value[0]},{name:edata.rows[i].value[1],value:edata.rows[i].value[1]},{name:edata.rows[i].value[2],value:edata.rows[i].value[2]}]
                  datasets.push({name:'Happly',value:edata.rows[i].value.op});
                  datasets.push({name:'Peace',value:edata.rows[i].value.nu});
                  datasets.push({name:'Unhappy',value:edata.rows[i].value.ne});
                }
              };
              console.log(datasets);
              
            

  var option = {
    title : {
        text: 'Analyze emotion for each language',
        subtext: '',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient : 'vertical',
        x : 'left',
        data:['Happy','Peace','Unhappy']
    },
    
    calculable : true,
    series : [
        {
            name:'Emotion',
            type:'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data: datasets
        }
    ]
};
         myChart.setOption(option);         
}
