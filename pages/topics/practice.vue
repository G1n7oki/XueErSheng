<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar
			is-arrow="true"
			is-title="false"
		>
			<xes-tabbar
				:current="current"
				:total="total"
				:list="issueList"
			/>
		</xes-navbar>
		<!-- 导航栏 end -->
		<!-- 答题部分 start -->
		<swiper 
			class="swiper"
			:duration="500"
			:style="{height: height}"
			@change="changeSwiper"
		>
			<swiper-item 
				v-for="issue in issueList"
				:key="issue.id"
			>
				<scroll-view class="scroll-view" scroll-y="true" >
					<view class="issue-title">
						<view class="type">
							{{ issue.question_type | formatType }}
						</view>
						<view class="score">
							{{ issue.score }}分
						</view>
					</view>
					<view class="issue-topic">
						<view class="name" v-if="issue.content_type === 1">
							{{ issue.content }}
						</view>
						<image v-else class="image" :src="issue.content" mode="" @click="preview(issue.content)"></image>
						<view class="options">
							<view 
								class="option-cell"
								v-for="(item, index) in issue.option"
								:key="item.id"
							>
								<!-- result 1未答 2正确 3错误 -->
								<view 
									class="option-cell__name"
									:class="{'success': item.result === 2, 'error': item.result === 3}"
									@click="handleAnswer(item, issue)"
								>
									{{ item.abcd_order.toLocaleUpperCase() }}
								</view>
								<view v-if="item.content_type === 1" class="option-cell__cotent">
									{{ item.content }}
								</view>
								<image v-else class="image" :src="item.content" mode="" @click="preview(item.content)"></image>
							</view>
						</view>
						<view @click="handleConfirm(issue)">
							<uButton
								v-if="issue.question_type === 2"
								text="确认答案"
							/>
						</view>
					</view>
					<view class="split-line" v-if="issue.isOpen"></view>
					<view class="analysis" v-if="issue.isOpen && pattern !== 'exam'">
						<view class="tips">
							正确答案 <text class="success">{{ issue.answer_cn }}</text> , 您的答案 <text class="result"></text> , 用时{{ issue.count }}秒
						</view>
						<!-- <view class="stat">
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
						</view> -->
						<view class="resolve">
							<view class="resolve-title">
								解析
							</view>
							<view class="resolve-text">
								{{ issue.parse }}
							</view>
						</view>
					</view>
					<view v-if="!issue.isOpen && pattern === 'exercise'" class="button" @click="handleIsOpen(issue)">
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
	import { paper_list, error_reform, topics_practice } from '@/common/api/api.js'
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
				issueList: [], // 题目列表
				count: 0,
				timer: null,
				pattern: uni.getStorageSync('pattern') || 'exercise', // exercise 练习 self-study 自学 exam 考试
				total: 0,
				current: 1,
				// demo result: [{ id: 1, choose: id, status: 0代表错误 ，1代表正确,2半对 }]
				result: []
			}
		},
		onLoad(options) {
			console.log(options)
			// 屏幕的高度
			const wHeight = uni.getSystemInfoSync()['windowHeight']
			// 获取手机状态栏高度
			this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight']
			
			this.height = wHeight - this.statusBarHeight - 44 + 'px'
			
			if (options.exam) {
				this.toErrorData(options.exam, options.paper)
			} else if (!options.exam && !options.paper) {
				this.toDailyPracticeData()
			} else {
				this.toData(options.paper)
			}
		},
		filters: {
			// 题目类别 1 单选 ，2 多选， 3判断，4主观: 直接出现答案
			formatType(value) {
				switch (value) {
					case 1: 
						return '单选'
					case 2:
						return '多选'
					case 3:
						return '判断'
					case 4: 
						return '主观'
					default: 
						return ''
				}
			}
		},
		methods: {
			async toData(id) {
				uni.showLoading({
					title: '加载中...'
				})
				const response = await practice({
					paper_id: 1,
					profession_id: 44,
					type: 0,
					exam_id: ''
				})
				const list = response.data.data
				this.total = list.length
				
				/**
				 * 模式1: 自学模式 直接出现答案, 不可答题, 解析直接出现
				 * 模式2: 考试模式 可重复答题, 一道题答完直接跳下一题
				 * 模式3: 练习模式 一道题答完出现解析
				 * 不同的模式需要不同的方法处理数据
				 * */
				// if (!this.pattern) {
				// 	return
				// }
				 
				this.pattern === 'exercise' ? this.toExercisePattern(list) : this.pattern === 'self-study' ? this.toSelfStudyPattern(list) : this.toExamPattern(list)
				uni.hideLoading()
			},
			// 获取每日一练数据
			async toDailyPracticeData() {
				uni.showLoading({
					title: '加载中...'
				})
				// 获取每日一练id
				const pid = await topics_practice({
					profession_id: uni.getStorageSync('profession_id')
				})
				const { id } = pid.data.data
				// 获取试卷内容
				const paper = await paper_list({
					paper_id: id,
					profession_id: uni.getStorageSync('profession_id'),
					type: 0
				})
				const list = paper.data.data
				this.total = list.length
				if (this.pattern === 'exercise') {
					this.toExerciseData(list)
				}
				uni.hideLoading()
			},
			// 获取错题重做数据
			async toErrorData(exam, paper) {
				uni.showLoading({
					title: '加载中...'
				})
				const response = await error_reform({
					exam_id: exam,
					paper_id: paper
				})
				// 需要区分当前是那种模式
				if (this.pattern === 'exercise') { // 练习模式
					this.toExerciseData(response.data.data)
				}
				uni.hideLoading()
			},
			changeSwiper(event) {
				this.current = event.detail.current + 1
			},
			// 整理练习模式的数据
			toExerciseData(list) {
				list.forEach(item => {
					item.isOpen = false // 增加是否展示解析
					item.confirm = [] // 选择的答案
					item.count = 0 // 答题时间
					// 给每个答案做一个标记
					item.option.forEach(option => {
						option.result = 1
					})
				})
				this.issueList = list
			},
			// 查看解析
			handleIsOpen(raw) {
				raw.isOpen = true
			},
			// 答题
			handleAnswer(item, issue) {
				// 是否可以答题
				if (issue.isOpen) {
					return
				}
				// 判断是走单选还是多选的逻辑
				issue.question_type === 1 ? this.single(item, issue) : this.choice(item, issue)
			},
			// 单选题
			single(item, issue) {
				// 这里需要判断是哪种模式
				if (this.pattern === 'exam') {
					
				} else {
					// 是否选择正确
					const result = issue.answer === item.id.toString()
					// 高亮结果
					item.result = result ? 2 : 3
					// 记录时间
					// issue.count = this.count
					// this.count = 0
					// 记录选择的答案 用于展示到解析
					// issue.confirm.push(item.abcd_order.toLocaleUpperCase())
					// 不可再答题
					issue.isOpen = true
					// 答题记录
					this.result.push({
						id: issue.id,
						choose: item.id,
						status: result ? 1 : 0
					})
				}
			},
			// 多选题
			choice(item, issue) {
				if (issue.confirm.indexOf(item.id) === -1) {
					issue.confirm.push(item.id)
					item.result = 2
				} else {
					let idx = issue.confirm.indexOf(item.id)
					issue.confirm.splice(idx, 1)
					item.result = 1
				}
			},
			// 多选确认
			handleConfirm(issue) {
				const answer = issue.answer.split(',')
				const { confirm } = issue
				if (this.pattern === 'exam') {
					
				} else {
					// 高亮选择后的答案
					confirm.forEach(item => {
						
					})
					issue.isOpen = true
				}
				// 判断答题结果为那种类型
				if (!this.findOne(answer, confirm)) {
					issue.result = 3
					console.log('错误')
				} else {
					if (confirm.length < answer.length) { // 如果选择答案的长度小于标准答案则为半对
						issue.result = 2
						console.log('半对')
					} else { // 否则为全对
						issue.result = 1
						console.log('正确')
					}
				}
			},
			// 检测选择的答案是否在正确答案内
			findOne(haystack, arr) {
				return arr.every(item => haystack.indexOf(item) >= 0)
			},
			// 预览
			preview (str) {
				const url = []
				url.push(str)
				uni.previewImage({
					urls: url
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/practice.scss'
</style>
