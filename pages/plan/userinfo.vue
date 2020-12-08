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
			个人信息
		</view>
		<!-- 提示 end -->
		<!-- 用户信息 start -->
		<view class="input-area">
			<view class="input-group">
				<view class="label">身份证号</view>
				<input 
					class="input"
					type="text"
					:value="id"
					disabled
				/>
			</view>
			<view class="input-group">
				<view class="label">生日</view>
				<input 
					class="input"
					type="text"
					:value="birthday"
					disabled
				/>
			</view>
			<view class="input-group">
				<view class="label">性别</view>
				<input 
					class="input"
					type="text"
					:value="sex"
					disabled
				/>
			</view>
		</view>
		<!-- 用户信息 end -->
		<!-- 表单填写 start -->
		<view class="input-area mt-20">
			<view class="input-group">
				<view class="label">民族 <text>*</text></view>
				<picker
					class="picker"
					:value="nation.data[nation.current].name"
					:range="nation.data"
					range-key="name"
					@change="selected($event, 'nation')"
				>
					<view class="text">{{ nation.data[nation.current].name }}</view>
					<view class="icon">
						<uni-icons type="arrowright" size="14" />
					</view>
				</picker>
			</view>
			<view class="input-group">
				<view class="label">政治面貌 <text>*</text></view>
				<picker
					class="picker"
					:value="political.data[political.current].name"
					:range="political.data"
					range-key="name"
					@change="selected($event, 'political')"
				>
					<view class="text">{{ political.data[political.current].name }}</view>
					<view class="icon">
						<uni-icons type="arrowright" size="14" />
					</view>
				</picker>
			</view>
			<view class="input-group">
				<view class="label">户口类型 <text>*</text></view>
				<picker
					class="picker"
					:value="registered.data[registered.current].name"
					:range="registered.data"
					range-key="name"
					@change="selected($event, 'registered')"
				>
					<view class="text">{{ registered.data[registered.current].name }}</view>
					<view class="icon">
						<uni-icons type="arrowright" size="14" />
					</view>
				</picker>
			</view>
			<view class="input-group">
				<view class="label">户口所在地 <text>*</text></view>
				<picker
					class="picker"
					mode="region"
					@change="selected($event, 'location')"
				>
					<view class="text">{{ location }}</view>
					<view class="icon">
						<uni-icons type="arrowright" size="14" />
					</view>
				</picker>
			</view>
			<view class="input-group">
				<view class="label">婚姻状况 <text>*</text></view>
				<picker
					class="picker"
					:value="marital.data[marital.current].name"
					:range="marital.data"
					range-key="name"
					@change="selected($event, 'marital')"
				>
					<view class="text">{{ marital.data[marital.current].name }}</view>
					<view class="icon">
						<uni-icons type="arrowright" size="14" />
					</view>
				</picker>
			</view>
			<view class="input-group">
				<view class="label">职业 <text>*</text></view>
				<input
					class="input"
					v-model="post"
					type="text"
					value=""
					placeholder="请输入职业"
				/>
			</view>
			<view class="input-group">
				<view class="label">收教材地址 <text>*</text></view>
				<picker
					class="picker"
					mode="region"
					@change="selected($event, 'shipping')"
				>
					<view class="text">{{ shipping }}</view>
					<view class="icon">
						<uni-icons type="arrowright" size="14" />
					</view>
				</picker>
			</view>
			<view class="input-group">
				<view class="label">详细地址 <text>*</text></view>
				<input 
					class="input"
					v-model="detail"
					type="text"
					value=""
					placeholder="请输入详细地址"
				/>
			</view>
		</view>
		<!-- 表单填写 end -->
		<!-- 按钮 start -->
		<view class="button-area">
			<button class="button-1" hover-class="none" @click="next">下一步</button>
		</view>
		<!-- 按钮 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import UniIcons from '@/components/uni-icons/uni-icons.vue'
	import { nation } from '@/common/config/nation.js'
	import { political, registered, marital } from '@/common/config/form.js'
	import { birthdayOfId } from '@/tools/util/util.js'
	export default {
		name: 'Userinfo',
		components: {
			XesNavbar,
			UniIcons
		},
		data() {
			return {
				user: {
					nation: '',
					political: '',
					registered: '',
					location: '',
					marital: '',
					post: '',
					shipping: '',
					detail: ''
				}, // 缓存对象
				nation: {}, // 民族
				political: {}, // 政治面貌
				registered: {}, // 户口类型
				location: '江西省 南昌市 青山湖区', // 户口所在地
				marital: {}, // 婚姻状况
				post: '', // 职业
				shipping: '江西省 南昌市 青山湖区', // 收货地址
				detail: '', // 详细地址
				id: '', // 身份证
				birthday: '', // 生日
				sex: '' // 性别
			}
		},
		onLoad(options) {
			this.id = options.id
			this.birthday = birthdayOfId(options.id)
			this.sex = options.sex === '0' ? '女' : '男'
			
			this.nation = nation
			this.political = political
			this.registered = registered
			this.marital = marital
		},
		methods: {
			selected(e, str) {
				if (str === 'location' || str === 'shipping') {
					this[str] = e.detail.value.join(' ')
				} else {
					this[str].current = e.detail.value
				}
			},
			next () {
				if (this.post === '') {
					uni.showToast({
						icon: 'none',
						title: '请输入职业'
					})
					return false
				}
				
				if (this.detail === '') {
					uni.showToast({
						icon: 'none',
						title: '请输入详细地址'
					})
					return false
				}
				
				this.user.nation = this.nation.data[this.nation.current].name
				this.user.political = this.political.data[this.political.current].name
				this.user.registered = this.registered.data[this.registered.current].name
				this.user.location = this.location
				this.user.marital = this.marital.data[this.marital.current].name
				this.user.post = this.post
				this.user.shipping = this.shipping
				this.user.detail = this.detail
				
				uni.setStorageSync('user', this.user)
				
				uni.navigateTo({
					url: '/pages/plan/education'
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/plan.scss'
</style>
