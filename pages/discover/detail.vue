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
							11-09 09:45 <text class="dot"> · </text><text class="reply" @click="show">10回复</text>
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
		<!-- 弹窗 start -->
		<uni-popup ref="popup" type="bottom">
			<view class="popup-inner">
				<scroll-view class="popup-inner-scroll" scroll-y="true">
					<view class="title">
						<view class="icon" @click="hide">
							<uni-icons type="closeempty" />
						</view>
						<view class="text">
							回复详情
						</view>
					</view>
					<view class="default">
						<image class="avatar" src="http://dummyimage.com/400x400" mode=""></image>
						<view class="info">
							<view class="username-praise">
								<view class="username">shuffle夏末</view>
								<view class="praise">
									<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/discover/xiaodianzan%402x.png" mode=""></image>
									<view class="number">12</view>
								</view>
							</view>
							<view class="content">
								同时，我省还公布了艺术、体育类各批次文化录取控制线和专业合格线、资格线。
							</view>
							<view class="time">
								23小时前
							</view>
						</view>
					</view>
					<view class="list">
						<view 
							class="item"
							v-for="n in 10"
							:key="n"
						>
							<image class="avatar" src="http://dummyimage.com/400x400" mode=""></image>
							<view class="info">
								<view class="username-praise">
									<view class="username">shuffle夏末</view>
									<view class="praise">
										<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/discover/xiaodianzan%402x.png" mode=""></image>
										<view class="number">12</view>
									</view>
								</view>
								<view class="content">
									同时，我省还公布了艺术、体育类各批次文化录取控制线和专业合格线、资格线。
								</view>
								<view class="time">
									23小时前 <text>回复</text>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
				<view class="popup-reply">
					<view class="replying" v-if="replying">
						正在回复{{ replying }}
					</view>
					<view class="input-area">
						<input
							class="input"
							type="text"
							v-model="comment"
							confirm-type="send"
							placeholder="回复shuffle夏末"
							@confirm="confirm"
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
	import Title from '@/components/title/Title.vue'
	import UniPopup from '@/components/uni-popup/uni-popup.vue'
	import UniIcons from '@/components/uni-icons/uni-icons.vue'
	import { discover_detail, discover_comment } from '@/common/api/api.js'
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
			show() {
				this.$refs.popup.open()
			},
			hide() {
				this.$refs.popup.close()
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/discover-detail.scss'
</style>
