<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar
			:is-arrow="true"
			id="navbar"
		>
			<view class="input-group">
				<input 
					class="input"
					type="text"
					v-model="value"
					placeholder="搜索您感兴趣的问题或回答"
					confirm-type="search"
					@input="input"
					@confirm="confirm"
				/>
				<image v-if="clear" class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/issue/guanbi%402x.png" mode="" @click="handleClear"></image>
			</view>
		</xes-navbar>
		<!-- 导航栏 end -->
		<!-- 搜索历史 start -->
		<view class="history" v-if="flag">
			<view class="title-delete">
				<view class="title">
					搜索历史
				</view>
				<image class="delete" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/issue/DEL%402x.png" mode="" @click="handleDelete"></image>
			</view>
			<view class="list">
				<view class="item" 
					v-for="item in history"
					:key="item"
					@click="handleItem(item)"
				>
					<view class="dot"></view>
					<view class="text">
						{{ item }}
					</view>
				</view>
			</view>
		</view>
		<!-- 搜索历史 end -->
		<!-- 搜索结果 start -->
		<view class="result" v-else>
			<view class="tips">
				共搜到 {{ total }} 条相关信息
			</view>
			<navigator 
				class="item"
				v-for="item in result"
				:key="item.id"
				:url="'/pages/issue/detail?id=' + item.id"
				hover-class="none"
			>
				<view class="crumbs">
					自学考试 > 本科 > 金融学(新)02301K > 03709马克03709马克03709马克
				</view>
				<view class="title">
					{{ item.title }}
				</view>
				<view class="source">
					{{ item.answer.username }}回复：{{ item.answer.my_content }}     
				</view>
				<view class="bot">
					<view class="praise-reply">
						{{ item.admire }} 赞同 · {{ item.reply }} 回复
					</view>
					<view class="date">
						{{ item.addtime }}
					</view>
				</view>
			</navigator>
			<uni-load-more v-if="loading.show" :status="loading.status" :iconSize="14" />
		</view>
		<!-- 搜索结果 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import UniIcons from '@/components/uni-icons/uni-icons.vue'
	import UniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import { issue_hot } from '@/common/api/api.js'
	export default {
		name: 'Search',
		components: {
			XesNavbar,
			UniIcons,
			UniLoadMore
		},
		data() {
			return {
				clear: false, // 是否显示清除按钮
				value: '',
				history: uni.getStorageSync('history') || [], // 历史搜索的缓存
				flag: true,
				result: [],
				total: 0,
				loading: {
					show: false,
					status: 'more'
				},
				page: 1,
				totalPage: 1
			}
		},
		async onReachBottom() {
			this.page++
			if (this.page > this.totalPage) {
				this.loading.status = 'noMore'
				return false
			}
			this.loading.status = 'loading'
			
			const response = await issue_hot({
				profession_id: '',
				search: this.value,
				page: this.page
			})
			
			const { data } = response.data.data
			this.result = [...this.result, ...data]
			
			this.loading.status = 'more'
		},
		methods: {
			// 输入字符
			input() {
				if (this.value !== '') {
					this.clear = true
				}
			},
			// 点击完成时
			async confirm() {
				uni.showLoading({
					title: '加载中...'
				})
				
				this.page = 1
				this.result = []
				
				if (this.history.indexOf(this.value) === -1 && this.value !== '') {
					this.history.unshift(this.value)
					uni.setStorageSync('history', this.history)
				}
				
				const response = await issue_hot({
					profession_id: '',
					search: this.value,
					page: 1
				})
				
				const { data, total, last_page } = response.data.data
				this.result = data
				this.loading.show = last_page > 1
				this.total = total
				this.totalPage = last_page
				this.flag = false
				
				uni.hideLoading()
			},
			// 清除输入框
			handleClear() {
				this.value = ''
				this.clear = false
			},
			// 删除搜索历史
			handleDelete() {
				const that = this
				uni.showModal({
					title: '提示',
					content: '是否清除搜索历史',
					success(res) {
						if (res.confirm) {
							uni.clearStorageSync('history')
							that.history = []
							uni.showToast({
								icon: 'none',
								title: '清除成功'
							})
						}
					}
				})
			},
			// 点击历史搜索
			handleItem(value) {
				this.value = value
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/search.scss'
</style>
