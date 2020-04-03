// const autoImportRoutes = []

// const contexts = require.context('@views', false, /\.vue$/)

// contexts.keys().forEach(component => {
//   const componentEntity = contexts(component).default
//   // 使用内置的组件名称 进行全局组件注册
//   const { name, meta } = componentEntity

//   if (!name) throw 'views中组件名称不能为空。'

//   autoImportRoutes.push({
//     path: `/${name}`,
//     name,
//     meta: { ...meta },
//     component: resolve => resolve(componentEntity)
//   })
// })

export const routes = [
  {
    path: '/LogAudit',
    name: 'LogAudit',
    component: resolve => require(['@/components/HelloWorld.vue'], resolve),
    children: []
  }
]

// export const routes = autoImportRoutes
