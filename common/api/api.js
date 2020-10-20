import http from '@/tools/request/interface.js'

/**
 * 将业务所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 */

/**
 * 以下为登录模块接口
 * */
// 微信手机登录
export const wx_login = (data) => {
	return http.request({
		url: 'mini',
		method: 'POST', 
		data
	})
}

// 获取手机验证码
export const seccode = (data) => {
	return http.request({
		url: 'verifycode',
		method: 'POST', 
		data
	})
}

// 验证码登录
export const seccode_login = (data) => {
	return http.request({
		url: 'codelogin',
		method: 'POST', 
		data
	})
}

// 账号密码登录
export const login = (data) => {
	return http.request({
		url: 'login',
		method: 'POST', 
		data
	})
}

// 退出登录
export const logout = (data) => {
	return http.request({
		url: 'logout',
		method: 'GET', 
		data
	})
}

/**
 * 以下选择专业接口
 * */
 
// 选择专业
export const professional = (data) => {
	return http.request({
		url: 'professions',
		method: 'GET',
		data
	})
}

/**
 * 以下选择专业接口
 * */

// 首页
export const home = (data) => {
	return http.request({
		url: 'index',
		method: 'GET',
		data
	})
}

// 全部课程
export const courses = (data) => {
	return http.request({
		url: 'courses',
		method: 'GET',
		data
	})
}

// 我的课程
export const me_course = (data) => {
	return http.request({
		url: 'course',
		method: 'GET',
		data
	})
}

// 我的直播课
export const me_live = (data) => {
	return http.request({
		url: 'live',
		method: 'GET',
		data
	})
}

// 课程信息
export const course_info = (data) => {
	return http.request({
		url: `courses/${data}`,
		method: 'GET'
	})
}

// 课程章节
export const course_chapter = (data) => {
	return http.request({
		url: 'courses/chapter',
		method: 'GET',
		data
	})
}

/**
 * 以下为我的模块接口
 * */

// 当前用户信息
export const userinfo = (data) => {
	return http.request({
		url: 'users/info',
		method: 'GET',
		data
	})
}

/**
 * 以下为题库模块接口
 * */
 
// 题库练习
export const question = (data) => {
	return http.request({
		url: 'question',
		method: 'GET',
		data
	})
}

// 章节精练
export const refine = (data) => {
	return http.request({
		url: 'refine',
		method: 'GET',
		data
	})
}

/**
 * 以下为订单模块接口
 * */
 // 订单信息
 export const order_information = (data) => {
	 return http.request({
		 url: 'order/preview',
		 method: 'GET',
		 data
	 })
 }