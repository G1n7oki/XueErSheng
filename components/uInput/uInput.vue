<template>
	<view class="input-area">
		<input class="input" v-model="mobile" :type="isType" value="" :placeholder="placeholder" />
		<image v-if="isIcon && isIconType === 'close'" class="close" src="/static/image/login/close.png" mode="" @click="clearInput"></image>
		<image v-if="isIcon && isIconType === 'eye'" class="eye" src="/static/image/login/eyeclose.png" mode=""></image>
	</view>
</template>

<script>
	export default {
		name: 'Input',
		data() {
			return {
				mobile: ''
			}
		},
		props: {
			placeholder: {
				type: String,
				default: ''
			},
			isIcon: {
				type: Boolean,
				default: true
			},
			// close eye
			isIconType: {
				type: String,
				default: 'close'
			},
			isType: {
				type: String,
				default: 'text'
			}
		},
		methods: {
			clearInput () {
				this.mobile = ''
			}
		}
	}
</script>

<style lang="scss">
	.input-area {
		position: relative;
		
		.input {
			height: 92upx;
			border-bottom: 1px solid #F5F5F5;
			font-size: 28upx;
		}
		
		.close {
			width: 29upx;
			height: 29upx;
			position: absolute;
			top: 50%;
			right: 0;
			transform: translateY(-50%);
			z-index: 10;
		}
		
		.eye {
			width: 35upx;
			height: 30upx;
			position: absolute;
			top: 50%;
			right: 0;
			transform: translateY(-50%);
			z-index: 10;
		}
	}
</style>
