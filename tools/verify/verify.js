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
	const reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
	return reg.test(value)
}

