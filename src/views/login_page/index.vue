<script setup lang="ts">
import LoginPage from '@/components/login_page/login/index.vue'
import RegisterPage from '@/components/login_page/register/index.vue'
import {ref} from "vue";
import 'animate.css';
import {onMounted} from "vue";



onMounted(()=>{
  document.querySelector('.loading')?.remove();
})



//定义一个数据和方法以便于可以使登录和注册组件显示切换，主要是使用defineProps
const toggleLogin = ref<boolean>(true)
const toggleToChildren = ()=>{
  toggleLogin.value = !toggleLogin.value
}
</script>

<template>
  <div class="login_bg">
    <div class="card">
      <LoginPage :toggleToChildren="toggleToChildren" v-if="toggleLogin"></LoginPage>
      <RegisterPage :toggleToChildren="toggleToChildren" v-if="!toggleLogin"></RegisterPage>
    </div>
    <div class="gradient-bg">
      <svg xmlns="http://www.w3.org/2000/svg" class="svgBlur">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div class="gradients-container">
        <div class="g1"></div>
        <div class="g2"></div>
        <div class="g3"></div>
        <div class="g4"></div>
        <div class="g5"></div>
        <div class="interactive"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login_bg {
  --color-bg1: rgba(229,106,253,0.21);
  --color-bg2: rgba(112,246,255,0.23);
  --color1: 18, 113, 255;
  --color2: 107, 74, 255;
  --color3: 100, 100, 255;
  --color4: 50, 160, 220;
  --color5: 80, 47, 122;
  --color-interactive: 140, 100, 255;
  --circle-size: 80%;
  --blending: hard-light;
}


* {
  margin:0;
  padding:0;
  outline:none;
  list-style:none;
  text-decoration:none;
  box-sizing:border-box;
  color:#FFF;
  background: transparent;
  border:none;
}



.card {
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 100%;
  transform: translate(-100%, -50%);
  width: 38vw;
  min-width: 300px;
  height: 100vh;
  background-color: rgba(255,255,255,0.7);
  padding: 0 48px 48px 48px;
  overflow: hidden;
}

@media (max-width: 700px) {
  .card {
    width: 100%; /* 小于300px时的宽度 */
  }
}

@keyframes moveInCircle {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes moveVertical {
  0% {
    transform: translateY(-50%);
  }
  50% {
    transform: translateY(50%);
  }
  100% {
    transform: translateY(-50%);
  }
}

@keyframes moveHorizontal {
  0% {
    transform: translateX(-50%) translateY(-10%);
  }
  50% {
    transform: translateX(50%) translateY(10%);
  }
  100% {
    transform: translateX(-50%) translateY(-10%);
  }
}


.gradient-bg {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: linear-gradient(40deg, var(--color-bg1), var(--color-bg2));
  top: 0;
  left: 0;

  .svgBlur {
    display: none;
  }

  .noiseBg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    mix-blend-mode: soft-light;
    opacity: 0.3;
  }
  .gradients-container {
    filter: url(#goo) blur(40px) ;
    width: 100%;
    height: 100%;
  }

  .g1 {
    position: absolute;
    background: radial-gradient(circle at center, rgba(var(--color1), 0.8) 0, rgba(var(--color1), 0) 50%) no-repeat;
    mix-blend-mode: var(--blending);

    width: var(--circle-size);
    height: var(--circle-size);
    top: calc(50% - var(--circle-size) / 2);
    left: calc(50% - var(--circle-size) / 2);

    transform-origin: center center;
    animation: moveVertical 30s ease infinite;

    opacity: 1;
  }

  .g2 {
    position: absolute;
    background: radial-gradient(circle at center, rgba(var(--color2), 0.8) 0, rgba(var(--color2), 0) 50%) no-repeat;
    mix-blend-mode: var(--blending);

    width: var(--circle-size);
    height: var(--circle-size);
    top: calc(50% - var(--circle-size) / 2);
    left: calc(50% - var(--circle-size) / 2);

    transform-origin: calc(50% - 400px);
    animation: moveInCircle 20s reverse infinite;

    opacity: 1;
  }

  .g3 {
    position: absolute;
    background: radial-gradient(circle at center, rgba(var(--color3), 0.8) 0, rgba(var(--color3), 0) 50%) no-repeat;
    mix-blend-mode: var(--blending);

    width: var(--circle-size);
    height: var(--circle-size);
    top: calc(50% - var(--circle-size) / 2 + 200px);
    left: calc(50% - var(--circle-size) / 2 - 500px);

    transform-origin: calc(50% + 400px);
    animation: moveInCircle 40s linear infinite;

    opacity: 1;
  }

  .g4 {
    position: absolute;
    background: radial-gradient(circle at center, rgba(var(--color4), 0.8) 0, rgba(var(--color4), 0) 50%) no-repeat;
    mix-blend-mode: var(--blending);

    width: var(--circle-size);
    height: var(--circle-size);
    top: calc(50% - var(--circle-size) / 2);
    left: calc(50% - var(--circle-size) / 2);

    transform-origin: calc(50% - 200px);
    animation: moveHorizontal 40s ease infinite;

    opacity: 0.7;
  }

  .g5 {
    position: absolute;
    background: radial-gradient(circle at center, rgba(var(--color5), 0.8) 0, rgba(var(--color5), 0) 50%) no-repeat;
    mix-blend-mode: var(--blending);

    width: calc(var(--circle-size) * 2);
    height: calc(var(--circle-size) * 2);
    top: calc(50% - var(--circle-size));
    left: calc(50% - var(--circle-size));

    transform-origin: calc(50% - 800px) calc(50% + 200px);
    animation: moveInCircle 20s ease infinite;

    opacity: 1;
  }

  .interactive {
    position: absolute;
    background: radial-gradient(circle at center, rgba(var(--color-interactive), 0.8) 0, rgba(var(--color-interactive), 0) 50%) no-repeat;
    mix-blend-mode: var(--blending);

    width: 100%;
    height: 100%;
    top: -50%;
    left: -50%;

    opacity: 0.7;
  }
}
</style>