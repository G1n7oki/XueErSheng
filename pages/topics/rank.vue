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
			<view class="side-1">
				<view class="avatar-area">
					<image class="crown" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/topics/yinguan%402x.png" mode=""></image>
					<image class="avatar" :src="second.avatars" mode=""></image>
				</view>
				<view class="cylinder">
					<view class="nickname">
						{{ second.username }}
					</view>
					<view class="score">
						{{ second.total_num }} <text>道</text>
					</view>
					<view class="rank">
						2
					</view>
				</view>
			</view>
			<view class="center">
				<view class="avatar-area">
					<image class="crown" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/topics/huangguan%402x.png" mode=""></image>
					<image class="avatar" :src="champion.avatars" mode=""></image>
				</view>
				<view class="cylinder">
					<view class="nickname">
						{{ champion.username }}
					</view>
					<view class="score">
						{{ champion.total_num }} <text>道</text>
					</view>
					<view class="rank">
						1
					</view>
				</view>
			</view>
			<view class="side-2">
				<view class="avatar-area">
					<image class="crown" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/topics/tongguan%402x.png" mode=""></image>
					<image class="avatar" :src="third.avatars" mode=""></image>
				</view>
				<view class="cylinder">
					<view class="nickname">
						{{ third.username }}
					</view>
					<view class="score">
						{{ third.total_num }} <text>道</text>
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
			<view class="item" v-for="(item, index) in list" :key="list.id">
				<view class="index">
					{{ index + 4 }}
				</view>
				<view class="info">
					<image class="avatar" :src="item.avatars" mode=""></image>
					<view class="name">{{ item.username }}</view>
				</view>
				<view class="number">
					{{ item.total_num }} <text>道</text>
				</view>
			</view>
		</view>
		<!-- rank-list end -->
		<!-- 我的排名 strat -->
		<view class="me-rank">
			<view class="index">
				{{ me.rank }}
			</view>
			<view class="info">
				<image class="avatar" :src="me.avatars" mode=""></image>
				<view class="name">{{ me.username }}</view>
			</view>
			<view class="number">
				{{ me.total_num }} <text>道</text>
			</view>
		</view>
		<!-- 我的排名 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import { ranking } from '@/common/api/api.js'
	export default {
		name: 'Rank',
		components: {
			XesNavbar
		},
		data() {
			return {
				me: { // 我的信息
					username: '',
					rank: 0,
					avatars: '',
					total_num: 0
				},
				champion: { // 冠军
					username: '',
					avatars: '',
					total_num: 0
				},
				second: { // 亚军
					username: '',
					avatars: '',
					total_num: 0
				},
				third: { // 季军
					username: '',
					avatars: '',
					total_num: 0
				},
				list: [] // 其他列表
			}
		},
		onLoad() {
			this.toData()
		},
		methods: {
			async toData() {
				uni.showLoading({
					title: '加载中...'
				})
				
				const response = await ranking()
				const { my, rank } = response.data.data
				
				this.me = my
				
				this.champion = rank[0]
				this.second = rank[1]
				this.third = rank[2]
				
				const list = rank.slice(3)
				this.list = list
				
				uni.hideLoading()
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/rank.scss'
</style>
