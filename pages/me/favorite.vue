<template>
	<view class="contaier">
		<xes-navbar title="我的收藏" is-arrow="true" text-align="center" />
		<empty v-if="!show" />
		<view v-else class="list">
			<view 
				class="item"
				v-for="(item, index) in favorite"
				:key="item.id"
				@longpress="handleItem(index)"
			>
				<image class="image" :src="item.image" mode=""></image>
				<view class="info">
					<view class="name">
						{{ item.title }}
					</view>
					<view class="validity">
						课程有效期还剩：{{ item.validity }}天
					</view>
					<view class="price">
						{{ item.price }}<text>元</text>
					</view>
				</view>
			</view>
			<view class="tips">
				长按可以删除
			</view>
		</view>
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import Empty from '@/components/empty/empty.vue'
	import Json from '@/static/data.json'
	export default {
		name: 'Favorite',
		components: {
			XesNavbar,
			Empty
		},
		data() {
			return {
				favorite: [],
				show: false
			}
		},
		onLoad() {
			this.favorite = Json.favorite
			
			this.show = this.favorite.length > 0 ? true : false
		},
		onReachBottom() {
			// 上拉加载
			let len = this.favorite.length
			const newData = {
				id: ++len,
				title: '我是新增的数据',
				validity: 360,
				price: 1000,
				status: 1,
				image: 'http://dummyimage.com/250x250'
			}
			this.favorite.push(newData)
		},
		methods: {
			// 长按删除
			handleItem(index) {
				const that = this
				uni.showModal({
					title: '提示',
					content: '确定删除此条记录吗?',
					success(res) {
						res.confirm ? that.removeListItem(index) : console.log('取消')
					}
				})
			},
			// 数组删除
			removeListItem(index) {
				this.favorite.splice(index, 1)
			}
		}
	}
</script>

<style lang="scss">
	.contaier {
		height: 100%;
		background-color: #F4F7F9;
	}

	.list {
		padding: 32upx;
		background-color: #F4F7F9;

		.item {
			display: flex;
			width: 100%;
			box-sizing: border-box;
			padding: 32upx;
			background-color: #fff;
			border-radius: 20upx;
			margin-bottom: 32upx;
			
			.image {
				width: 212upx;
				height: 136upx;
			}
			
			.info {
				margin-left: 25upx;
				
				.name {
					width: 325upx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					font-size: 28upx;
					font-weight: bold;
					color: #303234;
				}
				
				.validity {
					font-size: 24upx;
					font-weight: 500;
					color: #606266;
					margin: 16upx 0;
				}
				
				.price {
					font-size: 32upx;
					font-family: DIN;
					font-weight: bold;
					color: #FA7A36;
					
					text {
						font-size: 20upx;
						margin-left: 8upx;
						font-weight: 500;
					}
				}
			}
		}
		
		.tips {
			font-size: 24upx;
			font-weight: 500;
			color: #606266;
			text-align: center;
		}
	}
</style>
