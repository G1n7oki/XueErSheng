<template>
	<view class="contaier">
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
				:allowHalf="true"
				:value="0"
			/>
		</view>
		<!-- 评分 end -->
		<!-- 选择等级 start -->
		<view class="level">
			<view class="level-title">
				你觉得该节课程
			</view>
			<view class="level-cell">
				<view class="item">
					太简单
				</view>
				<view class="item">
					简单
				</view>
				<view class="item">
					适中
				</view>
				<view class="item">
					有点难
				</view>
				<view class="item">
					太难了
				</view>
			</view>
		</view>
		<!-- 选择等级 end -->
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
		<view>
			<uButton text="确定" />
		</view>
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import UniRate from '@/components/uni-rate/uni-rate.vue'
	import uButton from '@/components/u-button/uButton.vue'
	export default {
		name: 'Evaluation',
		components: {
			XesNavbar,
			UniRate,
			uButton
		},
		data() {
			return {
				value: '',
				len: 0
			}
		},
		methods: {
			handleInput(e) {
				this.value = e.detail.value
				this.len = e.detail.value.length
			}
		}
	}
</script>

<style lang="scss">
	.contaier {
		width: 100%;
		padding: 0 56upx;
		box-sizing: border-box;
	}
	
	.tips {
		font-size: 32upx;
		font-weight: bold;
		color: #303234;
		margin-top: 54upx;
	}
	
	.rate {
		margin-top: 54upx;
	}
	
	.level {
		margin-top: 112upx;
		
		.level-title {
			font-size: 32upx;
			font-weight: bold;
			color: #303234;
		}
		
		.level-cell {
			display: flex;
			justify-content: space-between;
			margin-top: 56upx;
			
			.item {
				width: 120upx;
				height: 48upx;
				background-color: #F4F7F9;
				border-radius: 24upx;
				font-size: 24upx;
				font-weight: 500;
				color: #303234;
				text-align: center;
				line-height: 48upx;
			}
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
