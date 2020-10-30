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
				自学考试 > 本科 > 金融学(新)02301K > 03709马克03709马克03709马克
			</view>
			<view class="title">
				您好，马克思 | 认为“马克思主义”是洗脑，这本身是一种被洗脑的表现
			</view>
			<view class="bot">
				<view class="praise-reply">
					1240 赞同 · 21回复
				</view>
				<view class="date">
					2020.09.10  10:24:41
				</view>
			</view>
			<image class="delete" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/issue/DEL%402x.png" mode="" @click="handleDelete"></image>
		</view>
		<!-- 详情 end -->
		<!-- 评论 start -->
		<view class="comment-area">
			<view class="head">
				<title name="全部评论(103)" />
				<view class="filter">
					<view class="cell active">最新</view>
					<view class="line"></view>
					<view class="cell">最热</view>
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
						22小时前   <text class="reply" @click="handleReply('学员_122100112')">回复</text>
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
		<!-- 评论 end -->
		<!-- 回复 start -->
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
					placeholder="发表您的看法"
					@confirm="confirm"
				/>
				<image class="send" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/discover/fabiaojiantou%402x.png" mode="" @click="confirm"></image>
				<view class="praise">
					<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/discover/xiaodianzan%402x.png" mode=""></image>
					20
				</view>
			</view>
		</view>
		<!-- 回复 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import Title from '@/components/title/Title.vue'
	export default {
		name: 'Detail',
		components: {
			XesNavbar,
			Title
		},
		data() {
			return {
				comment: '',
				flod: 1,
				unflodUrl: 'https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/common/shangsou%402x.png',
				flodUrl: 'https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/common/arrowdown.png',
				replying: ''
			}
		},
		methods: {
			// 点击发送按钮
			confirm() {
				this.comment = ''
				this.replying = ''
			},
			// 展开折叠的评论
			unfold() {
				this.flod <= 1 ? this.flod = 10 : this.flod = 1
			},
			// 删除评论
			handleDelete() {
				uni.showModal({
					title: '提示',
					content: '确认删除此条问题?',
					success(res) {
						if (res.confirm) {
							uni.showToast({
								icon: 'none',
								title: '删除成功'
							})
						}
					}
				})
			},
			// 点击回复
			handleReply(str) {
				this.replying = str
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/issue-detail.scss'
</style>
