<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar 
			title="问题详情"
			text-align="center"
			:is-arrow="true"
		/>
		<!-- 导航栏 end -->
		<!-- 详情 start -->
		<view class="detail">
			<view class="crumbs">
				{{ detail.crumbs }}
			</view>
			<view class="title">
				{{ detail.title }}
			</view>
			<view class="content">
				{{ detail.content }}
			</view>
			<view class="image-wrap">
				<image 
					class="image"
					v-for="item in detail.img"
					:key="item"
					:src="item"
					mode=""
					@click="handlePreview(item, detail.img)"
				></image>
			</view>
			<view class="bot">
				<view class="praise-reply">
					提问人: {{ detail.username }}
				</view>
				<view class="date">
					{{ detail.addtime }}
				</view>
			</view>
			<image v-if="detail.is_can === 1" class="delete" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/issue/DEL%402x.png" mode="" @click="handleDelete"></image>
		</view>
		<!-- 详情 end -->
		<!-- 评论 start -->
		<view class="comment-area">
			<view class="head">
				<title :name="'全部评论(' + comment.total + ')'" />
				<view class="filter">
					<view class="cell" :class="{'active': type === 'new'}" @click="handleCell('new')">最新</view>
					<view class="line"></view>
					<view class="cell" :class="{'active': type === 'hot'}" @click="handleCell('hot')">最热</view>
				</view>
			</view>
			<view 
				class="item"
				v-for="comment in comment.list"
				:key="comment.id"
			>
				<image class="avatar" :src="comment.avatars" mode=""></image>
				<view class="other">
					<view class="name-zan">
						<view class="name">
							{{ comment.username }}
						</view>
						<view class="zan" @click="handlePraise(comment)">
							<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/discover/xiaodianzan%402x.png" mode=""></image>
							<view class="number">
								{{ comment.admire }}
							</view>
						</view>
					</view>
					<view class="comment">
						{{ comment.content }}
					</view>
					<view class="date-reply">
						{{ comment.addtime }} <text class="dot"> · </text><text class="reply" @click="show(comment)">{{ comment.reply_num === 0 ? '' : comment.reply_num }}回复</text>
					</view>
				</view>
			</view>
			<uni-load-more v-if="loading.show" :status="loading.status" :iconSize="14" />
		</view>
		<!-- 评论 end -->
		<!-- 回复 start -->
		<view class="reply-area">
			<view class="input-area">
				<input
					class="input"
					type="text"
					v-model="comment.value"
					confirm-type="send"
					placeholder="发表您的看法"
					@confirm="confirm"
				/>
				<image class="send" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/discover/fabiaojiantou%402x.png" mode="" @click="confirm"></image>
			</view>
		</view>
		<!-- 回复 end -->
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
							回复详情
						</view>
					</view>
					<view class="default">
						<image class="avatar" :src="comment2.default.avatars" mode=""></image>
						<view class="info">
							<view class="username-praise">
								<view class="username">{{ comment2.default.username }}</view>
								<view class="praise">
									<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/discover/xiaodianzan%402x.png" mode=""></image>
									<view class="number">{{ comment2.default.admire }}</view>
								</view>
							</view>
							<view class="content">
								{{ comment2.default.content }}
							</view>
							<view class="time">
								{{ comment2.default.addtime }}
							</view>
						</view>
					</view>
					<view class="list">
						<view 
							class="item"
							v-for="comment2 in comment2.list"
							:key="comment2.id"
						>
							<image class="avatar" :src="comment2.avatars" mode=""></image>
							<view class="info">
								<view class="username-praise">
									<view class="username">{{ comment2.username }}</view>
									<view class="praise" @click="handlePraise(comment2)">
										<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/discover/xiaodianzan%402x.png" mode=""></image>
										<view class="number">{{ comment2.admire }}</view>
									</view>
								</view>
								<view class="content">
									{{ comment2.content }}
								</view>
								<view class="time">
									{{ comment2.addtime }} <!-- <text>回复</text> -->
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
							v-model="comment2.value"
							confirm-type="send"
							:placeholder="comment2.placeholder"
							@confirm="confirm2"
						/>
						<image class="send" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/discover/fabiaojiantou%402x.png" mode="" @click="confirm2"></image>
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- 弹窗 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import Title from '@/components/title/Title.vue'
	import UniPopup from '@/components/uni-popup/uni-popup.vue'
	import UniIcons from '@/components/uni-icons/uni-icons.vue'
	import UniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import { 
		issue_detail,
		issue_detail_remove,
		issue_detail_comment,
		issue_detail_comment2,
		issue_comment,
		issue_comment_admire
		} from '@/common/api/api.js'
	export default {
		name: 'Detail',
		components: {
			XesNavbar,
			Title,
			UniPopup,
			UniIcons,
			UniLoadMore
		},
		data() {
			return {
				id: 0,
				detail: {},
				comment: { // 一级评论相关
					value: '',
					list: [],
					page: 1,
					totalPage: 1,
					total: 0
				},
				comment2: { // 二级评论相关
					value: '',
					list: [],
					page: 1,
					totalPage: 1,
					default: {},
					placeholder: ''
				},
				loading: { // 加载相关
					show: false,
					status: 'more'
				},
				type: 'new',
				top: 0
			}
		},
		onLoad(options) {
			this.id = options.id
			this.toData(options.id)
		},
		// 一级评论上拉加载
		async onReachBottom() {
			this.comment.page++
			if (this.comment.page > this.comment.totalPage) {
				this.loading.status = 'noMore'
				return false
			}
			this.loading.status = 'loading'
			
			const response = await issue_detail_comment({
				id: this.id,
				page: this.comment.page,
				type: this.type
			})
			const { data } = response.data.data
			data.map(item => {
				item.addtime = item.addtime.substring(5, 16)
			})
			this.comment.list = [...this.comment.list, ...data]
			
			this.loading.status = 'more'
		},
		methods: {
			// 获取一级评论数据列表
			async toData(id) {
				uni.showLoading({
					title: '加载中...'
				})
				// 详情信息
				const detail = await issue_detail({ id })
				this.detail = detail.data.data
				// 评论信息
				const comment = await issue_detail_comment({ id, page: 1, type: this.type })
				const { data, last_page, total } = comment.data.data
				data.map(item => {
					item.addtime = item.addtime.substring(5, 16)
				})
				this.comment.list = data
				this.comment.totalPage = last_page
				this.comment.total = total
				this.loading.show = last_page > 1
				uni.hideLoading()
			},
			// 获取二级评论数据
			async toData2(id) {
				uni.showLoading({
					title: '加载中...'
				})
				const response = await issue_detail_comment2({ id, page: 1 })
				const { data, last_page } = response.data.data
				data.map(item => {
					item.addtime = item.addtime.substring(5, 16)
				})
				this.comment2.list = data
				this.comment2.totalPage = last_page
				uni.hideLoading()
			},
			// 评论详情
			async confirm() {
				if (this.comment.value === '') {
					return false
				}
				const response = await issue_comment({
					id: this.id,
					content: this.comment.value,
					pid: ''
				})
				this.comment.list.unshift(response.data.data)
				this.comment.value = ''
				this.comment.total++
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				})
			},
			// 评论详情里的评论
			async confirm2() {
				if (this.comment2.value === '') {
					return false
				}
				
				const response = await issue_comment({
					id: this.id,
					content: this.comment2.value,
					pid: this.comment2.id
				})
				console.log(response)
				this.comment2.list.unshift(response.data.data)
				this.comment2.value = ''
				this.top = 0
				
				// this.comment.list.map(item => {
				// 	if (item.id === this.comment2.id) {
				// 		item.reply_num++
				// 	}
				// })
				++this.comment2.default.reply_num
			},
			// 二级评论上拉加载
			async pullUpLoading() {
				this.comment2.page++
				if (this.comment2.page > this.comment2.totalPage) {
					return false
				}
				
				const response = await issue_detail_comment2({
					id: this.comment2.id,
					page: this.comment2.page
				})
				const { data } = response.data.data
				data.map(item => {
					item.addtime = item.addtime.substring(5, 16)
				})
				this.comment2.list = [...this.comment2.list, ...data]
			},
			// 删除评论
			handleDelete() {
				const that = this
				uni.showModal({
					title: '提示',
					content: '确认删除此条问题?',
					success(res) {
						if (res.confirm) {
							issue_detail_remove({ id: that.id }).then(response => {
								uni.showToast({
									icon: 'none',
									title: '删除成功'
								})
								
								setTimeout(() => {
									uni.navigateBack({
										delta: 1
									})
								}, 1500)
							})
						}
					}
				})
			},
			show(row) {
				this.$refs.popup.open()
				this.comment2.default = row
				this.comment2.placeholder = '回复 ' + row.username
				this.comment2.id = row.id
				this.toData2(row.id)
			},
			hide() {
				this.$refs.popup.close()
			},
			// 筛选
			handleCell(str) {
				this.comment.page = 1
				this.type = str
				this.toData(this.id)
			},
			scroll(e) {
				this.top = e.detail.scrollTop
			},
			// 预览
			handlePreview(item, arr) {
				uni.previewImage({
					current: item,
					urls: arr
				})
			},
			// 点赞
			async handlePraise(raw) {
				const reponse = await issue_comment_admire({
					id: raw.id,
					mode: 1
				})
				
				uni.showToast({
					icon: 'none',
					title: '点赞成功'
				})
				
				raw.admire++
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/issue-detail.scss'
</style>
