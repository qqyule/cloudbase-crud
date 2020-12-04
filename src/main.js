import Vue from 'vue'
import App from './App.vue'
import {
	Button,
	Col,
	Row,
	List,
	Cell,
	CellGroup,
	Field,
	Toast,
	Tag,
} from 'vant'
import 'vant/lib/index.css'

Vue.use(Button)
Vue.use(Col)
Vue.use(Row)
Vue.use(List)
Vue.use(CellGroup)
Vue.use(Cell)
Vue.use(Field)
Vue.use(Toast)
Vue.use(Tag)

Vue.config.productionTip = false

new Vue({
	render: (h) => h(App),
}).$mount('#app')
