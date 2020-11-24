<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar 
			title="添加地址"
			text-align="center"
			:is-arrow="true"
		/>
		<!-- 导航栏 end -->
		<!-- 编辑信息 start -->
		<view class="edit-wrap">
			<view class="input-area">
				<view class="name">
					收货人
				</view>
				<input v-model="username" class="input" type="text" value="" placeholder="请输入姓名" />
			</view>
			<view class="input-area">
				<view class="name">
					手机号码
				</view>
				<input v-model="mobile" class="input" type="text" value="" placeholder="请输入手机号码" />
			</view>
			<view class="input-area">
				<view class="name">
					所在地区
				</view>
				<picker class="picker" mode="region" @change="chooseRegion">
					{{ range }}
				</picker>
				<view class="icon">
					<uni-icons type="arrowright" size="20" color="#C0C4CC" />
				</view>
			</view>
			<view class="input-area">
				<view class="name">
					详细地址
				</view>
				<input v-model="address" class="input" type="text" value="" placeholder="请输入详细地址" />
			</view>
		</view>
		<!-- 编辑信息 end -->
		<!-- 设为默认地址 start -->
		<view class="default">
			<view class="name">
				设为默认地址
			</view>
			<switch class="switch" color="#1283FF" @change="change"/>
		</view>
		<!-- 设为默认地址 end -->
		<!-- 按钮 start -->
		<view class="button" @click="hanleComplete">
			<u-button text="完成" />
		</view>
		<!-- 按钮 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import UniIcons from '@/components/uni-icons/uni-icons.vue'
	import uButton from '@/components/u-button/uButton.vue'
	import { isMobile } from '@/tools/verify/verify.js'
	import { set_address } from '@/common/api/api.js'
	export default {
		name: 'Edit',
		components: {
			XesNavbar,
			UniIcons,
			uButton
		},
		data() {
			return {
				id: undefined,
				username: '', // 用户姓名
				mobile: '', // 电话
				range: '江西省 南昌市 青山湖区', // 省市区
				address: '', // 详细地址
				flag: 0
			}
		},
		methods: {
			chooseRegion(e) {
				this.range = e.detail.value.join(' ')
			},
			change(e) {
				this.flag = Number(e.detail.value)
			},
			// 点击完成
			async hanleComplete() {
				if (this.username === '') {
					uni.showToast({
						icon: 'none',
						title: '请填写收货人姓名'
					})
					return false
				}
				
				if (!isMobile(this.mobile)) {
					uni.showToast({
						icon: 'none',
						title: '请填写正确的手机号码'
					})
					return false
				}
				
				if (this.address === '') {
					uni.showToast({
						icon: 'none',
						title: '请填写详细地址'
					})
					return false
				}
				
				const response = await set_address({
					name: this.username,
					phone: this.mobile,
					province: this.range,
					full_address: this.address,
					is_default: this.flag
				})
				
				uni.showToast({
					icon: 'none',
					title: '添加成功'
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		background-color: #F4F7F9;
	}
	// 编辑信息
	.edit-wrap {
		background-color: #fff;
		
		.input-area {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-left: 32upx;
			padding: 32upx 0;
			border-bottom: 1px solid #DEDEDE;
			
			&:nth-last-child(1) {
				border-bottom: none;
			}
			
			.name {
				font-size: 28upx;
				font-weight: 500;
				color: #303133;
			}
			
			.input {
				width: 386upx;
				text-align: right;
				padding-right: 32upx;
				font-size: 28upx;
				font-weight: 500;
				color: #303133;
			}
			
			.picker {
				flex: 1;
				font-size: 28upx;
				font-weight: 500;
				color: #303133;
				text-align: right;
				margin-right: 14upx;
			}
			
			.icon {
				margin-right: 20upx;
			}
		}
	}
	// 设为默认地址
	.default {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;
		padding: 32upx;
		margin-top: 20upx;
		
		.name {
			font-size: 28upx;
			font-weight: 500;
			color: #303133;
		}
		
		.switch {
			transform: scale(.7, .7);
		}
	}
	// 按钮
	.button {
		padding: 0 32upx;
		box-sizing: border-box;
	}
</style>
