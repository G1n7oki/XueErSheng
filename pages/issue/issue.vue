<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar
			:is-arrow="true"
			id="navbar"
		>
			<view class="search-input" @click="handleInput">
				<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/issue/sousuo%402x.png" mode=""></image>
				搜索您感兴趣的问题或回答
			</view>
		</xes-navbar>
		<!-- 导航栏 end -->
		<!-- 切换卡 start -->
		<view class="tabbar" :style="{top: top + 'px'}">
			<xes-text-tabbar
				:list="tabbar.list"
				:current="tabbar.current"
				@postId="toId"
			/>
		</view>
		<!-- 切换卡 end -->
		<!-- 内容区域 start -->
		<view class="content">
			<!-- 热门问题 start -->
			<view class="hot" v-if="tabbar.current === 0">
				<view class="filter-area" :style="{top: filterTop + 'px'}">
					<view class="filter">
						<picker class="picker" @change="selected($event, 'type')" :value="type.index" :range="type.range">
								<view class="text">{{type.range[type.index]}}</view>
								<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/common/arrowdown.png" mode=""></image>
						</picker>
						<picker class="picker" @change="selected($event, 'specialty')" :value="specialty.index" :range="specialty.range">
								<view class="text">{{specialty.range[specialty.index]}}</view>
								<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/common/arrowdown.png" mode=""></image>
						</picker>
						<picker class="picker" @change="selected($event, 'subject')" :value="subject.index" :range="subject.range">
								<view class="text">{{subject.range[subject.index]}}</view>
								<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/common/arrowdown.png" mode=""></image>
						</picker>
					</view>
				</view>
				<view class="item" v-for="n in 6" :key="n">
					<view class="crumbs">
						自学考试 > 本科 > 金融学(新)02301K > 03709马克03709马克03709马克
					</view>
					<view class="title">
						您好，马克思 | 认为“马克思主义”是洗脑，这本身是一种被洗脑的表现
					</view>
					<view class="source">
						视频回复来源：中国青年网。“认为马克思主义是洗脑，这本身是一种洗脑的表现。”正确区分学习概论知识技能处视频回复来源：中国青年网。“认为马克思主义是洗脑，这本身是一种洗脑的表现。”正确区分学习概论知识技能处               
					</view>
					<view class="bot">
						<view class="praise-reply">
							1240 赞同 · 21回复
						</view>
						<view class="date">
							2020.09.10
						</view>
					</view>
				</view>
			</view>
			<!-- 热门问题 end -->
			<!-- 我的提问 start -->
			<view class="question" v-else-if="tabbar.current === 1">
				<view class="item" v-for="n in 6" :key="n">
					<view class="crumbs">
						自学考试 > 本科 > 金融学(新)02301K > 03709马克03709马克03709马克
					</view>
					<view class="title">
						您好，马克思 | 认为“马克思主义”是洗脑，这本身是一种被洗脑的表现
					</view>
					<view class="source">
						视频回复来源：中国青年网。“认为马克思主义是洗脑，这本身是一种洗脑的表现。”正确区分学习概论知识技能处视频回复来源：中国青年网。“认为马克思主义是洗脑，这本身是一种洗脑的表现。”正确区分学习概论知识技能处               
					</view>
					<view class="bot">
						<view class="praise-reply">
							1240 赞同 · 21回复
						</view>
						<view class="date">
							2020.09.10
						</view>
					</view>
				</view>
			</view>
			<!-- 我的提问 end -->
			<!-- 我的回答 start -->
			<view class="answer" v-else>
				<view class="item" v-for="n in 6" :key="n">
					<image class="delete" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/issue/DEL%402x.png" mode="" @click="handleDelete"></image>
					<view class="userinfo">
						<image class="avatar" src="http://dummyimage.com/125x125" mode=""></image>
						<view class="name-date">
							<view class="name">
								学员_122100112
							</view>
							<view class="date">
								2020.08.05
							</view>
						</view>
					</view>
					<view class="reply">
						同时，我省还公布了艺术、体育类各批次文化录取控制线和专业合格线、资格线。
					</view>
					<navigator url="/pages/issue/detail" hover-class="none" class="bot">
						<view class="bot-crumbs">
							自学考试 > 本科 > 金融学(新)02301K > 03709037090370903709
						</view>
						<view class="bot-title">
							您好，马克思|认为“马克思主义”是洗脑，这本身是一种被洗脑的表现
						</view>
						<view class="bot-answer">
							已有6个回答
							<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/common/arrowdown.png" mode=""></image>
						</view>
					</navigator>
					<view class="praise">
						<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/discover/xiaodianzan%402x.png" mode=""></image>
						12
					</view>
				</view>
			</view>
			<!-- 我的回答 end -->
		</view>
		<!-- 内容区域 end -->
		<!-- 提问 start -->
		<navigator url="/pages/issue/choose" hover-class="none" class="ask"></navigator>
		<!-- 提问 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import XesTextTabbar from '@/components/xes-text-tabbar/xes-text-tabbar.vue'
	export default {
		name: 'Issue',
		components: {
			XesNavbar,
			XesTextTabbar
		},
		data() {
			return {
				tabbar: {
					list: [{
						id: 0,
						name: '热门问题'
					}, {
						id: 1,
						name: '我的提问'
					}, {
						id: 2,
						name: '我的回答'
					}],
					current: 2
				},
				top: 0, // 选项卡定位值
				type: {
					range: ['类型', '自学考试', '成人高考'],
					index: 0
				}, // 类型选择器
				specialty: {
					range: ['专业', '自学考试', '成人高考'],
					index: 0
				}, // 专业选择器
				subject: {
					range: ['科目', '自学考试', '成人高考'],
					index: 0
				}, // 科目选择器
				filterTop: 0
			}
		},
		onLoad() {
			const navbar = uni.createSelectorQuery().in(this)
			navbar.select('#navbar').boundingClientRect(navbar => {
				this.top = navbar.height
				this.filterTop = navbar.height + 52
			}).exec()
		},
		methods: {
			toId(id) {
				this.tabbar.current = id
			},
			// 点击搜索框
			handleInput() {
				uni.navigateTo({
					url: '/pages/issue/search'
				})
			},
			// 选择
			selected(e, str) {
				this[str].index = e.target.value
			},
			// 删除
			handleDelete() {
				uni.showModal({
					title: '提示',
					content: '确定删除此条信息?',
					success(res) {
						if (res.confirm) {
							uni.showToast({
								icon: 'none',
								title: '删除'
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/issue.scss'
</style>
