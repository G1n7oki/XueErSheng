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
					吴彦祖                           
				</view>
			</view>
			<view class="item">
				<view class="label">
					性别
				</view>
				<view class="value">
					男
				</view>
			</view>
			<view class="item">
				<view class="label">
					身份证号
				</view>
				<view class="value">
					360441199901210011
				</view>
			</view>
			<view class="item">
				<view class="label">
					报读类型
				</view>
				<view class="value">
					2021级筑梦计划2
				</view>
			</view>
			<view class="item">
				<view class="label">
					年级
				</view>
				<view class="value">
					2021
				</view>
			</view>
			<view class="item">
				<view class="label">
					层次
				</view>
				<view class="value">
					1>专科升本科类
				</view>
			</view>
			<view class="item">
				<view class="label">
					院校
				</view>
				<view class="value">
					南昌大学
				</view>
			</view>
			<view class="item">
				<view class="label">
					专业
				</view>
				<view class="value">
					计算机科学与技术
				</view>
			</view>
			<view class="item">
				<view class="label">
					考试县区
				</view>
				<view class="value">
					青山湖区
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
	import { plan_affirm } from '@/common/api/api.js'
	export default {
		name: 'Affirm',
		components: {
			XesNavbar
		},
		data() {
			return {
				nodes: '<ol>' +
				'<li>报名成人高考需年满17周岁。</li>' +
				'<li>报读高起专（专科）须具有高中（含中专、中技）或以上学历。</li>' +
				'<li>报读专升本（本科）需为专科应届毕业生或者已取得大专或以上学历。</li>' +
				'<li>报读须提供合法有效证件（包括但不限于本人证件照、身份证正反面复印件、毕业证复印件等）。</li>' +
				'<li>若提供虚假证件、一经查实将取消报考资格</li>' +
				'<li>教材费缴纳后不予退还</li>' +
				'<li>学尔升教育严格按照高校要求办学，入学后需认真上课、做作业和考试。</li>' +
				'</ol>'
			}
		},
		methods: {
			async next() {
				uni.showLoading({
					title: '信息提交中...'
				})
				
				const response = await plan_affirm({
					name: '胡图图',
					idno: '110101199003072375',
					profession_id: uni.getStorageSync('profession_id'),
					sex: '1',
					apply_type: '1',
					year: '2021',
					school: '1',
					level: '1',
					major: '1',
					city: '南昌',
					counties: '青山湖'
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
