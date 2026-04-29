<script setup lang="ts">
import { ref, onMounted } from 'vue';
import confetti from 'canvas-confetti';


let end = Date.now() + (3 * 1000);

// go Buckeyes!
let colors = ['#bb0000', '#ffffff', '#bb5400'];


const shootConfetti = () => {
  confetti({
    particleCount: 2,
    angle: 60,
    spread: 50,
    origin: { x: 0 },
    colors: colors
  });

  confetti({
    particleCount: 2,
    angle: 120,
    spread: 50,
    origin: { x: 1 },
    colors: colors
  });
  if (Date.now() < end) {
    requestAnimationFrame(shootConfetti);
  }
 }

 const two = () => {
   confetti({
     particleCount: 200,
     spread: 70,
     origin: { y: 0.6 }
   });
}

onMounted(()=>{
  shootConfetti()
  two()
  document.querySelector('.loading')?.remove();
})

</script>

<template>
  <v-container fluid>
    <v-row class="d-flex justify-center">
      <v-col class="d-flex align-center justify-center" cols="12" lg="6" sm="8">
        <v-card width="100%" max-width="100vw" color="rgba(0,0,0,0)" flat>
          <template v-slot:text>
            <div style="text-align: center;font-size: 25px;line-height: 2em;width: 100%">项目简介</div>
            <div style="text-align: justify;font-size: 20px;text-indent: 2em;line-height: 2em;width: 100%"> 本项目是基于大数据开发的餐厅数据分析系统。
              是我入行计算机专业一年的融合项目，根本目的在于串联我一年中所学的知识，以及深入学习更加细节的内容。本项目系统使用 PySpark pandas api进行数据处理和分析，
              能够实现时间维度的分析和销量维度的分析等功能，帮助餐厅管理者深入了解业务数据，提高经营决策的科学性和效率。</div>
            <br>
            <div style="text-align: justify;font-size: 20px;text-indent: 2em;line-height: 2em;width: 100%">前端部分采用 Vue 3、TypeScript 和 Vite 构建，使用 Vuetify 作为组件库，提供了现代化、响应迅速的用户界面。
                 后端部分基于 Python 和 Django 框架，结合 PySpark 进行大数据处理，运行在 Linux 环境中，并使用 MySQL 作为数据库。
                 前后端通过 JWT 进行身份验证，实现了安全可靠的前后端分离架构。后端服务器通过内网穿透对前端开放，确保了系统的安全性和访问的便捷性。
            </div>
          </template>
          <canvas ref="confettiCanvas" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></canvas>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>