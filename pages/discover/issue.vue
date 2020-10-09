<template>
	<view class="contaier">
		<XesNavbar
			title="发布圈子"
			:is-arrow="true"
			text-align="center"
		/>
		<textarea value="" placeholder="灵感稍纵即逝，赶紧记录下来吧~" />
		<view class="image-group">
			<image src="/static/image/discover/add@2x.png" mode=""></image>
		</view>
		<view class="tips">
			小提示:个人发布的信息，将在圈子中出现
		</view>
		<uButton text="发布" />
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import uButton from '@/components/u-button/uButton.vue'
	export default {
		name: 'Issue',
		components: {
			XesNavbar,
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
