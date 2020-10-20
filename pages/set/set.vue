<template>
	<view class="contaier">
		<!-- 导航栏 start -->
		<xes-navbar 
			title="设置"
			text-align="center"
			:is-arrow="true"
		/>
		<!-- 导航栏 end -->
		<!-- 开启非wifi环境下播放 start -->
		<view class="list">
			<view class="list-item">
				<view class="name">
					非Wifi环境下播放视频和直播
				</view>
				<switch 
					class="switch"
					:checked="checked"
					color="#1284FF"
					@change="toogleNetwork"
				/>
			</view>
		</view>
		<!-- 开启非wifi环境下播放 end -->
		<!-- 账号设置/地址管理 start -->
		<view class="list">
			<view class="list-item" @click="toPage('/pages/set/account')">
				<view class="name">
					账号设置
				</view>
				<view class="icon">
					<uni-icons type="arrowright" size="20" color="#DEDEDE" />
				</view>
			</view>
			<view class="list-item">
				<view class="name">
					地址管理
				</view>
				<view class="icon">
					<uni-icons type="arrowright" size="20" color="#DEDEDE" />
				</view>
			</view>
		</view>
		<!-- 账号设置/地址管理 end -->
		<!-- 退出登录 start -->
		<button class="logout-button" hover-class="none" @click="handleLogout">退出登录</button>
		<!-- 退出登录 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import UniIcons from '@/components/uni-icons/uni-icons.vue'
	import { logout } from '@/common/api/api.js'
	export default {
		name: 'Set',
		components: {
			XesNavbar,
			UniIcons
		},
		data() {
			return {
				checked: uni.getStorageSync('wifi'),
				timer: null
			}
		},
		onUnload() {
			clearTimeout(this.timer)
		},
		methods: {
			// 是否开启非wifi环境下播放视频
			toogleNetwork(e) {
				this.checked = e.target.value
				uni.setStorageSync('wifi', e.target.value)
			},
			// 退出
			handleLogout() {
				logout().then(response => {
					uni.showToast({
						icon: 'none',
						title: '退出成功'
					})
					this.timer = setTimeout(() => {
						uni.removeStorageSync()
						uni.navigateTo({
							url: '/pages/login/index'
						})
					}, 1500)
				}).catch(error => {
					
				})
			},
			// 页面跳转
			toPage(url) {
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/set.scss'
</style>
