<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar 
			title="报读信息"
			:is-arrow="true"
			text-align="center"
		/>
		<!-- 导航栏 end -->
		<!-- 提示 start -->
		<view class="tips">
			学历信息
		</view>
		<!-- 提示 end -->
		<!-- 表单填写 start -->
		<view class="input-area">
			<view class="input-group">
				<view class="label">原学历类型 <text>*</text></view>
				<picker
					class="picker"
					:value="education.data[education.current].name"
					:range="education.data"
					range-key="name"
					@change="selected($event, 'education')"
				>
					<view class="text">{{ education.data[education.current].name }}</view>
					<view class="icon">
						<uni-icons type="arrowright" size="14" />
					</view>
				</picker>
			</view>
			<view class="input-group">
				<view class="label">原毕业学校 <text>*</text></view>
				<input 
					class="input"
					v-model="school"
					type="text"
					value=""
					placeholder="请输入毕业学校"
				/>
			</view>
			<view class="input-group">
				<view class="label">原毕业时间 <text>*</text></view>
				<picker
					class="picker"
					mode="date"
					@change="selected($event, 'date')"
				>
					<view class="text">{{ date }}</view>
					<view class="icon">
						<uni-icons type="arrowright" size="14" />
					</view>
				</picker>
			</view>
			<view class="input-group">
				<view class="label">原毕业专业 <text>*</text></view>
				<input 
					class="input"
					v-model="major"
					type="text"
					value=""
					placeholder="请输入毕业专业"
				/>
			</view>
			<view class="input-group">
				<view class="label">原毕业证编号 <text>*</text></view>
				<input 
					class="input"
					v-model="number"
					type="text"
					value=""
					placeholder="请输入毕业证编号"
				/>
			</view>
		</view>
		<!-- 表单填写 end -->
		<!-- 按钮 start -->
		<button class="button" hover-class="none" @click="next">提交</button>
		<!-- 按钮 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import UniIcons from '@/components/uni-icons/uni-icons.vue'
	import { education } from '@/common/config/form.js'
	export default {
		name: 'Education',
		components: {
			XesNavbar,
			UniIcons
		},
		data() {
			return {
				education: {}, // 学历
				school: '', // 原毕业院校
				date: '请选择', // 原毕业时间
				major: '', // 原毕业专业
				number: '' // 原毕业证编号
			}
		},
		onLoad() {
			this.education = education
		},
		methods: {
			selected(e, str) {
				if (str === 'date') {
					this[str] = e.detail.value
				} else {
					this[str].current = e.detail.value
				}
			},
			next() {
				uni.navigateTo({
					url: '/pages/plan/affirm'
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/plan.scss'
</style>
