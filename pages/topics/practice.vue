<template>
	<view class="contaier">
		<xes-navbar
			is-arrow="true"
			is-title="false"
		>
			<xes-tabbar
				:current="current"
				:total="total"
			/>
		</xes-navbar>
		<!-- 答题部分 start -->
		<swiper :duration="500" :style="{height: height}" @change="changeSwiper">
			<swiper-item 
				v-for="issue in issueList"
				:key="issue.id"
			>
				<scroll-view class="scroll-view" scroll-y="true" >
					<view class="issue-title">
						<view class="type">
							{{ issue.type }}
						</view>
						<view class="score">
							{{ issue.score }}分
						</view>
					</view>
					<view class="issue-topic">
						<view class="name">
							{{ issue.name }}
						</view>
						<view class="options">
							<view 
								class="option-cell"
								v-for="(item, index) in issue.option"
								:key="item.name"
								@click="handleAnswer(index, item, issue)"
							>
								<!-- result 1未答 2正确 3错误 -->
								<view 
									class="option-cell__name"
									:class="{'success': item.result === 2, 'error': item.result === 3}"
								>
									{{ item.name }}
								</view>
								<view class="option-cell__cotent">
									{{ item.content }}
								</view>
							</view>
						</view>
						<uButton 
							v-if="issue.type === '多选题'"
							text="确认答案"
							@click="handleConfirm"
						/>
					</view>
					<view class="split-line" v-if="issue.analysis"></view>
					<view class="analysis" v-if="issue.analysis && pattern !== 'exam'">
						<view class="tips">
							正确答案 <text class="success">{{ issue.correct }}</text> , 您的答案 <text class="result">{{ issue.result }}</text> , 用时{{ issue.count }}秒
						</view>
						<view class="stat">
							<view class="stat-title">
								统计
							</view>
							<view class="tips">
								个人统计:本道题作答 2 次，做对 1 次
							</view>
							<view class="info">
								<view class="item">
									<view class="letter">
										C
									</view>
									<view class="text">
										易错选项
									</view>
								</view>
								<view class="line"></view>
								<view class="item">
									<view class="number">
										4584 <text>次</text>
									</view>
									<view class="text">
										全站作答
									</view>
								</view>
								<view class="line"></view>
								<view class="item">
									<view class="number">
										60 <text>%</text>
									</view>
									<view class="text">
										全站正确率
									</view>
								</view>
							</view>
						</view>
						<view class="resolve">
							<view class="resolve-title">
								解析
							</view>
							<view class="resolve-text">
								在行车荷载作用下，水凝混凝土路面的力学特性为弯沉变形较大，拉弯拉强度小
							</view>
						</view>
					</view>
					<view v-if="!issue.analysis && pattern === 'exercise'" class="button" @click="checkAnalysis(issue)">
						<uButton text="查看解析" />
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		<!-- 答题部分 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import uButton from '@/components/u-button/uButton.vue'
	import XesTabbar from '@/components/xes-tabbar/xes-tabbar.vue'
	import Json from '@/static/data.json'
	export default {
		name: 'Practice',
		components: {
			XesNavbar,
			uButton,
			XesTabbar
		},
		data() {
			return {
				isShowPapers: false,
				wHeight: 0,
				height: 0,
				issueList: [],
				count: 0,
				timer: null,
				pattern: 'exam', // exercise 练习 self-study 自学 exam 考试
				total: 0,
				current: 1,
				confirmList: [] // 多选题选择的答案
			}
		},
		onLoad() {
			// 屏幕的高度
			const wHeight = uni.getSystemInfoSync()['windowHeight']
			// 获取手机状态栏高度
			this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight']
			
			this.height = wHeight - this.statusBarHeight - 42 + 'px'
			
			let list = Json.topics.issueList
			
			this.total = list.length
			
			// 计算每题的答题时间
			this.timer = setInterval(() => {
				this.count++
			}, 1000)
			
			/**
			 * 模式1: 自学模式 直接出现答案, 不可答题, 解析直接出现
			 * 模式2: 考试模式 可重复答题, 一道题答完直接跳下一题
			 * 模式3: 练习模式 一道题答完出现解析
			 * 不同的模式需要不同的方法处理数据
			 * */
			 if (!this.pattern) {
				 return
			 }
			 
			 this.pattern === 'exercise' ? this.toExercisePattern(list) : this.pattern === 'self-study' ? this.toSelfStudyPattern(list) : this.toExamPattern(list)
		},
		methods: {
			changeSwiper(event) {
				this.current = event.detail.current + 1
			},
			// 练习模式的数据
			toExercisePattern(list) {
				list.forEach(item => {
					let ids = []
					item.analysis = false // 是否显示解析
					item.count = 0 // 答题时间
					item.correct = [] // 解析展示的答案
					
					// 给儿子数组添加前端需要的字段
					item.option.forEach(children => {
						children.result = 1 // 每道题目的答题结果
						ids.push(children.id) // 整理children id的集合
					})
					
					// 解析里展示的答案
					item.answer.split(',').forEach(res => {
						item.correct.push(item.option[ids.indexOf(res)].name)
					})
				})
				
				this.issueList = list
			},
			// 自学模式的数据
			toSelfStudyPattern(list) {
				list.forEach(item => {
					let ids = []
					item.analysis = true // 是否显示解析
					item.count = 0 // 答题时间
					item.correct = [] // 解析展示的答案
					
					// 给儿子数组添加前端需要的字段
					item.option.forEach(children => {
						children.result = 1 // 每道题目的答题结果
						ids.push(children.id) // 整理children id的集合
					})
					
					// 解析里展示的答案
					item.answer.split(',').forEach(res => {
						item.correct.push(item.option[ids.indexOf(res)].name)
						item.option[ids.indexOf(res)].result = 2
					})
				})
				
				this.issueList = list
			},
			// 考试模式的数据
			toExamPattern(list) {
				list.forEach(item => {
					
					// 给儿子数组添加前端需要的字段
					item.option.forEach(children => {
						children.result = 1 // 每道题目的答题结果
					})
				})
				
				this.issueList = list
			},
			// 查看解析
			checkAnalysis(issue) {
				const result = issue.answer.split(',')
				let options = []
				
				issue.option.forEach(item => {
					options.push(item.id)
				})
				// 展示正确答案
				result.forEach((item, index) => {
					if(options.indexOf(item) !== -1) {
						const index = options.indexOf(item)
						issue.option[index].result = 2
					}
				})
				
				issue.analysis = true
			},
			// 答题
			handleAnswer(index, item, issue) {
				// 是否可以答题
				if (issue.analysis) {
					return
				}
				
				issue.type === '单选题' ? this.single(index, item, issue) : this.choice(index, item, issue)
			},
			// 单选题
			single(index, item, issue) {
				if (this.pattern === 'exam') {
					issue.option.forEach(item => {
						item.result = 1
					})
					issue.option[index].result = 2
				} else {
					issue.result = issue.option[index].name
					issue.answer === item.id ? issue.option[index].result = 2 : issue.option[index].result = 3
					issue.option[+issue.answer - 1].result = 2 // 展示正确答案
					issue.analysis = true
					issue.count = this.count
					this.count = 0
				}
			},
			// 多选题
			choice(index, item, issue) {
				if (this.confirmList.indexOf(item.id) === -1) {
					this.confirmList.push(item.id)
					issue.option[index].result = 2
				} else {
					let idx = this.confirmList.indexOf(item.id)
					this.confirmList.splice(idx, 1)
					issue.option[index].result = 1
				}
			},
			// 多选确认
			handleConfirm() {
				
			}
		}
	}
</script>

<style lang="scss">
	@import '../../static/scss/practice.scss'
</style>
