<template>
	<view class="container">
		<view class="container-inner">
			<xes-navbar title="我的" :margin="32" />
			<!-- 卡片信息 start -->
			<view class="info-card">
				<view class="info">
					<image class="avatar" :src="info.avatars" mode=""></image>
					<view class="username-mobile">
						<view class="username" @click="handleLogin">
							{{ login ? info.username : '登陆/注册' }}
						</view>
						<view class="mobile">
							{{ login ? info.login_tel : '登陆之后可查看个人信息' }}
						</view>
					</view>
				</view>
				<navigator url="/pages/me/sign" hover-class="none" class="tips">
					签到领福利
				</navigator>
				<view class="content" v-if="login">
					<navigator url="/pages/me/card" hover-class="none" class="item">
						<view class="number">
							25
						</view>
						<view class="text">
							卡包
						</view>
					</navigator>
					<view class="line"></view>
					<navigator url="/pages/me/recharge" hover-class="none" class="item">
						<view class="number">
							628
						</view>
						<view class="text">
							学币
						</view>
					</navigator>
					<view class="line"></view>
					<navigator url="/pages/integral/integral" hover-class="none" class="item">
						<view class="number">
							221
						</view>
						<view class="text">
							积分
						</view>
					</navigator>
				</view>
			</view>
			<!-- 卡片信息 end -->
			<!-- 我的学习 start -->
			<view class="me-study">
				<title name="我的学习" />
				<view class="box">
					<navigator url="/pages/me/teacher" class="item">
						<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/me/banzhuren%402x.png" mode=""></image>
						<view class="text">我的班主任</view>
					</navigator>
					<view class="item">
						<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/me/ai%402x.png" mode=""></image>
						<view class="text">AI智能评估</view>
					</view>
					<navigator url="/pages/me/course" hover-class="none" class="item">
						<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/me/wodekecheng%402x.png" mode=""></image>
						<view class="text">我的课程</view>
					</navigator>
					<navigator url="/pages/study/record" hover-class="none" class="item">
						<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/me/xuexijilu%402x.png" mode=""></image>
						<view class="text">学习记录</view>
					</navigator>
				</view>
			</view>
			<!-- 我的学习 end -->
			<!-- 我的学籍 start -->
			<view class="me-status">
				<title name="我的学籍" />
				<view class="box">
					<image class="amend" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/me/xiugai%402x.png" mode=""></image>
					<view class="university">
						<image class="logo" src="http://dummyimage.com/114x114" mode=""></image>
						<view class="info">
							<view class="name">
								[2021级] 南昌大学
							</view>
							<view class="item">
								专业：工商企业管理 [本科]                       
							</view>
							<view class="item">
								状态：意向学员
							</view>
							<view class="item">
								类型：2021级筑梦计划2  
							</view>
						</view>
					</view>
					<view class="button-group">
						<button class="button-1" @click="toPage('/pages/me/transcript')">成绩单</button>
						<button class="button-2" @click="toPage('/pages/me/course')">去学习</button>
						<button class="button-3">去缴费</button>
					</view>
				</view>
			</view>
			<!-- 我的学籍 end -->
			<!-- 列表1 start -->
			<view class="list">
				<list-item
					icon="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/me/wodedingdan%402x.png"
					name="我的订单"
					url="/pages/order/order"
				/>
				<list-item
					icon="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/me/wodewenda%402x.png"
					name="我的问答"
					url="/pages/issue/issue"
				/>
				<!-- <list-item
					icon="/static/image/me/wodehuancun@2x.png"
					name="我的缓存"
				/> -->
				<list-item
					icon="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/me/wodeshoucang%402x.png"
					name="我的收藏"
					url="/pages/me/favorite"
				/>
				<list-item
					icon="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/me/wodedingdan%402x.png"
					name="积分商城"
					url="/pages/integral/integral"
					:is-border="false"
				/>
			</view>
			<!-- 列表1 end -->
			<!-- 列表2 start -->
			<view class="list">
				<list-item
					icon="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/me/bangzhuyufankuio%402x.png"
					name="帮助与反馈"
					url="/pages/me/help"
				/>
				<list-item
					icon="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/me/guanyuwomen%402x.png"
					name="关于我们"
					url="/pages/me/about"
				/>
				<list-item
					icon="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/me/duihuanjindu%402x.png"
					name="兑换码核销"
					url="/pages/me/exchange"
					:is-border="false"
				/>
			</view>
			<!-- 列表2 end -->
			<!-- 列表3 start -->
			<view class="list">
				<!-- <list-item
					icon="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/me/wodedingdan%402x.png"
					name="消息"
				/> -->
				<list-item
					icon="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/me/shezhi%402x.png"
					name="设置"
					url="/pages/set/set"
					:is-border="false"
				/>
			</view>
			<!-- 列表3 end -->
		</view>
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import Title from '@/components/title/Title.vue'
	import ListItem from '@/components/list-item/list-item.vue'
	import { userinfo } from '@/common/api/api.js'
	import { showToast } from '@/tools/util/util.js'
	export default {
		name: 'Me',
		components: {
			XesNavbar,
			Title,
			ListItem
		},
		data() {
			return {
				info: {
					avatars: 'https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/me/tou%402x.png'
				},
				login: false
			}
		},
		onShow() {
			this.toUserinfo()
		},
		methods: {
			// 获取个人信息
			toUserinfo() {
				uni.showLoading({
					title: '加载中...'
				})
				userinfo().then(response => {
					this.info = response.data.data
					this.login = true
					uni.hideLoading()
				}).catch(error => {
					uni.hideLoading()
					this.login = false
					showToast(error.data.message)
				})
			},
			// 点击跳转登录页
			handleLogin() {
				if (!this.login) {
					uni.navigateTo({
						url: '/pages/login/index'
					})
				}
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
	@import '~@/static/scss/me.scss'
</style>
