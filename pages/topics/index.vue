<template>
	<view class="container">
		<xes-navbar 
			is-arrow="true"
			:title="title"
			:margin="60"
			@showCourseList="showCourseList"
			:is-title-icon="true"
		/>
		<!-- choose course start -->
		<scroll-view 
			v-if="flag"
			class="courseList"
			scroll-y
		>
			<view 
				v-for="item in subject"
				:key="item.id"
				class="item"
				@click="handleCourseListItem(item)">
				{{ item.name }}
			</view>
		</scroll-view>
		<!-- choose course end -->
		<view class="inner">
			<!-- stat start -->
			<view class="stat">
				<view class="top">
					<view class="left">
						<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/common/crumbs.png" mode=""></image>
						<view class="crumbs">
							<view class="crumbs-cell" v-for="(item, index) in treeList" :key="item">
								<view class="text">
									{{ item }}
								</view>
								<view class="symbol" v-if="treeList.length !== index + 1"></view>
							</view>
						</view>
					</view>
					<view @click="toProfessional">
						<view-more text="切换"/>
					</view>
				</view>
				<view class="bot">
					<view class="number-text">
						<view class="number">
							{{ questionData.today }} <text>道</text>
						</view>
						<view class="text">
							今日练题
						</view>
					</view>
					<view class="line"></view>
					<view class="number-text">
						<view class="number">
							{{ questionData.amount }} <text>道</text>
						</view>
						<view class="text">
							总练题数
						</view>
					</view>
					<view class="line"></view>
					<view class="number-text">
						<view class="number">
							{{ questionData.accuracy }} <text>%</text>
						</view>
						<view class="text">
							正确率
						</view>
					</view>
				</view>
			</view>
			<!-- stat end -->
			<!-- link start -->
			<view class="links">
				<view class="top">
					<navigator url="/pages/topics/practice" hover-class="none" class="item">
						<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/topics/meiriyilian%402x.png" mode=""></image>
						<text class="text">每日一练</text>
					</navigator>
					<view class="line"></view>
					<navigator url="/pages/topics/rank" hover-class="none" class="item">
						<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/topics/paihangbang%402x.png" mode=""></image>
						<text class="text">排行榜</text>
					</navigator>
				</view>
				<view class="bot">
					<navigator :url="'/pages/topics/paper?title=历年真题&id=' + id" class="item" hover-class="none">
						<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/topics/linianzhenti%402x.png" mode=""></image>
						<text class="text">历年真题</text>
					</navigator>
					<navigator :url="'/pages/topics/paper?title=模拟试卷&id=' + id" class="item" hover-class="none">
						<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/topics/monishijuan%402x.png" mode=""></image>
						<text class="text">模拟试卷</text>
					</navigator>
					<navigator class="item" url="/pages/topics/wrong" hover-class="none">
						<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/topics/cuotishoucang%402x.png" mode=""></image>
						<text class="text">错题收藏</text>
					</navigator>
					<navigator class="item" url="/pages/topics/record" hover-class="none">
						<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/topics/zuotijkilu%402x.png" mode=""></image>
						<text class="text">做题记录</text>
					</navigator>
				</view>
			</view>
			<!-- link end -->
			<!-- 章节精练 start -->
			<view class="practice">
				<view class="practice-title">
					<Title name="章节精练" />
					<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/topics/setting.png" mode="" @click="toSet"></image>
				</view>
				<view class="unfinished" v-if="questionData.not_complete.title">
					<view class="info">
						上次未完成：{{ questionData.not_complete.title }}
					</view>
					<button type="default" @click="handleContinue">继续练题</button>
				</view>
				<view class="list">
					<view 
						class="list-cell"
						v-for="topic in topicList"
						:key="topic.id"
					>
						<view class="title">
							<view class="icon-name">
								<image 
									class="icon"
									:src="topic.isOpen ? unfoldIcon: foldIcon"
									mode=""
									@click="handleListCell(topic.id)"
								></image>
								<view class="name">
									{{ topic.name }}
								</view>
							</view>
							<view class="progress-result">
								<view class="progress">
									<Progress
										:strokeWidth="3"
										:percent="parseInt(topic.user_do / topic.count * 100)"
										:show-info="false"
									/>
								</view>
								<view class="result-1">
									{{ topic.user_do }} / {{ topic.count }}
								</view>
								<view class="line"></view>
								<view class="result-2">
									正确率{{ parseInt(topic.right / topic.count * 100) }}%
								</view>
							</view>
						</view>
						<uni-transition :show="topic.isOpen" :modeClass="['fade']">
							<view
								class="content"
							>
								<view class="contet-info">
									<view 
										class="info"
										v-for="(item, index) in topic.sub"
										:key="item.id"
									>
										<view class="split-line" v-if="index + 1 !== topic.sub.length"></view>
										<view class="top">
											<view class="dot"></view>
											<view class="name">
												{{ item.name }}
											</view>
											<button type="default" @click="hanleTodo(item.paper_id)">做题</button>
										</view>
										<view class="bot">
											<view class="progress">
												<Progress
													:strokeWidth="3"
													:percent="parseInt(item.user_do / item.count *100)"
													:show-info="false"
												/>
											</view>
											<view class="result-1">
												{{ item.user_do }} / {{ item.count }}
											</view>
											<view class="line"></view>
											<view class="result-2">
												正确率{{ parseInt(item.right / item.count * 100) }}%
											</view>
										</view>
									</view>
								</view>
							</view>
						</uni-transition>
					</view>
				</view>
			</view>
			<!-- 章节精练 end -->
		</view>
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import ViewMore from '@/components/view-more/ViewMore.vue'
	import Title from '@/components/title/Title.vue'
	import Progress from '@/components/progress/progress.vue'
	import UniTransition from '@/components/uni-transition/uni-transition.vue'
	import { question, refine, live_subject } from '@/common/api/api.js'
	export default {
		name: 'Topics',
		components: { 
			XesNavbar,
			ViewMore,
			Title,
			Progress,
			UniTransition
		},
		data() {
			return {
				flag: false, // 显示隐藏子学科
				treeList: [], // 面包屑
				foldIcon: 'https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/topics/shouqi%402x.png',  // 折叠图片
				unfoldIcon: 'https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/topics/zhankai%402x.png', // 折叠图片
				topicList: [],
				questionData: {
					today: 0,
					amount: 0,
					accuracy: 0,
					not_complete: {}
				},
				subject: [],
				title: '', // 科目标题
				id: '' // 科目id
			}
		},
		onLoad() {
			this.treeList = uni.getStorageSync('crumbs')
			this.toData()
		},
		methods: {
			async toData() {
				uni.showLoading({
					title: '加载中...'
				})
				// 获取科目数据
				const subject = await live_subject({
					profession_id: uni.getStorageSync('profession_id')
				})
				this.subject = subject.data.data
				this.title = subject.data.data[0].name
				this.id = subject.data.data[0].id
				// 获取题库练习数据
				const stats = await question({
					profession_id: uni.getStorageSync('profession_id')
				})
				this.questionData = stats.data.data
				// 获取章节精练数据
				const chapter = await refine({
					profession_id: this.id
				})
				chapter.data.data.forEach(item => {
					item.isOpen = false
				})
				this.topicList = chapter.data.data
				uni.hideLoading()
			},
			showCourseList(param) {
				this.flag = param
			},
			// 点击子学科
			async handleCourseListItem(raw) {
				uni.showLoading({
					title: '加载中...'
				})
				this.title = raw.name
				this.id = raw.id
				this.flag = false
				
				// 获取章节精练数据
				const chapter = await refine({
					profession_id: raw.id
				})
				chapter.data.data.forEach(item => {
					item.isOpen = false
				})
				this.topicList = chapter.data.data
				uni.hideLoading()
				
				uni.hideLoading()
			},
			// 点击切换专业
			toProfessional() {
				uni.navigateTo({
					url: '/pages/professional/professional?type=1'
				})
			},
			// 折叠
			handleListCell(id) {
				this.topicList.forEach(item => {
					if (item.id === id) {
						item.isOpen = !item.isOpen
					}
				})
			},
			// 点击设置按钮
			toSet() {
				uni.navigateTo({
					url: '/pages/topics/set'
				})
			} ,
			// 继续练题
			handleContinue() {
				const { paper_id } = this.questionData.not_complete
				uni.navigateTo({
					url: `/pages/topics/practice?paper=${paper_id}`
				})
			},
			hanleTodo(id) {
				uni.navigateTo({
					url: `/pages/topics/practice?paper=${id}`
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/topics.scss'
</style>
