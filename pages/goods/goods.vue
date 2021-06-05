<template>
	<view class="content">
		<!-- 状态栏 -->
		<page-status></page-status>
		<uni-nav-bar fixed="true" backgroundColor="transparent">
			<view v-if="isShow" class="icon iconfont barLeft" slot="left" @tap="back">
				&#xe679;</view>
			<view class="icon iconfont barRight" slot="right">
				&#xe6af;</view>
		</uni-nav-bar>
		<view class="swiper">
			<swiper circular="true" autoplay="true" @change="swiperChange" v-if="swiperList.length>1">
				<swiper-item v-for="item in swiperList" :key="item.id">
					<image :src="item.img" mode=""></image>
				</swiper-item>
			</swiper>
			<view class="indicator">
				{{indicatorLength}}/{{swiperList.length}}
			</view>
		</view>
	</view>

</template>

<script>
	import uniNavBar from '@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue'
	export default {
		name: "Goods",
		components: {
			uniNavBar
		},
		data() {
			return {
				goods: [],
				isShow: true,
				comment: [],
				descriptionStr: '',
				spec: [],
				swiperList: [],
				indicatorLength: 0
			}
		},
		methods: {
			swiperChange(e) {
				this.indicatorLength = e.detail.current
			},
			back() {
				uni.navigateTo({
					url: './goodsList'
				})
				// uni.navigateBack()
			},
			getGoodsList() {
				this.api.getGoods().then(res => {
					let {
						comment,
						descriptionStr,
						spec,
						swiperList
					} = res.data && res.data.data
					this.comment = comment
					this.descriptionStr = descriptionStr
					this.spec = spec
					this.swiperList = swiperList
					console.log(res.data.data)
				})
			}
		},
		onLoad(options) {
			// #ifdef MP
			this.isShow = false;
			// #endif
			if (!options.item) return
			this.goods = JSON.parse(options.item)
			console.log(this.goods)
			this.getGoodsList()
		}
	}
</script>

<style lang="scss">
	::v-deep .uni-navbar--border {
		border: 0 !important;
	}

	::v-deep .uni-navbar {
		position: fixed !important;
		z-index: 11;
	}

	.barLeft,
	.barRight {
		width: 60upx;
		height: 60upx;
		color: #fff;
		background-color: rgba(0, 0, 0, 0.2);
		border-radius: 100%;
		line-height: 30px;
		text-align: center;
	}

	.barLeft {
		// // #ifdef MP  mp代表所有小程序端
		// opacity: 0;
		// // #endif
	}

	.swiper {
		height: 485upx;
		position: relative;

		image {
			width: 100%;
		}

		.indicator {
			position: absolute;
			font-size: 24upx;
			width: 70upx;
			height: 40upx;
			line-height: 40upx;
			text-align: center;
			border-radius: 25%;
			right: 30upx;
			bottom: 30upx;
			color: #fff;
			background-color: rgba(0, 0, 0, 0.2);
		}
	}
</style>
