// <!-- ************************ sport begin *********************** -->
// Team 16 -  Atlanta

// Student number: 548771 | Student name: Hao DUAN  | Surname: Duan
// Student number: 616805 | Student name: Meng LI       | Surname: Li
// Student number: 650382 | Student name: Ming YU   | Surname: Chang
// Student number: 629341 | Student name: Yu SUN        | Surname: Sun
// Student number: 705077 | Student name: Yuxiang ZHOU  | Surname: Zhou
// Student number: 656982 | Student name: Zhenya LI | Surname: Li

function piesport(){


var myChart = echarts.init(document.getElementById('piesportbegin')); 
    getJSON('http://115.146.93.74:5984/tweet_db/_design/Sports/_view/sports_vote?group_level=1').then( function (data) {
                var option111 =  {
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient : 'vertical',
        x : 'left',
        data:[data.rows[0].key,data.rows[1].key,data.rows[2].key,data.rows[3].key]
    },
    calculable : true,
    series : [
        {
            name:'Sport Favorited',
            type:'pie',
            radius : ['50%', '70%'],
            itemStyle : {
                normal : {
                    label : {
                        show : false
                    },
                    labelLine : {
                        show : false
                    }
                },
                emphasis : {
                    label : {
                        show : true,
                        position : 'center',
                        textStyle : {
                            fontSize : '30',
                            fontWeight : 'bold'
                        }
                    }
                }
            },
            data:[
                {value:data.rows[0].value, name:data.rows[0].key},
                {value:data.rows[1].value, name:data.rows[1].key},
                {value:data.rows[2].value, name:data.rows[2].key},
                {value:data.rows[3].value, name:data.rows[3].key}
            ]
        }
    ]
};
        myChart.setOption(option111);
            },function(status){
            alert('Something wrong');
        });

}

// <!-- ************************ sport end *********************** -->