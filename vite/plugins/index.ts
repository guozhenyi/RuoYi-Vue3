import vue from '@vitejs/plugin-vue'

import createAutoImport from './auto-import'
import createComponents from './components'
import createSvgIcon from './svg-icon'
import createSetupExtend from './setup-extend'
import { PluginOption } from 'vite'

export default function createVitePlugins(viteEnv: Record<string, string>, isBuild = false) {
  const vitePlugins: PluginOption[] = [vue()]
  vitePlugins.push(createAutoImport())
  vitePlugins.push(createComponents())
  vitePlugins.push(createSetupExtend())
  vitePlugins.push(createSvgIcon(isBuild))
  return vitePlugins
}
