<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar 
			title="排行榜"
			text-align="center"
			:is-arrow="true"
			:is-empty="false"
		/>
		<!-- 导航栏 end -->
		<!-- 巨幕 start -->
		<view class="jumbotron">
			<view class="side">
				<view class="avatar-area">
					<image class="avatar" src="" mode=""></image>
				</view>
				<view class="cylinder">
					<view class="nickname">
						南师精神
					</view>
					<view class="score">
						4054 <text>道</text>
					</view>
					<view class="rank">
						2
					</view>
				</view>
			</view>
			<view class="center">
				<view class="avatar-area">
					<image class="avatar" src="" mode=""></image>
				</view>
				<view class="cylinder">
					<view class="nickname">
						学尔升官方
					</view>
					<view class="score">
						4054 <text>道</text>
					</view>
					<view class="rank">
						1
					</view>
				</view>
			</view>
			<view class="side">
				<view class="avatar-area">
					<image class="avatar" src="" mode=""></image>
				</view>
				<view class="cylinder">
					<view class="nickname">
						老酒哎学习
					</view>
					<view class="score">
						4054 <text>道</text>
					</view>
					<view class="rank">
						3
					</view>
				</view>
			</view>
		</view>
		<!-- 巨幕 end -->
		<!-- rank-list start -->
		<view class="rank-list">
			<view class="item" v-for="(n, index) in 10" :key="index">
				<view class="index">
					94
				</view>
				<view class="info">
					<image class="avatar" src="http://dummyimage.com/300x250" mode=""></image>
					<view class="name">学尔升官方客服</view>
				</view>
				<view class="number">
					1324 <text>道</text>
				</view>
			</view>
		</view>
		<!-- rank-list end -->
		<!-- 我的排名 strat -->
		<view class="me-rank">
			<view class="index">
				94
			</view>
			<view class="info">
				<image class="avatar" src="http://dummyimage.com/300x250" mode=""></image>
				<view class="name">学尔升官方客服</view>
			</view>
			<view class="number">
				1324 <text>道</text>
			</view>
		</view>
		<!-- 我的排名 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	export default {
		name: 'Rank',
		components: {
			XesNavbar
		},
		data() {
			return {}
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/rank.scss'
</style>
