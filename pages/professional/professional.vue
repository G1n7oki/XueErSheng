<template>
	<view class="contaier">
		<view class="tips">
			<view class="title">
				选择学习阶段
			</view>
			<view class="explain">
				请放心选择，后面还可以修改
			</view>
		</view>
		<view class="choose">
			<view class="category-1">
				<view class="item" :class="{'active': categoryIndex === category.id }" v-for="category in categoryList" :key="category.id"
				 @click="handleCategoryItem(category.id, category.name)">
					{{ category.name }}
				</view>
			</view>
			<view class="category-2">
				<view class="item" v-for="category in categoryList2" :key="category.id">
					<view class="title">
						{{ category.name }}
					</view>
					<view class="list">
						<view class="cell" v-for="cell in category.item" :key="cell.id" :data-parent="category.name" @click="handleCell($event, cell.name)">
							{{ cell.name }}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import json from '@/static/data.json'
	export default {
		name: 'professional',
		data() {
			return {
				categoryList: [],
				categoryIndex: 1,
				categoryList2: [],
				chooseResult: []
			}
		},
		onLoad() {
			this.categoryList = json.professional
			this.categoryList.forEach(item => {
				if (item.id === this.categoryIndex) {
					this.categoryList2 = item.children
				}
			})
			// 默认选择的1级类目
			this.chooseResult.push(this.categoryList[0].name)
		},
		methods: {
			handleCategoryItem(id, name) {
				this.categoryIndex = id
				this.chooseResult[0] = name

				this.categoryList.forEach(item => {
					if (item.id === this.categoryIndex) {
						this.categoryList2 = item.children
					}
				})
			},
			handleCell(event, name) {
				const that = this
				this.chooseResult[1] = event.target.dataset.parent
				this.chooseResult[2] = name

				// uni.setStorageSync('crumbs', this.chooseResult)
				uni.setStorage({
					key: 'crumbs',
					data: that.chooseResult,
					success() {
						uni.switchTab({
							url: '/pages/index/index'
						})
					}
				})
				
			}
		}
	}
</script>

<style lang="scss">
	@import "../../static/scss/professional.scss"
</style>
