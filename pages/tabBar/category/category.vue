<template>
	<view class="content">
		<page-status></page-status>
		<page-header></page-header>
		<view class="category-list">
			<scroll-view scroll-y="true" class="scrollLeft">
				<view :class="[{'active':index==currentActive},'row']" v-for="(item,index) in CategoryList" :key="index"
					@tap="handleCategory(index)">
					<view class="text">
						<view class="block"></view>
						{{item.title}}
					</view>
				</view>
			</scroll-view>
			<scroll-view scroll-y="true" class="scrollRight">
				<view class="category" v-for="(key,index) in CategoryList" :key="key.id" v-show="index==currentActive">
					<view class="banner">
						<image :src="key.banner"></image>
					</view>
					<view class="list">
						<view @tap="handleCategoryList(item)" class="box" v-for="(item,i) in key.list" :key="i">
							<image :src="'/static/img/category/list/' + item.img"></image>
							<view class="text">{{item.name}}</view>
						</view>
					</view>
				</view>
			</scroll-view>

		</view>

	</view>
</template>

<script>
	import pageHeader from '../../../components/pageHeader.vue'
	export default {
		components: {
			pageHeader
		},
		data() {
			return {
				CategoryList: [],
				currentActive: 0
			}
		},
		onLoad() {
			this.api.getCategory().then((res) => {
				this.CategoryList = res.data.data
			})
		},
		methods: {
			handleCategory(index) {
				// console.log(index)
				this.currentActive = index
			},
			handleCategoryList(item) {
				// console.log(item.name);
				uni.navigateTo({
					url: "../../goods/goodsList?name=" + item.name
				})
			},
		}

	}
</script>

<style lang="scss">
	.content {
		width: 100%;

		.category-list {
			display: flex;

			.scrollLeft {
				width: 24%;
				background-color: #f2f2f2;

				.row {
					width: 100%;
					height: 90upx;
					display: flex;
					justify-content: center;
					color: #3c3c3c;
					align-items: center;

					.text {
						width: 100%;
						height: 100%;
						position: relative;
						display: flex;
						justify-content: center;
						align-items: center;
						// line-height: 100%;
						font-size: 28upx;
						color: #3c3c3c;
						text-align: center;

						.block {
							position: absolute;
							width: 0upx;
							left: 0;
						}
					}
				}

				.active {
					background-color: #fff;

					.text {
						font-size: 30upx;
						font-weight: 600;
						color: #2d2d2d;

						.block {
							width: 10upx;
							height: 30upx;
							top: 35upx;
							background-color: #f06c7a;
						}
					}
				}
			}

			.scrollRight {
				width: 76%;
				box-sizing: border-box;
				padding: 10upx;
				.banner {
					width: 100%;
					height: 28vw;
					border-radius: 10upx;
					overflow: hidden;
					box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.3);
					image {
						width: 100%;
						height: 100%;
					}
				}

				.list {
					width: 100%;
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;
					margin-top: 30upx;
					.box {
						width:calc(71.44vw/3);
						display: flex;
						flex-direction: column;
						align-items: center;
						margin-bottom: 30upx;
						image {
							width: 60%;
							height: calc(71.44vw / 3 * 0.6);
						}

						.text {
							margin-top: 5upx;
							width: 100%;
							display: flex;
							justify-content: center;
							font-size: 26upx;
						}
					}
				}
			}
		}
	}
</style>
