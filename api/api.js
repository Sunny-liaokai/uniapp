import request from "../natwork/index.js";
let getMallData = function() {
	return request({
		url: "api/profiles/mall_list",
		methods: "get"
	})
}
let getCategory = function() {
	return request({
		url: "api/profiles/category",
		methods: "get"
	})
}
let getGoodsList = function(params) {
	let {filterby,page,size}=params
	return request({
		url:`api/profiles/goodslist/${filterby}/${page}/${size}` ,
		methods: "get"
	})
} 
let getGoods = function() {
	return request({
		url:`api/profiles/goods` ,
		methods: "get"
	})
}
module.exports = {
	getMallData,
	getCategory,
	getGoodsList,
	getGoods
}
