<style lang="less">
.guage-chart{
    width: 100%;
    height: 200px;
}
</style>
<template>
    <div>
      <v-chart :options="option" :auto-resize="true" class="guage-chart"/>
    </div>
</template>

<script>

const option = {
    tooltip: {
        formatter: '{a} <br/>{b} : {c}%'
    },
    series: [
        {
            name: '濕度',
            type: 'gauge',
            min: 0,
            max: 100,
            detail: {
                formatter: '{value}％',
                fontSize: 18,
                offsetCenter: [0, '50px']
            },
            data: [{value: 50, name: '目前濕度'}],
            center: ['25%', '50%'],
            radius: '80%',
            title: {
                offsetCenter: [0, '80px']
            },
            axisLine: {
                lineStyle: {
                    // color: [],
                    width: 20
                }
            },
            splitLine: {
                length: 20
            }
        },
        {
            name: '溫度',
            type: 'gauge',
            min: -50,
            max: 50,
            detail: {
                formatter: '{value}度',
                fontSize: 18,
                offsetCenter: [0, '50px']
            },
            data: [{value: 50, name: '目前溫度'}],
            center: ['75%', '50%'],
            radius: '80%',
            title: {
                offsetCenter: [0, '80px']
            },
            axisLine: {
                lineStyle: {
                    // color: [],
                    width: 20
                }
            },
            splitLine: {
                length: 20
            }
        }
    ]
};

export default {
    name: 'userFlow',
    data () {
        return {
            option:option
        }
    },
    mounted () {
        this.option.series[0].data[0].value = 60
        this.option.series[1].data[0].value = 30
    }
};
</script>
