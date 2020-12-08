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
					@change="seleted($event, 'sex')"
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
					:value="formData.title"
					disabled
				/>
			</view>
			<view class="input-group">
				<view class="label">年级</view>
				<input 
					class="input"
					type="text"
					:value="formData.year"
					disabled
				/>
			</view>
			<view class="input-group">
				<view class="label">院校</view>
				<picker
					class="picker"
					:value="school.data[school.current].name"
					:range="school.data"
					range-key="name"
					@change="seleted($event, 'school')"
				>
					<view class="text">{{ school.data[school.current].name }}</view>
					<view class="icon">
						<uni-icons type="arrowright" size="14" />
					</view>
				</picker>
			</view>
			<view class="input-group">
				<view class="label">层次</view>
				<picker
					class="picker"
					:value="level.data[level.current].name"
					:range="level.data"
					range-key="name"
					@change="seleted($event, 'level')"
				>
					<view class="text">{{ level.data[level.current].name }}</view>
					<view class="icon">
						<uni-icons type="arrowright" size="14" />
					</view>
				</picker>
			</view>
			<view class="input-group">
				<view class="label">专业</view>
				<picker
					class="picker"
					:value="profession.data[profession.current].name"
					:range="profession.data"
					range-key="name"
					@change="seleted($event, 'profession')"
				>
					<view class="text">{{ profession.data[profession.current].name }}</view>
					<view class="icon">
						<uni-icons type="arrowright" size="14" />
					</view>
				</picker>
			</view>
			<view class="input-group">
				<view class="label">城市</view>
				<picker
					class="picker"
					:value="city.data[city.current].name"
					:range="city.data"
					range-key="name"
					@change="seleted($event, 'city')"
				>
					<view class="text">{{ city.data[city.current].name }}</view>
					<view class="icon">
						<uni-icons type="arrowright" size="14" />
					</view>
				</picker>
			</view>
			<view class="input-group">
				<view class="label">考试县区</view>
				<picker
					class="picker"
					:value="county.data[county.current].name"
					:range="county.data"
					range-key="name"
					@change="seleted($event, 'county')"
				>
					<view class="text">{{ county.data[county.current].name }}</view>
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
	import { isIdentity } from '@/tools/verify/verify.js'
	import { plan_school, plan_professional, plan_city, plan_county } from '@/common/api/api.js'
	export default {
		name: 'Want',
		components: {
			XesNavbar,
			UniIcons
		},
		data() {
			return {
				title: '',
				formData: {
					name: '',
					card: '',
					sex: 0,
					year: '',
					apply_type: '',
					school: '',
					schoolName: '',
					level: '',
					levelName: '',
					major: '',
					majorName: '',
					city: '',
					counties: ''
				},
				sex: {
					data: [{
						id: 9999,
						name: '请选择'
					}, {
						id: 0,
						name: '女'
					}, {
						id: 1,
						name: '男'
					}],
					current: 0
				},
				// 院校
				school: {
					data: [{
						school_id: 0,
						name: '请选择'
					}],
					current: 0
				},
				// 层次
				level: {},
				// 层次 - 成考
				level1: {
					data: [{
						id: 0,
						name: '请选择'
					}, {
						id: 1,
						name: '高升专'
					}, {
						id: 2,
						name: '专升本'
					}, {
						id: 3,
						name: '高升本'
					}],
					current: 0
				},
				// 层次 - 自考
				level2: {
					data: [{
						id: 0,
						name: '请选择'
					}, {
						id: 1,
						name: '高升专'
					}, {
						id: 2,
						name: '专升本'
					}],
					current: 0
				},
				// 城市
				city: {
					data: [{
						id: 9999,
						name: '请选择'
					}],
					current: 0
				},
				// 专业
				profession: {
					data: [{
						id: 9999,
						name: '请选择'
					}],
					current: 0
				},
				// 县区
				county: {
					data: [{
						id: 9999,
						name: '请选择'
					}],
					current: 0
				},
				type: ''
			}
		},
		onLoad(options) {
			this.formData.title = options.title
			this.formData.year = options.year
			this.formData.apply_type = options.id
			
			this.level = +options.id === 1 ? this.level2 : this.level1
			
			this.toData(options.id)
		},
		methods: {
			async toData(id) {
				uni.showLoading({
					title: '加载中...'
				})
				const school = await plan_school({
					type: id
				})
				this.school.data = [...this.school.data, ...school.data.data]
				uni.hideLoading()
			},
			async seleted(e, str) {
				this[str].current = e.target.value
				
				if (str === 'school') {
					this.reset()
					uni.showLoading({
						title: '加载中...'
					})
					// 获取城市
					const city = await plan_city({
						school_id: this.school.data[this.school.current].school_id
					})
					
					city.data.data.forEach((item, index) => {
						this.city.data.push({
							id: index,
							name: item.city
						})
					})
					
					uni.hideLoading()
				}
				
				if (str === 'level') {
					this.profession = {
						data: [{
							id: 9999,
							name: '请选择'
						}],
						current: 0
					}
				}
				
				if (this.school.current !== 0 && this.level.current !== 0) {
					uni.showLoading({
						title: '加载中...'
					})
					// 获取专业
					const profession = await plan_professional({
						type: this.formData.apply_type,
						level: this.level.data[this.level.current].id,
						school_id: this.school.data[this.school.current].school_id
					})
					
					profession.data.data.forEach((item) => {
						this.profession.data.push({
							id: item.id,
							name: item.name
						})
					})
					uni.hideLoading()
				}
				
				if (str === 'city') {
					this.county = {
						data: [{
							id: 9999,
							name: '请选择'
						}],
						current: 0
					}
				}
				
				if (this.school.current !== 0 && this.city.current !== 0) {
					uni.showLoading({
						title: '加载中...'
					})
					// 获取县区
					const county = await plan_county({
						city: this.city.data[this.city.current].name,
						school_id: this.school.data[this.school.current].school_id
					})
					
					county.data.data.forEach((item) => {
						this.county.data.push({
							id: item.id,
							name: item.counties
						})
					})
					
					uni.hideLoading()
				}
			},
			reset() {
				this.city = {
					data: [{
						id: 9999,
						name: '请选择'
					}],
					current: 0
				}
				
				this.level.current = 0
				
				this.profession = {
					data: [{
						id: 9999,
						name: '请选择'
					}],
					current: 0
				}
				
				this.county = {
					data: [{
						id: 9999,
						name: '请选择'
					}],
					current: 0
				}
			},
			next() {
				if (this.formData.name === '') {
					uni.showToast({
						icon: 'none',
						title: '请填写姓名'
					})
					
					return false
				}
				
				if (!isIdentity(this.formData.card)) {
					uni.showToast({
						icon: 'none',
						title: '请填正确的身份证'
					})
					
					return false
				}
				
				if (this.sex.current === 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择性别'
					})
					
					return false
				}
				
				if (this.school.current === 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择学校'
					})
					
					return false
				}
				
				if (this.level.current === 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择层次'
					})
					
					return false
				}
				
				if (this.profession.current === 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择专业'
					})
					
					return false
				}
				
				if (this.city.current === 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择城市'
					})
					
					return false
				}
				
				if (this.county.current === 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择县区'
					})
					
					return false
				}
				
				this.formData.sex = this.sex.data[this.sex.current].id
				this.formData.school = this.school.data[this.school.current].school_id
				this.formData.schoolName = this.school.data[this.school.current].name
				this.formData.level = this.level.data[this.level.current].id
				this.formData.levelName = this.level.data[this.level.current].name
				this.formData.major = this.profession.data[this.profession.current].id
				this.formData.majorName = this.profession.data[this.profession.current].name
				this.formData.city = this.city.data[this.city.current].name
				this.formData.counties = this.county.data[this.county.current].name
				
				uni.setStorageSync('formData', this.formData)
				
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
