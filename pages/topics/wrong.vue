<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar 
			title="错题"
			text-align="center"
			:is-arrow="true"
			id="navbar"
		/>
		<!-- 导航栏 end -->
		<!-- 切换卡 start -->
		<view class="tabbar" :style="{top: top + 'px'}">
			<xes-text-tabbar
				:list="tabbar.list"
				:current="tabbar.current"
				@postId="toId"
			/>
		</view>
		<!-- 切换卡 end -->
		<!-- 列表数据 start -->
		<empty v-if="listData.length <= 0" />
		<view v-else class="list-data">
			<view class="pattern" v-if="tabbar.current === 0">
				<switch 
					class="switch"
					color="#1283FF"
					:checked="pattern"
					@change="patternSwitch"
				/>
				<view class="text">
					背题模式
				</view>
			</view>
			<view
				class="list-cell"
				v-for="item in listData"
				:key="item.id"
			>
				<view class="info">
					<view class="title">
						{{ item.title }}
					</view>
					<view v-if="tabbar.current === 0" class="number">
						错{{ item.count }}道题
					</view>
					<view v-else class="number">
						{{ item.count }}道
					</view>
				</view>
				<button 
					class="button"
					:class="{'active': tabbar.current === 1}"
					@click="handleAgain(item)"
				>
					{{ tabbar.current === 0 && !pattern ? '重做' : '查看' }}
				</button>
			</view>
			<!-- loading start -->
			<uni-load-more 
				v-if="totalPage > 1"
				:status="loading"
				:iconSize="14"
			/>
			<!-- loading end -->
		</view>
		<!-- 列表数据 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import XesTextTabbar from '@/components/xes-text-tabbar/xes-text-tabbar.vue'
	import Empty from '@/components/empty/empty.vue'
	import UniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import { topics_wrong } from '@/common/api/api.js'
	export default {
		name: 'Wrong',
		components: {
			XesNavbar,
			XesTextTabbar,
			Empty,
			UniLoadMore
		},
		data() {
			return {
				tabbar: {
					list: [{
						id: 0,
						name: '错题'
					}, {
						id: 1,
						name: '收藏'
					}],
					current: 0
				},
				top: 0, // tabbar的定位
				listData: [], // 列表数据
				loading: 'more', // 上拉加载的状态
				page: 1,
				totalPage: 1,
				pattern: false
			}
		},
		onLoad() {
			// tabbar 距离顶部的定位距离
			const navbar = uni.createSelectorQuery().in(this)
			navbar.select('#navbar').boundingClientRect(navbar => {
				this.top = navbar.height
			}).exec()
			
			const pattern = uni.getStorageSync('pattern')
			this.pattern = pattern === 'self-study' ? true : false
			
			this.toData()
		},
		async onReachBottom() {
			this.page++
			if (this.page > this.totalPage) {
				this.loading = 'noMore'
				return false
			}
			this.loading = 'loading'
			const response = await topics_wrong({
				type: this.tabbar.current + 1,
				page: this.page
			})
			this.loading = 'more'
		},
		methods: {
			async toData() {
				uni.showLoading({
					title: '加载中...'
				})
				const response = await topics_wrong({
					type: this.tabbar.current + 1,
					page: this.page
				})
				const { data, last_page } = response.data.data
				this.listData = data
				this.totalPage = last_page
				uni.hideLoading()
			},
			toId(id) {
				this.tabbar.current = id
				this.page = 1
				this.listData = []
				this.toData()
			},
			// 开启背题模式
			patternSwitch(e) {
				e.detail.value ? uni.setStorageSync('pattern', 'self-study') : uni.setStorageSync('pattern', 'exercise')
				this.pattern = e.detail.value
			},
			// 点击重做
			handleAgain(raw) {
				const { exam_id, paper_id } = raw
				if (this.tabbar.current === 0) { // 如果是从错题进入到练题需要多传一个参数调用别的接口
					uni.navigateTo({
						url: `/pages/topics/practice?exam=${exam_id}&paper=${paper_id}`
					})
				} else { // 如果是从收藏进入到练题则需要把模式切换为练习
					uni.setStorageSync('pattern', 'self-study')
					uni.navigateTo({
						url: `/pages/topics/practice?paper=${paper_id}`
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.container {
		background-color: #F4F7F9;
	}
	// 选项卡
	.tabbar {
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 10;
	}
	// 列表数据
	.list-data {
		margin-top: 104upx;
		padding: 32upx;
		background-color: #F4F7F9;
		
		&.active {
			padding-bottom: 120upx;
		}
		
		.pattern {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			margin-bottom: 20upx;
			
			.switch {
				transform: scale(.7, .7);
			}
			
			.text {
				font-size: 28upx;
				font-weight: 500;
				color: #606266;
			}
		}
		
		.list-cell {
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-radius: 12upx;
			background-color: #fff;
			padding: 32upx;
			margin-bottom: 32upx;
			
			.info {
				
				.title {
					width: 360upx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					font-size: 28upx;
					font-weight: bold;
					color: #303133;
				}
				
				.number {
					font-size: 24upx;
					font-weight: 500;
					color: #909399;
					margin-top: 22upx;
				}
			}
			
			.button {
				width: 128upx;
				height: 64upx;
				background-color: #1283FF;
				border-radius: 32upx;
				line-height: 64upx;
				font-size: 28upx;
				font-weight: 500;
				color: #FFFFFF;
				
				&.active {
					background-color: #FA7935;
				}
			}
		}
	}
	
	// 定位按钮
	.fixed-button {
		width: 100%;
		box-sizing: border-box;
		position: fixed;
		left: 0;
		bottom: 0;
		padding: 20upx 32upx;
		background-color: #fff;
		
		.button {
			height: 80upx;
			background-color: #1283FF;
			font-size: 32upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			line-height: 80upx;
		}
	}
</style>
