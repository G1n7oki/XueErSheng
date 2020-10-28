<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar 
			title="签到"
			text-align="center"
			:is-arrow="true"
			:is-empty="false"
		/>
		<!-- 导航栏 end -->
		<!-- 巨幕 start -->
		<view class="jumbotron" :style="{'padding-top': top + 'px'}">
			<!-- 签到天数 -->
			<view class="days">
				<view class="text">
					已坚持
				</view>
				<view class="numbers">
					<swiper
						class="item" 
						v-for="(item, index) in days"
						:key="index"
						:vertical="true"
						:current="item"
						:duration="500"
						disable-touch="true"
					>
						<swiper-item
							class="item-inner"
							v-for="n in 10"
							:key="n"
							@touchmove.stop="stopTouchMove"
						>
							<view
								class="cell"
							>
								{{ n }}
							</view>
						</swiper-item>
					</swiper>
				</view>
				<view class="text">
					天签到
				</view>
			</view>
			<!-- 签到名次 -->
			<view class="rank">
				今日签到第 1500 名
			</view>
			<!-- 盒子 -->
			<view class="box">
				<view class="integral">
					+10 <text>积分</text>
				</view>
				<view class="text">
					连续签到7天可享受奖金翻倍机会
				</view>
				<view class="tips">
					<view class="tips-inner" :style="{left: percentage + '%'}">
						10积分
					</view>
				</view>
				<view class="progress">
					<ai-progress
						:percentage="percentage"
						:noData="true"
						:is-animate="true"
						inBgColor="#FFED9E"
						bgColor="#FE7A04"
					/>
				</view>
				<view class="day-wrap">
					<view
						class="day" 
						:class="{'active': n + 1 === current}"
						v-for="n in 7"
						:key="n"
					>
						{{ n + 1 }}天{{ n >= 6 ? '+' : '' }}
					</view>
				</view>
				<button class="button">分享打卡</button>
			</view>
		</view>
		<!-- 巨幕 end -->
		<!-- 线体 start -->
		<view class="line-body">
			<!-- 每日任务 start -->
			<view class="block">
				<view class="title-text">
					<title name="每日任务" />
					<view class="text">
						每天24:00重置任务
					</view>
				</view>
				<view class="box">
					<view class="item">
						<view class="item-lfet">
							<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/discover/fenxiang%402x.png" mode=""></image>
							<view class="title-integral">
								<view class="title">
									分享好友（0/3）
								</view>
								<view class="integral">
									+5积分
								</view>
							</view>
						</view>
						<button class="button active">已完成</button>
					</view>
					<view class="item">
						<view class="item-lfet">
							<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/discover/pinglun%402x.png" mode=""></image>
							<view class="title-integral">
								<view class="title">
									发表课程精彩评价（0/3）
								</view>
								<view class="integral">
									+5积分
								</view>
							</view>
						</view>
						<button class="button">去完成</button>
					</view>
					<view class="item">
						<view class="item-lfet">
							<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/me/yaoqing%402x.png" mode=""></image>
							<view class="title-integral">
								<view class="title">
									邀请注册（0/3）
								</view>
								<view class="integral">
									+5积分
								</view>
							</view>
						</view>
						<button class="button">查看</button>
					</view>
				</view>
			</view>
			<!-- 每日任务 end -->
			<!-- 新手任务 start -->
			<view class="block">
				<view class="title-text">
					<title name="新手任务" />
				</view>
				<view class="box">
					<view class="item">
						<view class="item-lfet">
							<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/me/wanshan%402x.png" mode=""></image>
							<view class="title-integral">
								<view class="title">
									完善资料
								</view>
								<view class="integral">
									+5积分
								</view>
							</view>
						</view>
						<button class="button active">已完成</button>
					</view>
					<view class="item">
						<view class="item-lfet">
							<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/me/yaoqing%402x.png" mode=""></image>
							<view class="title-integral">
								<view class="title">
									邀请注册
								</view>
								<view class="integral">
									+5积分
								</view>
							</view>
						</view>
						<button class="button">去完成</button>
					</view>
				</view>
			</view>
			<!-- 新手任务 end -->
			<!-- 积分商城 start -->
			<view class="block">
				<view class="title-text">
					<title name="积分商城" />
					<view-more url="/pages/integral/integral" />
				</view>
				<view class="item-list">
					<view class="item"
						v-for="(item, index) in 10"
						:key="index"
						@click="handleItem"
					>
						<image class="image" src="http://dummyimage.com/326x210" mode=""></image>
						<view class="title">
							15元课程优惠券
						</view>
						<view class="price">
							500 <text class="unit">积分</text>
						</view>
					</view>
				</view>
				<!-- 加载更多 start -->
				<uni-load-more 
					:status="loading"
					:iconSize="12"
				/>
				<!-- 加载更多 end -->
			</view>
			<!-- 积分商城 end -->
		</view>
		<!-- 线体 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import AiProgress from '@/components/ai-progress/ai-progress.vue'
	import Title from '@/components/title/Title.vue'
	import ViewMore from '@/components/view-more/ViewMore.vue'
	import UniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	export default {
		name: 'Sign',
		components: {
			XesNavbar,
			AiProgress,
			Title,
			ViewMore,
			UniLoadMore
		},
		data() {
			return {
				top: 0,
				days: [],
				percentage: 0,
				num: 9527,
				current: 0,
				loading: 'more'
			}
		},
		onLoad() {
			const sHeight = uni.getSystemInfoSync()['statusBarHeight']
			this.top = sHeight + 42
			
			// 数字滚动模拟
			const percentage = this.num > 7 ? 7 : this.num
			this.current = percentage
			this.percentage = parseInt(percentage / 7 * 100)
			
			// 数字补零
			let num = this.num
			num = num.toString()
			num = num.padStart(3, '0')
			this.days = new Array(num.length)
			this.$nextTick(() => {
				this.days = num.split('')
			})
		},
		onReachBottom() {
			this.loading = 'loading'
			
			setTimeout(() => {
				this.loading = 'more'
			}, 1000)
		},
		methods: {
			stopTouchMove() {
				return false
			},
			handleItem() {
				uni.navigateTo({
					url: '/pages/integral/detail'
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/sign.scss'
</style>
