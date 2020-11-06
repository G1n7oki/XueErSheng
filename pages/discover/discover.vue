<template>
	<view class="container">
		<view class="container-inner">
			<!-- 导航栏 start -->
			<xes-navbar title="发现" :margin="32" />
			<!-- 导航栏 end -->
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
				<view class="item" 
					v-for="item in listData"
					:key="item.id"
				>
					<view class="info">
						<image class="avatar" src="http://dummyimage.com/120x600" mode=""></image>
						<view class="name-date">
							<view class="name">
								{{ item.username }}
							</view>
							<view class="date">
								8月22日
							</view>
						</view>
					</view>
					<view class="content">
						{{ item.content }}
					</view>
					<view class="original" @click="toDetail(item.id)">
						查看原文
					</view>
					<view class="images">
						<image 
							v-for="image in item.image"
							:key="image.id"
							:class="[image.length > 0 ? 'image-2' : 'image-1']"
							:src="image.image_url"
							mode=""
						>
						</image>
					</view>
					<view class="bot">
						<view class="read">
							{{ item.click }}阅读
						</view>
						<view class="icons">
							<view class="icon-cell" @click="praise(item.id)">
								<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/discover/dianzan%402x.png" mode=""></image>
								<text class="number">{{ item.admire }}</text>
							</view>
							<view class="icon-cell">
								<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/discover/pinglun%402x.png" mode=""></image>
								<text class="number">18</text>
							</view>
							<button class="button" open-type="share"></button>
						</view>
					</view>
				</view>
				<view v-if="listData.length > 2" class="loading">
					<uni-load-more :status="loading" />
				</view>
			</view>
			<view class="issue" @click="handleIssue">
				<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/discover/fabu%402x.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import UniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import { discover_list, discover_praise } from '@/common/api/api.js'
	export default {
		name: 'Discover',
		components: {
			XesNavbar,
			UniLoadMore
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
				height: 0,
				listData: [], // 数据列表
				page: 1, // 页数
				total: 1, // 总页数
				loading: 'more'
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
			
			const type = this.tabbar.index + 1
			
			this.toData(type)
		},
		// 页面分享
		onShareAppMessage() {
			this.shareData = JSON.stringify(this.shareData)
			
			return {
				title: '发现',
				path: '/pages/discover/detail'
			}
		},
		// 上拉加载
		onReachBottom() {
			++this.page
			// 如果当前页数大于总页数说明没有更多的数据了
			if (this.page > this.total) {
				this.page = this.total
				this.loading = 'noMore'
				return false
			}
			
			this.loading = 'loading'
			
			discover_list({
				type,
				page: this.page
			}).then(response => {
				const res = response.data.data
				this.listData = this.listData.concat(res.data)
				this.loading = 'more'
			})
		},
		methods: {
			// 获取数据
			toData(type) {
				uni.showLoading({
					title: '加载中...'
				})
				discover_list({ 
					type,
					page: this.page
				}).then(response => {
					const res = response.data.data
					this.listData = res.data
					this.total = res.last_page
					uni.hideLoading()
				}).catch(error => {
					uni.hideLoading()
					this.listData = []
				})
			},
			// 点赞 后端没有提供此字段
			praise(id, flag) {
				discover_praise({
					id,
					mode: flag
				}).then(response => {
					console.log(response)
				})
			},
			// 切换卡
			handleTabBarItem(id) {
				this.tabbar.index = id
				this.page = 1
				this.toData(id + 1)
			},
			// 跳转到提问页
			handleIssue() {
				uni.navigateTo({
					url: '/pages/discover/issue'
				})
			},
			// 跳转到详细信息
			toDetail(id) {
				uni.navigateTo({
					url: '/pages/discover/detail?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/discover.scss'
</style>
