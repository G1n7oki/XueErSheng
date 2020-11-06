<template>
	<view class="container">
		<XesNavbar
			title="发现详情"
			:is-arrow="true"
			text-align="center"
		/>
		<view class="top-half-part">
			<view class="detail-title">{{ info.title }}</view>
			<view class="space-between">
				<view class="avatar-name">
					<image class="avatar" src="http://dummyimage.com/120x600" mode=""></image>
					<view class="name">{{ info.name }}</view>
				</view>
				<view class="date">
					<view class="line"></view>
					<view class="text">{{ info.date }}</view>
				</view>
			</view>
			<rich-text :nodes="info.strings"></rich-text>
			<view class="praise">
				<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/discover/dadianzan%402x.png" mode=""></image>
				<view class="number">162</view>
			</view>
		</view>
		<view class="split-line"></view>
		<view class="chat">
			<view class="head">
				<Title name="精彩评论" />
				<view class="total">
					共23个评论
				</view>
			</view>
			<view class="list">
				<view class="item">
					<image class="avatar" src="http://dummyimage.com/120x600" mode=""></image>
					<view class="other">
						<view class="name-zan">
							<view class="name">
								学员_122100112
							</view>
							<view class="zan">
								<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/discover/xiaodianzan%402x.png" mode=""></image>
								<view class="number">
									12
								</view>
							</view>
						</view>
						<view class="comment">
							同时，我省还公布了艺术、体育类各批次文化录取控制线和专业合格线、资格线。
						</view>
						<view class="date-reply">
							22小时前   <text class="reply" @click="handleReply('学员_122100112')">回复</text>
						</view>
						<view class="comment-list">
							<view 
								v-if="n <= flod"
								class="comment-list__item"
								v-for="n in 10"
								:key="n"
							>
								<view class="comment-list__item--head">
									<image class="comment-list__item--head---avatar" src="http://dummyimage.com/120x600" mode=""></image>
									<view class="comment-list__item--head---name">
										小星
									</view>
								</view>
								<view class="comment-list__item--comment">
									同时，我省还公布了艺术、体育类各批次文化录取控制线和专业合格线。
								</view>
							</view>
							<view class="fold" @click="unfold">
								{{ flod <= 1 ? '展开' : '收起' }}8条回复 <image class="arrow" :src="flod <= 1 ? flodUrl : unflodUrl" mode=""></image>
							</view>
						</view>
					</view>
				</view>
				<view class="item">
					<image class="avatar" src="http://dummyimage.com/120x600" mode=""></image>
					<view class="other">
						<view class="name-zan">
							<view class="name">
								学员_122100112
							</view>
							<view class="zan">
								<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/discover/xiaodianzan%402x.png" mode=""></image>
								<view class="number">
									12
								</view>
							</view>
						</view>
						<view class="comment">
							同时，我省还公布了艺术、体育类各批次文化录取控制线和专业合格线、资格线。
						</view>
						<view class="date-reply">
							22小时前   <text class="reply" @click="handleReply">回复</text>
						</view>
						<view class="comment-list">
							<view class="comment-list__item">
								<view class="comment-list__item--head">
									<image class="comment-list__item--head---avatar" src="http://dummyimage.com/120x600" mode=""></image>
									<view class="comment-list__item--head---name">
										小星
									</view>
								</view>
								<view class="comment-list__item--comment">
									同时，我省还公布了艺术、体育类各批次文化录取控制线和专业合格线。
								</view>
							</view>
							<view class="comment-list__item">
								<view class="comment-list__item--head">
									<image class="comment-list__item--head---avatar" src="http://dummyimage.com/120x600" mode=""></image>
									<view class="comment-list__item--head---name">
										l略略略专家建议
									</view>
								</view>
								<view class="comment-list__item--comment">
									同时，我省还公布了艺术、体育类各批次文化录取控制线和专业合格线。
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="reply-area">
				<view class="replying" v-if="replying">
					正在回复{{ replying }}
				</view>
				<view class="input-area">
					<input 
						class="input" 
						type="text" 
						v-model="comment"
						confirm-type="send"
						placeholder="请输入您的看法"
						@confirm="confirm"
					/>
					<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/discover/fabiaojiantou%402x.png" mode="" @click="confirm"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import Title from '@/components/title/Title.vue'
	import { discover_detail, discover_comment } from '@/common/api/api.js'
	export default {
		name: 'DiscoverDetail',
		components: {
			XesNavbar,
			Title
		},
		data() {
			return {
				info: {},
				replying: '', // 正在回复谁
				comment: '', // 评论内容
				unflodUrl: 'https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/common/shangsou%402x.png',
				flodUrl: 'https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/common/arrowdown.png',
				flod: 1
			}
		},
		onLoad(options) {
			this.toData(options.id)
		},
		methods: {
			async toData(id) {
				const response = await discover_detail({ id })
			},
			handleReply(str) {
				this.replying = str
			},
			// 点击发送按钮
			confirm() {
				this.comment = ''
				this.replying = ''
			},
			// 展开折叠的评论
			unfold() {
				this.flod <= 1 ? this.flod = 10 : this.flod = 1
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/discover-detail.scss'
</style>
