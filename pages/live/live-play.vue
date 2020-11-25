<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar 
			:is-arrow="true"
			:is-empty="false"
			is-arrow-type="image"
			background-color="transparent"
		/>
		<!-- 导航栏 end -->
		<!-- 播放器 start -->
		<view class="video-area" id="video">
			<video 
				class="video" 
				id="video" 
				:src="url"
				controls
				autoplay
			>
			</video>
			<view class="video-mask" v-if="isPlay !== 1">
				<view v-if="isPlay === 2" class="text">直播已结束</view>
				<view v-if="isPlay === 0" class="text">直播暂未开始</view>
			</view>
		</view>
		<!-- 播放器 end -->
		<!-- 课程信息 start -->
		<view class="course-info">
			<view class="brief">
				<view class="title-hour">
					<view class="brief-title">
						{{ title }}
					</view>
					<view class="brief-hour">
						{{ start.substring(5, 16) }}-{{ end.substring(11, 16) }}
					</view>
				</view>
				<navigator class="button" open-type="navigateBack">
					课程详情
				</navigator>
			</view>
		</view>
		<!-- 课程信息 end -->
		<!-- 分割线 start -->
		<view class="split-line"></view>
		<!-- 分割线 end -->
		<!-- 切换卡 start -->
		<view id="tabbar">
			<xes-text-tabbar
				:list="tabbar.list"
				:current="tabbar.current"
				@post-id="toId"
			/>
		</view>
		<!-- 切换卡 end -->
		<!-- 滚动区域 start -->
		<swiper
			:style="{height: height + 'px'}"
			:current="tabbar.current"
			:duration="500"
		>
			<swiper-item>
				<scroll-view 
					scroll-y="true"
					class="scroll-view"
					:scroll-into-view="last"
				>
					<view class="online">
						{{ num }}人在线
					</view>
					<view 
						class="list"
						:id="'message' + index"
						v-for="(item, index) in list"
						:key="index"
					>
						<view class="item" v-if="item.uid !== uid">
							<image class="avatar" :src="item.avatar" mode=""></image>
							<view class="name-content">
								<view class="name">
									{{ item.username }}
								</view>
								<view class="content">
									{{ item.message }}
								</view>
							</view>
						</view>
						<view class="self" v-else>
							<view class="name-content">
								<view class="name">
									{{ item.username }}
								</view>
								<view class="content">
									{{ item.message }}
								</view>
							</view>
							<image class="avatar" :src="item.avatar" mode=""></image>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item"></view>
			</swiper-item>
		</swiper>
		<!-- 滚动区域 end -->
		<!-- 输入框 start -->
		<view class="input-area" v-if="tabbar.current === 0">
			<input class="input" type="text" v-model="message" placeholder="请来说几句吧" />
			<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/discover/fabiaojiantou%402x.png" mode="" @click="confirm"></image>
		</view>
		<!-- 输入框 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import XesTextTabbar from '@/components/xes-text-tabbar/xes-text-tabbar.vue'
	import { join_chat, send_message, userinfo, live_detail  } from '@/common/api/api.js'
	export default {
		name: 'LivePlay',
		components: {
			XesNavbar,
			XesTextTabbar
		},
		data() {
			return {
				tabbar: {
					list: [{
						id: 0,
						name: '在线聊天'
					}, {
						id: 1,
						name: '课程讲义'
					}],
					current: 0
				},
				height: 0, // swiper的高度
				url: '', // 直播链接
				title: '', // 直播标题
				id: 0, // 直播id
				message: '', // 发送的消息
				list: [], // 消息列表
				uid: 0, // 用户id
				last: '', // 最后一条数据
				num: 0, // 观看人数
				isPlay: 0, // 直播状态
				start: '', // 开始时间
				end: '' // 结束时间
			}
		},
		onLoad(options) {
			this.id = options.id
			// 屏幕的高度
			const wHeight = uni.getSystemInfoSync()['windowHeight']
			
			this.calculate(wHeight)
			
			this.toData(+options.id)
		},
		onUnload() {
			uni.closeSocket()
		},
		methods: {
			async toData(id) {
				uni.showLoading({
					title: '加载中...'
				})
				// 获取直播信息
				const detail = await live_detail({
					id
				})
				const { title, url, is_play, watch_num, start_time, end_time } = detail.data.data
				this.title = title
				this.url = url
				this.isPlay = is_play
				this.num = watch_num
				this.start = start_time
				this.end = end_time
				// 获取用户信息
				const user = await userinfo()
				this.uid = user.data.data.id
				// 长链接
				const that = this
				let client_id = ''
				// 创建Socket链接
				uni.connectSocket({
					 url: 'ws://api.mdedu.cn/wss'
				})
				// 接收服务端发来的消息
				uni.onSocketMessage(function (res) {
					const type = JSON.parse(res.data).type
					if (type === 'init') { // 加入聊天室
						client_id = JSON.parse(res.data).client_id
						join_chat({
							client_id: client_id,
							sol_id: that.id
						}).then(response => {
							that.num = that.num + 1
						})
					} else if (type === 'message') { // 展示消息
						const item = JSON.parse(res.data)
						that.list.push({
							uid: item.uid,
							avatar: item.image,
							message: item.message,
							username: item.username
						})
						that.num = item.num
						// scroll-view 滚动到底部
						that.last = 'message' + (that.list.length - 1)
					} else { // 心跳
						return 
					}
				})
				uni.hideLoading()
			},
			// 发送消息
			async confirm() {
				const response = await send_message({
					sol_id: this.id,
					message: this.message
				})
				this.message = ''
			},
			// 接受子组件传来的参数
			toId(id) {
				this.tabbar.current = id
			},
			calculate(height) {
				// 首先使用屏幕的高度减去视频的高度
				const video = uni.createSelectorQuery().in(this)
				video.select('#video').boundingClientRect(video => {
					this.height = height - video.height
				}).exec()
				// 计算后的高度减去选项卡的高度
				const tabbar = uni.createSelectorQuery().in(this)
				tabbar.select('#tabbar').boundingClientRect(tabbar => {
					this.height = this.height - tabbar.height
				}).exec()
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/play.scss'
</style>
