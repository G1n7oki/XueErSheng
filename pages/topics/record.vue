<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar 
			title="做题记录"
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
		<view class="list-data">
			<view 
				class="list-cell"
				v-for="item in listData"
				:key="item.id"
			>
				<view class="date">
					<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/common/time.png" mode=""></image>
					<view class="text">
						{{ item.date }}
					</view>
				</view>
				<view class="timeline">
					<view 
						class="timeline-cell"
						v-for="cell in item.children"
						:key="cell.name"
					>
						<view class="dot-line">
							<view class="dot"></view>
							<view class="line"></view>
						</view>
						<view class="content">
							<view class="info">
								<view class="title">
									{{ cell.title }}
								</view>
								<view class="number">
									<text>{{ cell.total }}道题</text>
									<text>
										{{ tabbar.current === 0 ? '完成' : '' }}{{ cell.finish }}{{ tabbar.current === 0 ? '%' : '分' }}
									</text>
								</view>
							</view>
							<button 
								class="button"
								:class="{'active': tabbar.current === 1}"
								@click="toUrl"
							>
								{{ tabbar.current === 0 ? '继续练题' : '答题结果' }}
							</button>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 列表数据 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import XesTextTabbar from '@/components/xes-text-tabbar/xes-text-tabbar.vue'
	import Json from '@/static/data.json'
	export default {
		name: 'TopicsRecord',
		components: {
			XesNavbar,
			XesTextTabbar
		},
		data() {
			return {
				tabbar: {
					list: [{
						id: 0,
						name: '未完成'
					}, {
						id: 1,
						name: '已完成'
					}],
					current: 0
				},
				top: 0, // tabbar的定位
				listData: [] // 列表的数据
			}
		},
		onLoad() {
			// tabbar 距离顶部的定位距离
			const navbar = uni.createSelectorQuery().in(this)
			navbar.select('#navbar').boundingClientRect(navbar => {
				this.top = navbar.height
			}).exec()
			
			this.listData = Json.record.topics
		},
		onReachBottom() {
			
		},
		methods: {
			toId(id) {
				this.tabbar.current = id
			},
			// 路由跳转
			toUrl() {
				this.tabbar.current === 0 ? uni.navigateTo({
					url: '/pages/topics/practice'
				}) : uni.navigateTo({
					url: '/pages/topics/result'
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
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
	// list
	.list-data {
		margin-top: 104upx;
		padding: 44upx 32upx;
		background-color: #F4F7F9;
		
		.list-cell {
			
			.date {
				display: flex;
				align-items: center;
				margin-bottom: 34upx;
				
				.icon {
					width: 24upx;
					height: 24upx;
					margin-right: 10upx;
				}
				
				.text {
					font-size: 24upx;
					font-family: DIN;
					font-weight: 500;
					color: #90949A;
				}
			}
			
			.timeline {
				
				.timeline-cell {
					display: flex;
					justify-content: space-between;
					position: relative;
					
					.dot-line {
						position: relative;
						
						.dot {
							width: 12upx;
							height: 12upx;
							background-color: #DEDEDE;
							border-radius: 50%;
							margin-top: 10upx;
							position: relative;
							z-index: 2;
						}
						
						.line {
							width: 1px;
							height: 100%;
							background-color: #DEDEDE;
							position: absolute;
							top: 10upx;
							left: 50%;
							transform: translateX(-50%);
							z-index: 1;
						}
					}
					
					.content {
						display: flex;
						justify-content: space-between;
						align-items: center;
						width: 636upx;
						background-color: #fff;
						box-sizing: border-box;
						border-radius: 10upx;
						padding: 32upx;
						margin-bottom: 40upx;
						
						.info {
							
							.title {
								width: 325upx;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
								font-size: 28upx;
								font-weight: bold;
								color: #303234;
							}
							
							.number {
								font-size: 24upx;
								font-weight: 500;
								color: #909399;
								margin-top: 22upx;
								
								text {
									margin-right: 22upx;
								}
							}
						}
						
						.button {
							width: 168upx;
							height: 64upx;
							background-color: #1283FF;
							border-radius: 32upx;
							font-size: 28upx;
							font-weight: 500;
							color: #FFFFFF;
							
							&.active {
								background-color: #FA7935;
							}
						}
					}
					
					&:nth-last-child(1) .line {
						display: none;
					}
				}
			}
		}
	}
</style>
