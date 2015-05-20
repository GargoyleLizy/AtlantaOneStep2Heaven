// <!-- ************************ goodbar map *********************** -->
// Team 16 -  Atlanta

// Student number: 548771 | Student name: Hao DUAN  | Surname: Duan
// Student number: 616805 | Student name: Meng LI       | Surname: Li
// Student number: 650382 | Student name: Ming YU   | Surname: Chang
// Student number: 629341 | Student name: Yu SUN        | Surname: Sun
// Student number: 705077 | Student name: Yuxiang ZHOU  | Surname: Zhou
// Student number: 656982 | Student name: Zhenya LI | Surname: Li

function film(data){

var myChart = echarts.init(document.getElementById('filmstartl')); 
getJSON('http://115.146.93.74:5984/tweet_db/_design/film%20Topic/_view/film_vote?group_level=1').then(function (data){

var numberOfWatch = [0,0,0,0,0,0];
for(var i = 0;i<6;i++){
    if(i == data.rows.length) { break;}
    if(data.rows[i].key == 'madmax') {numberOfWatch[0] = data.rows[i].value;}
    if(data.rows[i].key == 'pitch') {numberOfWatch[1] = data.rows[i].value;}
    if(data.rows[i].key == 'hotpursuit') {numberOfWatch[2] = data.rows[i].value;}
    if(data.rows[i].key == 'avengers2') {numberOfWatch[3] = data.rows[i].value;}
    if(data.rows[i].key == 'adaline') {numberOfWatch[4] = data.rows[i].value;}
    if(data.rows[i].key == 'furious7') {numberOfWatch[5] = data.rows[i].value;}
}

                var piefilm =     {
    title : {
        text: 'The Percentage of Films Watched',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        x : 'center',
        y : 'bottom',
        data:['Mad Max','Pitch Perfect2','Hot Pursuit','Avengers:Age of Ultron','The age of Adaline','Furious 7']
    },

    calculable : true,
    series : [
        {
            name:'',
            type:'pie',
            radius : [30, 110],
            center : ['50%', 200],
            roseType : 'area',
            x: '50%',               // for funnel
            max: 40,                // for funnel
            sort : 'ascending',     // for funnel
            data:[
                {value:numberOfWatch[0], name:'Mad Max'},
                {value:numberOfWatch[1], name:'Pitch Perfect2'},
                {value:numberOfWatch[2], name:'Hot Pursuit'},
                {value:numberOfWatch[3], name:'Avengers:Age of Ultron'},
                {value:numberOfWatch[4], name:'The age of Adaline'},
                {value:numberOfWatch[5], name:'Furious 7'}
                ]
        }
    ]
};
                    
                  
        myChart.setOption(piefilm);
                }, function(status) { //error detection....
        alert('Something went wrong.');
      });

}

// <!-- ************************ goodbar end *********************** -->


// <!-- ************************ goodbar map *********************** -->
function filmpie(data){

var myChart = echarts.init(document.getElementById('filmpiep')); 
getJSON('http://115.146.93.74:5984/tweet_db/_design/film%20Topic/_view/avenger_view?group_level=1').then(function (data){

    var altitude = [0,0,0];
    for (var i = 0; i < data.rows.length;i++)
    {
        if (data.rows[i].key == 1) { altitude[0]=data.rows[i].value;}
        if (data.rows[i].key == 0) { altitude[1]=data.rows[i].value;}
        if (data.rows[i].key == -1) { altitude[2]=data.rows[i].value;}
    }

    var total = altitude[0]+altitude[1]+altitude[2];
    var happy = parseInt(100*altitude[0]/total);
    var normal = parseInt(100*altitude[1]/total);
    var unhappy = parseInt(100*altitude[2]/total);

var dataStyle = {
    normal: {
        label: {show:false},
        labelLine: {show:false}
    }
};
var placeHolderStyle = {
    normal : {
        color: 'rgba(0,0,0,0)',
        label: {show:false},
        labelLine: {show:false}
    },
    emphasis : {
        color: 'rgba(0,0,0,0)'
    }
};

    var piefilm =      {
    title: {
        text: 'Audience Altitude',
        subtext: 'To Avengers',
        x: 'center',
        y: 'center',
        itemGap: 20,
        textStyle : {
            color : 'rgba(30,144,255,0.8)',
            fontFamily : '微软雅黑',
            fontSize : 20,
            fontWeight : 'bolder'
        }
    },
    tooltip : {
        show: true,
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient : 'vertical',
        x : document.getElementById('main2').offsetWidth / 2,
        y : 45,
        itemGap:12,
        data:['Good Film','Nothing special','Awful']
    },
    series : [
        {
            name:'1',
            type:'pie',
            clockWise:false,
            radius : [125, 150],
            itemStyle : dataStyle,
            data:[
                {
                    value:happy,
                    name:happy.toString()+'% people feel good'
                },
                {
                    value:32,
                    name:'invisible',
                    itemStyle : placeHolderStyle
                }
            ]
        },
        {
            name:'2',
            type:'pie',
            clockWise:false,
            radius : [100, 125],
            itemStyle : dataStyle,
            data:[
                {
                    value:normal,
                    name:normal.toString()+'% people no feel '
                },
                {
                    value:71,
                    name:'invisible',
                    itemStyle : placeHolderStyle
                }
            ]
        },
        {
            name:'3',
            type:'pie',
            clockWise:false,
            radius : [75, 100],
            itemStyle : dataStyle,
            data:[
                {
                    value:unhappy,
                    name:unhappy.toString()+'% people think suck'
                },
                {
                    value:97,
                    name:'invisible',
                    itemStyle : placeHolderStyle
                }
            ]
        }
    ]
};
                    
                  
        myChart.setOption(piefilm);
                }, function(status) { //error detection....
        alert('Something went wrong.');
      });

}

// <!-- ************************ goodbar end *********************** -->




// <!-- ************************ goodbar map *********************** -->
function filmbar(data){

var myChart = echarts.init(document.getElementById('filmbarp')); 
getJSON('http://115.146.93.74:5984/tweet_db/_design/film%20Topic/_view/hero_vote?group_level=1').then(function (data){

    var hero_vote = [0,0,0,0,0,0];

    for(var i = 0;i<6;i++){
    if(i == data.rows.length) { break;}
    if(data.rows[i].key == 'ironman') {hero_vote[0] = data.rows[i].value;}
    if(data.rows[i].key == 'thor') {hero_vote[1] = data.rows[i].value;}
    if(data.rows[i].key == 'hulk') {hero_vote[2] = data.rows[i].value;}
    if(data.rows[i].key == 'captain') {hero_vote[3] = data.rows[i].value;}
    if(data.rows[i].key == 'blackwidow') {hero_vote[4] = data.rows[i].value;}
    if(data.rows[i].key == 'hawkeye') {hero_vote[5] = data.rows[i].value;}
}


    var filmbard =      {
    title : {
        text: 'Favourite Hero',
        subtext: 'From Avengers2'
    },
    tooltip : {
        trigger: 'axis'
    },

    calculable : true,
    xAxis : [
        {
            type : 'value',
            boundaryGap : [0, 0.01]
        }
    ],
    yAxis : [
        {
            type : 'category',
            data : ['Iron Man','Thor','Hulk','Captain America','Black Widow','Hawkeye']
        }
    ],
    series : [
        {
            name:'Fans Count',
            type:'bar',
            data:[hero_vote[0], hero_vote[1], hero_vote[2], hero_vote[3], hero_vote[4], hero_vote[5]]
        }
    ]
};
                    
                    
                  
        myChart.setOption(filmbard);
                }, function(status) { //error detection....
        alert('Something went wrong.');
      });

}

// <!-- ************************ goodbar end *********************** -->