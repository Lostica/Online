import Vue from 'vue'
import Element from 'element-ui'
import {Message} from 'element-ui'
import {MessageBox} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Element)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
