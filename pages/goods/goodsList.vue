<template>
	<view class="goodsList">
		<tab-bars :tabList="filterByList" @change="handelChange"></tab-bars>
		<view class="place"></view>
		<!-- 商品列表 -->
		<view class="goods-list">
			<view class="product-list">
				<view class="product" @tap="handleGoods(goods)" v-for="goods in goodsList" :key="goods.goods_id">
					<image mode="widthFix" :src="goods.img"></image>
					<view class="name">{{goods.name}}}</view>
					<view class="info">
						<view class="price">
							<text>￥</text>
							{{goods.price}}
						</view>
						<view class="slogan">{{goods.slogan}} <text>人付款</text></view>
					</view>
				</view>
			</view>
			<view class="loading-text">{{loadingText}}</view>
		</view>
	</view>
</template>
<script>
	import tabBars from "../../components/tabBars.vue"
	export default {
		data() {
			return {
				loadingText: '加载中',
				page: 1,
				size: 6,
				filterby: 'all',
				filterByList: [{
						text: "全部",
						filterby: "all"
					},
					{
						text: "口碑",
						filterby: "public"
					},
					{
						text: "热门",
						filterby: "hot"
					}
				],
				goodsList: []
			}
		},
		components: {
			tabBars
		},
		methods: {
			loadData() {
				this.api.getGoodsList({
					page: this.page,
					size: this.size,
					filterby: this.filterby
				}).then((res) => {
					if (res.data.data.length) {
						res.data.data.forEach(item => {
							this.goodsList.push(item);
						})
					} else {
						this.loadingText = '到底了'
					}

				})
			},
			handelChange(item) {
				this.loadingText = "加载中...";
				this.page = 1;
				this.goodsList = [];
				this.filterby = item.filterby
				this.loadData()
			},
			handleGoods(goods) {
				uni.navigateTo({
					url:"./goods?item="+JSON.stringify(goods)
				})
				// console.log(goods)
			}
		},
		onLoad(options) {
			uni.setNavigationBarTitle({
				title: options.name
			})
			this.loadData()
		},
		onPullDownRefresh() {
			this.loadingText = "加载中...";
			this.page = 1;
			this.goodsList = [];
			this.loadData()
		},
		onReachBottom() { //上啦加载更多
			this.page++;
			this.loadData()
		}
	}
</script>
<style lang="scss">
	.goods-list {
		.loading-text {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 60upx;
			color: #979797;
			font-size: 24upx;
		}

		.product-list {
			/* 瀑瀑流 */
			width: 92%;
			padding: 0 4% 3vw 4%;
			column-count: 2;
			/* 设置列数 */
			column-gap: 1em;
			/* 设置间距 */

			.product {
				break-inside: avoid;
				/*  这是为了控制文本块分解成单独的列，以免项目列表的内容跨列，破坏整体的布局。*/
				border-radius: 20upx;
				background-color: #fff;
				margin: 0 0 15upx 0;
				box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.1);

				image {
					width: 100%;
					border-radius: 20upx 20upx 0 0;
				}

				.name {
					width: 92%;
					padding: 6upx 4%;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					text-align: justify;
					overflow: hidden;
					font-size: 30upx;
				}

				.info {
					display: flex;
					justify-content: space-between;
					align-items: flex-end;
					width: 92%;
					padding: 10upx 4% 10upx 4%;

					.price {
						color: #e65339;
						font-size: 30upx;
						font-weight: 600;
					}

					.slogan {
						color: #807c87;
						font-size: 24upx;
					}
				}
			}

		}
	}

	.place {
		background-color: #fff;
		height: 80upx;
	}
</style>
