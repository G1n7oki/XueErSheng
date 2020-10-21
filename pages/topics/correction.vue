<template>
	<view class="contaier">
		<!-- 导航栏 start -->
		<xes-navbar 
			title="题目纠错"
			text-align="center"
			:is-arrow="true"
		/>
		<!-- 导航栏 end -->
		<!-- 选项 start -->
		<view class="checkbox-group">
			<checkbox-group @change="checkboxChange">
				<label 
					v-for="item in items"
					:key="item.id"
				>
					<checkbox :value="item.value" />{{ item.name }}
				</label>
			</checkbox-group>
		</view>
		<!-- 选项 end -->
		<!-- 多行输入框 start -->
		<textarea 
			class="textarea"
			v-model="text"
			placeholder="请简述您找的错误，以及正确答案或解析。"
			:maxlength="-1"
		/>
		<!-- 多行输入框 end -->
		<!-- 按钮 start -->
		<view class="confirm" @click="confirm">
			<u-button text="确定" />
		</view>
		<!-- 按钮 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import uButton from '@/components/u-button/uButton.vue'
	export default {
		name: 'Correction',
		components: {
			XesNavbar,
			uButton
		},
		data() {
			return {
				items: [{
					id: 0,
					value: '答案有问题',
					name: '答案有问题'
				}, {
					id: 1,
					value: '答案与解析不符',
					name: '答案与解析不符'
				}, {
					id: 2,
					value: '有错别字',
					name: '有错别字'
				}, {
					id: 3,
					value: '选项有问题',
					name: '选项有问题'
				}, {
					id: 4,
					value: '其他',
					name: '其他'
				}], // 多选框数据
				value: [], // 多选框选择后的内容
				text: '' // 多行输入框文本
			}
		},
		methods: {
			checkboxChange(e) {
				console.log(e)
				this.value = e.detail.value
			},
			confirm() {
				console.log(this.value)
				console.log(this.text)
			}
		}
	}
</script>

<style lang="scss">
	.checkbox-group {
		padding-left: 32upx;
		margin-top: 64upx;
		
		label {
			display: flex;
			align-items: center;
			margin-bottom: 65upx;
			font-size: 28upx;
			font-weight: 500;
			color: #454545;
		}
	}
	// checkbox 选项框大小
	wx-checkbox .wx-checkbox-input{ 
		width: 32upx !important; 
		height: 32upx !important; 
	}
	// checkbox选中后样式
	wx-checkbox .wx-checkbox-input.wx-checkbox-input-checked{ 
		background-color: #007AFF; 
		border-color: #007AFF;
	}
	// checkbox选中后图标样式
	wx-checkbox .wx-checkbox-input.wx-checkbox-input-checked::before{
		width: 20upx;
		height: 20upx;  
		line-height: 20upx;
		text-align: center;
		font-size: 18upx;
		color: #fff;
		background: transparent;
		transform: translate(-50%, -50%) scale(1);
		-webkit-transform: translate(-50%, -50%) scale(1);
	}
	// 多行输入框
	.textarea {
		display: block;
		width: 686upx;
		box-sizing: border-box;
		font-size: 28upx;
		margin: 0 auto;
	}
	
	.confirm {
		width: 686upx;
		margin: 0 auto;
	}
</style>
