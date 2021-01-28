// 返回页面
$('.icon-left-arrow').on('click', function() {
	history.back()
});
// 弹窗
$('.receiving-information').on('click', function() {
	$('.cover').show();
	$('.cover').stop(true).animate({
		top: '0'
	}, 200, function() {
		$('.popup').delay(1).animate({
			opacity: 1
		})
	});
});
$('.close-img').on('click', function() {
	$('.cover').hide()
});



// 渲染地址
$.ajax({
	url: "/address/list",
	type: "get",
	headers: {
		"Authorization": sessionStorage.getItem("token"),
	},
	success: function(result) {
		if (result.code === 200) {
			result.data.forEach(function(item) {
				if (item.isDefault == 1) {
					$(
						`
							<div class="content-address" data-id=${item.id} data-isDefault=${item.isDefault}>
							<div class="infor-address">
								<ul>
									<li><input type="radio" name="choice" class="address-select" checked/></li>
									<li class="address-name"><span>${item.receiveName}</span><p class="default-address">默认</p></li>
									<li class ="address-phone">${item.receivePhone}</li>
								</ul>
								<div class="address-detailed">${item.receiveRegion} ${item.receiveDetail}</div>
							</div>
							<div class="img-modify">
								<a href="/address/index.html"><img src="修改.png" ></a>
							</div>
						</div>
					`
					).appendTo('.popup-content')

				} else {
					$(
						`
							<div class="content-address" data-id=${item.id} data-isDefault=${item.isDefault}>
								<div class="infor-address">
									<ul>
										<li><input type="radio" name="choice" class="address-select" /></li>
										<li class="address-name"><span>${item.receiveName}</span></li>
										<li class ="address-phone">${item.receivePhone}</li>
									</ul>
									<div class="address-detailed">${item.receiveRegion} ${item.receiveDetail}</div>
								</div>
								<div class="img-modify">
									<a href="/address/index.html"><img src="修改.png" ></a>
								</div>
							</div>
					`
					).appendTo('.popup-content')
				}

			})
		}
	}
});


// 获取购物信息
var order = sessionStorage.getItem("order").split(",");
$.ajax({
	url: "/cart/list_ids",
	type: "post",
	headers: {
		"Authorization": sessionStorage.getItem("token"),
		"Content-Type": "application/json"
	},
	data: JSON.stringify({
		"ids": order
	}),
	success: function(result) {
		if (result.code === 200) {
			var totPrice = 0;
			result.data.forEach(function(item) {
				$(
					`<ul class="list-cont" data-id=${item.id}>
						<li class="cont-img">
							<img src="${item.avatar}" >
						</li>
						<li class="cont-right">
							<span class="specialOffer">特价</span>
							<p class="shop-name">${item.name}</p>
							<div class="price-wrap" >
							<span class="shop-price">￥<p class="price">${item.price}</p></span>
							<span class="shop-number">×${item.count}</span>
							</div>
							<span class="return-goods">七天无理由退货</span>
						</li> 
					</ul>`
				).appendTo('.goods-wrap');
				totPrice += item.price * item.count;
			})
			$('.class-price').text(totPrice);
			$('.all-price').text(totPrice);
		}
	}
});


// 获取订单信息
$.ajax({
	url: "/address/get_default",
	type: "get",
	headers: {
		"Authorization": sessionStorage.getItem("token"),
	},
	success: function(result) {
		if (result.code === 200) {
			$('.receiving-information').attr('data-id', result.data.id);
			$('.consignee').text(result.data.receiveName);
			$('.phone').text(result.data.receivePhone);
			$('.consignee-address').text(result.data.receiveRegion)
		}
	}
});
$('.popup-content').on('click', 'li', function(e) {
	var Id = $(this).parent().data('id');
	$('.receiving-information').attr('data-id', Id);
	$('.consignee').text($(this).parent().find('.address-name span').text());
	$('.phone').text($(this).parent().find('.address-phone').text());
	$('.consignee-address').text($(this).parent().parent().find('.address-detailed').text());
})

// 提交订单
$('.settlement-order').on('click', function() {
			$.ajax({
				url: "/order/confirm",
				type: "post",
				headers: {
					"Authorization": sessionStorage.getItem("token"),
					"Content-Type": "application/json"
				},
				data: JSON.stringify({
					"ids": order,
					"account": parseInt($('.all-price').text()),
					"addressId": $('.receiving-information').data('id')
				}),
				success: function(result) {
					if (result.code === 200) {
						location.href = '/payment/index.html?orderIds=' + result.data;
					}
				}
			});
			});
