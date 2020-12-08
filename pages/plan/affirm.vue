<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar 
			title="确认信息"
			:is-arrow="true"
			text-align="center"
		/>
		<!-- 导航栏 end -->
		<!-- 用户信息 start -->
		<view class="userinfo">
			<view class="title">
				报读详情
			</view>
			<view class="item">
				<view class="label">
					姓名
				</view>
				<view class="value">
					{{ formData.name }}                           
				</view>
			</view>
			<view class="item">
				<view class="label">
					性别
				</view>
				<view class="value">
					{{ formData.sex === 0 ? '女' : '男' }}
				</view>
			</view>
			<view class="item">
				<view class="label">
					身份证号
				</view>
				<view class="value">
					{{ formData.card }}
				</view>
			</view>
			<view class="item">
				<view class="label">
					报读类型
				</view>
				<view class="value">
					{{ formData.title }}
				</view>
			</view>
			<view class="item">
				<view class="label">
					年级
				</view>
				<view class="value">
					{{ formData.year }}
				</view>
			</view>
			<view class="item">
				<view class="label">
					层次
				</view>
				<view class="value">
					{{ formData.levelName }}
				</view>
			</view>
			<view class="item">
				<view class="label">
					院校
				</view>
				<view class="value">
					{{ formData.schoolName }}
				</view>
			</view>
			<view class="item">
				<view class="label">
					专业
				</view>
				<view class="value">
					{{ formData.majorName }}
				</view>
			</view>
			<view class="item">
				<view class="label">
					考试县区
				</view>
				<view class="value">
					{{ formData.counties }}
				</view>
			</view>
		</view>
		<!-- 用户信息 end -->
		<!-- 报读须知 start -->
		<view class="notice">
			<view class="title">
				报读须知
			</view>
			<rich-text :nodes="nodes"></rich-text>
		</view>
		<!-- 报读须知 end -->
		<!-- 按钮 start -->
		<button class="button" hover-class="none" @click="next">提交信息</button>
		<!-- 按钮 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import { plan_affirm, plan_notice } from '@/common/api/api.js'
	export default {
		name: 'Affirm',
		components: {
			XesNavbar
		},
		data() {
			return {
				nodes: '',
				formData: {
					apply_type: '',
					card: '',
					city: '',
					counties: '',
					level: '',
					levelName: '',
					major: '',
					majorName: '',
					name: '',
					school: '',
					schoolName: '',
					sex: '',
					title: '',
					year: ''
				}
			}
		},
		onLoad() {
			this.formData = uni.getStorageSync('formData')
			console.log(this.formData)
			this.toData()
		},
		methods: {
			async toData() {
				uni.showLoading({
					title: '加载中...'
				})
				
				const response = await plan_notice()
				const { content } = response.data.data
				this.nodes = content
				
				uni.hideLoading()
			},
			async next() {
				uni.showLoading({
					title: '信息提交中...'
				})
				
				const response = await plan_affirm({
					name: this.formData.name,
					idno: this.formData.card,
					profession_id: uni.getStorageSync('profession_id'),
					sex: this.formData.sex,
					apply_type: this.formData.apply_type,
					year: this.formData.year,
					school: this.formData.school,
					level: this.formData.level,
					major: this.formData.major,
					city: this.formData.city,
					counties: this.formData.counties
				})
				
				uni.hideLoading()
				
				uni.showToast({
					icon: 'none',
					title: '提交成功'
				})
				
				setTimeout(() => {
					uni.navigateTo({
						url: '/pages/plan/success'
					})
				}, 1500)
			}
		}
	}
</script>

<style lang="scss">
	.container {
		background-color: #F4F7F9;
	}
	// 用户信息
	.userinfo {
		background-color: #fff;
		padding: 32upx;
		
		.title {
			font-size: 32upx;
			font-weight: bold;
			color: #303133;
			margin-bottom: 32upx;
		}
		
		.item {
			display: flex;
			margin-bottom: 32upx;
			
			.label {
				width: 120upx;
				font-size: 28upx;
				font-weight: 500;
				color: #909399;
				margin-right: 78upx;
			}
			
			.value {
				font-size: 28upx;
				font-weight: 500;
				color: #303133;
			}
		}
	}
	// 报读须知
	.notice {
		background-color: #F4F7F9;
		padding: 32upx 32upx 120upx;
		
		.title {
			font-size: 32upx;
			font-weight: bold;
			color: #303133;
			margin-bottom: 28upx;
		}
	}
	// 按钮
	.button {
		width: 100%;
		height: 100upx;
		line-height: 100upx;
		font-size: 32upx;
		font-weight: 500;
		color: #FFFFFF;
		background-color: #1283FF;
		border-radius: 0;
		margin-top: 63upx;
		position: fixed;
		bottom: 0;
		left: 0;
	}
</style>
