<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar 
			:is-arrow="true" 
			title="练题设置" 
			text-align="center"
		/>
		<!-- 导航栏 end -->
		<view class="pattern-filter">
			<!-- 模式 start -->
			<view class="pattern">
				<view class="title-content">
					<title name="做题模式" />
					<view class="content">
						答案直接显示
					</view>
				</view>
				<view class="item-area">
					<view 
						class="item" 
						v-for="item in pattern.list" 
						:key="item.id"
					>
						<view 
							class="inner"
							:class="{'active': item.id === pattern.current}"
							@click="handlePattern(item.id)"
						>
							{{ item.name }}
						</view>
					</view>
				</view>
			</view>
			<!-- 模式 end -->
			<!-- 题型 start -->
			<view class="filter">
				<view class="title-content">
					<title name="题型筛选" />
				</view>
				<view class="item-area">
					<view 
						class="item" 
						v-for="item in filter.list" 
						:key="item.id"
					>
						<view 
							class="inner"
							:class="{'active': item.id === filter.current}"
							@click="handleFilter(item.id)"
						>
							{{ item.name }}
						</view>
					</view>
				</view>
			</view>
			<!-- 题型 end -->
		</view>
		<!-- 按钮 start -->
		<view class="button-area" @click="handleBtn">
			<u-button text="恢复默认设置" />
		</view>
		<!-- 按钮 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import uButton from '@/components/u-button/uButton.vue'
	import Title from '@/components/title/Title.vue'
	export default {
		name: 'TopicsSet',
		components: {
			XesNavbar,
			Title,
			uButton
		},
		data() {
			return {
				pattern: {
					list: [{
						id: 0,
						name: '练习模式'
					}, {
						id: 1,
						name: '考试模式'
					}, {
						id: 2,
						name: '自学模式'
					}],
					current: 0
				},
				filter: {
					list: [{
						id: 0,
						name: '全部题型'
					}, {
						id: 1,
						name: '单选题'
					}, {
						id: 2,
						name: '多选题'
					}, {
						id: 3,
						name: '判断题'
					}, {
						id: 4,
						name: '主观题'
					}],
					current: 0
				}
			}
		},
		onLoad() {
			const pattern = uni.getStorageSync('pattern')
			const filter = uni.getStorageSync('filter')
			// 模式
			switch (pattern) {
				case 'exercise': 
					this.pattern.current = 0
					break
				case 'exam':
					this.pattern.current = 1
					break
				case 'self-study':
					this.pattern.current = 2
					break
				default:
					this.pattern.current = 0
					break
			}
			// 题型
			this.filter.current = filter
		},
		methods: {
			handlePattern(id) {
				let pattern = 'exercise'
				const i = this.pattern.current = id
				i === 0 ? pattern = 'exercise' : i === 1 ? pattern = 'exam' : pattern = 'self-study'
				uni.setStorageSync('pattern', pattern)
			},
			handleFilter(id) {
				this.filter.current = id
				uni.setStorageSync('filter', id)
			},
			handleBtn() {
				this.pattern.current = 0
				this.filter.current = 0
				uni.setStorageSync('pattern', 'exercise')
				uni.setStorageSync('filter', 0)
			}
		}
	}
</script>

<style lang="scss">
	.pattern-filter {
		border-top: 1px solid #dedede;
		padding: 0 32upx;
		
		.pattern, .filter {
			margin-top: 80upx;
			
			.title-content {
				display: flex;
				align-items: center;
				justify-content: space-between;
				
				.content {
					font-size: 28upx;
					font-weight: 500;
					color: #90949A;
				}
			}
			
			.item-area {
				display: flex;
				flex-wrap: wrap;
				margin-top: 40upx;
				
				.item {
					width: 33.3333%;
					margin-bottom: 32upx;
					
					.inner {
						width: 206upx;
						height: 64upx;
						text-align: center;
						line-height: 64upx;
						box-sizing: border-box;
						margin: 0 auto;
						border: 2upx solid #DEDEDE;
						border-radius: 10upx;
						font-size: 28upx;
						font-weight: 500;
						color: #303234;
						
						&.active {
							background-color: rgba(18, 132, 255, .2);
							border: 2upx solid rgba(18, 132, 255, .2);
							color: #1384FF;
						}
					}
				}
			}
		}
		
		.filter {
			margin-top: 48upx;
		}
	}
	
	.button-area {
		width: 100%;
		padding: 0 32upx;
		position: absolute;
		left: 0;
		bottom: 60upx;
		box-sizing: border-box;
	}
</style>
