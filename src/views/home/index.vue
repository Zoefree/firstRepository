<template>
  <el-row :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover" class="cardright">
        <div class="cardtop">
          <img :src="userImg" width="60px" />
          <div>
            <p class="userinfo">Admin</p>
            <p>超级管理员</p>
          </div>
        </div>
        <div class="cardfooter">
          <p>上次登录时间：<span class="gap">2021-07-19</span></p>
          <p>上次登录地点：<span class="gap">西安</span></p>
        </div>
      </el-card>
      <!-- 表格 -->
      <el-card style="margin-top: 20px; height: 460px">
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <!-- 订单-->
    <el-col :span="16" style="margin-top: 20px">
      <div class="num">
        <el-card
          v-for="item in countDate"
          :key="item.name"
          :body-style="{ display: 'flex', padding: '0px' }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p>￥{{ item.value }}</p>
            <p>￥{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <!-- 图表 -->
      <el-card style="height: 233px">
        <!-- <div ref="echarts" style="height: 200px"></div> -->
         <echarts :chartData="echartData.order" style="height: 200px"> </echarts>
        
      </el-card>
      <div class="two">
        <el-card class="twocard">
          <!-- <div ref="echartone" style="height: 200px"></div> -->
          <echarts :chartData="echartData.user" style="height: 200px"> </echarts>
        </el-card>
        <el-card class="twocard">
          <!-- <div ref="echarttwo" style="height: 200px"></div> -->
          <echarts :chartData="echartData.video" 
          :isAxisChart="false"
          style="height: 200px"> </echarts>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>
<script>
// import * as echarts from "echarts";//无版本引入
import { getData } from "../../../api/data.js";
import Echarts from "../../components/common/echarts.vue"
export default {
  name: "Home",
  data() {
    return {
      userImg: require("../../assets/images/我的.png"),
      tableData: [],
      countDate: [
        {
          name: "今日支付订单",
          value: "1234",
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: "210",
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: "1234",
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: "1234",
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: "210",
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: "1234",
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买量",
      },
      echartData:{
        order:{
          xDate:[],
          series:[]
        },
        user:{
          xDate:[],
          series:[]
        },
        video:{
          series:[]
        }
      }
    };
  },
  mounted() {
    getData().then(res => {
      const { code, data } = res.data;
      if (code === 20000) {
        this.tableData = data.tableData;
        const order = data.orderData;
        const xData = order.date;
        const keyArray = Object.keys(order.data[0]);
        const series = [];
        keyArray.forEach(key => {
          series.push({
            name: key,
            data: order.data.map(item => item[key]),
            type: "line",
          })
        })
        // const option = {
        //   title: {
        //     text: "",
        //   },
        //   tooltip: {},
        //   legend: {
        //     data: keyArray,
        //   },
        //   xAxis: {
        //     data: xData,
        //   },
        //   yAxis: {},
        //   series: [],
        // };
        this.echartData.order.xDate = xData
        this.echartData.order.series = series

        // const option1 = {
        //   title: {
        //     text: "",
        //   },
        //   tooltip: {},
        //   legend: {
        //     textStyle:{
        //       color:'#333'
        //     }
        //   },
        //   xAxis: {
        //     type:'category',
        //     data: data.userData.map(item =>item.date),
        //     axisLine:{
        //       lineStyle:{
        //         color:'#17b3a3'
        //       }
        //     },
        //     axisLabel:{
        //       interval:0,
        //       color:'#333'
        //     }
        //   },
        //   yAxis: {},
        //   series: [
        //     {
        //       name: "新增用户",
        //       type:'bar' ,
        //       //type  设置是折线图（line）还是柱状图（bar）饼图（pie）散点图（scatter）
        //       data: data.userData.map(item => item.new),
        //     },
        //      {
        //       name: "活跃用户",
        //       type:'bar' ,
        //       data: data.userData.map(item => item.active),
        //     }
        //   ],
        // };
        this.echartData.user.xDate = data.userData.map(item =>item.date),
        this.echartData.user.series = [
            {
              name: "新增用户",
              type:'bar' ,
              //type  设置是折线图（line）还是柱状图（bar）饼图（pie）散点图（scatter）
              data: data.userData.map(item => item.new),
            },
             {
              name: "活跃用户",
              type:'bar' ,
              data: data.userData.map(item => item.active),
            }
          ]  

        // const option2 = {
        //   title: {
        //     text: "",
        //   },
        //   tooltip: {},
        //   series: [
        //     {
        //       name: "",
        //       type: "pie",
        //       //type  设置是折线图（line）还是柱状图（bar）饼图（pie）散点图（scatter）
        //       data: data.videoData,
        //     },
        //   ],
        // };

        this.echartData.video.series = [
            {
              name: "",
              type: "pie",
              //type  设置是折线图（line）还是柱状图（bar）饼图（pie）散点图（scatter）
              data: data.videoData,
            },
          ]

        // const E = echarts.init(this.$refs.echarts);
        // const F = echarts.init(this.$refs.echartone);
        // const M = echarts.init(this.$refs.echarttwo);
        // E.setOption(option);
        // F.setOption(option1);
        // M.setOption(option2);
      }
      console.log(res);
    });
  },
  components: {
    Echarts
  },
};
</script>
<style scoped>
.twocard {
  width: 385px;
  margin-right: 10px;
  margin-top: 10px;
}
.langcard {
  width: 790px;
}
p {
  font-size: 10px;
}

/* .sixcard {
  display: flex;
  flex-wrap: wrap;
} */
.el-table-column {
  height: 20px;
}
.gap {
  margin-left: 20px;
}
.cardfooter {
  margin-top: 12px;
  width: 300px;
}
.cardtop {
  width: 300px;
  display: flex;
  border-bottom: 1px solid rgb(204, 202, 201);
  padding-bottom: 10px;
}
span {
  font-size: 12px;
}
.userinfo {
  margin-top: 15px;
  margin-left: 15px;
}
.icon {
  width: 50px;
}
.num {
  display: flex;
  flex-flow: row wrap;
  align-content: space-around;
}
.el-card {
  margin: 10px;
  flex: calc((100%-40) / 4);
}
.two {
  display: flex;
}
</style>