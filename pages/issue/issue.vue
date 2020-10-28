<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar
			:is-arrow="true"
			id="navbar"
		>
			<view class="search-input" @click="handleInput">
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
			<view class="hot">
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
				<view class="item" v-for="n in 3" :key="n">
					<view class="crumbs">
						自学考试 > 本科 > 金融学(新)02301K > 03709马克03709马克03709马克
					</view>
				</view>
			</view>
			<!-- 热门问题 end -->
		</view>
		<!-- 内容区域 end -->
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
					current: 0
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
			}
		},
		onLoad() {
			const navbar = uni.createSelectorQuery().in(this)
			navbar.select('#navbar').boundingClientRect(navbar => {
				this.top = navbar.height
			}).exec()
		},
		methods: {
			toId(id) {
				this.tabbar.current = id
			},
			// 点击搜索框
			handleInput() {
				console.log('111')
			},
			// 选择
			selected(e, str) {
				this[str].index = e.target.value
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/issue.scss'
</style>
