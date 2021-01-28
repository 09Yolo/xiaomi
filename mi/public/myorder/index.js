$('.content-head li').click(function() {
	$(this).addClass('active');
	$(this).siblings().removeClass('active');
});

// 获取所有订单信息
function obtain(infor) {
	$.myAjax({
		url: infor,
		success: function(data) {
			data.forEach(function(item, index) {
				var record;
				if (item.pay == 1) {
					record = '已购买';
				} else {
					record = '未支付';
				}
				$(
					`
			<div class="order-content">
			<div class="list-top">
				<span class="mi"><img src="m.png" ></span>
				<span class="mi-word">小米自营</span>
				<span class = "againBuy againBuy-sty${item.pay}" >${record}</span>
			</div>
			
			 <div class="list-cont-list"></div>
			
			
			
			<div class="list-cont2">
				<span>共<i class = "goods-count"></i>件商品，总金额<p class="goods-price">￥${item.account}.00</p></span>
			</div>
			<div class="list-foot">
				<span class="delOrder">删除订单</span>
				<p>再次购买</p>
			</div>
			`
				).appendTo('.order-wrap')
				var sum = 0;
				item.details.forEach(function(item) {
					sum += item.count
					$(
						`<div class="list-cont">
				<div class="cont-left">
					<img src="${item.avatar}" >
				</div>
				<div class="cont-right">
					<p class="goods-name">${item.name}</p>
					<span class="unitPrice">￥${item.price}.00 <p class="goods-num"> &nbsp &nbsp &nbsp &nbsp &nbsp x${item.count}</p></span>
					
				</div>
			</div>`
					).appendTo(`.list-cont-list:eq(${index})`);
				});
				$('.goods-count').eq(index).text(sum);
			})
		}
	});
};
obtain($('.content-head').find('li').eq(0).data('id'));
$('.content-head li').on('click', function() {
	$('.order-wrap').empty();
	var form = $(this).data('id');
	$(this).find('.againBuy').addClass('againBuy-sty').remove('againBuy-sty');
	obtain(form)
});



// 删除订单
$(document).on('click', '.delOrder', function() {
	var Id = $(this).parents('.order-content').data('orderid');
	$.myAjax({
		url: `/order/remove/` + Id,
		success: function(data) {
			layer.open({
				content: '删除成功',
				skin: 'msg',
				time: 2
			});
		},
		$(this).parents('.order-content').remove();
	});
});
