<template>
	<view class="status">
		
	</view>
</template>

<script>
	export default {
		name:"status",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.status{
		width: 100%;
		position: fixed;
		z-index: 10;
		background-color: #fff;
		top: 0;
		height: 0;
		/* #ifdef APP-PLUS */
		height: val(--status-bar-height);
		/* #endif*/
	}
</style>
