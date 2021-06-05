<template>
	<view class="container">
		<view class="tablist">
			<view class="tabItem" v-for="(item,index) in tabList" :key="index" @tap="tabClick(index,item)">
				<span :class="{'active':index==currentActive}">
					{{item.text}}
				</span>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "tabBars",
		props: {
			tabList: {
				type: Array,
				default: function() {
					return []
				}
			}
		},
		data() {
			return {
				currentActive: 0
			};
		},
		methods: {
			tabClick(index, item) {
				this.currentActive = index
				this.$emit('change', item)
			}
		}
	}
</script>

<style lang="scss">
	.container {
		width: 100%;
		position: fixed;
		height: 72upx;
		z-index: 10;
		background-color: #fff;
		// // 条件编译 设置离顶部的高度
		// /*  #ifdef  APP-PLUS  */
		// top: var(--status-bar-height);
		// /*  #endif  */
		// /* */ 
		.tablist {
		display: flex;
			.tabItem {
				flex: 1;
				height: 72upx;
				text-align: center;
				font-size: 30upx;
				margin-top: 6upx;

				.active {
					border-bottom: 6upx solid #DD524D;
					padding: 0upx 24upx 12upx 24upx;
				}
			}
		}
	}
</style>
