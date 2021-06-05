const baseUrl = "https://uniapp-interface.herokuapp.com/"
module.exports = (obj) => {
	let {
		methods,
		header,
		url,
		data
	} = obj
	return new Promise((res, err) => {
		uni.showLoading({
			title: "加载中..."
		})
		uni.request({
			url: baseUrl + url,
			method: methods || 'get',
			header: header || {
				"content-type": "application/x-www-form-urlencoded"
			},
			success: result => {
				if (result.statusCode !== 200) {
					uni.showModal({
						content: result.msg || result.errMsg
					})
					err(result.msg || result.errMsg)
				}
				res(result)
			},
			fail: err => {
				uni.showModal({
					content: result.msg || result.errMsg
				})
				err(err.msg || err.errMsg)
			},
			data: data || {},
			complete: () => {
				uni.hideLoading();
				uni.stopPullDownRefresh();
			}
		})
	})
}
// module.exports = { 导出多个
// 	request
// }
