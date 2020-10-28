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
			<view class="inner">
				<view
					class="item"
					v-for="paper in paperList"
					:key="paper.id"
				>
					<view class="item-year">
						{{ paper.year }}年
					</view>
					<view class="item-title" v-if="paper.title">
						{{ paper.title }}
					</view>
					<view class="item-content" :class="{'active': paper.title === ''}">
						{{ paper.content }}
					</view>
					<view class="item-bot">
						<view class="item-num">
							做过 <text>{{ paper.num }}</text> 次 
						</view>
						<view class="item-score">
							上次得分<text>{{ paper.score }}</text>分
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
	export default {
		name: 'Paper',
		components: {
			XesNavbar,
			UniIcons
		},
		data() {
			return {
				title: '', // 页面标题
				range: ['请选择试卷年份', '中国', '美国', '巴西', '日本'], // 选择的数据
				index: 0, // 当前选择的索引
				height: 0, // 滚动区域的高度
				paperList: [{
					id: 1,
					year: '2020',
					title: '二级建造师',
					content: '建筑实务',
					num: '14',
					score: '91'
				}, {
					id: 2,
					year: '2020',
					title: '二级建造师',
					content: '建筑实务',
					num: '14',
					score: '91'
				}, {
					id: 3,
					year: '2020',
					title: '二级建造师',
					content: '建筑实务',
					num: '14',
					score: '91'
				}, {
					id: 4,
					year: '2020',
					title: '二级建造师',
					content: '建筑实务',
					num: '14',
					score: '91'
				}, {
					id: 5,
					year: '2020',
					title: '二级建造师',
					content: '建筑实务',
					num: '14',
					score: '91'
				}, {
					id: 6,
					year: '2020',
					title: '二级建造师',
					content: '建筑实务',
					num: '14',
					score: '91'
				}, {
					id: 7,
					year: '2020',
					title: '',
					content: '二级建造师建设工程法规及相关知识白皮卷三',
					num: '14',
					score: '91'
				}] // 试卷列表
			}
		},
		onLoad(options) {
			const that = this
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
		},
		methods: {
			// 选择年份
			chooseYear(e) {
				this.index = +e.target.value
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
