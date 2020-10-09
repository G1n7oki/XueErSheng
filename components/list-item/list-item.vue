<template>
	<view class="u-list" :style="{'border-bottom': isBorder ? '1px solid #DEDEDE' : 'none'}">
		<image class="u-list__icon" :src="icon" mode=""></image>
		<view class="u-list__name">
			{{ name }}
		</view>
		<view class="u-list__arrow">
			<uni-icons color="#C0C4CC" size="16" type="arrowright" />
		</view>
	</view>
</template>

<script>
	/**
	 * 列表项目组件
	 * @property {String} name 列表的名称
	 * @property {String} icon 列表图片的路径
	 * @property {String} isBorder 是否显示边框
	 * */
	import UniIcons from '@/components/uni-icons/uni-icons.vue'
	export default {
		name: 'ListItem',
		components: {
			UniIcons
		},
		data() {
			return {}
		},
		props: {
			// 列表名称
			name: {
				type: String,
				default: ''
			},
			// 图片路径
			icon: {
				type: String,
				default: ''
			},
			// 是否显示边框
			isBorder: {
				type: Boolean,
				default: true
			}
		}
	}
</script>

<style lang="scss">
	.u-list {
		display: flex;
		align-items: center;
		height: 100upx;
		position: relative;
	}
	
	.u-list__icon {
		width: 32upx;
		height: 32upx;
		margin-right: 25upx;
	}
	
	.u-list__name {
		font-size: 28upx;
		font-weight: 500;
		color: #303133;
	}
	
	.u-list__arrow {
		position: absolute;
		top: 50%;
		right: 0;
		transform: translateY(-50%);
	}
</style>
