<script setup lang="ts">
import { onMounted, ref } from "vue"
import { LottieAnimation } from "lottie-web-vue"
import dodCKFpOsb from "@/assets/dodCKFpOsb.json"

let anim = ref()
</script>

<template>
  <v-container fluid >
    <v-row style="height: 80vh" class="ma-0 justify-center">
      <v-col class="d-flex align-center justify-center pt-0" cols="6" lg="6" sm="6">
        <LottieAnimation
            :animation-data="dodCKFpOsb"
            :auto-play="true"
            :loop="true"
            :speed="1"
            ref="anim" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>