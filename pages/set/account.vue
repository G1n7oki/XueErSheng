<template>
	<view class="contaier">
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
					<image class="avatar" src="" mode=""></image>
					<uni-icons type="arrowright" size="20" color="#DEDEDE" />
				</view>
			</view>
			<view class="list-item" @click="toPage('/pages/set/nickname')">
				<view class="name">
					昵称
				</view>
				<view class="icon">
					<view class="text">
						学员_122100112
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
						18870322365
					</view>
				</view>
			</view>
			<view class="list-item">
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
	export default {
		name: 'SetAccount',
		components: {
			XesNavbar,
			UniIcons
		},
		methods: {
			// 设置头像
			setAvatar() {
				uni.chooseImage({
					sizeType: ['compressed'],
					success(image) {
						console.log(image)
						
						uni.uploadFile({
							
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
