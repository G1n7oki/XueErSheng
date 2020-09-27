<template>
	<view class="container">
		<!-- 导航栏 start -->
		<NavBar 
			:is-arrow="true"
			:is-empty="false"
			is-arrow-type="image"
			background-color="transparent"
		/>
		<!-- 导航栏 end -->
		<!-- video start -->
		<view class="video-area">
			<video class="video" id="video" src="http://cctvalih5ca.v.myalicdn.com/live/cctv1_2/index.m3u8" controls></video>
		</view>
		<!-- video end -->
		<!-- 优惠券 start -->
		<view class="discount" id="discount">
			<view class="left">
				<image class="sale" src="/static/image/study/sale.png" mode=""></image>
				<view class="price-time">
					<view class="price">
						<view class="current">
							￥542
						</view>
						<view class="old">
							680
						</view>
					</view>
					<view class="time">
						自购买之日起1年内有效
					</view>
				</view>
			</view>
			<view class="countdown">
				<view class="text">
					剩
				</view>
				<uni-countdown color="#D82A13" :day="1" :hour="23" :minute="14" :second="24" />
				<view class="text">
					恢复原价
				</view>
			</view>
		</view>
		<!-- 优惠券 end -->
		<!-- tabBar start -->
		<view class="tab-bar" id="tabBar">
			<view 
				class="item"
				:class="{'active': tabBarIndex === index}"
				v-for="(item, index) in tabBarList"
				:key="item.id"
				@click="handleBarItem(item.id)"
			>
				{{ item.name }}
			</view>
			<view class="line-area" :style="{left: tabBarIndex * 33.333 + '%'}">
				<view class="line"></view>
			</view>
		</view>
		<!-- tabBar end -->
		<!-- swiepr start -->
		<swiper class="swiper" :current="tabBarIndex" :style="{height: height + 'px'}" :duration="500" @change="handleSwiper">
			<swiper-item class="swiper-item">
				<scroll-view scroll-y="true" class="detail" >
					<view class="info">
						<view class="top">
							<view class="left">
								<view class="name">
									2019年二级建造师市政专业著名讲师开讲冲刺精讲班
								</view>
								<view class="date">
									<text>课程有效期:260天</text>
									<text style="margin: 0 10rpx;">|</text>
									<text>共18课时</text>
								</view>
							</view>
							<view class="score">
								<view class="num">
									5.0
								</view>
								<view class="text">
									评分
								</view>
							</view>
						</view>
						<view class="control">
							<view class="item">
								<image src="/static/image/study/collect.png" mode=""></image>
								<view class="text">收藏</view>
							</view>
							<view class="item">
								<image src="/static/image/study/note.png" mode=""></image>
								<view class="text">讲义</view>
							</view>
							<view class="item">
								<image src="/static/image/study/issue.png" mode=""></image>
								<view class="text">提问</view>
							</view>
						</view>
					</view>
					<view class="coupon">
						<view class="text">
							您有优惠券可领取
						</view>
						<uButton size="small" text="领取" />
					</view>
					<view class="split-line"></view>
					<view class="recommend">
						<Title name="课程介绍" color="#1283FF" />
						<view class="text">
							本课程以Python简洁语法为基础，带你走进编程的世界。通过对工具的使用和了解，让你能够使用代码处理简单的数学问题，提升效率。最后学习机器中的线性回归预测和感知分类，帮助你进一步掌握机器学习的一般方法和步骤。                       
						</view>
					</view>
					<view class="prominent">
						<view class="title-area">
							<Title name="课程亮点" color="#1283FF" />
						</view>
						<view class="item" style="margin-top: 25rpx;">
							<image src="/static/image/home/banner.png" mode=""></image>
							<view class="con">
								<view class="con-title">
									易上手门槛低
								</view>
								<view class="con-content">
									帮助你进一步掌握机器学习的一般方法和步骤。
								</view>
							</view>
						</view>
						<view class="item" style="padding-left: 24rpx;">
							<view class="con">
								<view class="con-title">
									实战案例丰富
								</view>
								<view class="con-content">
									帮助你进一步掌握机器学习的一般方法和步骤。
								</view>
							</view>
							<image src="/static/image/home/banner.png" mode=""></image>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<!-- 目录 start -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y="true" class="catalog" >
					<uni-collapse>
						<uni-collapse-item open="true" number="01" :showAnimation="true" title="建设工程基本法律知识">
							<view class="chapter">
								<view class="item">
									<view class="info">
										<view class="name">
											目标管理 让你的努力有的放矢
										</view>
										<view class="time">
											50分20秒
										</view>
									</view>
									<image class="status-1" src="/static/image/study/lock.png" mode=""></image>
								</view>
								<view class="item">
									<view class="info">
										<view class="name">
											教你如何改变视野  缩短于他人之间的各种差距
										</view>
										<view class="time">
											1小时20分40秒
										</view>
									</view>
									<view class="status-2">
										试听
									</view>
								</view>
								<view class="item">
									<view class="info">
										<view class="name active">
											专业技术篇生活垃圾填埋处理工程填埋处理工程                      
										</view>
										<view class="time active">
											1小时20分40秒
										</view>
									</view>
									<image class="status-3" src="/static/image/home/live.png" mode=""></image>
								</view>
								<view class="item">
									<view class="info">
										<view class="name">
											目标管理 让你的努力有的放矢
										</view>
										<view class="time">
											50分20秒
										</view>
									</view>
									<image class="status-1" src="/static/image/study/lock.png" mode=""></image>
								</view>
								<view class="item">
									<view class="info">
										<view class="name">
											目标管理 让你的努力有的放矢
										</view>
										<view class="time">
											50分20秒
										</view>
									</view>
									<image class="status-4" src="/static/image/study/play.png" mode=""></image>
								</view>
							</view>
						</uni-collapse-item>
					</uni-collapse>
					<uni-collapse>
						<uni-collapse-item number="02" :showAnimation="true" title="精力管理 让工作事半功倍">
							<view class="chapter">
								<view class="item">
									<view class="info">
										<view class="name">
											目标管理 让你的努力有的放矢
										</view>
										<view class="time">
											50分20秒
										</view>
									</view>
									<image class="status-1" src="/static/image/study/lock.png" mode=""></image>
								</view>
								<view class="item">
									<view class="info">
										<view class="name">
											教你如何改变视野  缩短于他人之间的各种差距
										</view>
										<view class="time">
											1小时20分40秒
										</view>
									</view>
									<view class="status-2">
										试听
									</view>
								</view>
								<view class="item">
									<view class="info">
										<view class="name active">
											专业技术篇生活垃圾填埋处理工程填埋处理工程                      
										</view>
										<view class="time active">
											1小时20分40秒
										</view>
									</view>
									<image class="status-3" src="/static/image/home/live.png" mode=""></image>
								</view>
								<view class="item">
									<view class="info">
										<view class="name">
											目标管理 让你的努力有的放矢
										</view>
										<view class="time">
											50分20秒
										</view>
									</view>
									<image class="status-1" src="/static/image/study/lock.png" mode=""></image>
								</view>
								<view class="item">
									<view class="info">
										<view class="name">
											目标管理 让你的努力有的放矢
										</view>
										<view class="time">
											50分20秒
										</view>
									</view>
									<image class="status-4" src="/static/image/study/play.png" mode=""></image>
								</view>
							</view>
						</uni-collapse-item>
					</uni-collapse>
				</scroll-view>
			</swiper-item>
			<!-- 目录 end -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y="true" class="evaluate">
					<view class="exhibition">
						<view class="left">
							<uni-rate
								:readonly="true"
								:size="16"
								:margin="5"
								:allowHalf="true"
								:value="4.6"
							/>
							<view class="line-point">
								<view class="line"></view>
								<view class="point">
									<view class="number">
										4.6
									</view>
									<view class="unit">
										评分
									</view>
								</view>
							</view>
						</view>
						<button hover-class="none" type="default">我要评价</button>
					</view>
					<view class="split-line"></view>
					<view class="list">
						<view class="top">
							<Title name="所有评价" />
							<view class="text">
								共40个评价
							</view>
						</view>
						<view class="item">
							<view class="info">
								<view class="avatar-name">
									<image class="avatar" src="/static/image/home/main-icon.png" mode=""></image>
									<view class="name-tips">
										<view class="name">
											一只大肥羊
										</view>
										<view class="tips">
											学习1个课时评价
										</view>
									</view>
								</view>
								<view class="date">
									2020.08.05
								</view>
							</view>
							<view class="content">
								老师讲的很详细，本人在这次学习中收获了很多，感谢学尔升课堂提供的平台，希望开发人员能在后续的改版迭代中连续开发出更好的功能，为学员提供更好的服务。
							</view>
							<view class="rate">
								<uni-rate 
									:readonly="true"
									:size="16"
									:margin="5"
									:allowHalf="true"
									:value="5"
								/>
							</view>
						</view>
						<view class="item">
							<view class="info">
								<view class="avatar-name">
									<image class="avatar" src="/static/image/home/main-icon.png" mode=""></image>
									<view class="name-tips">
										<view class="name">
											一只大肥羊
										</view>
										<view class="tips">
											学习1个课时评价
										</view>
									</view>
								</view>
								<view class="date">
									2020.08.05
								</view>
							</view>
							<view class="content">
								老师讲的很详细，本人在这次学习中收获了很多，感谢学尔升课堂提供的平台，希望开发人员能在后续的改版迭代中连续开发出更好的功能，为学员提供更好的服务。
							</view>
							<view class="rate">
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
				</scroll-view>
			</swiper-item>
		</swiper>
		<!-- swiper end -->
		<!-- fixed start -->
		<view class="fiexd" v-if="tabBarIndex === 0">
			<view class="left">
				<view class="price-time">
					<view class="price">
						<view class="current">
							542 <text>元</text>
						</view>
						<view class="old">
							680 <text>元</text>
						</view>
					</view>
					<view class="time">
						自购买之日起1年内有效
					</view>
				</view>
				<view class="icons">
					<view class="icons-cell">
						<image class="icon" src="/static/image/study/listen.png" mode=""></image>
						<view class="text">
							试听
						</view>
					</view>
					<view class="icons-cell">
						<image class="icon" src="/static/image/study/advice.png" mode=""></image>
						<view class="text">
							咨询
						</view>
					</view>
				</view>
			</view>
			<view class="button">
				<view class="icon">
					+
				</view>
				<view class="text">
					加入学习
				</view>
			</view>
		</view>
		<!-- fixed end -->
	</view>
</template>

<script>
	import NavBar from '@/components/nav-bar/NavBar.vue'
	import uButton from '@/components/u-button/uButton.vue'
	import Title from '@/components/title/Title.vue'
	import UniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import UniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	import UniRate from '@/components/uni-rate/uni-rate.vue'
	import UniCountDown from '@/components/uni-countdown/uni-countdown.vue'
	export default {
		name: 'study-detail',
		components: {
			NavBar,
			uButton,
			Title,
			UniCollapse,
			UniCollapseItem,
			UniRate,
			UniCountDown
		},
		data() {
			return {
				tabBarList: [{
					id: 0,
					name: '详情'
				}, {
					id: 1,
					name: '目录'
				}, {
					id: 2,
					name: '评价'
				}],
				tabBarIndex: 2,
				height: 0
			}
		},
		onLoad() {
			const that = this
			// 屏幕的高度
			const wHeight = uni.getSystemInfoSync()['windowHeight']
			// 视频的高度
			let vHeight = 0
			// tabBar的高度
			let tHeight = 0
			// 优惠券的高度
			let dHeight = 0
			
			const query = uni.createSelectorQuery().in(this)
			query.select('#video').boundingClientRect(res => {
				vHeight = res.height
				that.height = wHeight - vHeight
			}).exec()
			
			query.select('#tabBar').boundingClientRect(res => {
				tHeight = res.height
				that.height = that.height - tHeight
			}).exec()
			
			query.select('#discount').boundingClientRect(res => {
				dHeight = res.height
				that.height = that.height - dHeight
			}).exec()
		},
		methods: {
			handleBarItem(id) {
				this.tabBarIndex = id
			},
			handleSwiper(event) {
				this.tabBarIndex = event.detail.current
			}
		}
	}
</script>

<style lang="scss">
	@import '../../static/scss/study-detail.scss'
</style>
