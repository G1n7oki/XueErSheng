<template>
	<view class="contaier">
		<XesNavbar
			title="发现详情"
			:is-arrow="true"
			text-align="center"
		/>
		<view class="top-half-part">
			<view class="detail-title">{{ info.title }}</view>
			<view class="space-between">
				<view class="avatar-name">
					<image class="avatar" src="/static/image/login/close.png" mode=""></image>
					<view class="name">{{ info.name }}</view>
				</view>
				<view class="date">
					<view class="line"></view>
					<view class="text">{{ info.date }}</view>
				</view>
			</view>
			<rich-text :nodes="info.strings"></rich-text>
			<view class="praise">
				<image class="icon" src="/static/image/discover/dadianzan@2x.png" mode=""></image>
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
					<image class="avatar" src="/static/image/discover/add@2x.png" mode=""></image>
					<view class="other">
						<view class="name-zan">
							<view class="name">
								学员_122100112
							</view>
							<view class="zan">
								<image class="icon" src="/static/image/discover/dianzan@2x.png" mode=""></image>
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
									<image class="comment-list__item--head---avatar" src="/static/image/discover/add@2x.png" mode=""></image>
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
									<image class="comment-list__item--head---avatar" src="/static/image/discover/add@2x.png" mode=""></image>
									<view class="comment-list__item--head---name">
										l略略略专家建议
									</view>
								</view>
								<view class="comment-list__item--comment">
									同时，我省还公布了艺术、体育类各批次文化录取控制线和专业合格线。
								</view>
							</view>
							<view class="fold">
								展开8条回复 <view class="triangle-down"></view>
							</view>
						</view>
					</view>
				</view>
				<view class="item">
					<image class="avatar" src="/static/image/discover/add@2x.png" mode=""></image>
					<view class="other">
						<view class="name-zan">
							<view class="name">
								学员_122100112
							</view>
							<view class="zan">
								<image class="icon" src="/static/image/discover/dianzan@2x.png" mode=""></image>
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
									<image class="comment-list__item--head---avatar" src="/static/image/discover/add@2x.png" mode=""></image>
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
									<image class="comment-list__item--head---avatar" src="/static/image/discover/add@2x.png" mode=""></image>
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
				<input class="input" type="text" placeholder="请输入您的看法" value="" />
				<image class="icon" src="/static/image/discover/fabiaojiantou@2x.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import Title from '@/components/title/Title.vue'
	import Json from '@/static/data.json'
	export default {
		name: 'DiscoverDetail',
		components: {
			XesNavbar,
			Title
		},
		data() {
			return {
				info: {}
			}
		},
		onLoad() {
			this.info = Json.discover.detail
		},
		methods: {
			handleReply() {
				console.log('Handle Reply')
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/discover-detail.scss'
</style>
