import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import App from './App.vue'
import router from './router'
import store from './store/store'
import BaseIcon from '@/components/BaseIcon'
import 'nprogress/nprogress.css'

Vue.component('BaseIcon', BaseIcon)

Vue.config.productionTip = false

//Automatically register globally all the components started by Base in the folder components
const requireComponent = require.context(
  './components',
  false,
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
  )

  Vue.component(componentName, componentConfig.default || componentConfig)
})
//Finish global register

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
