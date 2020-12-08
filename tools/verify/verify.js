/**
 * @description 验证手机
 * @param {String} mobile
 * @return {Boolean}
 * */
export const isMobile = (mobile) => {
	const reg = /^1[3456789]\d{9}$/
	return reg.test(mobile)
}

/**
 * @description 验证身份证
 * @param {String} value
 * @return {Boolean}
 * */
export const isIdentity = (value) => {
	const reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/
	return reg.test(value)
}

