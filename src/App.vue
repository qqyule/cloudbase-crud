<template>
	<div id="app">
		<div class="btn">
			<van-button type="primary" @click="getList">查询</van-button>
			<van-button type="primary" @click="addItem">增加</van-button>

			<van-button type="primary" @click="updateItem()">修改</van-button>
			<van-button type="primary" @click="deleteItem">删除</van-button>
		</div>

		<van-cell-group>
			<van-field v-model="item.name" label="name" placeholder="输入用户名" />
			<van-field v-model.number="item.age" label="age" placeholder="输入年龄" />
			<van-field v-model="id" label="id" placeholder="修改时输入" />
		</van-cell-group>

		<van-list class="list">
			<van-cell title="name" value="age"></van-cell>
			<van-cell
				v-for="item in userList"
				:key="item._id"
				:value="item.age"
				:label="item._id"
			>
				<template #title>
					<span class="custom-title">{{ item.name }}--</span>
					<van-tag type="danger" @click="deleteItem(item._id)">删除</van-tag>
				</template>
			</van-cell>
		</van-list>
	</div>
</template>

<script>
import { get, add, update, remove } from '@/utils/db'

export default {
	data() {
		return {
			dbShow: false,
			userList: null,
			item: {
				name: '',
				age: '',
			},
			id: '',
		}
	},
	created() {},
	methods: {
		async getList() {
			this.$toast.loading({
				message: '加载中...',
				duration: 0,
				forbidClick: true,
			})
			// 参数可为空
			const options = {
				// order: ['age', 'asc'],
				// where: {
				// 	name: 'laoda',
				// },
				// pageNum: 2,
				// pageSize: 3,
				// filter: ['_id', 'age'],
			}

			// user为数据库表名,必须传参
			const res = await get('user', options)
			this.$toast.clear()
			this.userList = res.data
		},
		async addItem() {
			const res = await add('user', this.item)
			console.log(res)
			this.getList()
		},
		async updateItem() {
			const res = await update('user', this.id, this.item)
			console.log(res)
			this.getList()
		},
		async deleteItem(id) {
			const res = await remove('user', id)
			console.log(res)
			this.getList()
		},
	},
}
</script>

<style>
#app {
	padding: 100px 20%;
	background: #efefef;
}
#app .van-button {
	margin-right: 20px;
}
.btn {
	margin-bottom: 20px;
}
.list {
	margin-top: 20px;
}
</style>
