<script setup lang="ts">
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import VChart from 'vue-echarts';


import { LineChart, PieChart } from 'echarts/charts';

import {
  VisualMapComponent,
  GridComponent,
  TooltipComponent,
  TitleComponent,
} from 'echarts/components';


echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  PieChart,
  LineChart,
  CanvasRenderer,
]);

import {reactive, ref} from "vue";

//获取数据
import {useAllData} from "@/stores/admin";



const all_data = useAllData().get_all_data

const dishes_all_data = JSON.parse(all_data)


let {total_orders, mean_price,total_amounts,total_dishes_number, like_dishes_top10, dislike_dishes_top5, mean_count_dishes, dishes_data, order_hour, order_day, order_weekday } = dishes_all_data;


//定义数据表格的表头
const headers = reactive([
  {
    align: 'start',
    key: 'index',
    sortable: false,
    title: 'dishes_id',
  },
  { key: 'dishes_name', title: 'dishes_name' },
  { key: 'amounts', title: 'price' },
])


const page = ref(1)
const pageCount = ref(Math.ceil(dishes_data.length / 10))

//图标配置
const option = ref({title: {
  },
  tooltip: {
    trigger: 'item'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: dislike_dishes_top5[1][0], name: dislike_dishes_top5[0][0] },
        { value: dislike_dishes_top5[1][1], name: dislike_dishes_top5[0][1]  },
        { value: dislike_dishes_top5[1][2], name: dislike_dishes_top5[0][2]  },
        { value: dislike_dishes_top5[1][3], name: dislike_dishes_top5[0][3]  },
        { value: dislike_dishes_top5[1][4], name: dislike_dishes_top5[0][4]  }
      ],
      itemStyle: {
        borderRadius: 5,
        borderColor: '#fff',
        borderWidth: 2
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        }
      },
      top: '-15%',

    }
  ]})


const option_line = ref({
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    data: order_hour[0],
    boundaryGap: false
    // axisLabel: {
    //   interval: 1, // 每隔一个标签显示一个标签
    // }
  },
  yAxis: {
    type: 'value',
    minInterval: 1000,
  },
  grid:{
    bottom:'120px'
  },
  series: [
    {
      data: order_hour[1],
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



</script>

<template>

  <v-container fluid >
    <v-row class="ma-0">
      <v-col class="d-flex align-center justify-space-evenly pt-0" cols="12" lg="6" sm="6">
        <v-card height="750" width="100%" title="菜单">
          <template v-slot:text>
            <v-data-table
                v-model:page="page"
                :headers="headers"
                :items="dishes_data"
                :items-per-page="10"
            >
              <template v-slot:bottom>
                <div class="text-center pt-2">
                  <v-pagination
                      v-model="page"
                      :length="pageCount"
                      :total-visible="7"
                  ></v-pagination>
                </div>
              </template>
            </v-data-table>
          </template>
        </v-card>
      </v-col>
      <v-col class="d-flex align-center justify-space-evenly pt-0" cols="12" lg="6" sm="6">
        <v-card class="" color="rgba(0,0,0,0)" flat height="750" width="100%" >
          <v-card height="360" width="100%" title="滞销菜品">
            <v-chart style="height: 360px" class="chart" :option="option" autoresize />
          </v-card>
          <v-card height="360" style="margin-top: 29px" width="100%" title="订单时间趋势（小时）">
            <v-chart style="height: 360px" class="chart" :option="option_line" autoresize />
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>



</template>

<style scoped>

</style>