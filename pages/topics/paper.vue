<template>
	<view class="container">
		<XesNavbar 
			:title="title"
			text-align="center"
			:is-arrow="true"
			id="navbar"
		/>
		<!-- 选择器 start -->
		<view class="picker" id="picker">
			<picker mode="selector" :range="range" @change="chooseYear">
				<view class="text">{{ range[index] }}</view>
			</picker>
			<uni-icons type="arrowdown" size="20" />
		</view>
		<!-- 选择器 end -->
		<!-- 滚动区域 start -->
		<scroll-view class="scroll-view" scroll-y="true" :style="{ height: height }">
			<empty v-if="paperList.length <= 0" />
			<view v-else class="inner">
				<view
					class="item"
					v-for="paper in paperList"
					:key="paper.id"
					@click="handleItem(paper)"
				>
					<view class="item-year">
						{{ paper.year }}年
					</view>
					<view class="item-title" v-if="paper.title">
						{{ paper.title }}
					</view>
					<!-- <view class="item-content" :class="{'active': paper.title === ''}">
						{{ paper.content }}
					</view> -->
					<view class="item-bot">
						<view class="item-num">
							做过 <text>{{ paper.total }}</text> 次 
						</view>
						<view class="item-score">
							上次得分<text>{{ paper.last_source }}</text>分
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- 滚动区域 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import UniIcons from '@/components/uni-icons/uni-icons.vue'
	import Empty from '@/components/empty/empty.vue'
	import { topics_paper, filter } from '@/common/api/api.js'
	export default {
		name: 'Paper',
		components: {
			XesNavbar,
			UniIcons,
			Empty
		},
		data() {
			return {
				title: '', // 页面标题
				range: ['请选择试卷年份'], // 选择的数据
				index: 0, // 当前选择的索引
				height: 0, // 滚动区域的高度
				paperList: [], // 试卷列表
				id: '' // 科目id
			}
		},
		onLoad(options) {
			const that = this
			this.id = options.id
			this.title = options.title
			// 屏幕的高度
			const wHeight = uni.getSystemInfoSync()['windowHeight']
			// 获取元素的信息
			const picker = uni.createSelectorQuery().in(this)
			picker.select('#picker').boundingClientRect(res => {
				that.height = wHeight - res.height
			}).exec()
			const navbar = uni.createSelectorQuery().in(this)
			navbar.select('#navbar').boundingClientRect(res => {
				that.height = that.height - res.height + 'px'
			}).exec()
			
			this.toData()
		},
		methods: {
			async toData() {
				uni.showLoading({
					title: '加载中...'
				})
				// 获取列表数据
				const list = await topics_paper({
					profession_id: this.id,
					type: this.title === '历年真题' ? 1 : 2
				})
				this.paperList = list.data.data
				// 获取筛选数据
				const years = await filter()
				const { year } = years.data.data
				this.range = [...this.range, ...year]
				uni.hideLoading()
			},
			// 选择年份
			async chooseYear(e) {
				uni.showLoading({
					title: '加载中...'
				})
				this.index = +e.target.value
				const list = await topics_paper({
					profession_id: this.id,
					type: this.title === '历年真题' ? 1 : 2,
					year: this.index === 0 ? '' : this.range[this.index]
				})
				this.paperList = list.data.data
				uni.hideLoading()
			},
			handleItem(raw) {
				uni.navigateTo({
					url: `/pages/topics/practice?paper=${raw.id}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		background-color: #F4F7F9;
	}
	
	// 选择器
	.picker {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 90upx;
		background: #FFFFFF;
		border-top: 1px solid #DEDEDE;
		background-color: #fff;
		
		.text {
			font-size: 28upx;
			font-weight: 500;
			color: #606266;
			margin-right: 12upx;
		}
	}
	
	// 滚动区域
	.inner {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		padding: 60upx 60upx 0 60upx;
		box-sizing: border-box;
		
		.item {
			width: 285upx;
			height: 370upx;
			background: #FFFFFF;
			border-radius: 10upx;
			background: url('https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/topics/linianzhengti%402x.png') 0 0 no-repeat;
			background-size: 100% 100%;
			box-sizing: border-box;
			padding: 6upx 0;
			margin-bottom: 60upx;
			position: relative;
			
			.item-year {
				text-align: center;
				font-size: 32upx;
				font-weight: bold;
				color: #FFFFFF;
			}
			
			.item-title {
				font-size: 28upx;
				font-weight: bold;
				color: #303234;
				text-align: center;
				margin-top: 86upx;
			}
			
			.item-content {
				font-size: 24upx;
				font-weight: 500;
				color: #070727;
				text-align: center;
				margin-top: 10upx;
				
				&.active {
					margin-top: 90upx;
				}
			}
			
			.item-bot {
				width: 100%;
				height: 123upx;
				text-align: center;
				position: absolute;
				left: 0;
				bottom: 0;
				
				.item-num, .item-score {
					font-size: 24upx;
					font-weight: 500;
					color: #90949A;
					text-align: center;
					
					text {
						color: #1384FF;
					}
				}
				
				.item-num {
					margin-top: 23upx;
				}
				
				.item-score {
					margin-top: 10upx;
				}
			}
		}
	}
</style>
