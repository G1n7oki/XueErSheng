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
				src="http://ivi.bupt.edu.cn/hls/cctv5phd.m3u8" 
				controls
				poster="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602737528008&di=69cc1ca9e06a7b3e9b47755147bee8b2&imgtype=0&src=http%3A%2F%2Fimg1.imgtn.bdimg.com%2Fit%2Fu%3D259364631%2C2307942273%26fm%3D214%26gp%3D0.jpg"
			>
			</video>
		</view>
		<!-- 播放器 end -->
		<!-- 课程信息 start -->
		<view class="course-info">
			<view class="brief">
				<view class="title-hour">
					<view class="brief-title">
						权威直播2019年汉语言文学-本科 导学直播课
					</view>
					<view class="brief-hour">
						共18课时
					</view>
				</view>
				<navigator class="button" url="">
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
				<view class="swiper-item"></view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item"></view>
			</swiper-item>
		</swiper>
		<!-- 滚动区域 end -->
		<!-- 输入框 start -->
		<view class="input-area" v-if="tabbar.current === 0">
			<input class="input" type="text" value="" placeholder="请来说几句吧" />
			<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/discover/fabiaojiantou%402x.png" mode=""></image>
		</view>
		<!-- 输入框 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import XesTextTabbar from '@/components/xes-text-tabbar/xes-text-tabbar.vue'
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
				height: 0 // swiper的高度
			}
		},
		onLoad() {
			// 屏幕的高度
			const wHeight = uni.getSystemInfoSync()['windowHeight']
			
			this.calculate(wHeight)
		},
		methods: {
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
