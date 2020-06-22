// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './router/pemission'
import store from './store'
import '@/icons'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import 'element-ui/lib/theme-chalk/base.css'
import '@/styles/index.scss'

import {
  Button,
  Row,
  Col,
  Form,
  FormItem,
  Input,
  Message,
  MessageBox,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Steps,
  Step,
  Upload,
  Table,
  TableColumn,
  Dialog,
  Select,
  Option,
  DatePicker,
  Tooltip,
  Divider,
  Drawer,
  Loading,
} from 'element-ui'

import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
locale.use(lang)
Vue.component(DatePicker.name, DatePicker)
Vue.component(CollapseTransition.name, CollapseTransition)

Vue
  .use(Button)
  .use(Row)
  .use(Col)
  .use(Form)
  .use(FormItem)
  .use(Input)
  .use(Dropdown)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Steps)
  .use(Step)
  .use(Upload)
  .use(Table)
  .use(TableColumn)
  .use(Dialog)
  .use(Select)
  .use(Option)
  .use(DatePicker)
  .use(Tooltip)
  .use(Divider)
  .use(Drawer)
  .use(Loading)

Vue.use(Loading.directive)

Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
