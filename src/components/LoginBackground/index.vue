<template>
  <svg
    class="login-bg"
    viewBox="0 0 1920 1080"
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
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
    <g
      class="link-lines"
      fill="none"
      stroke="url(#linkGradient)"
      stroke-width="1.6"
      filter="url(#lineBlur)"
    >
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
        <animateMotion dur="5s" begin="1s" repeatCount="indefinite">
          <mpath href="#link2" />
        </animateMotion>
      </circle>
      <circle r="3.5">
        <animateMotion dur="7s" begin="0.5s" repeatCount="indefinite">
          <mpath href="#link3" />
        </animateMotion>
      </circle>
      <circle r="4">
        <animateMotion dur="6.5s" begin="2s" repeatCount="indefinite">
          <mpath href="#link4" />
        </animateMotion>
      </circle>
      <circle r="3">
        <animateMotion dur="8s" repeatCount="indefinite"><mpath href="#link5" /></animateMotion>
      </circle>
      <circle r="3">
        <animateMotion dur="7.5s" begin="3s" repeatCount="indefinite">
          <mpath href="#link6" />
        </animateMotion>
      </circle>
    </g>

    <!-- 链路节点与脉冲圈 -->
    <g class="nodes">
      <g v-for="node in bgNodes" :key="node.x + '-' + node.y">
        <circle :cx="node.x" :cy="node.y" r="5" fill="#38e1ff" filter="url(#dotGlow)" />
        <circle
          :cx="node.x"
          :cy="node.y"
          r="5"
          fill="none"
          stroke="#38e1ff"
          stroke-width="1.2"
          opacity="0.8"
        >
          <animate attributeName="r" values="5;26" :dur="node.dur" repeatCount="indefinite" />
          <animate
            attributeName="opacity"
            values="0.8;0"
            :dur="node.dur"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </g>
  </svg>
</template>

<script setup lang="ts">
// 底图链路节点坐标（与 SVG 中 link 路径端点对应）
const bgNodes = [
  { x: 200, y: 780, dur: '3s' },
  { x: 860, y: 560, dur: '2.4s' },
  { x: 300, y: 260, dur: '3.4s' },
  { x: 1380, y: 380, dur: '2.8s' },
  { x: 1460, y: 700, dur: '3.8s' },
]
</script>

<style scoped lang="scss">
.login-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;

  .link-line {
    stroke-dasharray: 14 22;
    animation: linkFlow 4s linear infinite;

    &:nth-of-type(2) {
      animation-duration: 5s;
    }
    &:nth-of-type(3) {
      animation-duration: 6s;
    }
    &:nth-of-type(4) {
      animation-duration: 4.5s;
    }
    &:nth-of-type(5) {
      animation-duration: 7s;
    }
    &:nth-of-type(6) {
      animation-duration: 5.5s;
    }
  }
}

@keyframes linkFlow {
  to {
    stroke-dashoffset: -288;
  }
}
</style>
