import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'

export default function createComponents() {
  return Components({
    resolvers: [
      ElementPlusResolver(),
      IconsResolver({
        enabledCollections: ['mdi'],
      }),
    ],
    dts: 'src/types/components.d.ts',
  })
}
