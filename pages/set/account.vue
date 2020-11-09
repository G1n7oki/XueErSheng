<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar 
			title="账号设置"
			text-align="center"
			:is-arrow="true"
		/>
		<!-- 导航栏 end -->
		<!-- 账号设置 start -->
		<view class="list">
			<view class="list-item" @click="setAvatar">
				<view class="name">
					修改头像
				</view>
				<view class="icon">
					<image class="avatar" :src="avatar" mode=""></image>
					<uni-icons type="arrowright" size="20" color="#DEDEDE" />
				</view>
			</view>
			<view class="list-item" @click="toPage('/pages/set/nickname?nickname=' + nickname)">
				<view class="name">
					昵称
				</view>
				<view class="icon">
					<view class="text">
						{{ nickname }}
					</view>
					<uni-icons type="arrowright" size="20" color="#DEDEDE" />
				</view>
			</view>
			<view class="list-item">
				<view class="name">
					手机号
				</view>
				<view class="icon">
					<view class="text" style="margin-right: 20rpx;">
						{{ mobile }}
					</view>
				</view>
			</view>
			<view class="list-item" @click="toPage('/pages/login/modify?mobile=' + realMobile)">
				<view class="name">
					修改密码
				</view>
				<view class="icon">
					<uni-icons type="arrowright" size="20" color="#DEDEDE" />
				</view>
			</view>
		</view>
		<!-- 账号设置 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import UniIcons from '@/components/uni-icons/uni-icons.vue'
	import { userinfo } from '@/common/api/api.js'
	import { baseUrl } from '@/common/config/config.js'
	export default {
		name: 'SetAccount',
		components: {
			XesNavbar,
			UniIcons
		},
		data() {
			return {
				avatar: '',
				mobile: '',
				nickname: '',
				realMobile: ''
			}
		},
		onLoad() {
			this.toData()
		},
		methods: {
			toData() {
				uni.showLoading({
					title: '加载中...'
				})
				userinfo().then(response => {
					const res = response.data.data
					this.avatar = res.avatars
					this.mobile = res.login_tel
					this.nickname = res.username
					this.realMobile = res.reg_tel
					uni.hideLoading()
				}).catch(error => {
					uni.hideLoading()
				})
			},
			// 设置头像
			setAvatar() {
				const that = this
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					success(image) {
						uni.uploadFile({
							url: baseUrl + 'users/avatars',
							filePath: image.tempFilePaths[0],
							name: 'image',
							header: {
								'X-Requested-With': 'XMLHttpRequest',
								'Authorization': uni.getStorageSync('token')
							},
							complete(response) {
								const res = JSON.parse(response.data)
								if(res.code === 200) {
									that.avatar = res.data.url + '?t=' + Date.now()
								} else if (res.code === 422) {
									uni.showToast({
										icon: 'none',
										title: res.message
									})
									setTimeout(() => {
										uni.navigateTo({
											url: '/pages/login/index'
										})
									}, 1500)
								} else {
									uni.showToast({
										icon: 'none',
										title: res.message
									})
								}
							}
						})
					}
				})
			},
			// 路由跳转
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
