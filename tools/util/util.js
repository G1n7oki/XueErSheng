export const showToast = (str) => {
	uni.showToast({
		icon: 'none',
		title: str
	})
}

/**
 * @description 身份证截取生日信息
 * @param {String} value
 * @return {Boolean}
 * */
 export const birthdayOfId = id => {
	let birthday = ''
	if (id.length === 15) { // 15位身份证
		birthday = "19" + id.substr(6, 6)
	} else {
		birthday = id.substr(6,8)
	}
	 
	birthday = birthday.replace(/(.{4})(.{2})/,"$1-$2-")
	
	return birthday
 }
