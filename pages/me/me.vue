<template>
	<view class="contaier">
		<view class="contaier-inner">
			<xes-navbar title="我的" :margin="32" />
			<!-- 卡片信息 start -->
			<view class="info-card">
				<view class="info">
					<image class="avatar" src="" mode=""></image>
					<view class="username-mobile">
						<view class="username">
							青青子衿-0815
						</view>
						<view class="mobile">
							188****2365
						</view>
					</view>
				</view>
				<view class="tips">
					签到领福利
				</view>
				<view class="content">
					<view class="item">
						<view class="number">
							25
						</view>
						<view class="text">
							卡包
						</view>
					</view>
					<view class="line"></view>
					<view class="item">
						<view class="number">
							628
						</view>
						<view class="text">
							学币
						</view>
					</view>
					<view class="line"></view>
					<view class="item">
						<view class="number">
							221
						</view>
						<view class="text">
							积分
						</view>
					</view>
				</view>
			</view>
			<!-- 卡片信息 end -->
			<!-- 我的学习 start -->
			<view class="me-study">
				<title name="我的学习" />
				<view class="box">
					<view class="item">
						<image class="icon" src="/static/image/me/banzhuren@2x.png" mode=""></image>
						<view class="text">我的班主任</view>
					</view>
					<view class="item">
						<image class="icon" src="/static/image/me/ai@2x.png" mode=""></image>
						<view class="text">AI智能评估</view>
					</view>
					<view class="item">
						<image class="icon" src="/static/image/me/wodekecheng@2x.png" mode=""></image>
						<view class="text">我的课程</view>
					</view>
					<view class="item">
						<image class="icon" src="/static/image/me/xuexijilu@2x.png" mode=""></image>
						<view class="text">学习记录</view>
					</view>
				</view>
			</view>
			<!-- 我的学习 end -->
			<!-- 我的学籍 start -->
			<view class="me-status">
				<title name="我的学籍" />
				<view class="box">
					<image class="amend" src="/static/image/me/xiugai@2x.png" mode=""></image>
					<view class="university">
						<image class="logo" src="" mode=""></image>
						<view class="info">
							<view class="name">
								[2021级] 南昌大学
							</view>
							<view class="item">
								专业：工商企业管理 [本科]                       
							</view>
							<view class="item">
								状态：意向学员
							</view>
							<view class="item">
								类型：2021级筑梦计划2  
							</view>
						</view>
					</view>
					<view class="button-group">
						<button class="button-1" type="default">成绩单</button>
						<button class="button-2" type="default">去学习</button>
						<button class="button-3" type="default">去缴费</button>
					</view>
				</view>
			</view>
			<!-- 我的学籍 end -->
			<!-- 列表1 start -->
			<view class="list">
				<list-item
					icon="/static/image/me/wodedingdan@2x.png"
					name="我的订单"
				/>
				<list-item
					icon="/static/image/me/wodewenda@2x.png"
					name="我的问答"
				/>
				<!-- <list-item
					icon="/static/image/me/wodehuancun@2x.png"
					name="我的缓存"
				/> -->
				<list-item
					icon="/static/image/me/wodeshoucang@2x.png"
					name="我的收藏"
				/>
				<list-item
					icon="/static/image/me/jifenshangcheng@2x.png"
					name="积分商城"
					:is-border="false"
				/>
			</view>
			<!-- 列表1 end -->
			<!-- 列表2 start -->
			<view class="list">
				<list-item
					icon="/static/image/me/bangzhuyufankuio@2x.png"
					name="帮助与反馈"
				/>
				<list-item
					icon="/static/image/me/guanyuwomen@2x.png"
					name="关于我们"
				/>
				<list-item
					icon="/static/image/me/duihuanma@2x.png"
					name="兑换码核销"
					:is-border="false"
				/>
			</view>
			<!-- 列表2 end -->
			<!-- 列表3 start -->
			<view class="list">
				<list-item
					icon="/static/image/me/xiaoxi@2x.png"
					name="消息"
				/>
				<list-item
					icon="/static/image/me/shezhi@2x.png"
					name="设置"
					:is-border="false"
				/>
			</view>
			<!-- 列表3 end -->
		</view>
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import Title from '@/components/title/Title.vue'
	import ListItem from '@/components/list-item/list-item.vue'
	export default {
		name: 'Me',
		components: {
			XesNavbar,
			Title,
			ListItem
		},
		data() {
			return {}
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/me.scss'
</style>
