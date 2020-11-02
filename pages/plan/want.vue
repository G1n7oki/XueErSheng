<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar 
			title="我要报读"
			:is-arrow="true"
			text-align="center"
		/>
		<!-- 导航栏 end -->
		<!-- 用户信息 start -->
		<view class="input-area">
			<view class="input-group">
				<view class="label">姓名</view>
				<input 
					class="input"
					v-model="formData.name"
					type="text"
					value=""
					placeholder="请输入姓名"
				/>
			</view>
			<view class="input-group">
				<view class="label">身份证号</view>
				<input 
					class="input"
					v-model="formData.card"
					type="text"
					value=""
					placeholder="请输入身份号"
				/>
			</view>
			<view class="input-group">
				<view class="label">性别</view>
				<picker 
					class="picker"
					:value="sex.data[sex.current].name"
					:range="sex.data"
					range-key="name"
				>
					<view class="text">{{ sex.data[sex.current].name }}</view>
					<view class="icon">
						<uni-icons type="arrowright" size="14" />
					</view>
				</picker>
			</view>
		</view>
		<!-- 用户信息 end -->
		<!-- 报读信息 start -->
		<view class="input-area mt-20">
			<view class="input-group">
				<view class="label">报读类型</view>
				<input 
					class="input"
					type="text"
					value="2021级筑梦计划2"
					disabled
				/>
			</view>
			<view class="input-group">
				<view class="label">年级</view>
				<input 
					class="input"
					type="text"
					value="2021"
					disabled
				/>
			</view>
			<view class="input-group">
				<view class="label">院校</view>
				<picker
					class="picker"
					:value="sex.data[sex.current].name"
					:range="sex.data"
					range-key="name"
				>
					<view class="text">{{ sex.data[sex.current].name }}</view>
					<view class="icon">
						<uni-icons type="arrowright" size="14" />
					</view>
				</picker>
			</view>
			<view class="input-group">
				<view class="label">层次</view>
				<picker
					class="picker"
					:value="sex.data[sex.current].name"
					:range="sex.data"
					range-key="name"
				>
					<view class="text">{{ sex.data[sex.current].name }}</view>
					<view class="icon">
						<uni-icons type="arrowright" size="14" />
					</view>
				</picker>
			</view>
			<view class="input-group">
				<view class="label">专业</view>
				<picker
					class="picker"
					:value="sex.data[sex.current].name"
					:range="sex.data"
					range-key="name"
				>
					<view class="text">{{ sex.data[sex.current].name }}</view>
					<view class="icon">
						<uni-icons type="arrowright" size="14" />
					</view>
				</picker>
			</view>
			<view class="input-group">
				<view class="label">城市</view>
				<picker
					class="picker"
					:value="sex.data[sex.current].name"
					:range="sex.data"
					range-key="name"
				>
					<view class="text">{{ sex.data[sex.current].name }}</view>
					<view class="icon">
						<uni-icons type="arrowright" size="14" />
					</view>
				</picker>
			</view>
			<view class="input-group">
				<view class="label">考试县区</view>
				<picker
					class="picker"
					:value="sex.data[sex.current].name"
					:range="sex.data"
					range-key="name"
				>
					<view class="text">{{ sex.data[sex.current].name }}</view>
					<view class="icon">
						<uni-icons type="arrowright" size="14" />
					</view>
				</picker>
			</view>
		</view>
		<!-- 报读信息 end -->
		<!-- 按钮 start -->
		<button class="button" hover-class="none" @click="next">下一步</button>
		<!-- 按钮 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import UniIcons from '@/components/uni-icons/uni-icons.vue'
	export default {
		name: 'Want',
		components: {
			XesNavbar,
			UniIcons
		},
		data() {
			return {
				formData: {
					name: '',
					card: '',
					sex: 0,
				},
				sex: {
					data: [{
						id: 0,
						name: '请选择'
					}, {
						id: 1,
						name: '男'
					}, {
						id: 2,
						name: '女'
					}],
					current: 0
				}
			}
		},
		methods: {
			seleted() {},
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
