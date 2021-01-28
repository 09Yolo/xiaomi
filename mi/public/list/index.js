$('.sort ').click(function(){
	$(this).addClass('sort-sty');
	$(this).siblings().removeClass('sort-sty');
});

// 点击更换布局
$('.layout i').on('click', function() {
	$('.show').toggleClass("icon-list1 icon-list2");
	$('.shop-shop').toggleClass("shop-information shop-infor");
});
$('.price').on('click', function() {
		location.href = "/list/index.html";
	})
	

// 渲染商品
// var num = 0;
// var flag = true;
// function slip(amount){
	$.ajax({
	url: "/product/list",
	type: "post",
	headers: {
		"Content-Type": "application/json"
	},
	data: JSON.stringify({
		"name": "",
		"cid": 17,
		"orderCol": "price",
		"orderDir": "asc",
		"begin": 0,
		"pageSize": 17
	}),
	success: function(result) {
		if (result.code === 200) {
			result.data.forEach(function(item) {
				$(
					`
					<div class="shop-information  shop-shop" data-id = "${item.id}">
						<div class="shop-img img-shop">
							<img src="${item.avatar}" >
						</div>
						<div class="shop-right shop-below">
							<p class="shop-name">${item.name}</p>
							<p class="shop-highlights">${item.brief}</p>
							<p class="shop-price">
								<span>￥</span>${item.price}
							</p>
							<p class="shop-discuss">
								<span>销量：</span>${item.sale}
							<span>|</span> ${item.rate}
								<span>好评</span>
							</p>
						</div>
					</div>
					`
				).appendTo('.list-wrapper')
			});
		}
	}
});
// }
// slip(num)
	


// 排序按钮
var list = "asc";
var category = "price"
$('.rate, .price, .sale').on('click', function(){
	category = $(this).data("d")
})
$('.icon-asc, .icon-desc ').on('click', function() {
	$('.icon-asc, .icon-desc').toggleClass("sort-show");
	list = $(this).data("t");
	// 清空列表
	$(".list-wrapper").empty(),
		// 价格排序
			$.ajax({
			url: "/product/list",
			type: "post",
			headers: {
				"Content-Type": "application/json"
			},
			data: JSON.stringify({
				"name": "",
				"cid": 17,
				"orderCol": category,
				"orderDir": list,
				"begin": 0,
				"pageSize": 17
			}),
			success: function(result) {
				if (result.code === 200) {
					result.data.forEach(function(item) {
						$(
							`
						<div class="shop-information  shop-shop" data-id = "${item.id}">
							<div class="shop-img img-shop">
								<img src="${item.avatar}" >
							</div>
							<div class="shop-right shop-below">
								<p class="shop-name">${item.name}</p>
								<p class="shop-highlights">${item.brief}</p>
								<p class="shop-price">
									<span>￥</span>${item.price}
								</p>
								<p class="shop-discuss">
									<span>销量：</span>${item.sale}
								<span>|</span> ${item.rate}
									<span>好评</span>
								</p>
							</div>
						</div>
						`
						).appendTo('.list-wrapper')
					});
				}
			}
		});
});
// 销量排序
$('.sale p ').on('click', function() {
	$(".list-wrapper").empty(),
	$.ajax({
		url: "/product/list",
		type: "post",
		headers: {
			"Content-Type": "application/json"
		},
		data: JSON.stringify({
			"name": "",
			"cid": 17,
			"orderCol": "sale",
			"orderDir": list,
			"begin": 0,
			"pageSize": 17
		}),
		success: function(result) {
			if (result.code === 200) {
				result.data.forEach(function(item) {
					$(
						`
					<div class="shop-information  shop-shop" data-id = "${item.id}">
						<div class="shop-img img-shop">
							<img src="${item.avatar}" >
						</div>
						<div class="shop-right shop-below">
							<p class="shop-name">${item.name}</p>
							<p class="shop-highlights">${item.brief}</p>
							<p class="shop-price">
								<span>￥</span>${item.price}
							</p>
							<p class="shop-discuss">
								<span>销量：</span>${item.sale}
							<span>|</span> ${item.rate}
								<span>好评</span>
							</p>
						</div>
					</div>
					`
					).appendTo('.list-wrapper')
				});
			}
		}
	});
});
// 评价排序
$('.rate p ').on('click', function() {
	$(".list-wrapper").empty(),
	$.ajax({
		url: "/product/list",
		type: "post",
		headers: {
			"Content-Type": "application/json"
		},
		data: JSON.stringify({
			"name": "",
			"cid": 17,
			"orderCol": "rate",
			"orderDir": list,
			"begin": 0,
			"pageSize": 17
		}),
		success: function(result) {
			if (result.code === 200) {
				result.data.forEach(function(item) {
					$(
						`
					<div class="shop-information  shop-shop" data-id = "${item.id}">
						<div class="shop-img img-shop">
							<img src="${item.avatar}" >
						</div>
						<div class="shop-right shop-below">
							<p class="shop-name">${item.name}</p>
							<p class="shop-highlights">${item.brief}</p>
							<p class="shop-price">
								<span>￥</span>${item.price}
							</p>
							<p class="shop-discuss">
								<span>销量：</span>${item.sale}
							<span>|</span> ${item.rate}
								<span>好评</span>
							</p>
						</div>
					</div>
					`
					).appendTo('.list-wrapper')
				});
			}
		}
	});
});
// 下拉加载更多
// $('.shop-wrap').scroll(function() {
// 	if (flag == false) {
// 		return;
// 	}
// 	var List = $('.list-content').outerHeight();
// 	var Cl = $('.list-wrapper').outerHeight();
// 	var height = eval(Cl - List);
// 	if ($(this).scrollTop() > height) {
// 		num +=6;
// 		slip(num);
// 	}
// })

// 跳转详情页
$('.shop-wrap ').on('click', ".shop-shop", function() {
	window.location.href = "/details/index.html?id=" + $(this).data("id");
});
