<template>
	<view class="xes-empty">
		<image class="xes-empty__image" src="http://api.liufangshan.com/images/placeholder/empty.png" mode=""></image>
		<view class="xes-empty__text">
			暂无数据~
		</view>
	</view>
</template>

<script>
	export default {
		name: 'Empty'
	}
</script>

<style lang="scss">
	.xes-empty {
		width: 100%;
		text-align: center;
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
	}
	
	.xes-empty__image {
		width: 488upx;
		height: 346upx;
	}
	
	.xes-empty__text {
		font-size: 28upx;
		color: #606266;
	}
</style>
