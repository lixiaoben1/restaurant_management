<script setup lang="ts">
import {ref} from "vue";
import router from "@/router";
import axios_instance from "@/utils/request";

const permanent = ref(false)
const rail = ref(true)







const to_dashboard = () => {
  permanent.value = false
  router.push('/dashboard')
}
const to_database = () => {
  permanent.value = false
  router.push('/database')
}
const to_info = () => {
  permanent.value = false
  router.push('/info')
}


</script>

<template>
  <div>
    <v-layout class="rounded rounded-md">
      <v-navigation-drawer
          expand-on-hover
          :permanent="permanent"
          :rail="!permanent"
          width="160"
      >
        <v-list>
          <v-list-item
              prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
              subtitle="sandra_a88@gmailcom"
              title="ybiaopanSandra Adams"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item @click="to_dashboard" prepend-icon="mdi-chart-box-multiple" title="仪表盘" value="myfiles"></v-list-item>
          <v-list-item @click="to_database" prepend-icon="mdi-database" title="数据库" value="shared"></v-list-item>
          <v-list-item @click="to_info" prepend-icon="mdi-star" title="项目简介" value="starred"></v-list-item>
        </v-list>
      </v-navigation-drawer>
<!--      app bar-->
      <v-app-bar  flat>
        <v-icon @click="permanent = !permanent" style="font-size:35px" class="mdi mdi-menu-open ml-5">
        </v-icon>
        <v-spacer></v-spacer>
        <v-menu location="bottom" width="200px">
          <template v-slot:activator="{props}">
            <v-btn v-bind="props" icon="mdi-bell">
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu location="bottom" width="30vw">
          <template v-slot:activator="{props}">
              <v-list-item
                  class="mr-7"
                  v-bind="props"
                  prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
                  title="Admin"
              ></v-list-item>
          </template>
          <v-list>
            <v-list-item
                prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
                title="Admin"
                subtitle="15815151515"
            >
              <template v-slot:append>
                <v-icon style="color: #4b4b4b">mdi-logout</v-icon>
              </template>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>编辑用户</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
<!--      真正的路由窗口-->
      <v-main class="flex-column align-center justify-center" style="min-height: 100vh;background-color: rgb(245,245,245)">
        <router-view></router-view>
      </v-main>
    </v-layout>
  </div>
</template>

<style scoped>

</style>