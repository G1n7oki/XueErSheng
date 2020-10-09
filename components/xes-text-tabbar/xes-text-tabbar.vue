<template>
	<view class="xes-text-tabbar">
		<view 
			class="xes-text-tabbar__cell"
			:class="{'active': current === item.id}"
			v-for="item in list"
			:key="item.id"
			@click="handleItem(item.id)"
		>
			{{ item.name }}
		</view>
		<view 
			class="xes-text-tabbar__line"
			:style="{width: width + '%', left: width * current + '%'}"
		>
			<view class="line"></view>
		</view>
	</view>
</template>

<script>
	/**
	 * 文字型选项卡
	 * @property {Array} list 选项卡列表
	 * @property {Number} index 选项卡的索引
	 * @event {Function} handleItem 选项卡高亮选择
	 * */
	export default {
		name: 'XesTextTabbar',
		data(){
			return {
				width: 0
			}
		},
		created() {
			this.width = 100 / this.list.length
		},
		props: {
			// 需要循环的数据
			list: {
				type: Array,
				default: function () {
					return []
				}
			},
			current: {
				type: Number,
				default: 0
			}
		},
		methods: {
			handleItem(id) {
				this.$emit('postId', id)
			}
		}
	}
</script>

<style lang="scss">
	.xes-text-tabbar {
		display: flex;
		padding: 28upx 0 39upx;
		background-color: #fff;
		position: relative;
		box-shadow: 1px 1px 0px 0px #DEDEDE;
	}
	
	.xes-text-tabbar__cell {
		flex: 1;
		text-align: center;
		font-size: 28upx;
		font-weight: 500;
		color: #606266;
		
		&.active {
			font-weight: bold;
			color: #303234;
		}
	}
	
	.xes-text-tabbar__line {
		position: absolute;
		bottom: 0;
		left: 0;
		transition: left .3s ease;
		
		.line {
			width: 34upx;
			height: 6upx;
			background-color: #FA7A36;
			border-radius: 3upx;
			position: absolute;
			left: 50%;
			bottom: 25upx;
			transform: translateX(-50%);
		}
	}
</style>
