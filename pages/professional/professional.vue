<template>
	<view class="contaier">
		<!-- 提示 start -->
		<view class="tips">
			<view class="title">
				选择学习阶段
			</view>
			<view class="explain">
				请放心选择，后面还可以修改
			</view>
		</view>
		<!-- 提示 end -->
		<view class="choose">
			<!-- 一级类目 start -->
			<scroll-view class="category-1" scroll-y="true">
				<view 
					class="item"
					:class="{'active': categoryIndex === category.id }"
					v-for="category in categoryList"
					:key="category.id"
					@click="handleCategoryItem(category.id, category.name)">
					{{ category.name }}
				</view>
			</scroll-view>
			<!-- 一级类目 end -->
			<!-- 二/三级类目 start -->
			<scroll-view class="category-2" scroll-y="true">
				<view 
					class="item"
					v-for="category in categoryList2"
					:key="category.id"
				>
					<view class="title">
						{{ category.name }}
					</view>
					<view class="list">
						<view 
							class="cell"
							v-for="cell in category.sub"
							:key="cell.id"
							:data-parent="category.name"
							@click="handleCell($event, cell.name, cell.id)"
						>
							{{ cell.name }}
						</view>
					</view>
				</view>
			</scroll-view>
			<!-- 二/三级类目 end -->
		</view>
	</view>
</template>

<script>
	import json from '@/static/data.json'
	import { professional } from '@/common/api/api.js'
	import { showToast } from '@/tools/util/util.js'
	export default {
		name: 'professional',
		data() {
			return {
				categoryList: [],
				categoryIndex: 1,
				categoryList2: [],
				chooseResult: []
			}
		},
		onLoad() {
			this.toProfessional()
		},
		methods: {
			toProfessional() {
				uni.showLoading({
					title: '加载中...'
				})
				professional().then(response => {
					const res = response.data
					this.categoryList = res.data
					// 初次加载时的二级和三级类目
					this.categoryList2 = this.categoryList[0].sub
					// 默认选择的一级类目 如果不设置会出现一级类目为null的情况
					this.chooseResult.push(this.categoryList[0].name)
					uni.hideLoading()
				}).catch(error => {
					showToast(error.data.message)
					uni.hideLoading()
				})
			},
			// 点击切换类目
			handleCategoryItem(id, name) {
				this.categoryIndex = id
				this.chooseResult[0] = name

				this.categoryList.forEach(item => {
					if (item.id === this.categoryIndex) {
						this.categoryList2 = item.sub
					}
				})
			},
			// 点击三级类目
			handleCell(event, name, id) {
				const that = this
				this.chooseResult[1] = event.target.dataset.parent
				this.chooseResult[2] = name
				// 首页接口需要的id
				uni.setStorageSync('profession_id', id)
				// 首页面包屑需要的数组
				uni.setStorage({
					key: 'crumbs',
					data: that.chooseResult,
					success() {
						uni.switchTab({
							url: '/pages/index/index'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.contaier {
		padding-top: 75upx;
		box-sizing: border-box;
	}
	
	.tips {
		padding-left: 40upx;
		
		.title {
			font-size: 36upx;
			font-weight: bold;
			color: #303133;
			margin-bottom: 23upx;
			line-height: 36upx;
		}
		
		.explain {
			font-size: 28upx;
			font-weight: 500;
			color: #909399;
			line-height: 36upx;
		}
	}
	
	.choose {
		display: flex;
		height: calc(100% - 150upx);
		margin-top: 43upx;
		border-top: 1px solid #DEDEDE;
		
		.category-1 {
			width: 224upx;
			height: 100%;
			background-color: #F5F5F5;
			
			.item {
				height: 96upx;
				font-size: 28upx;
				font-weight: bold;
				color: #303133;
				text-align: center;
				line-height: 96upx;
				
				&.active {
					background-color: #fff;
					color: #1283FF;
				}
			}
		}
		
		.category-2 {
			width: 526upx;
			box-sizing: border-box;
			padding: 38upx 0 0 40upx;
			
			.item {
				margin-bottom: 64upx;
				
				.title {
					font-size: 24upx;
					font-weight: bold;
					color: #303133;
					text-align: center;
				}
				
				.list {
					display: flex;
					flex-wrap: wrap;
					margin-top: 36upx;
					
					.cell {
						padding: 23upx 26upx;
						background-color: #F4F7F9;
						border-radius: 10upx;
						font-size: 28upx;
						font-weight: 500;
						color: #303133;
						margin-right: 24upx;
						margin-bottom: 36upx;
					}
				}
			}
		}
	}
</style>
