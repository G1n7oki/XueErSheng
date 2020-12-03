<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar
			title="讲义"
			:is-arrow="true"
			text-align="center"
		/>
		<!-- 导航栏 end -->
		<!-- 列表 start -->
		<view class="list">
			<view 
				class="item"
				v-for="item in list"
				:key="item.id"
				@click="handleItem(item.src)"
			>
				{{ item.file_name }}
			</view>
		</view>
		<!-- 列表 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import { course_handout } from '@/common/api/api.js'
	export default {
		name: 'Notes',
		components: {
			XesNavbar
		},
		data() {
			return {
				list: []
			}
		},
		onLoad(options) {
			this.toData(options.id)
		},
		methods: {
			async toData(id) {
				uni.showLoading({
					title: '加载中...'
				})
				const response = await course_handout({
					course_id: id
				})
				this.list = response.data.data
				uni.hideLoading()
			},
			handleItem(src) {
				uni.showLoading({
					title: '加载中...'
				})
				uni.downloadFile({
				  url: src,
				  success: function (res) {
				    var filePath = res.tempFilePath
				    uni.openDocument({
				      filePath: filePath,
				      success: function (res) {
								console.log(res)
								uni.hideLoading()
				      },
							fail(error) {
								uni.showToast({
									icon: 'none',
									title: error
								})
							}
				    })
				  }
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		background-color: #F4F7F9;
	}
	
	.list {
		padding: 32upx;
		background-color: #F4F7F9;
		
		.item {
			padding: 36upx 32upx;
			border-radius: 20upx;
			background-color: #fff;
			margin-bottom: 32upx;
		}
	}
</style>
