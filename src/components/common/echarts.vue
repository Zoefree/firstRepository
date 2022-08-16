<template>
  <div ref="echart"></div>
</template>
<script>
import * as echarts from "echarts"
export default {
name: 'Echarts',
props:{
  isAxisChart:{
    type:Boolean,
    default:true
  },
  chartData:{
    type:Object,
    default(){
      return {
        xData:[],
        series:[]
      }
    }
  }

},
data(){
  return {
    axisOptions:{
      legend:{
        textStyle:{
          color:"#333",
        }
      },
      grid:{
        left:"20%",
      },
      tooltip:{
        trigger:"axis",
      },
      xAxis:{
        type:"category",
        data:[],
        axisLine:{
          lineStyle:{
            color:"#173a3"
          }
        },
        axisLabel:{
          interval:0,
          color:"#333"
        }
      },
      yAxis:[
        {
          type:"value",
          axisLine:{
            lineStyle:{
              color:"#173a3"
            }
          }
        }
      ],
      color:["#2ec7c9","#b6a2de","#5ab1ef","#ffb980","#d87a80","#8d98b3"],
      series:[],

    },
    normalOptions:{
       tooltip:{
        trigger:"item",
      },
      color:[
        "#0f78f4",
        "#dd536b",
        "#9462e5",
        "#a6a6a6",
        "#e1bb22",
        "#3ed1cf"],
      series:[],
    },
    echart:null
  }
},
watch:{
   chartData:{
     handler:function(){
       this.initChart()
     },
     deep:true
   }
},
methods:{
  initChart(){
    this.initChartData()
    if(this.echart){
      this.echart.setOption(this.options)
    }else {
      this.echart = echarts.init(this.$refs.echart)
      this.echart.setOption(this.options)
    }
  },
  initChartData(){
    if(this.isAxisChart){
      this.axisOptions.xAxis.data = this.chartData.xData
      this.axisOptions.series = this.chartData.series
    }else {
      this.normalOptions.series = this.chartData.series
    }
}
},
computed:{
  options(){
    return this.isAxisChart ? this.axisOptions : this.normalOptions
  }
},
components: {
}
}
</script>
<style scoped>
</style>