<template>
	<view class="contaier">
		<NavBar
			title="发现详情"
			:is-arrow="true"
			text-align="center"
		/>
		<view class="top-half-part">
			<view class="detail-title">{{ info.title }}</view>
			<view class="space-between">
				<view class="avatar-name">
					<image class="avatar" src="/static/image/login/close.png" mode=""></image>
					<view class="name">{{ info.name }}</view>
				</view>
				<view class="date">
					<view class="line"></view>
					<view class="text">{{ info.date }}</view>
				</view>
			</view>
			<rich-text :nodes="info.strings"></rich-text>
			<view class="praise">
				<image class="icon" src="" mode=""></image>
				<view class="number">162</view>
			</view>
		</view>
		<view class="split-line"></view>
		<view class="chat">
			
		</view>
	</view>
</template>

<script>
	import NavBar from '@/components/nav-bar/NavBar.vue'
	import Json from '@/static/data.json'
	export default {
		name: 'DiscoverDetail',
		components: {
			NavBar
		},
		data() {
			return {
				info: {}
			}
		},
		onLoad() {
			this.info = Json.discover.detail
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/discover-detail.scss'
</style>
