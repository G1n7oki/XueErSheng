<template>
	<view class="contaier">
		<!-- 导航栏 start -->
		<xes-navbar 
			:is-arrow="true"
			:is-empty="false"
			is-arrow-type="image"
			background-color="transparent"
			id="navbar"
		/>
		<!-- 导航栏 end -->
		<!-- 播放器 start -->
		<view class="live-area" id="video">
			<view class="live-mask">
				<view class="text">
					立即购买或激活课程，即可解锁观看 若已购买，请 <text @click="toLogin">登录</text>
				</view>
				<navigator class="button" :url="'/pages/live/live-play'">
					开始学习
				</navigator>
			</view>
		</view>
		<!-- 播放器 end -->
		<!-- 简略信息 start -->
		<view class="brief-info" id="brief">
			<view class="title">
				直播：2019年汉语言文学-本科导学直播课
			</view>
			<view class="bot">
				<view class="user">
					<image class="avatar" src="" mode=""></image>
					<view class="name">杨明波</view>
					<view class="post">江西省高级教师</view>
				</view>
				<view class="number">
					<view class="watch">观看人数:50人</view>
					<view class="line">|</view>
					<view class="hour">共18课时</view>
				</view>
			</view>
		</view>
		<!-- 简略信息 end -->
		<!-- 切换卡 start -->
		<view class="tabbar" id="tabbar">
			<view 
				class="tabbar-item"
				:class="{'active': tabbar.current === index}"
				v-for="item in tabbar.list"
				:key="item.id"
				@click="handleTabbar(item.id)"
			>
				{{ item.name }}
			</view>
			<view class="tabbar-line" :style="{left: 33.333 * tabbar.current + '%'}">
				<view class="inner"></view>
			</view>
		</view>
		<!-- 切换卡 end -->
		<!-- 滑块区域 start -->
		<swiper 
			:current="tabbar.current"
			:duration="500"
			class="swiper"
			:style="{height: height + 'px'}"
			@change="changeSwiper"
		>
			<!-- 详情 start -->
			<swiper-item>
				<scroll-view class="scroll-view" scroll-y="true" >
					<view class="detail">
						<Title name="课程介绍" color="#1384FF" />
						<view class="text">
							人工智能是目前最热门的学科之一，未来的发挥在那前景广阔。目前基于Python的人工智能学习如火如荼，为了迎接相关工作岗位的挑战，从现在起，学习Python编程和人工智能基础知识，可以为你的未来发展注入足够的能量。
							本课程以Python简洁语法为基础，带你走进编程的世界。通过对工具的使用和了解，让你能够使用代码处理简单的数学问题，提升效率。最后学习机器中的线性回归预测和感知分类，帮助你进一步掌握机器学习的一般方法和步骤。                            
						</view>
						<view class="prominent">
							<Title name="课程亮点" color="#1384FF" />
							<view class="rich-text">
								<rich-text :nodes="nodes"></rich-text>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<!-- 详情 end -->
			<!-- 目录 start -->
			<swiper-item>
				<scroll-view class="scroll-view" scroll-y="true" >
					<view class="catalog">
						<view class="item">
							<view class="date">
								<view class="text">08.20</view>
								<view class="dot"></view>
							</view>
							<view class="content">
								<view class="line"></view>
								<view class="box">
									<view class="tips">回顾</view>
									<text class="box-text">权威直播:2019年汉语言文学-本科导学直播课</text>
									<view class="name">
										杨明波 <text>市政</text>
									</view>
									<view class="box-watch">
										80 人在线
									</view>
								</view>
							</view>
						</view>
						<view class="item">
							<view class="date">
								<view class="text">08.20</view>
								<view class="dot"></view>
							</view>
							<view class="content">
								<!-- <view class="line hide"></view> -->
								<view class="box">
									<view class="tips">回顾</view>
									<text class="box-text">权威直播:2019年汉语言文学-本科导学直播课</text>
									<view class="name">
										杨明波 <text>市政</text>
									</view>
									<view class="box-watch">
										80 人在线
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<!-- 目录 end -->
			<!-- 评论 start -->
			<swiper-item>
				<scroll-view class="scroll-view" scroll-y="true" >
					<view class="evaluation">
						<view class="info">
							<view class="rate">
								<uni-rate 
									:readonly="true"
									:size="16"
									:margin="5"
									:allowHalf="true"
									:value="4.6"
								/>
								<view class="line"></view>
								<view class="number-unit">
									<view class="number">4.6</view>
									<view class="unit">评分</view>
								</view>
							</view>
							<navigator url="/pages/study/evaluation" hover-class="none" class="button">
								我要评价
							</navigator>
						</view>
						<view class="split-line"></view>
						<view class="list">
							<view class="list-title">
								<title name="所有评价" />
								<view class="total">共40个评价</view>
							</view>
							<view class="list-item">
								<view class="item-top">
									<view class="avatar-user">
										<image class="avatar" src="" mode=""></image>
										<view class="user">
											<view class="username">一只大肥羊</view>
											<view class="hour">学习1个课时评价</view>
										</view>
									</view>
									<view class="date">
										2020.08.05
									</view>
								</view>
								<view class="content">
									老师讲的很详细，本人在这次学习中收获了很多，感谢学尔升课堂提供的平台，希望开发人员能在后续的改版迭代中连续开发出更好的功能，为学员提供更好的服务。
								</view>
								<view class="list-rate">
									<uni-rate
										:readonly="true"
										:size="16"
										:margin="5"
										:allowHalf="true"
										:value="5"
									/>
								</view>
							</view>
							<view class="list-item">
								<view class="item-top">
									<view class="avatar-user">
										<image class="avatar" src="" mode=""></image>
										<view class="user">
											<view class="username">一只大肥羊</view>
											<view class="hour">学习1个课时评价</view>
										</view>
									</view>
									<view class="date">
										2020.08.05
									</view>
								</view>
								<view class="content">
									老师讲的很详细，本人在这次学习中收获了很多，感谢学尔升课堂提供的平台，希望开发人员能在后续的改版迭代中连续开发出更好的功能，为学员提供更好的服务。
								</view>
								<view class="list-rate">
									<uni-rate
										:readonly="true"
										:size="16"
										:margin="5"
										:allowHalf="true"
										:value="5"
									/>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<!-- 评论 end -->
		</swiper>
		<!-- 滑块区域 end -->
		<!-- fixed start -->
		<view class="fixed-area" v-if="tabbar.current === 0">
			<view class="price-info">
				<view class="price">
					<view class="present">
						542 <text>元</text>
					</view>
					<view class="original">
						<text class="num">680</text>
						<text class="unit">元</text>
					</view>
				</view>
				<view class="number">
					已有200人购买
				</view>
			</view>
			<view class="advisory">
				<image class="icon" src="" mode=""></image>
				<view class="text">咨询</view>
			</view>
			<view class="button">
				<text class="symbol">+</text>
				<text class="text">加入学习</text>
			</view>
		</view>
		<!-- fixed end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import Title from '@/components/title/Title.vue'
	import UniRate from '@/components/uni-rate/uni-rate.vue'
	export default {
		name: 'LiveDetail',
		components: {
			XesNavbar,
			Title,
			UniRate
		},
		data() {
			return {
				tabbar: {
					list: [{
						id: 0,
						name: '详情'
					}, {
						id: 1,
						name: '目录'
					}, {
						id: 2,
						name: '评价'
					}],
					current: 0
				}, // 切换卡参数
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
			// 点击选项卡
			handleTabbar(id) {
				this.tabbar.current = id
			},
			// 切换滑块
			changeSwiper(e) {
				this.tabbar.current = e.target.current
			},
			// 计算swiper的高度
			calculate(height) {
				// 每次获取元素前都必须使用createSelectorQuery否则会多次执行boundingClientRect
				// 首先使用屏幕的高度减去视频的高度
				const video = uni.createSelectorQuery().in(this)
				video.select('#video').boundingClientRect(video => {
					this.height = height - video.height
				}).exec()
				// 计算后的高度减去简略介绍的高度
				const brief = uni.createSelectorQuery().in(this)
				brief.select('#brief').boundingClientRect(brief => {
					this.height = this.height - brief.height
				}).exec()
				// 计算后的高度减去选项卡的高度
				const tabbar = uni.createSelectorQuery().in(this)
				tabbar.select('#tabbar').boundingClientRect(tabbar => {
					this.height = this.height - tabbar.height - 10
				}).exec()
			},
			// 路由切换
			toLogin() {
				uni.navigateTo({
					url: '/pages/login/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/live-detail.scss'
</style>
