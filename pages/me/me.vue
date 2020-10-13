<template>
	<view class="contaier">
		<view class="contaier-inner">
			<xes-navbar title="我的" :margin="32" />
			<!-- 卡片信息 start -->
			<view class="info-card">
				<view class="info">
					<image class="avatar" :src="info.avatars" mode=""></image>
					<view class="username-mobile">
						<view class="username">
							{{ info.username }}
						</view>
						<view class="mobile">
							{{ info.login_tel }}
						</view>
					</view>
				</view>
				<view class="tips">
					签到领福利
				</view>
				<view class="content">
					<view class="item">
						<view class="number">
							25
						</view>
						<view class="text">
							卡包
						</view>
					</view>
					<view class="line"></view>
					<view class="item">
						<view class="number">
							628
						</view>
						<view class="text">
							学币
						</view>
					</view>
					<view class="line"></view>
					<view class="item">
						<view class="number">
							221
						</view>
						<view class="text">
							积分
						</view>
					</view>
				</view>
			</view>
			<!-- 卡片信息 end -->
			<!-- 我的学习 start -->
			<view class="me-study">
				<title name="我的学习" />
				<view class="box">
					<view class="item">
						<image class="icon" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602579342591&di=8781b7e64524a383c102a82bedabb7d0&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F01%2F34%2F96%2F23573bca52a6b30.jpg" mode=""></image>
						<view class="text">我的班主任</view>
					</view>
					<view class="item">
						<image class="icon" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602579342591&di=8781b7e64524a383c102a82bedabb7d0&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F01%2F34%2F96%2F23573bca52a6b30.jpg" mode=""></image>
						<view class="text">AI智能评估</view>
					</view>
					<view class="item">
						<image class="icon" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602579342591&di=8781b7e64524a383c102a82bedabb7d0&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F01%2F34%2F96%2F23573bca52a6b30.jpg" mode=""></image>
						<view class="text">我的课程</view>
					</view>
					<view class="item">
						<image class="icon" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602579342591&di=8781b7e64524a383c102a82bedabb7d0&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F01%2F34%2F96%2F23573bca52a6b30.jpg" mode=""></image>
						<view class="text">学习记录</view>
					</view>
				</view>
			</view>
			<!-- 我的学习 end -->
			<!-- 我的学籍 start -->
			<view class="me-status">
				<title name="我的学籍" />
				<view class="box">
					<image class="amend" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602579342591&di=8781b7e64524a383c102a82bedabb7d0&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F01%2F34%2F96%2F23573bca52a6b30.jpg" mode=""></image>
					<view class="university">
						<image class="logo" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602579342591&di=8781b7e64524a383c102a82bedabb7d0&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F01%2F34%2F96%2F23573bca52a6b30.jpg" mode=""></image>
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
						<button class="button-1" type="default">成绩单</button>
						<button class="button-2" type="default">去学习</button>
						<button class="button-3" type="default">去缴费</button>
					</view>
				</view>
			</view>
			<!-- 我的学籍 end -->
			<!-- 列表1 start -->
			<view class="list">
				<list-item
					icon="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602579342591&di=8781b7e64524a383c102a82bedabb7d0&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F01%2F34%2F96%2F23573bca52a6b30.jpg"
					name="我的订单"
				/>
				<list-item
					icon="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602579342591&di=8781b7e64524a383c102a82bedabb7d0&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F01%2F34%2F96%2F23573bca52a6b30.jpg"
					name="我的问答"
				/>
				<!-- <list-item
					icon="/static/image/me/wodehuancun@2x.png"
					name="我的缓存"
				/> -->
				<list-item
					icon="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602579342591&di=8781b7e64524a383c102a82bedabb7d0&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F01%2F34%2F96%2F23573bca52a6b30.jpg"
					name="我的收藏"
				/>
				<list-item
					icon="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602579342591&di=8781b7e64524a383c102a82bedabb7d0&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F01%2F34%2F96%2F23573bca52a6b30.jpg"
					name="积分商城"
					:is-border="false"
				/>
			</view>
			<!-- 列表1 end -->
			<!-- 列表2 start -->
			<view class="list">
				<list-item
					icon="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602579342591&di=8781b7e64524a383c102a82bedabb7d0&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F01%2F34%2F96%2F23573bca52a6b30.jpg"
					name="帮助与反馈"
				/>
				<list-item
					icon="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602579342591&di=8781b7e64524a383c102a82bedabb7d0&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F01%2F34%2F96%2F23573bca52a6b30.jpg"
					name="关于我们"
				/>
				<list-item
					icon="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602579342591&di=8781b7e64524a383c102a82bedabb7d0&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F01%2F34%2F96%2F23573bca52a6b30.jpg"
					name="兑换码核销"
					:is-border="false"
				/>
			</view>
			<!-- 列表2 end -->
			<!-- 列表3 start -->
			<view class="list">
				<list-item
					icon="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602579342591&di=8781b7e64524a383c102a82bedabb7d0&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F01%2F34%2F96%2F23573bca52a6b30.jpg"
					name="消息"
				/>
				<list-item
					icon="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602579342591&di=8781b7e64524a383c102a82bedabb7d0&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F01%2F34%2F96%2F23573bca52a6b30.jpg"
					name="设置"
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
				info: {}
			}
		},
		onLoad() {
			this.toUserinfo()
		},
		methods: {
			toUserinfo() {
				uni.showLoading({
					title: '加载中...'
				})
				userinfo().then(response => {
					this.info = response.data.data
					uni.hideLoading()
				}).catch(error => {
					uni.hideLoading()
					showToast(error.data.message)
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/me.scss'
</style>
