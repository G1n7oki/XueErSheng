<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar 
			title="提问"
			text-align="center"
			:is-arrow="true"
		/>
		<!-- 导航栏 end -->
		<!-- choose start -->
		<view class="choose">
			<picker class="picker" @change="selected($event, 'type')" :value="type.index" :range="type.range">
					<view class="text">{{type.range[type.index]}}</view>
					<view class="icon">
						<uni-icons type="arrowdown" />
					</view>
			</picker>
			<picker class="picker" @change="selected($event, 'specialty')" :value="specialty.index" :range="specialty.range">
					<view class="text">{{specialty.range[specialty.index]}}</view>
					<view class="icon">
						<uni-icons type="arrowdown" />
					</view>
			</picker>
			<picker class="picker" @change="selected($event, 'subject')" :value="subject.index" :range="subject.range">
					<view class="text">{{subject.range[subject.index]}}</view>
					<view class="icon">
						<uni-icons type="arrowdown" />
					</view>
			</picker>
		</view>
		<!-- choose end -->
		<!-- button start -->
		<view @click="handleNext">
			<u-button text="下一步" />
		</view>
		<!-- button end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import uButton from '@/components/u-button/uButton.vue'
	import UniIcons from '@/components/uni-icons/uni-icons.vue'
	export default {
		name: 'Choose',
		components: {
			XesNavbar,
			uButton,
			UniIcons
		},
		data() {
			return {
				type: {
					range: ['选择学习类型', '自学考试', '成人高考'],
					index: 0,
				}, // 类型选择器
				specialty: {
					range: ['选择专业', '自学考试', '成人高考'],
					index: 0
				}, // 专业选择器
				subject: {
					range: ['选择科目', '自学考试', '成人高考'],
					index: 0
				}, // 科目选择器
			}
		},
		methods: {
			// 下一步
			handleNext() {
				// 所有选择项为必选
				if (this.type.index === 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择类型'
					})
					return false
				}
				
				if (this.specialty.index === 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择专业'
					})
					return false
				}
				
				if (this.subject.index === 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择科目'
					})
					return false
				}
				
				uni.navigateTo({
					url: '/pages/issue/ask'
				})
			},
			// 选择
			selected(e, str) {
				this[str].index = e.target.value
			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 32upx;
	}
	
	.picker {
		overflow: hidden;
		background-color: #F4F7F9;
		border-radius: 20upx;
		padding: 32upx;
		box-sizing: border-box;
		margin-bottom: 32upx;
		
		.text {
			width: 90%;
			font-size: 28upx;
			font-weight: 500;
			color: #606266;
			float: left;
		}
		
		.icon {
			float: right;
		}
	}
</style>
