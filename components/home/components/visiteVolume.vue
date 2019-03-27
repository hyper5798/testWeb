<style lang="less">
.bar-chart{
    width: 110%;
    height: 200px;
}
</style>
<template>
    <div>
      <v-chart :options="option" :auto-resize="true" class="bar-chart"/>
    </div>
    
</template>

<script>
let option2 = {
    title: {
        text: '一天用电量分布',
        subtext: '纯属虚构'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },
    toolbox: {
        show: true,
        feature: {
            saveAsImage: {}
        }
    },
    xAxis:  {
        type: 'category',
        boundaryGap: false,
        data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45']
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value} W'
        },
        axisPointer: {
            snap: true
        }
    },
    visualMap: {
        show: false,
        dimension: 0,
        pieces: [{
            lte: 6,
            color: 'green'
        }, {
            gt: 6,
            lte: 8,
            color: 'red'
        }, {
            gt: 8,
            lte: 14,
            color: 'green'
        }, {
            gt: 14,
            lte: 17,
            color: 'red'
        }, {
            gt: 17,
            color: 'green'
        }]
    },
    series: [
        {
            name:'用电量',
            type:'line',
            smooth: true,
            data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400],
            markArea: {
                data: [ [{
                    name: '早高峰',
                    xAxis: '07:30'
                }, {
                    xAxis: '10:00'
                }], [{
                    name: '晚高峰',
                    xAxis: '17:30'
                }, {
                    xAxis: '21:15'
                }] ]
            }
        }
    ]
}
let option1 = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    top: 0,
                    left: '2%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    data: ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
                    nameTextStyle: {
                        color: '#c3c3c3'
                    }
                },
                series: [
                    {
                        name: '访问量',
                        type: 'bar',
                        data: [
                            {value: 453682, name: 'Mon', itemStyle: {normal: {color: '#2d8cf0'}}},
                            {value: 879545, name: 'Tues', itemStyle: {normal: {color: '#2d8cf0'}}},
                            {value: 2354678, name: 'Wed', itemStyle: {normal: {color: '#2d8cf0'}}},
                            {value: 1598403, name: 'Thur', itemStyle: {normal: {color: '#2d8cf0'}}},
                            {value: 543250, name: 'Fri', itemStyle: {normal: {color: '#2d8cf0'}}},
                            {value: 1305923, name: 'Sat', itemStyle: {normal: {color: '#2d8cf0'}}},
                            {value: 1103456, name: 'Sun', itemStyle: {normal: {color: '#2d8cf0'}}}
                        ]
                    }
                ]
            }

export default {
    name: 'visiteVolume',
    data () {
        return {
            option: option2
        }
    }
};
</script>
