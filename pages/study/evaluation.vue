<template>
	<view class="container">
		<!-- 导航栏 start -->
		<XesNavbar 
			title="评价"
			:is-arrow="true"
			text-align="center"
		/>
		<!-- 导航栏 start -->
		<!-- 提示 start -->
		<view class="tips">
			评分
		</view>
		<!-- 提示 end -->
		<!-- 评分 start -->
		<view class="rate">
			<uni-rate
				:size="40"
				:margin="28"
				:value="rate"
				@change="selectedRate"
			/>
			<view class="text">
				{{ text }}
			</view>
		</view>
		<!-- 评分 end -->
		<!-- 评论区 start -->
		<view class="textarea">
			<textarea 
				:value="value"
				placeholder="请尽可能详细描述你的学习过程，比如学习中获得的收获，老师的教学风格，教学质量等等" 
				placeholder-style="color: #C0C4CC"	
				:maxlength="200"
				@input="handleInput"
			/>
			<view class="limit">
				{{ len }}/200
			</view>
		</view>
		<!-- 评论区 end -->
		<view @click="handleSubmit">
			<uButton text="确定" />
		</view>
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import UniRate from '@/components/uni-rate/uni-rate.vue'
	import uButton from '@/components/u-button/uButton.vue'
	import { study_evaluate, live_evaluate } from '@/common/api/api.js'
	export default {
		name: 'Evaluation',
		components: {
			XesNavbar,
			UniRate,
			uButton
		},
		data() {
			return {
				value: '', // 输入框内容
				len: 0, // 字数
				id: 0,
				rate: 0, // 评分
				text: '未评分', // 评分对应的内容
				timer: null, // 计时器
				type: ''
			}
		},
		onLoad(options) {
			this.id = options.id
			this.live = options.live
		},
		onUnload() {
			clearTimeout(this.timer)
		},
		methods: {
			handleInput(e) {
				this.value = e.detail.value
				this.len = e.detail.value.length
			},
			selectedRate(rate) {
				this.rate = rate.value
				switch (rate.value) {
					case 1: this.text = '非常差'
						break
					case 2: this.text = '不满意'
						break
					case 3: this.text = '很一般'
						break
					case 4: this.text = '还可以'
						break
					case 5: this.text = '超级棒'
						break
					default: this.text = ''
				}
			},
			handleSubmit() {
				if (this.rate === 0) {
					uni.showToast({
						icon: 'none',
						title: '请给课程打个分吧'
					})
					return false
				}
				
				if (this.type === 'live') {
					live_evaluate({
						id: this.id,
						mark: this.rate,
						content: this.value
					}).then(response => {
						const res = response.data
						uni.showToast({
							icon: 'none',
							title: res.status
						})
						this.timer = setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1500)
					})
				} else {
					study_evaluate({
						id: this.id,
						mark: this.rate,
						content: this.value
					}).then(response => {
						const res = response.data
						uni.showToast({
							icon: 'none',
							title: res.status
						})
						this.timer = setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1500)
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 0 56upx;
	}
	
	.tips {
		font-size: 32upx;
		font-weight: bold;
		color: #303234;
		margin-top: 54upx;
	}
	
	.rate {
		margin-top: 54upx;
		
		.text {
			text-align: center;
			font-size: 24upx;
			font-weight: 500;
			color: #303133;
			margin-top: 30upx;
		}
	}
	
	.textarea {
		position: relative;
		
		textarea {
			width: 100%;
			height: 330upx;
			border: 1px solid #DEDEDE;
			box-sizing: border-box;
			margin-top: 103upx;
			border-radius: 20upx;
			padding: 34upx;
			font-size: 24upx;
			font-weight: 500;
		}
		
		.limit {
			position: absolute;
			right: 32upx;
			bottom: 32upx;
			font-size: 24upx;
			font-weight: 500;
			color: #C0C4CC;
		}
	}
</style>
