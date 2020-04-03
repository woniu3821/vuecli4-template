import Vue from 'vue'
import { Message } from 'iview'

import { emitterMixins } from 'utils'

import message from '@/libs/mixins/message'

import '@/libs/icons'

/**
 * 注册全局组件
 */
const contexts = require.context('../components/global', false, /\.vue$/)
contexts.keys().forEach(component => {
  const componentEntity = contexts(component).default
  // 使用内置的组件名称 进行全局组件注册
  Vue.component(componentEntity.name, componentEntity)
})

/**
 * 注册全局mixins
 */

Vue.mixin(message)

Vue.mixin(emitterMixins)

Message.config({
  duration: 3
})
