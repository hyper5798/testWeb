<style lang="less">
.hello{
    width: 100%;
    height: 350px;
}
</style>
<template>
  <div><v-chart ref="mychart" :options="option" :auto-resize="true" class="hello"/></div>
</template>

<script>
import util from '~/libs/util.js'

let myoption = {
                title: {
                    text: '折线图堆叠'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: []
                },
                /* dataZoom: [
                    {
                        show: true,
                        realtime: true,
                        start: 0,
                        end: 100
                    }
                ], */
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: []
                },
                yAxis: {
                    type: 'value'
                },
                series: []
            }

export default {
    name: 'eventChart',
    props: {
        map:  {
            type: Object,
            //Object类型的prop值一定要用函数return出来，不然会报错。原理和data是一样的，
            //使用闭包保证一个vue实例拥有自己的一份props
            default() {
                return {}
            }
        },
        eventData:   {
            type: Array,
            //Object类型的prop值一定要用函数return出来，不然会报错。原理和data是一样的，
            //使用闭包保证一个vue实例拥有自己的一份props
            default() {
                return []
            }
        }
    },
    data () {
        return {
            arrs: [],
            legend: ['邮件营销','联盟广告','视频广告','直接访问','搜索引擎'],
            option: JSON.parse(JSON.stringify(myoption))
        }
    },
    watch: {
        eventData (data) {
            console.log('$$$$ eventData :' + JSON.stringify(data))
            if(data && data.length > 0) {
                let mData = {time:[]}
                console.log('$$$$ this.arrs :' + this.arrs.length)
                this.arrs.forEach(function(key) {
                    mData[key] = []
                });
                console.log('$$$$ mData :' + JSON.stringify(mData))
                let arr = this.arrs
                
                data.forEach(function(item) {
                    mData.time.push(util.formatDate2(item.recv, 'MM/DD HH:mm'))
                    
                    for(let i=0; i < arr.length; ++i) {
                        let key = arr[i]
                        if(mData[key] == undefined) {
                            mData[key] = []
                        }
                        mData[key].push(item[key])
                    }
                });
                this.option.xAxis.data = mData.time
                
                for(let j=0; j < this.arrs.length; ++j) {
                    let name = this.legend[j]
                    let key = this.arrs[j]
                    this.option.series.forEach(function(serial) {
                        if(serial.name == name) {
                            serial.data = mData[key]
                        }
                    })
                }
                console.log('$$$$ this.option :' + JSON.stringify(this.option))
                
            }
        },
        map (data) {
            console.log('$$$$ map :' + JSON.stringify(data))
            if(data && data.fieldName) {
                this.arrs = Object.keys(data.fieldName)
                this.legend = Object.values(data.fieldName)
                console.log('$$$$ this.arrs :' + JSON.stringify(this.arrs))
                console.log('$$$$ this.legend :' + JSON.stringify(this.legend))
                let serials = []
                this.option = JSON.parse(JSON.stringify(myoption))
                this.legend.forEach(function(name) {
                    let serial = {
                        name: name,
                        type: 'line',
                        data: []
                    }
                    if(name != '電壓') {
                        serials.push(serial)
                    }
                });
                this.$nextTick(() => {
                    this.option.legend.data = this.legend
                    this.option.series = serials
                })
                
                console.log('$$$$ this.option :' + JSON.stringify(this.option))
            }
        }
    }
};
</script>