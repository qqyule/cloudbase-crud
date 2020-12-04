// 腾讯云开发云函数CRUD
import cloudbase from '@cloudbase/js-sdk'

// 初始化云环境
const app = cloudbase.init({
	env: 'cloud-2g4rrm1b135d8280',
})

// 匿名登录
const auth = app.auth({
	persistence: 'session',
})

auth
	.anonymousAuthProvider()
	.signIn()
	.then(() => {
		// 登录成功
	})
	.catch((err) => {
		// 登录失败
	})

/**
 * 查询文档
 * @date 2020-12-04
 * @param {string} dbName
 * @param {object} data={}
 * @returns {object}
 */
export async function get(dbName, data = {}) {
	const { where, order, pageNum, pageSize, filter } = data
	const res = await app.callFunction({
		name: 'db',
		data: {
			method: 'get',
			dbName,
			where: where ? where : {},
			order: order ? order : ['createTime', 'desc'], // 默认按添加时间倒序
			pageNum: pageNum ? pageNum : 1, // 默认第一页
			pageSize: pageSize ? pageSize : 30, // 默认最多获取30条数据
			filter: filter ? filter : [], // 过滤字段
		},
	})
	return res.result
}

/**
 * 添加文档
 * @date 2020-12-04
 * @param {string} dbName
 * @param {object} formdata
 * @returns {object}
 */
export async function add(dbName, formdata) {
	const res = await app.callFunction({
		name: 'db',
		data: {
			method: 'add',
			dbName,
			formdata,
		},
	})
	return res.result
}

/**
 * 更新文档
 * @date 2020-12-04
 * @param {string} dbName
 * @param {string} id
 * @param {object} formdata
 * @returns {object}
 */
export async function update(dbName, id, formdata) {
	const res = await app.callFunction({
		name: 'db',
		data: {
			method: 'update',
			dbName,
			id,
			formdata,
		},
	})
	return res.result
}

/**
 * 删除文档
 * @date 2020-12-04
 * @param {string} dbName
 * @param {string} id
 * @returns {object}
 */
export async function remove(dbName, id) {
	const res = await app.callFunction({
		name: 'db',
		data: {
			method: 'delete',
			dbName,
			id,
		},
	})
	return res.result
}
