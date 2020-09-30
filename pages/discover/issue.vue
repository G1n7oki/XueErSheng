<template>
	<view class="contaier">
		<NavBar
			title="发布圈子"
			:is-arrow="true"
			text-align="center"
		/>
		<textarea value="" placeholder="灵感稍纵即逝，赶紧记录下来吧~" />
		<view class="">
			添加照片
		</view>
		<view class="tips">
			小提示:个人发布的信息，将在圈子中出现
		</view>
		<uButton text="发布" />
	</view>
</template>

<script>
	import NavBar from '@/components/nav-bar/NavBar.vue'
	import uButton from '@/components/u-button/uButton.vue'
	export default {
		name: 'Issue',
		components: {
			NavBar,
			uButton
		},
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/issue.scss'
</style>
