<script setup lang="ts">

import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import {ref} from 'vue';
import VChart from 'vue-echarts';


import { LineChart, BarChart } from 'echarts/charts';

import {
  VisualMapComponent,
  GridComponent,
  TooltipComponent,
  TitleComponent,
} from 'echarts/components';



//获取数据
import {useAllData} from "@/stores/admin";



const all_data = useAllData().get_all_data



const dishes_all_data = JSON.parse(all_data)

// console.log(dishes_data,typeof(dishes_data))

let {like_dishes_top10, order_weekday } = dishes_all_data;


let [a, b, c,d, ...e] = order_weekday[1]// 移除前两个元素
 order_weekday = [...e,a, b, c,d]


echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  LineChart,
  BarChart,
  CanvasRenderer,
]);


const option_line = ref({
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    boundaryGap: false
    // axisLabel: {
    //   interval: 1, // 每隔一个标签显示一个标签
    // }
  },
  yAxis: {
    type: 'value',
    minInterval: 1000,
  },
  series: [
    {
      data: order_weekday,
      type: 'line',
      smooth: true,
      lineStyle: {
        color: '#1677ff',
        width: 2
      },
      showSymbol: false,
      animationDuration: 1500, // 设置系列的动画时长
      animationEasing: 'quarticOut', // 设置系列的动画缓动效果
      areaStyle: {
      opacity: 0.8,
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: 'rgba(142, 189, 255,0.8)'
        },
        {
          offset: 1,
          color: 'rgba(142, 189, 255, 0)'
        }
      ])
    }
    },
  ]
})

const option_bar = ref({
  color:["#71DADAFF"],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '10%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'value',
      interval: 70,
      max:350,
      axisTick: {
        alignWithLabel: true
      }
    }
  ],
  yAxis: [
    {
      type: 'category',
      data: like_dishes_top10[0],
      inverse:true
    }

  ],
  series: [
    {
      name: 'Direct',
      type: 'bar',
      barWidth: '60%',
      data: like_dishes_top10[1]
    }
  ]
})


</script>

<template>
  <v-container fluid >
    <v-row class="ma-0">
      <v-col class="d-flex align-center justify-space-evenly pt-0" cols="12" lg="9" sm="9">
        <v-card width="100vw" height="480px" title="订单时间趋势（周榜）" >
          <v-card-text >
            <v-chart style="height: 420px" class="chart-line" :option="option_line" autoresize />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="d-flex align-center justify-space-evenly pt-0" cols="12" lg="3" sm="3">
        <v-card width="100vw" height="480px" title="畅销榜TOP10">
          <v-chart style="height: 420px" class="chart-bar" :option="option_bar" autoresize />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.hour_day_month_board {
  display: flex;
  width: 90vw;
  height: 400px;
  justify-content: space-between;
}
</style>