<script setup lang="ts">

import {useAllData} from "@/stores/admin";
const all_data = useAllData().get_all_data
const dishes_all_data = JSON.parse(all_data)
console.log("我是baseinfo")

let {total_orders, mean_price,total_amounts,total_dishes_number, like_dishes_top10, dislike_dishes_top5, mean_count_dishes, dishes_data, order_hour, order_day, order_weekday } = dishes_all_data;
total_orders = total_orders.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
total_amounts = total_amounts.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
mean_count_dishes = mean_count_dishes[1][0].toFixed(2)

</script>

<template>
  <v-container class="mt-4" fluid >
    <v-row class="ma-0 ma-0">
      <v-col class="d-flex align-center justify-space-evenly" cols="12" lg="3" sm="6">
        <v-card  hover elevation="0" border="sm" height="150px" width="100vw">
          <template v-slot:subtitle><span style="font-size: 18px">总销售额</span></template>
          <template  v-slot:text>
            <div class="d-flex align-center" style="font-size: 22px;">¥ {{ total_amounts }}
              <v-chip style="border: 1px solid rgb(138, 187, 255);" color="rgb(138, 187, 255)" border class="ml-10" label>10%
              <template v-slot:prepend>
                <v-icon class="mdi mdi-trending-up mr-2"></v-icon>
              </template>
              </v-chip>
            </div>
            <div style="font-size: 16px; color: #a4a4a4" class="pt-5 d-block"
            >You made an extra <span style="color: rgb(138, 187, 255)">¥ 1000</span> this year</div>
          </template>
        </v-card>
      </v-col>
      <v-col class="d-flex align-center justify-space-evenly" cols="12" lg="3" sm="6">
        <v-card  hover elevation="0" border="sm" height="150px" width="100vw">
          <template v-slot:subtitle><span style="font-size: 18px">平均客单价</span></template>
          <template  v-slot:text>
            <div class="d-flex align-center" style="font-size: 22px;">¥ {{ mean_price }}
              <v-chip style="border: 1px solid rgb(168, 225, 140);" color="rgb(168, 225, 140)" border class="ml-10" label>5%
                <template v-slot:prepend>
                  <v-icon class="mdi mdi-trending-up mr-2"></v-icon>
                </template>
              </v-chip>
            </div>
            <div style="font-size: 16px; color: #a4a4a4" class="pt-5 d-block"
            >You made an extra <span style="color: rgb(168, 225, 140)">¥ 5.25</span> this year</div>
          </template>
        </v-card>
      </v-col>
      <v-col class="d-flex align-center justify-space-evenly" cols="12" lg="3" sm="6">
        <v-card  hover elevation="0" border="sm" height="150px" width="100vw">
          <template v-slot:subtitle><span style="font-size: 18px">总销售量</span></template>
          <template  v-slot:text>
            <div class="d-flex align-center" style="font-size: 22px;">{{ total_orders }}
              <v-chip style="border: 1px solid rgb(252, 214, 137);" color="rgb(252, 214, 137)" border class="ml-10" label>15%
                <template v-slot:prepend>
                  <v-icon class="mdi mdi-trending-down mr-2"></v-icon>
                </template>
              </v-chip>
            </div>
            <div style="font-size: 16px; color: #a4a4a4" class="pt-5 d-block"
            >You made an extra <span style="color: rgb(252, 214, 137)">1325</span> this year</div>
          </template>
        </v-card>
      </v-col>
      <v-col class="d-flex align-center justify-space-evenly" cols="12" lg="3" sm="6">
        <v-card  hover elevation="0" border="sm" height="150px" width="100vw">
          <template v-slot:subtitle><span style="font-size: 18px">菜品总数</span></template>
          <template  v-slot:text>
            <div class="d-flex align-center" style="font-size: 22px;">{{ total_dishes_number }}
              <v-chip style="border: 1px solid rgb(255, 166, 167);" color="rgb(255, 166, 167)" border class="ml-10" label>10%
                <template v-slot:prepend>
                  <v-icon class="mdi mdi-trending-down mr-2"></v-icon>
                </template>
              </v-chip>
            </div>
            <div style="font-size: 16px; color: #a4a4a4" class="pt-5 d-block"
            >You average order <span style="color: rgb(255, 166, 167)">{{ mean_count_dishes }}</span> this year</div>
          </template>
        </v-card>
      </v-col>


    </v-row>
  </v-container>
</template>

<style scoped>
.base_information {
  background-color: #ffffff;
  width:100vw;
  height: 240px;

}
</style>