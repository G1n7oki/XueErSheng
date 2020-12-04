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
			<picker
				class="picker" 
				:value="type.data[type.index].name"
				:range="type.data"
				range-key="name"
				@change="selected($event, 'type')"
			>
					<view class="text">{{ type.data[type.index].name }}</view>
					<view class="icon">
						<uni-icons type="arrowdown" />
					</view>
			</picker>
			<picker 
				class="picker"
				:value="specialty.data[specialty.index].name"
				:range="specialty.data"
				range-key="name"
				@change="selected($event, 'specialty')"
			>
					<view class="text">{{specialty.data[specialty.index].name}}</view>
					<view class="icon">
						<uni-icons type="arrowdown" />
					</view>
			</picker>
			<picker 
				class="picker"
				:value="subject.data[subject.index].name"
				:range="subject.data"
				range-key="name"
				@change="selected($event, 'subject')"
			>
					<view class="text">{{ subject.data[subject.index].name }}</view>
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
	import { professional } from '@/common/api/api.js'
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
					data: [{
						id: 0,
						name: '一级类目',
						pid: 999
					}],
					index: 0
				}, // 类型选择器
				specialty: {
					data: [{
						id: 0,
						name: '二级类目',
						pid: 999
					}],
					index: 0
				}, // 专业选择器
				subject: {
					data: [{
						id: 0,
						name: '三级类目',
						pid: 999
					}],
					index: 0
				}, // 科目选择器
				professional: {
					list: [],
					id: 0
				},
				crumbs: []
			}
		},
		onLoad() {
			this.toData()
		},
		methods: {
			async toData() {
				uni.showLoading({
					title: '加载中...'
				})
				// 获取专业数据
				const professionalData = await professional()
				this.professional.list = professionalData.data.data
				this.professional.list.map(item => {
					this.type.data.push(item)
				})
				uni.hideLoading()
			},
			// 下一步
			handleNext() {
				// 所有选择项为必选
				if (this.type.index === 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择一级类目'
					})
					return false
				}
				
				if (this.specialty.index === 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择二级类目'
					})
					return false
				}
				
				if (this.subject.index === 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择三级类目'
					})
					return false
				}
				
				const crumbs = this.crumbs.join(' > ')
				uni.navigateTo({
					url: `/pages/issue/ask?id=${this.professional.id}&crumbs=${crumbs}`
				})
			},
			// 选择
			selected(e, str) {
				if (str === 'type' && e.target.value !== '0') {
					this.crumbs[0] = this.type.data[e.target.value].name
					// 向二级类目添加数据
					this.specialty = {
						data: [{
							id: 0,
							name: '二级类目',
							pid: 999
						}],
						index: 0
					}
					this.subject = {
						data: [{
							id: 0,
							name: '三级类目',
							pid: 999
						}],
						index: 0
					}
					const newArray = this.professional.list[e.target.value - 1].sub
					this.specialty.data = [...this.specialty.data, ...newArray]
				} else if (str === 'specialty' && e.target.value !== '0') {
					this.crumbs[1] = this.specialty.data[e.target.value].name
					// 向三级类目添加数据
					this.subject = {
						data: [{
							id: 0,
							name: '三级类目',
							pid: 999
						}],
						index: 0
					}
					const newArray = this.specialty.data[e.target.value].sub
					this.subject.data = [...this.subject.data, ...newArray]
				} else if (str === 'subject' && e.target.value !== '0') {
					this.crumbs[2] = this.subject.data[e.target.value].name
					this.professional.id = this.subject.data[e.target.value].id
				} else {
					return false
				}
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
