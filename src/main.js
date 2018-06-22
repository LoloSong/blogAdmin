import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import '@/router/permission'
import '@/assets/css/index.scss'

// element UI
import {
  Row,
  Col,
  Menu,
  Submenu,
  MenuItem,
  Breadcrumb,
  BreadcrumbItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Scrollbar,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Button,
  Message,
  Table,
  TableColumn,
  Pagination,
  Dialog,
  Loading,
  Notification,
  MessageBox
} from 'element-ui'

import highlight from '@/directive/highlight'

Vue.use(Row).use(Col).use(Menu).use(Submenu).use(MenuItem).use(Breadcrumb).use(BreadcrumbItem).use(Dropdown).use(DropdownMenu).use(DropdownItem).use(Scrollbar).use(Form).use(FormItem).use(Input).use(Select).use(Option).use(Button).use(Table).use(TableColumn).use(Pagination).use(Dialog).use(Loading.directive)
Vue.use(highlight)
Vue.prototype.$message = Message
Vue.prototype.$notify = Notification
Vue.prototype.$MessageBox = MessageBox
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
