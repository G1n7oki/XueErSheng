export const showToast = (str) => {
	uni.showToast({
		icon: 'none',
		title: str
	})
}

// 生成当前日期向前推7天的时间
export const generateWeekly = () => {
	let week = []
	// 得到当前的时间戳
	const timestamp = Date.now()
	// 循环获得当前时间向前推7天的时间戳
	Array.from(new Array(7)).map((_, i) => {
		const weekTimestamp = new Date(timestamp - i * 24 * 60 * 60 * 1000)
		// 整成自己需要的样式
		const date = String(weekTimestamp.getMonth() + 1) + '.' + String(new Date(weekTimestamp).getDate())
		// 倒序插入
		week.unshift(date)
	})
	return week
}
// 毫秒转小时
export const msec2hour = (ms) => {
	return Math.ceil(ms / 1000 / 60 / 60) + 'h'
}
// 毫秒转天数
export const msec2day = (ms) => {
	return Math.ceil(ms / 1000 / 60 / 60 / 24)
}
