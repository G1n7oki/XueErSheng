<template>
	<view class="container">
		<empty v-if="show" />
		<view class="image">
			<image class="item" v-for="n in 5" :key="n" src="http://dummyimage.com/750x500" mode=""></image>
		</view>
		<!-- 定位按钮 start -->
		<view class="fixed-button">
			<view class="slogan">
				参与筑梦计划享0元报名
			</view>
			<view class="consult" @click="call">
				<view class="line"></view>
				<uni-icons type="phone-filled" color="#fff" />
				<view class="text">
					咨询
				</view>
			</view>
			<navigator class="navigation" hover-class="none" url="/pages/plan/want">立即报名</navigator>
		</view>
		<!-- 定位按钮 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import UniIcons from '@/components/uni-icons/uni-icons.vue'
	import Empty from '@/components/empty/empty.vue'
	export default {
		name: 'PlanDetail',
		components: {
			XesNavbar,
			UniIcons,
			Empty
		},
		data() {
			return {
				show: false
			}
		},
		methods: {
			call() {
				uni.makePhoneCall({
					phoneNumber: '114'
				})
			}
		}
	}
</script>

<style lang="scss">
	.image {
		overflow: hidden;
		padding-bottom: 100upx;
		background-color: #F4F7F9;
		
		.item {
			width: 100%;
			height: 500upx;
			float: left;
		}
	}
	
	.fixed-button {
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 100upx;
		position: fixed;
		left: 0;
		bottom: 0;
		background-color: #fff;
		
		.slogan {
			width: 33.333%;
			text-align: center;
			font-size: 26upx;
			color: #fff;
			background-color: #FF9502;
			padding: 20upx 36upx;
			box-sizing: border-box;
		}
		
		.consult {
			display: flex;
			align-items: center;
			width: 33.333%;
			background-color: #FF9502;
			
			.line {
				width: 1px;
				height: 50upx;
				background-color: #fff;
				margin-right: 32upx;
			}
			
			.text {
				color: #fff;
				font-size: 28upx;
				margin-left: 10upx;
			}
		}
		
		.navigation {
			width: 33.333%;
			background-color: #FF4D4F;
			color: #fff;
			font-size: 32upx;
			line-height: 100upx;
			text-align: center;
		}
	}
</style>
