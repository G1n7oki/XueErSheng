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
			<view class="item" @click="handleItem">
				大开杀戒发圣诞节阿斯蒂芬撒大家发生了登记法律时代峻峰萨拉的房间啊
			</view>
		</view>
		<!-- 列表 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	export default {
		name: 'Notes',
		components: {
			XesNavbar
		},
		methods: {
			handleItem() {
				uni.showLoading({
					title: '加载中...'
				})
				uni.downloadFile({
				  url: 'https://mdxes.oss-cn-shanghai.aliyuncs.com/handout/ArchLinux%E5%AE%89%E8%A3%85%E9%85%8D%E7%BD%AE%E6%B5%81%E7%A8%8B%E6%93%8D%E4%BD%9C%E6%89%8B%E5%86%8Cv1.3.pdf',
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
		}
	}
</style>
