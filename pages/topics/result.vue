<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar
			title="答题结果"
			color="#fff"
			:is-arrow="true"
			is-arrow-color="white"
			text-align="center"
			background-color="transparent"
			id="navbar"
		/>
		<!-- 导航栏 end -->
		<image class="placeholder" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/topics/datijieguo%402x.png" mode=""></image>
		<!-- 答题信息 start -->
		<view class="result-info" id="result-info">
			<view class="top">
				<view class="info">
					<view class="name">
						{{ name }}
					</view>
					<view class="time">
						用时:{{ time }}
					</view>
				</view>
				<view class="progress">
					<progress
						type="circle"
						:percent="accuracy"
						:show-info="false"
						:stroke-width="8"
					/>
					<view class="score-area">
						<view class="score">
							{{ score }} <text>分</text>
						</view>
						<view class="total">
							总分{{ totalScore }}
						</view>
					</view>
				</view>
			</view>
			<view class="bot">
				<view class="item">
					<view class="number">
						{{ total }}
					</view>
					<view class="name">
						总题数
					</view>
				</view>
				<view class="item">
					<view class="number">
						{{ isRight }}
					</view>
					<view class="name">
						做对
					</view>
				</view>
				<view class="item">
					<view class="number">
						{{ isError }}
					</view>
					<view class="name">
						做错
					</view>
				</view>
				<view class="item">
					<view class="number">
						{{ unfinished }}
					</view>
					<view class="name">
						未做
					</view>
				</view>
				<view class="item">
					<view class="number">
						{{ accuracy }}
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
						<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/common/banduicuo%402x.png" mode=""></image>
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
					<view class="name">单选题</view>
					<view class="amount">共{{ single.length }}题</view>
				</view>
				<view class="issue-item" v-if="single.length > 0">
					<view
						class="item"
						:class="[item.isRight === 0 ? 'item-2' : item.isRight === 1 ? 'item-1' : item.isRight === 2 ? 'item-3' : 'item-4']"
						v-for="(item, index) in single"
						:key="item.id"
					>{{ index + 1 }}</view>
				</view>
			</view>
			<view class="issue">
				<view class="issue-title">
					<view class="name">多选题</view>
					<view class="amount">共{{ multiple.length }}题</view>
				</view>
				<view class="issue-item" v-if="multiple.length > 0">
					<view
						class="item"
						:class="[item.isRight === 0 ? 'item-2' : item.isRight === 1 ? 'item-1' : item.isRight === 2 ? 'item-3' : 'item-4']"
						v-for="(item, index) in multiple"
						:key="item.id"
					>{{ index + 1 }}</view>
				</view>
			</view>
			<view class="issue">
				<view class="issue-title">
					<view class="name">判断题</view>
					<view class="amount">共{{ judge.length }}题</view>
				</view>
				<view class="issue-item" v-if="judge.length > 0">
					<view
						class="item"
						:class="[item.isRight === 0 ? 'item-2' : item.isRight === 1 ? 'item-1' : item.isRight === 2 ? 'item-3' : 'item-4']"
						v-for="(item, index) in judge"
						:key="item.id"
					>{{ index + 1 }}</view>
				</view>
			</view>
			<view class="issue">
				<view class="issue-title">
					<view class="name">主观题</view>
					<view class="amount">共{{ subjective.length }}题</view>
				</view>
				<view class="issue-item" v-if="subjective.length > 0">
					<view
						class="item"
						:class="[item.isRight === 0 ? 'item-2' : item.isRight === 1 ? 'item-1' : item.isRight === 2 ? 'item-3' : 'item-4']"
						v-for="(item, index) in subjective"
						:key="item.id"
					>{{ index + 1 }}</view>
				</view>
			</view>
		</scroll-view>
		<!-- 答题卡 end -->
		<!-- 按钮组 start -->
		<view class="button-group" id="button-group">
			<button class="again" hover-class="none" @click="handleAglin">再做一次</button>
			<button class="answer" hover-class="none" @click="handleAnswer">查看答案</button>
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
				height: 0,
				result: uni.getStorageSync('result') || [],
				single: [], // 单选题
				multiple: [], // 多选题
				judge: [], // 判断题
				subjective: [], // 主观题
				finished: 0, // 完成的
				unfinished: 0, // 未完成的
				total: 0, // 总题数
				isRight: 0, // 做对的
				isError: 0, // 做错的
				accuracy: 0, // 正确率
				score: 0, // 得分
				totalScore: 0, // 总分
				time: '', // 做题时间
				name: uni.getStorageSync('crumbs')[2] || ''
			}
		},
		onLoad(options) {
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
			
			this.result.forEach(item => {
				// 总分
				this.totalScore = this.totalScore + +item.score
				// 判断结果为哪种类型
				if (item.isRight === 0 || item.isRight === 2) { // 如果错误半对都视为错误
					this.isError++
				} else if (this.isRight === 1) {
					this.isRight++
					this.score = this.score + +item.score
				} else {
					this.unfinished++
				}
				// 数据拆分
				switch (item.question_type) {
					case 1:
						this.single.push(item)
						break
					case 2:
						this.multiple.push(item)
						break
					case 3:
						this.judge.push(item)
						break
					case 4:
						this.subjective.push(item)
						break
					default:
						break
				}
			})
			// 总数
			this.total = this.result.length
			// 正确率
			this.accuracy = parseInt(this.isRight / this.total) * 100 + '%'
			// 做题时间
			this.time = this.formatSeconds(+options.count)
		},
		methods: {
			formatSeconds(value) {
				let result = parseInt(value)
				let h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600)
				let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60))
				let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60))
		 
				let res = ''
				if(h !== '00') res += `${h}时`
				if(m !== '00') res += `${m}分`
				res += `${s}秒`
				return res
			},
			handleAglin() {
				uni.reLaunch({
					url: '/pages/topics/practice'
				})
			},
			handleAnswer() {
				uni.setStorageSync('pattern', 'self-study')
				uni.reLaunch({
					url: '/pages/topics/practice'
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/result.scss'
</style>
