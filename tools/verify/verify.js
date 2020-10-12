// 验证手机
export const isMobile = (mobile) => {
	const reg = /^1[3456789]\d{9}$/
	return reg.test(mobile)
}