<template>
  <div class="login">
    <!-- 科技风 SVG 底图：模糊光晕 + 数据链路流转动效 -->
    <svg class="login-bg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="bgGradient" cx="32%" cy="38%" r="95%">
          <stop offset="0%" stop-color="#0d2044" />
          <stop offset="55%" stop-color="#081226" />
          <stop offset="100%" stop-color="#04070f" />
        </radialGradient>
        <linearGradient id="linkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#0ea5e9" stop-opacity="0.15" />
          <stop offset="50%" stop-color="#38e1ff" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#0ea5e9" stop-opacity="0.15" />
        </linearGradient>
        <!-- 背景光晕模糊 -->
        <filter id="softBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="70" />
        </filter>
        <!-- 链路轻微模糊，营造朦胧感 -->
        <filter id="lineBlur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.1" />
        </filter>
        <!-- 流转光点辉光 -->
        <filter id="dotGlow" x="-300%" y="-300%" width="700%" height="700%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
          <path d="M 64 0 L 0 0 0 64" fill="none" stroke="#1c3b6e" stroke-width="1" />
        </pattern>
      </defs>

      <!-- 底色与网格 -->
      <rect width="1920" height="1080" fill="url(#bgGradient)" />
      <rect width="1920" height="1080" fill="url(#grid)" opacity="0.28" />

      <!-- 模糊光晕层 -->
      <g filter="url(#softBlur)">
        <circle cx="420" cy="320" r="280" fill="#0e4a8f" opacity="0.38" />
        <circle cx="1480" cy="840" r="320" fill="#0b3f75" opacity="0.3" />
        <circle cx="1160" cy="200" r="200" fill="#0891b2" opacity="0.22" />
        <circle cx="760" cy="900" r="220" fill="#123c8a" opacity="0.25" />
      </g>

      <!-- 数据链路（虚线流转动效） -->
      <g class="link-lines" fill="none" stroke="url(#linkGradient)" stroke-width="1.6" filter="url(#lineBlur)">
        <path id="link1" class="link-line" d="M 200 780 C 420 640, 620 720, 860 560" />
        <path id="link2" class="link-line" d="M 860 560 C 1040 440, 1180 500, 1380 380" />
        <path id="link3" class="link-line" d="M 300 260 C 520 340, 700 300, 860 560" />
        <path id="link4" class="link-line" d="M 860 560 C 980 720, 1220 760, 1460 700" />
        <path id="link5" class="link-line" d="M 300 260 C 560 140, 940 200, 1380 380" />
        <path id="link6" class="link-line" d="M 200 780 C 260 520, 240 400, 300 260" />
      </g>

      <!-- 沿链路流转的数据光点 -->
      <g class="flow-dots" fill="#5eeaff" filter="url(#dotGlow)">
        <circle r="4">
          <animateMotion dur="6s" repeatCount="indefinite"><mpath href="#link1" /></animateMotion>
        </circle>
        <circle r="3.5">
          <animateMotion dur="5s" begin="1s" repeatCount="indefinite"><mpath href="#link2" /></animateMotion>
        </circle>
        <circle r="3.5">
          <animateMotion dur="7s" begin="0.5s" repeatCount="indefinite"><mpath href="#link3" /></animateMotion>
        </circle>
        <circle r="4">
          <animateMotion dur="6.5s" begin="2s" repeatCount="indefinite"><mpath href="#link4" /></animateMotion>
        </circle>
        <circle r="3">
          <animateMotion dur="8s" repeatCount="indefinite"><mpath href="#link5" /></animateMotion>
        </circle>
        <circle r="3">
          <animateMotion dur="7.5s" begin="3s" repeatCount="indefinite"><mpath href="#link6" /></animateMotion>
        </circle>
      </g>

      <!-- 链路节点与脉冲圈 -->
      <g class="nodes">
        <g v-for="node in bgNodes" :key="node.x + '-' + node.y">
          <circle :cx="node.x" :cy="node.y" r="5" fill="#38e1ff" filter="url(#dotGlow)" />
          <circle :cx="node.x" :cy="node.y" r="5" fill="none" stroke="#38e1ff" stroke-width="1.2" opacity="0.8">
            <animate attributeName="r" values="5;26" :dur="node.dur" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0" :dur="node.dur" repeatCount="indefinite" />
          </circle>
        </g>
      </g>
    </svg>

    <el-form ref="loginRef" :model="loginForm" :rules="loginRules" class="login-form">
      <h3 class="title">{{ title }}</h3>
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          type="text"
          size="large"
          auto-complete="off"
          placeholder="账号"
        >
          <template #prefix><svg-icon icon-class="user" class="el-input__icon input-icon" /></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          size="large"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter="handleLogin"
        >
          <template #prefix><svg-icon icon-class="password" class="el-input__icon input-icon" /></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="code" v-if="captchaEnabled">
        <el-input
          v-model="loginForm.code"
          size="large"
          auto-complete="off"
          placeholder="验证码"
          style="width: 63%"
          @keyup.enter="handleLogin"
        >
          <template #prefix><svg-icon icon-class="validCode" class="el-input__icon input-icon" /></template>
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode" class="login-code-img"/>
        </div>
      </el-form-item>
      <!-- <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox> -->
      <el-form-item style="width:100%;">
        <el-button
          :loading="loading"
          size="large"
          type="primary"
          class="login-btn"
          @click.prevent="handleLogin"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
        <div style="float: right;" v-if="register">
          <router-link class="link-type" :to="'/register'">立即注册</router-link>
        </div>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <!-- <div class="el-login-footer">
      <span>{{ footerContent }}</span>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { getCodeImg } from "@/api/login"
import Cookies from "js-cookie"
import { encrypt, decrypt } from "@/utils/jsencrypt"
import useUserStore from '@/store/modules/user'
import defaultSettings from '@/settings'
import type { CaptchaInfoResult } from '@/types/api/login'
import type { LoginForm } from '@/types/api/login'

const title = import.meta.env.VITE_APP_TITLE
const footerContent = defaultSettings.footerContent
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const { proxy } = getCurrentInstance()

// 底图链路节点坐标（与 SVG 中 link 路径端点对应）
const bgNodes = [
  { x: 200, y: 780, dur: '3s' },
  { x: 860, y: 560, dur: '2.4s' },
  { x: 300, y: 260, dur: '3.4s' },
  { x: 1380, y: 380, dur: '2.8s' },
  { x: 1460, y: 700, dur: '3.8s' }
]

const loginForm = ref<LoginForm>({
  username: "",
  password: "",
  rememberMe: false,
  code: "",
  uuid: ""
})

const loginRules = {
  username: [{ required: true, trigger: "blur", message: "请输入您的账号" }],
  password: [{ required: true, trigger: "blur", message: "请输入您的密码" }],
  code: [{ required: true, trigger: "change", message: "请输入验证码" }]
}

const codeUrl = ref("")
const loading = ref(false)
// 验证码开关
const captchaEnabled = ref(true)
// 注册开关
const register = ref(false)
const redirect = ref<string | undefined>(undefined)

watch(route, (newRoute: any) => {
    redirect.value = (newRoute.query && newRoute.query.redirect) as string | undefined
}, { immediate: true })

function handleLogin(): void {
  proxy.$refs.loginRef.validate((valid: boolean) => {
    if (valid) {
      loading.value = true
      // 勾选了需要记住密码设置在 cookie 中设置记住用户名和密码
      if (loginForm.value.rememberMe) {
        Cookies.set("username", loginForm.value.username, { expires: 30 })
        Cookies.set("password", encrypt(loginForm.value.password), { expires: 30 })
        Cookies.set("rememberMe", loginForm.value.rememberMe, { expires: 30 })
      } else {
        // 否则移除
        Cookies.remove("username")
        Cookies.remove("password")
        Cookies.remove("rememberMe")
      }
      // 调用action的登录方法
      userStore.login(loginForm.value).then(() => {
        const query = route.query
        const otherQueryParams = Object.keys(query).reduce((acc: Record<string, any>, cur) => {
          if (cur !== "redirect") {
            acc[cur] = query[cur]
          }
          return acc
        }, {})
        router.push({ path: redirect.value || "/", query: otherQueryParams })
      }).catch(() => {
        loading.value = false
        // 重新获取验证码
        if (captchaEnabled.value) {
          getCode()
        }
      })
    }
  })
}

function getCode(): void {
  getCodeImg().then(res => {
    captchaEnabled.value = res.captchaEnabled === undefined ? true : res.captchaEnabled
    if (captchaEnabled.value) {
      codeUrl.value = "data:image/gif;base64," + res.img
      loginForm.value.uuid = res.uuid
    }
  })
}

function getCookie(): void {
  const username = Cookies.get("username")
  const password = Cookies.get("password")
  const rememberMe = Cookies.get("rememberMe")
  loginForm.value = {
    username: username === undefined ? loginForm.value.username : username,
    password: password === undefined ? loginForm.value.password : decrypt(password),
    rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
  }
}

getCode()
// getCookie()
</script>

<style lang='scss' scoped>
.login {
  color-scheme: dark;
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  // background-size: cover;
  // background-repeat: no-repeat;
  // background-position: center;
  background-color: #04070f;
  overflow: hidden;
}

.login-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;

  .link-line {
    stroke-dasharray: 14 22;
    animation: linkFlow 4s linear infinite;

    &:nth-of-type(2) { animation-duration: 5s; }
    &:nth-of-type(3) { animation-duration: 6s; }
    &:nth-of-type(4) { animation-duration: 4.5s; }
    &:nth-of-type(5) { animation-duration: 7s; }
    &:nth-of-type(6) { animation-duration: 5.5s; }
  }
}

@keyframes linkFlow {
  to {
    stroke-dashoffset: -288;
  }
}

.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #e6f7ff;
  letter-spacing: 3px;
  text-shadow: 0 0 12px rgba(56, 225, 255, 0.45);
}

.login-form {
  position: relative;
  border-radius: 8px;
  border: 1px solid rgba(56, 189, 248, 0.25);
  background: rgba(10, 22, 44, 0.6);
  backdrop-filter: blur(12px);
  box-shadow: 0 0 30px rgba(14, 165, 233, 0.15), inset 0 0 24px rgba(14, 165, 233, 0.06);
  width: 420px;
  padding: 25px 35px 5px 35px;
  margin-right: 9vw;
  z-index: 1;

  // 顶部科技风渐变光线
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 8%;
    width: 84%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #38e1ff, transparent);
  }

  .el-input {
    height: 40px;
    input {
      height: 40px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 0px;
    color: #38bdf8;
  }

  :deep(.el-input__wrapper) {
    background: rgba(13, 28, 56, 0.75);
    box-shadow: 0 0 0 1px rgba(56, 189, 248, 0.28) inset;

    &.is-focus,
    &:hover {
      box-shadow: 0 0 0 1px rgba(56, 225, 255, 0.75) inset, 0 0 10px rgba(56, 189, 248, 0.25);
    }
  }
  :deep(.el-input__inner) {
    color: #e6f1ff;

    &::placeholder {
      color: #5b7a9d;
    }
  }
}

.login-btn {
  width: 100%;
  border: none;
  letter-spacing: 6px;
  background: linear-gradient(90deg, #0ea5e9, #2563eb);
  box-shadow: 0 0 14px rgba(14, 165, 233, 0.35);

  &:hover,
  &:focus {
    background: linear-gradient(90deg, #22c3f7, #3b82f6);
    box-shadow: 0 0 20px rgba(56, 189, 248, 0.55);
  }
}

.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 40px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-code-img {
  height: 40px;
  padding-left: 12px;
  border-radius: 4px;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .login {
    justify-content: center;
  }
  .login-form {
    margin-right: 0;
    width: 92%;
  }
}
</style>
