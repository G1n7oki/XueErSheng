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
					@blur="confirm"
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
				共搜到 2 条相关信息
			</view>
			<view class="item" v-for="n in 6" :key="n">
				<view class="crumbs">
					自学考试 > 本科 > 金融学(新)02301K > 03709马克03709马克03709马克
				</view>
				<view class="title">
					您好，马克思 | 认为“马克思主义”是洗脑，这本身是一种被洗脑的表现
				</view>
				<view class="source">
					视频回复来源：中国青年网。“认为马克思主义是洗脑，这本身是一种洗脑的表现。”正确区分学习概论知识技能处视频回复来源：中国青年网。“认为马克思主义是洗脑，这本身是一种洗脑的表现。”正确区分学习概论知识技能处               
				</view>
				<view class="bot">
					<view class="praise-reply">
						1240 赞同 · 21回复
					</view>
					<view class="date">
						2020.09.10
					</view>
				</view>
			</view>
		</view>
		<!-- 搜索结果 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import UniIcons from '@/components/uni-icons/uni-icons.vue'
	export default {
		name: 'Search',
		components: {
			XesNavbar,
			UniIcons
		},
		data() {
			return {
				clear: false, // 是否显示清除按钮
				value: '',
				history: uni.getStorageSync('history') || [], // 历史搜索的缓存
				flag: true
			}
		},
		methods: {
			// 输入字符
			input() {
				if (this.value !== '') {
					this.clear = true
				}
			},
			// 点击完成时
			confirm() {
				if (this.history.indexOf(this.value) === -1 && this.value !== '') {
					this.history.unshift(this.value)
					uni.setStorageSync('history', this.history)
				}
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
