<template>
	<view class="contaier">
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
					<image class="item-icon" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602672328929&di=746c8967bb5fb09f4306f4ffbca4b2c8&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F00%2F26%2F48%2F9256d0dd700305c.jpg" mode=""></image>
					<view class="item-title">
						{{ paper.title }}
					</view>
					<view class="item-content">
						{{ paper.content }}
					</view>
					<view class="item-num">
						做过 <text>{{ paper.num }}</text> 次 
					</view>
					<view class="item-score">
						上次得分<text>{{ paper.score }}</text>分
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
					title: '二级建造师',
					content: '建筑实务',
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
	.contaier {
		height: 100%;
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
			background: url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602672182228&di=17702b3f22112a7ed316b0aadc18d15d&imgtype=0&src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201902%2F08%2F20190208225724_Mkz8s.thumb.400_0.jpeg') 0 0 no-repeat;
			background-size: 100% 100%;
			box-sizing: border-box;
			padding: 16upx 0;
			margin-bottom: 60upx;
			
			.item-year {
				text-align: center;
				font-size: 32upx;
				font-weight: bold;
				color: #FFFFFF;
			}
			
			.item-icon {
				display: block;
				width: 26upx;
				height: 64upx;
				margin: 0 auto;
			}
			
			.item-title {
				font-size: 28upx;
				font-weight: bold;
				color: #303234;
				text-align: center;
				margin-top: 26upx;
			}
			
			.item-content {
				font-size: 24upx;
				font-weight: 500;
				color: #070727;
				text-align: center;
				margin-top: 10upx;
			}
			
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
				margin-top: 54upx;
			}
			
			.item-score {
				margin-top: 10upx;
			}
		}
	}
</style>
