$('.icon-left-arrow').on('click',function(){
	history.back()
});

// 编辑点击
$('.btn-edit').on('click',function(){
	$('.edit, .finish').toggleClass("show");
})
// 渲染加入购物车
$.ajax({
	url: "/cart/list",
	type: "post",
	headers: {
		"Content-Type": "application/json",
		"Authorization": sessionStorage.getItem("token")
	},
	success: function(result) {
		if (result.code === 200) {
			result.data.forEach(function(item) {
				$(
					`
					<div class="goods-list" data-id = ${item.id}>
						<div class="list-top">
							<span>小米自营</span>
							<p>已免运费</p>
						</div>
						<ul class="list-cont">
							<li><input type="checkbox" class="choice-box" checked="checked"/></li>
							<li class="cont-img">
								<img src="${item.avatar}" >
							</li>
							<li class="cont-right">
							<div>
							<span class="specialOffer">特价</span>
							<p class="shop-name">${item.name}</p>
							</div>
							<div class="price-wrap">
							<span class="shop-price">￥<p class="price">${item.price}</p></span>
							<div class="shuliang">
							<a class="reduce">-</a>
							<input type="text" class="shuliang_number" value="1"/>
							<a class="add">+</a>
							<span style="">件</span>
							</div>
							</li>
						</div>
								
						</ul>
					</div>
					`
				).appendTo('.page-content')
			});
				TotalPrice();
		}
	}
});


// 件数加减
$(".page-content").on("click", ".reduce", function() {
	var i = $(this).siblings('.shuliang_number').val();
	if (i == 1) {
		return false;
	}
	i--;
	$(this).siblings('.shuliang_number').val(i);
	TotalPrice();
});
$(".page-content").on("click", ".add", function() {
	var i = $(this).siblings('.shuliang_number').val();
	if (i == 5) {
		return false;
	}
	i++;
	$(this).siblings('.shuliang_number').val(i)
	TotalPrice();
});

var numb = 0;
//单个商品的复选框点击事件
$(".page-content").on("click", ".choice-box", function() {
	//可以获取当前元素在class的index
	var index = $('.choice-box').index(this);
	if (this.checked) {
		numb++;
	} else {
		numb--;
	}
	//当全选泽时，全选框的状态改为true
	if (numb == $('.choice-box').length) {
		$('.select').prop('checked', true);
	} else {
		$('.select').prop('checked', false);
	}
	TotalPrice();
});
//全选的复选框点击事件
$(".select").on('click',function(){
	if (this.checked) {
		$('.choice-box').prop('checked', true);
	} else {
		$('.choice-box').prop('checked', false);
	}
	TotalPrice();
});

// 计算总价
function TotalPrice() {
	var tot = 0;
	for (var a = 0; a < $('.goods-list').length; a++) {
		if ($('.choice-box').eq(a).prop("checked")) {
			var shopNum = $('.choice-box').eq(a).parents('.list-cont').find('.shuliang_number').val();
			var shopPrice = $('.choice-box').eq(a).parents('.list-cont').find('.price').text();
			tot += shopNum * shopPrice;
		}
	}
	$('.all-price').text(tot);
};

// 删除商品
$('p.delieat').on('click',function(){
	
	var str = [];
	// 购物记录id的数组
	var record = [];
	for (var a = 0; a < $('.goods-list').length; a++) {
		if ($('.choice-box').eq(a).prop("checked")) {
			str.push(a);
			record.push($('.goods-list').eq(a).data('id'));
		}
	}
	$.ajax({
		url: "/cart/remove",
		type: "post",
		headers: {
			"Content-Type": "application/json",
			"Authorization": sessionStorage.getItem("token")
		},
		data: JSON.stringify({
			 ids: record
		}),
		success: function(result) {
			if (result.code === 200) {
				str.forEach(function(item) {
					$('.goods-list').eq(item).remove()
				});
				layer.open({
					content:'删除成功',
					skin:'msg',
					time:2
				});
			}
		}
	});
})

// 跳转结算页面
$('.Statistics').on('click',function(){
	// 定义数组
	var del =[]
	// 定义数组记录选中的复选框
	var arr=[]
	// 获取复选框选中个数
	var checkbox = $('.choice-box').length;
	for(var i=0;i<checkbox;i++){
		if($(".goods-list").eq(i).find($('.choice-box')).prop("checked")){
			del.push(i);
			arr.push($('.goods-list').eq(i).data("id"));
		}
	}
	// 用sessionStorage存选中商品的id
	sessionStorage.setItem("order",arr);
	window.location.replace('/order/index.html')
});


