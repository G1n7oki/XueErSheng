<template>
	<view class="contaier">
		<!-- 导航栏 start -->
		<xes-navbar 
			title="错题"
			text-align="center"
			:is-arrow="true"
			id="navbar"
		/>
		<!-- 导航栏 end -->
		<!-- 切换卡 start -->
		<view class="tabbar" :style="{top: top + 'px'}">
			<xes-text-tabbar
				:list="tabbar.list"
				:current="tabbar.current"
				@postId="toId"
			/>
		</view>
		<!-- 切换卡 end -->
		<!-- 列表数据 start -->
		<view class="list-data" :class="{'active': tabbar.current === 0}">
			<view class="pattern">
				<switch 
					class="switch"
					color="#1283FF"
					@change="patternSwitch"
				/>
				<view class="text">
					背题模式
				</view>
			</view>
			<view 
				class="list-cell"
				v-for="item in listData"
				:key="item.id"
			>
				<view class="info">
					<view class="title">
						{{ item.title }}
					</view>
					<view v-if="tabbar.current === 0" class="number">
						错{{ item.number }}道题
					</view>
					<view v-else class="number">
						{{ item.number }}道
					</view>
				</view>
				<button class="button" :class="{'active': tabbar.current === 1}">重做</button>
			</view>
		</view>
		<!-- 列表数据 end -->
		<!-- 按钮 start -->
		<view class="fixed-button" v-if="tabbar.current === 0">
			<button class="button">练习全部错题</button>
		</view>
		<!-- 按钮 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import XesTextTabbar from '@/components/xes-text-tabbar/xes-text-tabbar.vue'
	import Json from '@/static/data.json'
	export default {
		name: 'Wrong',
		components: {
			XesNavbar,
			XesTextTabbar
		},
		data() {
			return {
				tabbar: {
					list: [{
						id: 0,
						name: '错题'
					}, {
						id: 1,
						name: '收藏'
					}],
					current: 0
				},
				top: 0, // tabbar的定位
				listData: [] // 列表数据
			}
		},
		onLoad() {
			// tabbar 距离顶部的定位距离
			const navbar = uni.createSelectorQuery().in(this)
			navbar.select('#navbar').boundingClientRect(navbar => {
				this.top = navbar.height
			}).exec()
			
			this.listData = Json.wrong
		},
		methods: {
			toId(id) {
				this.tabbar.current = id
			},
			// 开启背题模式
			patternSwitch() {
				uni.setStorageSync('pattern', 'self-study')
			}
		}
	}
</script>

<style lang="scss">
	.contaier {
		background-color: #F4F7F9;
	}
	// 选项卡
	.tabbar {
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 10;
	}
	// 列表数据
	.list-data {
		margin-top: 104upx;
		padding: 32upx;
		background-color: #F4F7F9;
		
		&.active {
			padding-bottom: 100upx;
		}
		
		.pattern {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			margin-bottom: 20upx;
			
			.switch {
				transform: scale(.7, .7);
			}
			
			.text {
				font-size: 28upx;
				font-weight: 500;
				color: #606266;
			}
		}
		
		.list-cell {
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-radius: 12upx;
			background-color: #fff;
			padding: 32upx;
			margin-bottom: 32upx;
			
			.info {
				
				.title {
					width: 360upx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					font-size: 28upx;
					font-weight: bold;
					color: #303133;
				}
				
				.number {
					font-size: 24upx;
					font-weight: 500;
					color: #909399;
					margin-top: 22upx;
				}
			}
			
			.button {
				width: 128upx;
				height: 64upx;
				background-color: #1283FF;
				border-radius: 32upx;
				line-height: 64upx;
				font-size: 28upx;
				font-weight: 500;
				color: #FFFFFF;
				
				&.active {
					background-color: #FA7935;
				}
			}
		}
	}
	
	// 定位按钮
	.fixed-button {
		width: 100%;
		box-sizing: border-box;
		position: fixed;
		left: 0;
		bottom: 0;
		padding: 20upx 32upx;
		background-color: #fff;
		
		.button {
			height: 80upx;
			background-color: #1283FF;
			font-size: 32upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			line-height: 80upx;
		}
	}
</style>
