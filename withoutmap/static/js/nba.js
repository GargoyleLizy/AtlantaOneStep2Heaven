// <!-- ************************ goodbar map *********************** -->
// Team 16 -  Atlanta

// Student number: 548771 | Student name: Hao DUAN  | Surname: Duan
// Student number: 616805 | Student name: Meng LI       | Surname: Li
// Student number: 650382 | Student name: Ming YU   | Surname: Chang
// Student number: 629341 | Student name: Yu SUN        | Surname: Sun
// Student number: 705077 | Student name: Yuxiang ZHOU  | Surname: Zhou
// Student number: 656982 | Student name: Zhenya LI | Surname: Li

function nbasum(){
var myChart = echarts.init(document.getElementById('nbasum1')); 

    getJSON('http://115.146.93.74:5984/tweet_db/_design/Sports/_view/NBA?group_level=2').then( function (data) {
     var   sum1 = data.rows[0].value  +data.rows[1].value +data.rows[2].value;
     var   sum2  = data.rows[3].value +data.rows[4].value +data.rows[5].value;
     var   sum3  = data.rows[6].value +data.rows[7].value +data.rows[8].value;
     var   sum4  = data.rows[9].value +data.rows[10].value+data.rows[11].value;
     var   sum5  = data.rows[12].value+data.rows[13].value+data.rows[14].value;   
     var   sum6  = data.rows[15].value+data.rows[16].value+data.rows[17].value;      
    var unhappy1 = data.rows[0].value /sum1;
    var unhappy2 = data.rows[3].value /sum2;
    var unhappy3 = data.rows[6].value /sum3;
    var unhappy4 = data.rows[9].value /sum4;
    var unhappy5 = data.rows[12].value/sum5;
    var unhappy6 = data.rows[15].value/sum6;

    var peace1 = data.rows[1].value /sum1;
    var peace2 = data.rows[4].value /sum2;
    var peace3 = data.rows[7].value /sum3;
    var peace4 = data.rows[10].value /sum4;
    var peace5 = data.rows[13].value/sum5;
    var peace6 = data.rows[16].value/sum6;

    var happy1 = data.rows[2].value /sum1;
    var happy2 = data.rows[5].value /sum2;
    var happy3 = data.rows[8].value /sum3;
    var happy4 = data.rows[11].value /sum4;
    var happy5 = data.rows[14].value/sum5;
    var happy6 = data.rows[17].value/sum6;


                var nbabar = {
    title : {
        text: 'City Emotion'
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['happy','peace','unhappy']
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            data : ["04 May\nLose",
                    "06 May\nWin",
                    "10 May\nLose",
                    "12 May\nWin",
                    "14 May\nWin",
                    "16 May\nWin"]
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'happy',
            type:'bar',
            data:[happy1,
                  happy2,
                  happy3,
                  happy4,
                  happy5,
                  happy6],

            markLine : {
                data : [
                    {type : 'average', name: '平均值'}
                ]
            }
        },
        {
            name:'peace',
            type:'bar',
            data:[peace1,
                  peace2,
                  peace3,
                  peace4,
                  peace5,
                  peace6],

            markLine : {
                data : [
                    {type : 'average', name : 'average'}
                ]
            }
        },
        {
            name:'unhappy',
            type:'bar',
            data:[unhappy1,
                  unhappy2,
                  unhappy3,
                  unhappy4,
                  unhappy5,
                  unhappy6],

            markLine : {
                data : [
                    {type : 'average', name : 'average'}
                ]
            }
        }
    ]
};
        myChart.setOption(nbabar);
    },function(status){
            alert('Something wrong');
        });

}

// <!-- ************************ goodbar end *********************** -->




// <!-- ************************ pie happy unhappy peace percentage *********************** -->
function nbapie6(){
var myChart = echarts.init(document.getElementById('nbapiechart')); 

    getJSON('http://115.146.93.74:5984/tweet_db/_design/Sports/_view/NBA?group_level=3').then( function (data) {
var labelTop = {
    normal : {
        label : {
            show : true,
            position : 'center',
            formatter : '{b}',
            textStyle: {
                baseline : 'bottom'
            }
        },
        labelLine : {
            show : false
        }
    }
};
var labelFromatter = {
    normal : {
        label : {
            formatter : function (params){
                return 100 - params.value + '%'
            },
            textStyle: {
                baseline : 'top'
            }
        }
    },
}
var labelBottom = {
    normal : {
        color: '#ccc',
        label : {
            show : true,
            position : 'center'
        },
        labelLine : {
            show : false
        }
    },
    emphasis: {
        color: 'rgba(0,0,0,0)'
    }
};
var radius = [40, 55];
    var sum = new Array();
    sum[0]=0;
    sum[1]=0;
    sum[2]=0;
    sum[3]=0;
    sum[4]=0;
    sum[5]=0;   

    var unhappy1 = 0;
    var unhappy2 = 0;
    var unhappy3 = 0;
    var unhappy4 = 0;
    var unhappy5 = 0;
    var unhappy6 = 0;

    var peace1 = 0;
    var peace2 = 0;
    var peace3 = 0;
    var peace4 = 0;
    var peace5 = 0;
    var peace6 = 0;

    var happy1 = 0;
    var happy2 = 0;
    var happy3 = 0;
    var happy4 = 0;
    var happy5 = 0;
    var happy6 = 0;



    var test1  = data.rows[0].key;
    for (var i=0; i<data.rows.length; i++)
    {
        if(data.rows[i].key[2] === "YES" )
        {
            if(data.rows[i].key[0]==="04 May")
            {
                sum[0]= sum[0]+data.rows[i].value;
            }
            if(data.rows[i].key[0]==="06 May")
            {
                sum[1]=sum[1]+data.rows[i].value;
            }
            if(data.rows[i].key[0]==="10 May")
            {
                sum[2]=sum[2]+data.rows[i].value;
            }
            if(data.rows[i].key[0]==="12 May")
            {
                sum[3]=sum[3]+data.rows[i].value;
            }
            if(data.rows[i].key[0]==="14 May")
            {
                sum[4]=sum[4]+data.rows[i].value;
            }
            if(data.rows[i].key[0]==="16 May")
            {
                sum[5]=sum[5]+data.rows[i].value;
            }

        }
    }

 for (var i=0; i<data.rows.length; i++)
    {
        if(data.rows[i].key[2] === "YES" )
        {
            if(data.rows[i].key[0]==="04 May" )
            {
                if(data.rows[i].key[1]===-1){
                    unhappy1 = data.rows[i].value /sum[0];
                }
                if(data.rows[i].key[1]=== 0){
                    peace1 = data.rows[i].value /sum[0];
                }
                if(data.rows[i].key[1]=== 1){
                    happy1 = data.rows[i].value /sum[0];
                }
            }
            if(data.rows[i].key[0]==="06 May" )
            {
                if(data.rows[i].key[1]===-1){
                    unhappy2 = data.rows[i].value /sum[0];
                }
                if(data.rows[i].key[1]=== 0){
                    peace2 = data.rows[i].value /sum[0];
                }
                if(data.rows[i].key[1]=== 1){
                    happy2 = data.rows[i].value /sum[0];
                }
            }
            if(data.rows[i].key[0]==="10 May" )
            {
                if(data.rows[i].key[1]===-1){
                    unhappy3 = data.rows[i].value /sum[0];
                }
                if(data.rows[i].key[1]=== 0){
                    peace3 = data.rows[i].value /sum[0];
                }
                if(data.rows[i].key[1]=== 1){
                    happy3 = data.rows[i].value /sum[0];
                }
            }
            if(data.rows[i].key[0]==="12 May" )
            {
                if(data.rows[i].key[1]===-1){
                    unhappy4 = data.rows[i].value /sum[0];
                }
                if(data.rows[i].key[1]=== 0){
                    peace4 = data.rows[i].value /sum[0];
                }
                if(data.rows[i].key[1]=== 1){
                    happy4 = data.rows[i].value /sum[0];
                }
            }
            if(data.rows[i].key[0]==="14 May" )
            {
                if(data.rows[i].key[1]===-1){
                    unhappy5 = data.rows[i].value /sum[0];
                }
                if(data.rows[i].key[1]=== 0){
                    peace5 = data.rows[i].value /sum[0];
                }
                if(data.rows[i].key[1]=== 1){
                    happy5 = data.rows[i].value /sum[0];
                }
            } 
            if(data.rows[i].key[0]==="16 May" )
            {
                if(data.rows[i].key[1]===-1){
                    unhappy6 = data.rows[i].value /sum[0];
                }
                if(data.rows[i].key[1]=== 0){
                    peace6 = data.rows[i].value /sum[0];
                }
                if(data.rows[i].key[1]=== 1){
                    happy6 = data.rows[i].value /sum[0];
                }
            }           
        }
    }

    unhappy1 = unhappy1 * 100;
    unhappy2 = unhappy2 * 100;
    unhappy3 = unhappy3 * 100;
    unhappy4 = unhappy4 * 100;
    unhappy5 = unhappy5 * 100;
    unhappy6 = unhappy6 * 100;

    other1 = 100 - happy1 ;
    other2 = 100 - happy2 ;
    other3 = 100 - happy3 ;
    other4 = 100 - happy4 ;
    other5 = 100 - happy5 ;
    other6 = 100 - happy6 ;

    happy1 = happy1 * 100;
    happy2 = happy2 * 100;
    happy3 = happy3 * 100;
    happy4 = happy4 * 100;
    happy5 = happy5 * 100;
    happy6 = happy6 * 100;

                var nbabar ={
    legend: {
        x : 'center',
        y : 'center',
        data:['04 May happy',
            '06 May happy',
            '10 May happy',
            '12 May happy',
            '14 May happy',
            '16 May happy']
    },
    title : {
        text: 'NBA Fans Emotion Percentage',
        x: 'center'
    },
    series : [
        {
            type : 'pie',
            center : ['10%', '30%'],
            radius : radius,
            x: '0%', // for funnel
            itemStyle : labelFromatter,
            data : [
                {name:'', value:unhappy1, itemStyle : labelTop},
                {name:'04 May happy', value:happy1,itemStyle : labelTop}
            ]
        },
        {
            type : 'pie',
            center : ['26%', '30%'],
            radius : radius,
            x:'15%', // for funnel
            itemStyle : labelFromatter,
            data : [
                {name:'', value:unhappy2, itemStyle : labelTop},
                {name:'06 May happy', value:happy2,itemStyle : labelTop}
            ]
        },
        {
            type : 'pie',
            center : ['42%', '30%'],
            radius : radius,
            x:'40%', // for funnel
            itemStyle : labelFromatter,
            data : [
                {name:'', value:unhappy3, itemStyle : labelTop},
                {name:'10 May happy', value:happy3,itemStyle : labelTop}
            ]
        },
        {
            type : 'pie',
            center : ['58%', '30%'],
            radius : radius,
            x:'60%', // for funnel
            itemStyle : labelFromatter,
            data : [
                {name:'', value:unhappy4, itemStyle : labelTop},
                {name:'12 May happy', value:happy4,itemStyle : labelTop}
            ]
        },
        {
            type : 'pie',
            center : ['74%', '30%'],
            radius : radius,
            x:'80%', // for funnel
            itemStyle : labelFromatter,
            data : [
                {name:'', value:unhappy5, itemStyle : labelTop},
                {name:'14 May happy', value:happy5,itemStyle : labelTop}
            ]
        },
        {
            type : 'pie',
            center : ['90%', '30%'],
            radius : radius,
            y: '55%',   // for funnel
            x: '0%',    // for funnel
            itemStyle : labelFromatter,
            data : [
                {name:'', value:unhappy6, itemStyle : labelTop},
                {name:'16 May happy', value:happy6,itemStyle : labelTop}
            ]
        }
    ]
};
                    
        myChart.setOption(nbabar);
    },function(status){
            alert('Something wrong');
        });

}

// <!-- ************************ pie end *********************** -->