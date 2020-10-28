<template>
	<view class="container">
		<xes-navbar 
			title="学习记录"
			:is-arrow="true"
			text-align="center"
		/>
		<view class="inner">
			<view
				class="item"
				v-for="item in list"
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
							<image class="image" :src="cell.image" mode=""></image>
							<view class="info">
								<view class="title">
									{{ cell.name }}
								</view>
								<view class="time">
									已观看 {{ cell.time }}
								</view>
								<navigator url="" hover-class="none" class="button">
									播放
								</navigator>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import Json from '@/static/data.json'
	export default {
		name: 'StudyRecord',
		components: {
			XesNavbar
		},
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			this.list = Json.record.learn
		}
	}
</script>

<style lang="scss">
	.container {
		background-color: #F4F7F9;
	}
	
	.inner {
		background-color: #F4F7F9;
		padding: 43upx 32upx;
		
		.item {
			
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
						width: 636upx;
						background-color: #fff;
						box-sizing: border-box;
						border-radius: 10upx;
						padding: 32upx;
						margin-bottom: 40upx;
						
						.image {
							width: 212upx;
							height: 136upx;
						}
						
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
							
							.time {
								font-size: 24upx;
								font-weight: 500;
								color: #606266;
								margin: 10upx 0 18upx;
							}
							
							.button {
								width: 88upx;
								height: 40upx;
								background-color: #1284FF;
								border-radius: 10upx;
								font-size: 24upx;
								font-weight: 500;
								color: #FFFFFF;
								text-align: center;
								line-height: 40upx;
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
