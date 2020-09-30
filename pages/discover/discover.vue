<template>
	<view class="contaier">
		<view class="contaier-inner">
			<NavBar title="发现" :margin="32" />
			<!-- tabbar start -->
			<view class="tabbar" id="tabBar">
				<view
					class="item"
					:class="{'active': item.id === tabbar.index}"
					:style="{top: statusBarHeight + 44 + 'px'}"
					v-for="item in tabbar.data"
					:key="item.id"
					@click="handleTabBarItem(item.id)"
				>
					{{ item.name }}
				</view>
				<view class="line-area" :style="{left: tabbar.index * 25 + '%'}">
					<view class="line"></view>
				</view>
			</view>
			<!-- tabbar end -->
			<view class="list" :style="{'margin-top': height}">
				<view class="item">
					<view class="info">
						<image class="avatar" src="/static/image/home/main-icon.png" mode=""></image>
						<view class="name-date">
							<view class="name">
								学尔升课堂
							</view>
							<view class="date">
								8月22日
							</view>
						</view>
					</view>
					<view class="content">
						最新！2020年江西省高校毕业生“三支一扶”计划招募考试笔试时间确定！
					</view>
					<view class="images">
						<image class="image-1" src="/static/image/study/exercise.png" mode=""></image>
					</view>
					<view class="bot">
						<view class="read">
							2210人阅读
						</view>
						<view class="icons">
							<view class="icon-cell">
								<image class="icon" src="" mode=""></image>
								<text class="number">20</text>
							</view>
							<view class="icon-cell">
								<image class="icon" src="" mode=""></image>
								<text class="number">18</text>
							</view>
							<view class="icon-cell">
								<image class="icon" src="" mode=""></image>
							</view>
						</view>
					</view>
				</view>
				<view class="item">
					<view class="info">
						<image class="avatar" src="/static/image/home/main-icon.png" mode=""></image>
						<view class="name-date">
							<view class="name">
								学尔升课堂
							</view>
							<view class="date">
								8月22日
							</view>
						</view>
					</view>
					<view class="content">
						2020年，经北京市政府批准、由朝阳区政府主办的北京中学正式建校。学校以开阔视野，多元化。2017年为了满足部分学生和家长的多元化升学需求北京中学组建国际方向班级。           
					</view>
					<view class="original">
						查看原文
					</view>
					<view class="images">
						<image class="image-9" src="/static/image/study/exercise.png" mode=""></image>
						<image class="image-9" src="/static/image/study/exercise.png" mode=""></image>
						<image class="image-9" src="/static/image/study/exercise.png" mode=""></image>
						<image class="image-9" src="/static/image/study/exercise.png" mode=""></image>
						<image class="image-9" src="/static/image/study/exercise.png" mode=""></image>
						<image class="image-9" src="/static/image/study/exercise.png" mode=""></image>
						<image class="image-9" src="/static/image/study/exercise.png" mode=""></image>
						<image class="image-9" src="/static/image/study/exercise.png" mode=""></image>
						<image class="image-9" src="/static/image/study/exercise.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="issue">
				<image class="icon" src="" mode=""></image>
				<view class="text">
					发布
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import NavBar from '@/components/nav-bar/NavBar.vue'
	export default {
		name: 'Discover',
		components: {
			NavBar
		},
		data() {
			return {
				tabbar: {
					data: [{
						id: 0,
						name: '资讯'
					}, {
						id: 1,
						name: '圈子'
					}, {
						id: 2,
						name: '活动'
					}, {
						id: 3,
						name: '上进故事'
					}],
					index: 0
				},
				height: 0
			}
		},
		onLoad() {
			const that = this
			// tabBar的高度
			const query = uni.createSelectorQuery().in(this)
			query.select('#tabBar').boundingClientRect(res => {
				const tHeight = res.height
				that.height = tHeight + 'px'
			}).exec()
		},
		methods: {
			handleTabBarItem(id) {
				this.tabbar.index = id
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/discover.scss'
</style>
