import http from '@/tools/request/interface.js'

/**
 * 将业务所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 */

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

// 选择专业
export const professional = (data) => {
	return http.request({
		url: 'professions',
		method: 'GET',
		data
	})
}

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

// 当前用户信息
export const userinfo = (data) => {
	return http.request({
		url: 'users/info',
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