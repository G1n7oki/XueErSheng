<template>
	<view class="contaier">
		<XesNavbar
			title="答题结果"
			color="#fff"
			:is-arrow="true"
			is-arrow-color="white"
			text-align="center"
			background-color="transparent"
			id="navbar"
		/>
		<image class="placeholder" src="http://dummyimage.com/120x600" mode=""></image>
		<!-- 答题信息 start -->
		<view class="result-info" id="result-info">
			<view class="top">
				<view class="info">
					<view class="name">
						市政公用工程项目施工进度管理第一章节练习
					</view>
					<view class="time">
						用时:1小时2分26秒
					</view>
				</view>
				<view class="progress">
					<progress
						type="circle"
						:percent="80"
						:show-info="false"
						:stroke-width="8"
					/>
					<view class="score-area">
						<view class="score">
							64 <text>分</text>
						</view>
						<view class="total">
							总分100
						</view>
					</view>
				</view>
			</view>
			<view class="bot">
				<view class="item">
					<view class="number">
						50
					</view>
					<view class="name">
						总题数
					</view>
				</view>
				<view class="item">
					<view class="number">
						40
					</view>
					<view class="name">
						做对
					</view>
				</view>
				<view class="item">
					<view class="number">
						4
					</view>
					<view class="name">
						做错
					</view>
				</view>
				<view class="item">
					<view class="number">
						6
					</view>
					<view class="name">
						未做
					</view>
				</view>
				<view class="item">
					<view class="number">
						80%
					</view>
					<view class="name">
						正确率
					</view>
				</view>
			</view>
		</view>
		<!-- 答题信息 end -->
		<!-- 答题卡 start -->
		<scroll-view 
			scroll-y="true" 
			class="answer-sheet" 
			:style="{height: height + 'px'}">
			<!-- 答题卡提示 start -->
			<view class="tips">
				<view class="tips-title">
					答题卡
				</view>
				<view class="tips-item">
					<view class="item">
						<view class="icon icon-1"></view>
						<view class="name">正确</view>
					</view>
					<view class="item">
						<view class="icon icon-2"></view>
						<view class="name">错误</view>
					</view>
					<view class="item">
						<image class="icon" src="http://dummyimage.com/120x600" mode=""></image>
						<view class="name">半对</view>
					</view>
					<view class="item">
						<view class="icon icon-4"></view>
						<view class="name">未答</view>
					</view>
				</view>
			</view>
			<!-- 答题卡提示 end -->
			<view class="issue">
				<view class="issue-title">
					<view class="name">简答题</view>
					<view class="amount">共10题</view>
				</view>
				<view class="issue-item">
					<view class="item item-1">1</view>
					<view class="item item-2">2</view>
					<view class="item item-3">3</view>
					<view class="item item-4">4</view>
					<view class="item item-1">5</view>
					<view class="item item-1">6</view>
					<view class="item item-1">7</view>
					<view class="item item-1">8</view>
					<view class="item item-1">9</view>
					<view class="item item-1">10</view>
				</view>
			</view>
			<view class="issue">
				<view class="issue-title">
					<view class="name">判断题</view>
					<view class="amount">共10题</view>
				</view>
				<view class="issue-item">
					<view class="item item-1">1</view>
					<view class="item item-2">2</view>
					<view class="item item-3">3</view>
					<view class="item item-4">4</view>
					<view class="item item-1">5</view>
					<view class="item item-1">6</view>
					<view class="item item-1">7</view>
					<view class="item item-1">8</view>
					<view class="item item-1">9</view>
					<view class="item item-1">10</view>
				</view>
			</view>
		</scroll-view>
		<!-- 答题卡 end -->
		<!-- 按钮组 start -->
		<view class="button-group" id="button-group">
			<button class="again" hover-class="none">再做一次</button>
			<button class="answer" hover-class="none">查看答案</button>
		</view>
		<!-- 按钮组 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import Progress from '@/components/progress/progress.vue'
	export default {
		name: 'Result',
		components: {
			XesNavbar,
			Progress
		},
		data() {
			return {
				height: 0
			}
		},
		onLoad() {
			let that = this
			// 屏幕的高度
			const wHeight = uni.getSystemInfoSync()['windowHeight']
			
			// 获取元素的高度
			const query = uni.createSelectorQuery().in(this)
			
			query.select('#navbar').boundingClientRect(res => {
				that.height = wHeight - res.height
			}).exec()
			
			query.select('#result-info').boundingClientRect(res => {
				that.height = that.height - res.height
			}).exec()
			
			query.select('#button-group').boundingClientRect(res => {
				that.height = that.height - res.height * 2
			}).exec()
			
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/result.scss'
</style>
