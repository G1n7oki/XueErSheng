<template>
	<view class="contaier">
		<xes-navbar 
			is-arrow="true"
			:title="treeList[2]"
			:margin="60"
			@showCourseList="showCourseList"
			:is-title-icon="true"
		/>
		<!-- choose course start -->
		<view class="courseList" v-if="flag" :style="{ top: statusBarHeight + 42 + 'px' }">
			<view class="item" @click="handleCourseListItem('语文')">
				语文
			</view>
			<view class="item" @click="handleCourseListItem('语文')">
				数学
			</view>
			<view class="item" @click="handleCourseListItem('语文')">
				英语
			</view>
		</view>
		<!-- choose course end -->
		<view class="inner">
			<!-- stat start -->
			<view class="stat">
				<view class="top">
					<view class="left">
						<image class="icon" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602579342591&di=8781b7e64524a383c102a82bedabb7d0&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F01%2F34%2F96%2F23573bca52a6b30.jpg" mode=""></image>
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
					<view class="item">
						<image class="icon" src="/static/image/topics/meiriyilian@2x.png" mode=""></image>
						<text class="text">每日一练</text>
					</view>
					<view class="line"></view>
					<view class="item">
						<image class="icon" src="/static/image/topics/paihangbang@2x.png" mode=""></image>
						<text class="text">排行榜</text>
					</view>
				</view>
				<view class="bot">
					<navigator url="/pages/topics/paper?title=历年真题" class="item" hover-class="none">
						<image class="icon" src="/static/image/topics/linianzhenti@2x.png" mode=""></image>
						<text class="text">历年真题</text>
					</navigator>
					<navigator url="/pages/topics/paper?title=模拟试卷" class="item" hover-class="none">
						<image class="icon" src="/static/image/topics/monishijuan@2x.png" mode=""></image>
						<text class="text">模拟试卷</text>
					</navigator>
					<navigator class="item" hover-class="none">
						<image class="icon" src="/static/image/topics/cuotishoucang@2x.png" mode=""></image>
						<text class="text">错题收藏</text>
					</navigator>
					<navigator class="item" hover-class="none">
						<image class="icon" src="/static/image/topics/zuotijkilu@2x.png" mode=""></image>
						<text class="text">做题记录</text>
					</navigator>
				</view>
			</view>
			<!-- link end -->
			<!-- 章节精练 start -->
			<view class="practice">
				<view class="practice-title">
					<Title name="章节精练" />
					<image class="icon" src="/static/image/topics/shehzi@2x.png" mode="" @click="toSet"></image>
				</view>
				<view class="unfinished" v-if="questionData.not_complete">
					<view class="info">
						上次未完成：第三章2Z20310建 设工程招标投第三章2Z20310建 设工程招标投第三章2Z20310建 设工程招标投
					</view>
					<button type="default">继续练题</button>
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
										:percent="topic.correct / topic.total * 100"
										:show-info="false"
									/>
								</view>
								<view class="result-1">
									{{ topic.correct }} / {{ topic.total }}
								</view>
								<view class="line"></view>
								<view class="result-2">
									正确率{{ topic.accuracy }}%
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
										v-for="(item, index) in topic.children"
										:key="item.id"
									>
										<view class="split-line" v-if="index + 1 !== topic.children.length"></view>
										<view class="top">
											<view class="dot"></view>
											<view class="name">
												{{ item.name }}
											</view>
											<button type="default">做题</button>
										</view>
										<view class="bot">
											<view class="progress">
												<Progress
													:strokeWidth="3"
													:percent="item.correct / item.total *100"
													:show-info="false"
												/>
											</view>
											<view class="result-1">
												{{ item.correct }} / {{ item.total }}
											</view>
											<view class="line"></view>
											<view class="result-2">
												正确率{{ item.accuracy }}%
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
	import { question, refine } from '@/common/api/api.js'
	// import Json from '@/static/data.json'
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
				foldIcon: '/static/image/topics/shouqi@2x.png', // 折叠图片
				unfoldIcon: '/static/image/topics/zhankai@2x.png', // 折叠图片
				topicList: [],
				questionData: {}
			}
		},
		onLoad() {
			this.treeList = uni.getStorageSync('crumbs')
			
			this.toQuestion()
		},
		methods: {
			// 获取题库练习数据
			toQuestion() {
				uni.showLoading({
					title: '加载中...'
				})
				question({ profession_id: uni.getStorageSync('profession_id') }).then(response => {
					const res = response.data
					this.questionData = res.data
				}).catch(error => {
					uni.hideLoading()
					uni.showToast({
						icon: 'none',
						title: error.data.message
					})
				}).then(() => {
					this.toRefine()
				})
			},
			// 获取章节精练数据
			toRefine() {
				refine({ profession_id: uni.getStorageSync('profession_id') }).then(response => {
					const res = response.data
					this.topicList = res.data
					uni.hideLoading()
				}).catch(error => {
					uni.hideLoading()
					uni.showToast({
						icon: 'none',
						title: error.data.message
					})
				})
			},
			showCourseList(param) {
				this.flag = param
			},
			// 点击子学科
			handleCourseListItem(str) {
				// console.log(str)
			},
			// 点击切换专业
			toProfessional() {
				uni.navigateTo({
					url: '/pages/professional/professional'
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
			} 
		}
	}
</script>

<style lang="scss">
	@import '../../static/scss/topics.scss'
</style>
