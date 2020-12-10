<template>
	<view class="container">
		<XesNavbar
			title="详情"
			:is-arrow="true"
			text-align="center"
		/>
		<view class="top-half-part">
			<view class="detail-title">{{ info.title }}</view>
			<view class="space-between">
				<view class="avatar-name">
					<image class="avatar" :src="info.avatars" mode=""></image>
					<view class="name">{{ info.username }}</view>
				</view>
				<view class="date">
					<view class="line"></view>
					<view class="text">{{ info.created_at.substring(0, 10) }}</view>
				</view>
			</view>
			<rich-text :nodes="info.content"></rich-text>
			<view class="praise">
				<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/discover/dadianzan%402x.png" mode=""></image>
				<view class="number">{{ info.admire }}</view>
			</view>
		</view>
		<view class="split-line"></view>
		<view class="chat">
			<view class="head">
				<Title name="精彩评论" />
				<view class="total">
					共{{ comment.total }}个评论
				</view>
			</view>
			<view class="list">
				<view class="item" v-for="comment in comment.list" :key="comment.id">
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
							{{ comment.addtime }} <text class="dot"> · </text><text class="reply" @click="show(comment)">{{ comment.reply_num > 0 ? comment.reply_num : '' }}回复</text>
						</view>
					</view>
				</view>
			</view>
			<view class="reply-area">
				<view class="input-area">
					<input 
						class="input" 
						type="text" 
						v-model="comment.value"
						confirm-type="send"
						placeholder="请输入您的看法"
					/>
					<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/discover/fabiaojiantou%402x.png" mode="" @click="confirm"></image>
				</view>
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
							回复详情
						</view>
					</view>
					<view class="default">
						<image class="avatar" :src="common.avatars" mode=""></image>
						<view class="info">
							<view class="username-praise">
								<view class="username">{{ common.username }}</view>
								<view class="praise">
									<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/discover/xiaodianzan%402x.png" mode=""></image>
									<view class="number">{{ common.admire }}</view>
								</view>
							</view>
							<view class="content">
								{{ common.content }}
							</view>
							<view class="time">
								{{ common.addtime }}
							</view>
						</view>
					</view>
					<view class="list">
						<view 
							class="item"
							v-for="second in second.list"
							:key="second.id"
						>
							<image class="avatar" :src="second.avatars" mode=""></image>
							<view class="info">
								<view class="username-praise">
									<view class="username">{{ second.username }}</view>
									<view class="praise">
										<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/discover/xiaodianzan%402x.png" mode=""></image>
										<view class="number">{{ second.admire }}</view>
									</view>
								</view>
								<view class="content">
									{{ second.content }}
								</view>
								<view class="time">
									{{ second.addtime }} <!-- <text>回复</text> -->
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
							v-model="second.value"
							confirm-type="send"
							:placeholder="'回复:' + common.username"
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
	import { 
		discover_detail,
		discover_comment,
		discover_comment_list,
		discover_second_list,
		discover_comment_admire
	} from '@/common/api/api.js'
	export default {
		name: 'DiscoverDetail',
		components: {
			XesNavbar,
			Title,
			UniPopup,
			UniIcons
		},
		data() {
			return {
				info: { // 文章信息
					created_at: '',
					title: '',
					admire: 0,
					avatars: '',
					username: ''
				},
				comment: {
					list: [],
					total: 0,
					value: '',
					page: 1,
					totalPage: 1
				},
				second: {
					list: [],
					value: '',
					page: 1,
					totalPage: 1
				},
				id: 0, // 文章id
				common: {},
				top: 0
			}
		},
		onLoad(options) {
			this.id = options.id
			this.toData(options.id)
		},
		async onReachBottom() {
			this.comment.page++
			if (this.comment.page > this.comment.totalPage) {
				return false
			}
			const comment = await discover_comment_list({
				id: this.id,
				page: this.comment.page
			})
			const { data } = comment.data.data
			data.forEach(item => {
				item.addtime = item.addtime.substring(5, 16)
			})
			this.comment.list = [...this.comment.list, ...data]
		},
		methods: {
			// 获取详情和评论列表
			async toData(id) {
				uni.showLoading({
					title: '加载中...'
				})
				const response = await discover_detail({ id })
				this.info = response.data.data
				const comment = await discover_comment_list({ id, page: 1 })
				const { data, total, last_page } = comment.data.data
				data.forEach(item => {
					item.addtime = item.addtime.substring(5, 16)
				})
				this.comment.list = data
				this.comment.total = total
				this.comment.totalPage = last_page
				uni.hideLoading()
			},
			// 点击发送按钮
			async confirm() {
				const response = await discover_comment({
					id: this.id,
					content: this.comment.value
				})
				this.comment.value = ''
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				})
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
				++this.comment.total
			},
			// 点击二级回复发送按钮
			async confirm2() {
				console.log(this.second.value)
				const response = await discover_comment({
					id: this.id,
					content: this.second.value,
					pid: this.common.id
				})
				this.second.value = ''
				this.top = 0
				const { id, content, username, avatars, addtime, pid } = response.data.data
				const time = addtime.substring(5, 16)
				this.second.list.unshift({
					id,
					addtime: time,
					admire: 0,
					avatars,
					content,
					reply_num: 0,
					username,
					pid,
				})
				++this.common.reply_num
			},
			// 获取二级评论列表
			async toSecondList(id) {
				uni.showLoading({
					title: '加载中...'
				})
				const response = await discover_second_list({
					page: 1,
					id
				})
				const { data, last_page } = response.data.data
				data.forEach(item => {
					item.addtime = item.addtime.substring(5, 16)
				})
				this.second.list = data
				this.second.totalPage = last_page
				uni.hideLoading()
			},
			// 二级评论列表上拉刷新
			async pullUpLoading() {
				this.second.page++
				if (this.second.page > this.second.totalPage) {
					return false
				}
				const response = await discover_second_list({
					page: this.second.page,
					id: this.common.id
				})
				const { data } = response.data.data
				data.forEach(item => {
					item.addtime = item.addtime.substring(5, 16)
				})
				this.second.list = [...this.second.list, ...data]
			},
			show(raw) {
				this.common = raw
				this.toSecondList(raw.id)
				this.$refs.popup.open()
			},
			hide() {
				this.$refs.popup.close()
			},
			scroll(e) {
				this.top = e.detail.scrollTop
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
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/discover-detail.scss'
</style>
