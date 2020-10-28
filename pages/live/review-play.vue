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
				poster="http://dummyimage.com/750x422"
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
			<scroll-view class="list" scroll-x="true">
				<view class="item">
					<view class="icon-title">
						<view class="icon">回顾</view>
						<view class="item-title">
							权威直播:2019年汉语言文学-本科导学直播课
						</view>
					</view>
					<view class="user">
						杨明波 <text>市政</text>
					</view>
					<view class="play">
						320 播放
					</view>
				</view>
				<view class="item">
					<view class="icon-title">
						<view class="icon">回顾</view>
						<view class="item-title">
							权威直播:2019年汉语言文学-本科导学直播课
						</view>
					</view>
					<view class="user">
						杨明波 <text>市政</text>
					</view>
					<view class="play">
						08.20  18:00-20:00
					</view>
				</view>
			</scroll-view>
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
			:duration="500"
			:style="{height: height + 'px'}"
			:current="tabbar.current"
		>
			<swiper-item>
				<!-- 课程介绍 start -->
				<scroll-view scroll-y="true" class="scroll-view">
					<view class="introduce">
						<title name="课程介绍" color="#1384FF" />
						<view class="text">
							人工智能是目前最热门的学科之一，未来的发挥在那前景广阔。目前基于Python的人工智能学习如火如荼，为了迎接相关工作岗位的挑战，从现在起，学习Python编程和人工智能基础知识，可以为你的未来发展注入足够的能量。本课程以Python简洁语法为基础，带你走进编程的世界。通过对工具的使用和了解，让你能够使用代码处理简单的数学问题，提升效率。最后学习机器中的线性回归预测和感知分类，帮助你进一步掌握机器学习的一般方法和步骤。                           
						</view>
					</view>
					<view class="prominent">
						<title name="课程亮点" color="#1384FF" />
						<view class="rich-text">
							<rich-text :nodes="nodes"></rich-text>
						</view>
					</view>
				</scroll-view>
				<!-- 课程介绍 end -->
			</swiper-item>
			<swiper-item>
				<!-- 课程讲义 start -->
				<scroll-view scroll-y="true" class="scroll-view note">
					<view class="item">
						<view class="info">
							<view class="name">
								建设工程基本法律知识相关知识学习导建设工程基本法律知识相关知识学习导
							</view>
							<view class="size">
								50.2M
							</view>
						</view>
						<!-- <image class="icon" src="" mode="" @click="handleDownload"></image> -->
					</view>
					<view class="item">
						<view class="info">
							<view class="name">
								建设工程基本法律知识相关知识学习导建设工程基本法律知识相关知识学习导
							</view>
							<view class="size">
								50.2M
							</view>
						</view>
					</view>
				</scroll-view>
				<!-- 课程讲义 end -->
			</swiper-item>
		</swiper>
		<!-- 滚动区域 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import XesTextTabbar from '@/components/xes-text-tabbar/xes-text-tabbar.vue'
	import Title from '@/components/title/Title.vue'
	export default {
		name: 'ReviewPlay',
		components: {
			XesNavbar,
			XesTextTabbar,
			Title
		},
		data() {
			return {
				tabbar: {
					list: [{
						id: 0,
						name: '课程介绍'
					}, {
						id: 1,
						name: '课程讲义'
					}],
					current: 1
				},
				height: 0, // swiper的高度
				nodes: '<div>人工智能是目前最热门的学科之一，未来的发挥在那前景广阔。目前基于Python的人工智能学习如火如荼，为了迎接相关工作岗位的挑战，从现在起，学习Python编程和人工智能基础知识，可以为你的未来发展注入足够的能量。</div><div>本课程以Python简洁语法为基础，带你走进编程的世界。通过对工具的使用和了解，让你能够使用代码处理简单的数学问题，提升效率。最后学习机器中的线性回归预测和感知分类，帮助你进一步掌握机器学习的一般方法和步骤。</div>'
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
			// 计算swiper的高度
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
			},
			// 下载讲义
			handleDownload() {
				console.log('需要后端提供下载地址')
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/play.scss'
</style>
