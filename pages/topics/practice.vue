<template>
	<view class="contaier">
		<NavBar
			is-arrow="true"
			is-title="false"
			is-icons="true"
			@showPapers="showPapers"
		/>
		<!-- 答题部分 start -->
		<swiper :duration="500" :style="{height: height}">
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
								@click="handleAnswer(index, item.id, issue)"
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
					</view>
					<view class="split-line" v-if="issue.analysis"></view>
					<view class="analysis" v-if="issue.analysis && pattern === 'exercise'">
						<view class="tips">
							正确答案 <text class="success">D</text> , 您的答案 <text class="result">C</text> , 用时{{ issue.count }}秒
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
					<view v-if="!issue.analysis && pattern === 'exercise'" class="button" @click="handleButton(issue)">
						<uButton text="查看解析" />
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		<!-- 答题部分 end -->
		<!-- 交卷弹窗 start -->
		<view class="papers-dialog" v-if="isShowPapers">
			<view class="papers-dialog__inner">
				<view class="papers-dialog__inner--title">
					提示
				</view>
				<view class="papers-dialog__inner--content">
					亲, 还有39道题目未完成
				</view>
				<view class="papers-dialog__inner--item">
					查看未完成的题目
				</view>
				<view class="papers-dialog__inner--item">
					继续提交
				</view>
				<view class="papers-dialog__inner--item" @click="closePaper">
					关闭
				</view>
			</view>
		</view>
		<!-- 交卷弹窗 end -->
	</view>
</template>

<script>
	import NavBar from '@/components/nav-bar/NavBar.vue'
	import uButton from '@/components/u-button/uButton.vue'
	import Json from '@/static/data.json'
	export default {
		name: 'Practice',
		components: {
			NavBar,
			uButton
		},
		data() {
			return {
				isShowPapers: false,
				wHeight: 0,
				height: 0,
				issueList: [],
				count: 0,
				timer: null,
				pattern: 'exercise'
			}
		},
		onLoad() {
			// 屏幕的高度
			const wHeight = uni.getSystemInfoSync()['windowHeight']
			// 获取手机状态栏高度
			this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight']
			
			this.height = wHeight - this.statusBarHeight - 42 + 'px'
			
			let list = Json.topics.issueList
			
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
			 
			 this.pattern === 'exercise' ? this.toExercisePattern(list) : ''
		},
		methods: {
			closePaper() {
				this.isShowPapers = false
			},
			showPapers(val) {
				this.isShowPapers = val
			},
			// 处理数据的方法
			toExercisePattern(list) {
				list.forEach(item => {
					item.once = false // 是否只能答一次
					item.analysis = false // 是否显示解析
					item.count = 0 // 答题时间
					item.result = 1 // 每道题目的答题结果
					
					// 给儿子数组添加前端需要的字段
					item.option.forEach(children => {
						children.result = 1 // 每道题目的答题结果
					})
				})
				
				this.issueList = list
			},
			// 点击按钮
			handleButton(issue) {
				issue.analysis = true
				issue.option[+issue.answer].result = 2
			},
			// 答题
			handleAnswer(index, id, issue) {
				// 是否可以答题
				if (issue.once) {
					return
				}
				
				this.single(index, id, issue)
			},
			// 单选题
			single(index, id, issue) {
				issue.option.forEach(item => {
					
				})
				issue.showAnswer = "D"
				issue.answer === id ? issue.option[index].result = 2 : issue.option[index].result = 3
				issue.option[+issue.answer - 1].result = 2 // 展示正确答案
				issue.once = true
				issue.analysis = true
			}
		}
	}
</script>

<style lang="scss">
	@import '../../static/scss/practice.scss'
</style>
