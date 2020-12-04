<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar
			:is-arrow="true"
			id="navbar"
		>
			<view class="search-input" @click="handleInput">
				<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/issue/sousuo%402x.png" mode=""></image>
				搜索您感兴趣的问题或回答
			</view>
		</xes-navbar>
		<!-- 导航栏 end -->
		<!-- 切换卡 start -->
		<view class="tabbar" :style="{top: top + 'px'}">
			<xes-text-tabbar
				:list="tabbar.list"
				:current="tabbar.current"
				@postId="toId"
			/>
		</view>
		<!-- 切换卡 end -->
		<!-- 内容区域 start -->
		<empty v-if="list.length <= 0" />
		<view class="content" v-else>
			<!-- 热门问题 start -->
			<view class="hot" v-if="tabbar.current === 0">
				<view class="filter-area" :style="{top: filterTop + 'px'}">
					<view class="filter">
						<picker 
							class="picker" 
							:value="type.data[type.index].name"
							:range="type.data"
							range-key="name"
							@change="selected($event, 'type')"
						>
								<view class="text">{{ type.data[type.index].name }}</view>
								<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/common/arrowdown.png" mode=""></image>
						</picker>
						<picker 
							class="picker"
							:value="specialty.data[specialty.index].name"
							:range="specialty.data"
							range-key="name"
							@change="selected($event, 'specialty')"
						>
								<view class="text">{{specialty.data[specialty.index].name}}</view>
								<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/common/arrowdown.png" mode=""></image>
						</picker>
						<picker 
							class="picker"
							:value="subject.data[subject.index].name"
							:range="subject.data"
							range-key="name"
							@change="selected($event, 'subject')"
						>
								<view class="text">{{ subject.data[subject.index].name }}</view>
								<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/common/arrowdown.png" mode=""></image>
						</picker>
					</view>
				</view>
				<navigator
					class="item"
					v-for="hot in list"
					:key="hot.id"
					:url="'/pages/issue/detail?id=' + hot.id"
					hover-class="none"
				>
					<view class="crumbs">
						{{ hot.crumbs }}
					</view>
					<view class="title">
						{{ hot.title }}
					</view>
					<view class="source">
						{{ hot.content }}             
					</view>
					<view class="bot">
						<view class="praise-reply">
							{{ hot.admire }} 赞同 · {{ hot.answer_num }}回复
						</view>
						<view class="date">
							{{ hot.addtime }}
						</view>
					</view>
				</navigator>
			</view>
			<!-- 热门问题 end -->
			<!-- 我的提问 start -->
			<view class="question" v-else-if="tabbar.current === 1">
				<navigator 
					class="item"
					v-for="issue in list"
					:key="issue.id"
					:url="'/pages/issue/detail?id=' + issue.id"
					hover-class="none"
				>
					<view class="crumbs">
						{{ issue.crumbs }}
					</view>
					<view class="title">
						{{ issue.title }}
					</view>
					<view class="source">
						{{ issue.content }} 
					</view>
					<view class="bot">
						<view class="praise-reply">
							{{ issue.admire }} 赞同 · {{ issue.answer_num }}回复
						</view>
						<view class="date">
							{{ issue.addtime }}
						</view>
					</view>
				</navigator>
			</view>
			<!-- 我的提问 end -->
			<!-- 我的回答 start -->
			<view class="answer" v-else>
				<view 
					class="item"
					v-for="answer in list"
					:key="answer.id"
				>
					<image class="delete" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/issue/DEL%402x.png" mode="" @click="handleDelete(answer)"></image>
					<view class="userinfo">
						<image class="avatar" :src="userinfo.avatars" mode=""></image>
						<view class="name-date">
							<view class="name">
								{{ userinfo.username }}
							</view>
							<view class="date">
								{{ answer.addtime }}
							</view>
						</view>
					</view>
					<view class="reply">
						{{ answer.my_content }}
					</view>
					<navigator :url="'/pages/issue/detail?id=' + answer.fa_id" hover-class="none" class="bot">
						<view class="bot-crumbs">
							{{ answer.crumbs }}
						</view>
						<view class="bot-title">
							{{ answer.title }}
						</view>
						<view class="bot-answer">
							已有{{ answer.count }}个回答
							<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/common/arrowdown.png" mode=""></image>
						</view>
					</navigator>
					<view class="praise" @click="handlePraise(answer)">
						<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/discover/xiaodianzan%402x.png" mode=""></image>
						{{ answer.admire }}
					</view>
				</view>
			</view>
			<!-- 我的回答 end -->
			<uni-load-more v-if="totalPage > 1" :status="loading.status" :iconSize="14" />
		</view>
		<!-- 内容区域 end -->
		<!-- 提问 start -->
		<navigator url="/pages/issue/choose" hover-class="none" class="ask"></navigator>
		<!-- 提问 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import XesTextTabbar from '@/components/xes-text-tabbar/xes-text-tabbar.vue'
	import UniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import Empty from '@/components/empty/empty.vue'
	import { 
		issue_hot,
		me_issue,
		me_answer,
		professional,
		issue_answer_remove,
		issue_admire
	} from '@/common/api/api.js'
	export default {
		name: 'Issue',
		components: {
			XesNavbar,
			XesTextTabbar,
			UniLoadMore,
			Empty
		},
		data() {
			return {
				tabbar: {
					list: [{
						id: 0,
						name: '热门问题'
					}, {
						id: 1,
						name: '我的提问'
					}, {
						id: 2,
						name: '我的回答'
					}],
					current: 0
				},
				top: 0, // 选项卡定位值
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
				filterTop: 0,
				list: [],
				page: 1,
				totalPage: 1,
				professional: {
					list: [],
					id: 0
				},
				loading: {
					show: false,
					status: 'more'
				},
				userinfo: {}
			}
		},
		onShow() {
			const navbar = uni.createSelectorQuery().in(this)
			navbar.select('#navbar').boundingClientRect(navbar => {
				this.top = navbar.height
				this.filterTop = navbar.height + 52
			}).exec()
			
			this.page = 1
			
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 300
			})
			
			this.toData()
		},
		async onReachBottom() {
			this.page++
			if (this.page > this.totalPage) {
				this.loading.status = 'noMore'
				return false
			}
			this.loading.status = 'loading'
			if (this.tabbar.current === 0) {
				const hot = await issue_hot({
					profession_id: this.professional.id,
					page: this.page
				})
				const { data } = hot.data.data
				this.list = [...this.list, ...data]
			} else if (this.tabbar.current === 1) {
				const issue = await me_issue({
					page: this.page
				})
				const { data } = issue.data.data
				this.list = [...this.list, ...data]
			} else if (this.tabbar.current === 2) {
				const answer = await me_answer({
					page: this.page
				})
				const { list } = answer.data.data
				this.list = [...this.list, ...list.data]
			}
			this.loading.status = 'more'
		},
		methods: {
			async toData() {
				uni.showLoading({
					title: '加载中...'
				})
				
				if (this.tabbar.current === 0) {
					// 获取专业数据
					const professionalData = await professional()
					this.professional.list = professionalData.data.data
					this.professional.list.map(item => {
						this.type.data.push(item)
					})
					
					// 获取热门问题
					const hot = await issue_hot({
						profession_id: '',
						page: 1
					})
					const { data, last_page } = hot.data.data
					this.list = data
					this.totalPage = last_page
				} else if (this.tabbar.current === 1) {
					// 获取我的提问
					const issue = await me_issue()
					const { data, last_page } = issue.data.data
					this.list = data
					this.totalPage = last_page
				} else if (this.tabbar.current === 2) {
					// 获取我的回答
					const answer = await me_answer()
					const { user, list } = answer.data.data
					this.userinfo = user
					this.list = list.data
					this.totalPage = list.last_page
				} else {
					return false
				}
				uni.hideLoading()
			},
			// 切换卡
			toId(id) {
				this.tabbar.current = id
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				})
				this.page = 1
				this.list = []
				this.loading.status = 'more'
				this.toData()
			},
			// 点击搜索框
			handleInput() {
				uni.navigateTo({
					url: '/pages/issue/search'
				})
			},
			// 选择
			selected(e, str) {
				if (str === 'type' && e.target.value !== '0') {
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
					uni.showLoading({
						title: '加载中...'
					})
					// 渲染查询后的数据
					const id = this.subject.data[e.target.value].id
					this.professional.id = id
					issue_hot({
						profession_id: id,
						page: 1
					}).then(response => {
						const res = response.data.data
						this.professional.list = res
						uni.hideLoading()
					}).catch(error => {
						uni.hideLoading()
					})
				} else {
					return false
				}
				this[str].index = e.target.value
			},
			// 删除
			handleDelete(row) {
				const that = this
				
				uni.showModal({
					title: '提示',
					content: '确定删除此条信息?',
					success(res) {
						if (res.confirm) {
							uni.showLoading({
								title: '删除中...'
							})
							issue_answer_remove({ id: row.id }).then(response => {
								const index = that.list.findIndex(item => {
									return item.id === row.id
								})
								that.list.splice(index, 1)
								uni.hideLoading()
								uni.showToast({
									icon: 'none',
									title: '删除成功'
								})
							})
						}
					}
				})
			},
			async handlePraise(raw) {
				const response = await issue_admire({
					id: raw.id,
					mode: 1
				})
				uni.showToast({
					icon: 'none',
					title: '点赞成功'
				})
				raw.admire++
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/issue.scss'
</style>
