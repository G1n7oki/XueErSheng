<template>
	<view class="container">
		<XesNavbar
			title="发布圈子"
			:is-arrow="true"
			text-align="center"
		/>
		<textarea v-model="content" placeholder="灵感稍纵即逝，赶紧记录下来吧~" />
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
		<view class="tips">
			小提示:个人发布的信息，将在圈子中出现
		</view>
		<view @click="handleIssue">
			<uButton text="发布" />
		</view>
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import uButton from '@/components/u-button/uButton.vue'
	import UniIcons from '@/components/uni-icons/uni-icons.vue'
	import Ctpic from '@/tools/util/custom-picture.js'
	import { baseUrl } from '@/common/config/config.js'
	import { discover_issue } from '@/common/api/api.js'
	export default {
		name: 'Issue',
		components: {
			XesNavbar,
			uButton,
			UniIcons
		},
		data() {
			return {
				content: '',
				image: [],
				postImage: []
			}
		},
		onLoad() {
			
		},
		methods: {
			// 选择图片
			chooseImage() {
				const that = this
				if (that.image.length >= 9) {
					uni.showToast({
						icon: 'none',
						title: '您选的图片已大于9张'
					})
					return false
				}
				uni.chooseImage({
					count: 9 - that.image.length,
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
			// 点击提交
			handleIssue() {
				const that = this
				let image = []
				
				uni.showLoading({
					title: '上传中...'
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
							type: '1'
						},
						success(res) {
							if(res.statusCode === 200) {
								const data = JSON.parse(res.data)
								that.postImage.push(data.data)
								// 两个接口存在异步关系所以需要判断这个接口在什么时机执行
								if (that.postImage.length === that.image.length) {
									discover_issue({
										content: that.content,
										device: 'mini',
										image: that.postImage
									}).then(response => {
										uni.hideLoading()
										uni.showToast({
											icon: 'none',
											title: '发布成功'
										})
										setTimeout(() => {
											uni.navigateBack({
												delta: 1
											})
										}, 1500)
									})
								}
							} else {
								const data = JSON.parse(res.data)
								uni.showToast({
									icon: 'none',
									title: data.message
								})
							}
						},
						fail(error) {
							uni.showToast({
								icon: 'none',
								title: error.errMsg
							})
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 0 32upx;
	}
	
	textarea {
		width: 100%;
		height: 307upx;
		margin-top: 38upx;
	}
	
	.tips {
		font-size: 24upx;
		font-weight: 500;
		color: #90949A;
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
</style>
