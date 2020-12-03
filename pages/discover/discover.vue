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
			<empty v-if="listData.length <= 0" />
			<view v-else class="list" :style="{'margin-top': height}">
				<view class="item" 
					v-for="item in listData"
					:key="item.id"
				>
					<view class="info">
						<image class="avatar" :src="item.avatars" mode=""></image>
						<view class="name-date">
							<view class="name">
								{{ item.username }}
							</view>
							<view class="date">
								{{ item.created_at.substring(5, 10) }}
							</view>
						</view>
					</view>
					<view class="content">
						{{  tabbar.index === 1 ? item.content : item.introductory }}
					</view>
					<view v-if="tabbar.index !== 1" class="original" @click="toDetail(item.id)">
						查看原文
					</view>
					<view class="images">
						<image 
							v-for="image in item.image"
							:key="image.id"
							:class="[item.image.length > 0 ? 'image-2' : 'image-1']"
							:src="item.imagehost + image.image_url"
							@click="handlePreview(image, item.image, item)"
						>
						</image>
					</view>
					<view class="bot">
						<view class="read">
							{{ tabbar.index === 1 ? '' : `${item.click}阅读` }}
						</view>
						<view class="icons">
							<view class="icon-cell" @click="praise(item)">
								<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/discover/dianzan%402x.png" mode=""></image>
								<text class="number">{{ item.admire }}</text>
							</view>
							<view class="icon-cell" @click="handleCommit(item)">
								<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/discover/pinglun%402x.png" mode=""></image>
								<text class="number">{{ item.comment }}</text>
							</view>
							<!-- <button class="button" open-type="share"></button> -->
						</view>
					</view>
				</view>
				<view v-if="total> 1" class="loading">
					<uni-load-more :status="loading" :iconSize="14" />
				</view>
			</view>
			<!-- 发布圈子只在圈子里展示 -->
			<view v-if="tabbar.index === 1" class="issue" @click="handleIssue">
				<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/discover/fabu%402x.png" mode=""></image>
			</view>
		</view>
		<!-- 弹窗 start -->
		<uni-popup ref="popup" type="bottom">
			<view class="popup-inner">
				<scroll-view 
					class="popup-inner-scroll"
					scroll-y="true"
					:scroll-top="top"
					@scroll="scroll"
					@scrolltolower="pullUpLoading"
				>
					<view class="title">
						<view class="icon" @click="hide">
							<uni-icons type="closeempty" />
						</view>
						<view class="text">
							回复列表
						</view>
					</view>
					<view class="popup-list">
						<view 
							class="item"
							v-for="comment in comment.list"
							:key="comment.id"
						>
							<image class="avatar" :src="comment.avatars" mode=""></image>
							<view class="info">
								<view class="username-praise">
									<view class="username">{{ comment.username }}</view>
									<view class="praise" @click="handlePraise(comment)">
										<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/discover/xiaodianzan%402x.png" mode=""></image>
										<view class="number">{{ comment.admire }}</view>
									</view>
								</view>
								<view class="content">
									{{ comment.content }}
								</view>
								<view class="time">
									{{ comment.addtime }} <!-- <text>回复</text> -->
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
				<view class="popup-reply">
					<view class="input-area">
						<input
							class="input"
							type="text"
							v-model="comment.value"
							confirm-type="send"
							placeholder="请输入内容"
						/>
						<image class="send" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/discover/fabiaojiantou%402x.png" mode="" @click="confirm"></image>
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- 弹窗 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import UniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import Empty from '@/components/empty/empty.vue'
	import { 
		discover_list,
		discover_praise,
		discover_comment_list,
		discover_comment,
		discover_comment_admire
	} from '@/common/api/api.js'
	export default {
		name: 'Discover',
		components: {
			XesNavbar,
			UniLoadMore,
			Empty
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
				loading: 'more',
				top: 0,
				comment: {
					id: '',
					list: [],
					value: '',
					page: 1,
					totalPage: 1,
					count: 0
				}
			}
		},
		onLoad(options) {
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
				type: this.tabbar.index + 1,
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
			// 点赞
			praise(raw) {
				if (raw.is_admire) {
					discover_praise({
						id: raw.id,
						mode: 2
					}).then(response => {
						uni.showToast({
							icon: 'none',
							title: '取消成功'
						})
						raw.admire = raw.admire - 1
						raw.is_admire = 0
					})
				} else {
					discover_praise({
						id: raw.id,
						mode: 1
					}).then(response => {
						uni.showToast({
							icon: 'none',
							title: '点赞成功'
						})
						raw.admire = raw.admire + 1
						raw.is_admire = 1
					})
				}
			},
			// 切换卡
			handleTabBarItem(id) {
				this.tabbar.index = id
				this.page = 1
				this.listData = []
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
			},
			async handleCommit(raw) {
				this.comment.page = 1
				this.comment.count = raw.total
				if (this.tabbar.index === 1) {
					uni.showLoading({
						title: '加载中...'
					})
					this.$refs.popup.open()
					this.comment.id = raw.id
					const comment = await discover_comment_list({
						id: raw.id,
						page: 1
					})
					const { data, last_page } = comment.data.data
					data.forEach(item => {
						item.addtime = item.addtime.substring(5, 16)
					})
					this.comment.list = data
					this.comment.totalPage = last_page
					uni.hideLoading()
				} else {
					uni.navigateTo({
						url: `/pages/discover/detail?id=${raw.id}`
					})
				}
			},
			hide() {
				this.$refs.popup.close()
			},
			scroll(e) {
				this.top = e.detail.scrollTop
			},
			// 点击回复
			async confirm() {
				const response = await discover_comment({
					id: this.comment.id,
					content: this.comment.value
				})
				this.comment.value = ''
				this.top = 0
				const { id, content, username, avatars, addtime, pid } = response.data.data
				const time = addtime.substring(5, 16)
				this.comment.list.unshift({
					id,
					addtime: time,
					admire: 0,
					avatars,
					content,
					reply_num: 0,
					username,
					pid,
				})
				// 增加评论数
				this.listData.forEach(list => {
					if (list.id === this.comment.id) {
						list.comment++
					}
				})
			},
			// 上拉刷新
			async pullUpLoading() {
				this.comment.page++
				if (this.comment.page > this.comment.totalPage) {
					return false
				}
				const response = await discover_comment_list({
					page: this.comment.page,
					id: this.comment.id
				})
				const { data } = response.data.data
				data.forEach(item => {
					item.addtime = item.addtime.substring(5, 16)
				})
				this.comment.list = [...this.comment.list, ...data]
			},
			// 评论点赞
			async handlePraise(raw) {
				const response = await discover_comment_admire({
					id: raw.id,
					mode: 1
				})
				uni.showToast({
					icon: 'none',
					title: '点赞成功'
				})
				raw.admire++
			},
			// 图片预览
			handlePreview(current, urls, item) {
				let images = []
				const prefix = item.imagehost
				urls.forEach(url => {
					images.push(item.imagehost + url.image_url)
				})
				uni.previewImage({
					current: prefix + current.image_url,
					urls: images
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/discover.scss'
</style>
