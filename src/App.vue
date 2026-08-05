<template>
  <!-- 全局配置 element-plus 中文语言与组件大小（large、default、small） -->
  <el-config-provider :locale="zhCn" :size="size">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import useAppStore from '@/store/modules/app'
import useSettingsStore from '@/store/modules/settings'
import { handleThemeStyle } from '@/utils/theme'

const size = computed(() => useAppStore().size as 'large' | 'default' | 'small')

onMounted(() => {
  nextTick(() => {
    // 初始化主题样式
    handleThemeStyle(useSettingsStore().theme)
  })
})
</script>
