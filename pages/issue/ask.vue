<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar
			title="提问"
			text-align="center"
			:is-arrow="true"
		>
		</xes-navbar>
		<!-- 导航栏 end -->
		<!-- 提示 start -->
		<input v-model="title" class="tips" type="text" placeholder="写下您的问题" />
		<!-- 提示 end -->
		<!-- 文本框 start -->
		<textarea v-model="content" placeholder="请简述您遇到的问题和困难点，便于老师针对难点进行 解答。" />
		<!-- 文本框 end -->
		<!-- 图片 start -->
		<view class="image-group">
			<image class="default" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/common/add%402x.png" mode="" @click="chooseImage"></image>
			<view
				class="preview-image"
				v-for="item in image"
				:key="item"
			>
				<view class="delete" @click="handleDelete(item)">
					<uni-icons type="close" />
				</view>
				<image class="preview" :src="item" @click="preview(item)"></image>
			</view>
		</view>
		<!-- 图片 end -->
		<!-- 小提示 start -->
		<view class="text">
			小提示:最多可上传4张照片哦
		</view>
		<!-- 小提示 end -->
		<view @click="handleIssue">
			<u-button text="提交" />
		</view>
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import uButton from '@/components/u-button/uButton.vue'
	import UniIcons from '@/components/uni-icons/uni-icons.vue'
	import { baseUrl } from '@/common/config/config.js'
	import { ask } from '@/common/api/api.js'
	export default {
		name: 'Ask',
		components: {
			XesNavbar,
			uButton,
			UniIcons
		},
		data() {
			return {
				title: '',
				content: '',
				image: [],
				postImage: [],
				id: 0
			}
		},
		onLoad(options) {
			this.id = options.id
		},
		methods: {
			// 选择图片
			chooseImage() {
				const that = this
				if (that.image.length >= 4) {
					uni.showToast({
						icon: 'none',
						title: '图片个数已满'
					})
					return false
				}
				uni.chooseImage({
					count: 4 - that.image.length,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success(res) {
						that.image = that.image.concat(res.tempFilePaths)
					}
				})
			},
			// 预览
			preview (src) {
				const that = this
				uni.previewImage({
					current: src,
					urls: that.image
				})
			},
			// 删除
			handleDelete(item) {
				const index = this.image.indexOf(item)
				this.image.splice(index, 1)
			},
			// 提交
			async handleIssue() {
				if (this.title === '') {
					uni.showToast({
						icon: 'none',
						title: '问题不能为空'
					})
					return false
				}
				
				if (this.content === '') {
					uni.showToast({
						icon: 'none',
						title: '内容不能为空'
					})
					return false
				}
				
				const that = this
				
				uni.showLoading({
					title: '提交中...'
				})
				
				for(let i = 0; i < that.image.length; i++) {
					uni.uploadFile({
						url: baseUrl + 'upload',
						filePath: that.image[i],
						name: 'image',
						header: {
							'X-Requested-With': 'XMLHttpRequest',
							'Authorization': uni.getStorageSync('token')
						},
						formData: {
							type: '2'
						},
						success(res) {
							if(res.statusCode === 200) {
								const data = JSON.parse(res.data)
								that.postImage.push(data.data)
							} else {
								const data = JSON.parse(res.data)
								uni.showToast({
									icon: 'none',
									title: data.message
								})
							}
						},
						fail(error) {
							console.log(error)
						}
					})
				}
				
				const response = await ask({
					content: this.content,
					image: this.image,
					title: this.title,
					profession_id: this.id,
					device: 'mini'
				})
				
				uni.showToast({
					icon: 'none',
					title: '提交成功'
				})
				
				uni.hideLoading()
				
				this.content = ''
				this.title = ''
				this.image = []
			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 0 32upx;
	}
	// 提示
	.tips {
		padding: 34upx 0;
		font-size: 28upx;
		font-weight: 500;
		color: #909399;
		border-bottom: 1px solid #DEDEDE;
	}
	// 文本框
	textarea {
		width: 100%;
		box-sizing: border-box;
		padding: 34upx 0;
		font-size: 28upx;
		font-weight: 500;
	}
	.image-group {
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 25upx;
		
		.preview-image {
			position: relative;
			margin-right: 32upx;
			margin-bottom: 32upx;
			
			&:nth-child(3n) {
				margin-right: 0;
			}
			
			.delete {
				position: absolute;
				top: -10upx;
				right: -10upx;
				z-index: 10;
			}
			
			.preview {
				width: 200upx;
				height: 200upx;
			}
		}
			
		.default {
			width: 200upx;
			height: 200upx;
			margin-right: 32upx;
			margin-bottom: 32upx;
		}
	}
	// 小提示
	.text {
		font-size: 24upx;
		font-weight: 500;
		color: #909399;
		margin-top: 15upx;
	}
</style>
