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
		<view class="inform">
			* 由于政策原因, 证件材料请登录学尔升App提交
		</view>
		<!-- 按钮 start -->
		<button class="button" hover-class="none" @click="next">提交</button>
		<!-- 按钮 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import UniIcons from '@/components/uni-icons/uni-icons.vue'
	import { education } from '@/common/config/form.js'
	import { plan_info } from '@/common/api/api.js'
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
				number: '', // 原毕业证编号
				form: {
					applies_id: '',
					nation: '',
					politics: '',
					koseki: '',
					koseki_address: '',
					marriage: '',
					job: '',
					textbook: '',
					address: '',
					education: '',
					school: '',
					graduate_time: '',
					profession: '',
					graduate: ''
				}
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
			async next() {
				if (this.school === '') {
					uni.showToast({
						icon: 'none',
						title: '请填写原毕业学校'
					})
					return false
				}
				
				if (this.date === '请选择') {
					uni.showToast({
						icon: 'none',
						title: '请选择原毕业时间'
					})
					return false
				}
				
				if (this.major === '') {
					uni.showToast({
						icon: 'none',
						title: '请填写原毕业专业'
					})
					return false
				}
				
				if (this.number === '') {
					uni.showToast({
						icon: 'none',
						title: '请填写原毕业证编号'
					})
					return false
				}
				
				const user = uni.getStorageSync('user')
				// 个人信息
				this.form.applies_id = user.id
				this.form.nation = user.nation
				this.form.politics = user.political
				this.form.koseki = user.registered
				this.form.koseki_address = user.location
				this.form.marriage = user.marital
				this.form.job = user.post
				this.form.textbook = user.shipping
				this.form.address = user.detail
				// 学历信息
				this.form.education = this.education.data[this.education.current].name
				this.form.school = this.school
				this.form.graduate_time = this.date
				this.form.profession = this.major
				this.form.graduate = this.number
				
				const response = await plan_info(this.form)
				
				uni.showToast({
					icon: 'none',
					title: '提交成功'
				})
				
				uni.removeStorageSync('user')
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/plan.scss'
</style>
