// 弹窗
$('.jion-cart ').on('click', function() {
	layer.open({
		type: 1,
		content: '<div class="add-cart"><div class="add-img"><img src="" ></div><ul class="add-number"><li class="money">￥<span class="unitPrice"></span></li><li class="ypseckill">有品秒杀</li><li class="shop-numer">已选：<span id="choiceNumber">1</span>件</li></ul></div><div class="number-add"><div>数量</div><div class="shuliang"><a class="reduce" >-</a><input type="text" class="shuliang_number" id="pronumber" value="1" /><a class="add">+</a><span style="">件</span></div>',
		anim: 'up',
		btn: '确定',
		style: ' border-radius:10px 10px 0 0; position:fixed; bottom:0; left:0; width: 100%; height: 135.2vw; padding:10px 0; border:none;'
	});
	tan()
});

// 件数加减

$(document).on("click",".reduce",function(){
	var i = $(this).siblings('.shuliang_number').val();
	if (i == 1){
		return false;
	}
	i--;
	$(this).siblings('.shuliang_number').val(i)
	$('#choiceNumber').text(i)
})
$(document).on("click",".add",function(){
	var i = $(this).siblings('.shuliang_number').val();
	if (i == 5){
		return false;
	}
	i++;
	$(this).siblings('.shuliang_number').val(i)
	$('#choiceNumber').text(i)
})



window.onload = function() {
	// 倒计时
	var SysSecond; //系统秒
	var InterValObj; //时间间隔
	$(document).ready(function() {
		SysSecond = parseInt($("#remainSeconds").html()); //这里获取倒计时的起始时间 
		InterValObj = window.setInterval(SetRemainTime, 1000); //间隔函数，1秒执行 
	});
	//将时间减去1秒，计算天、时、分、秒 
	function SetRemainTime() {
		if (SysSecond > 0) {
			SysSecond = SysSecond - 1;
			var second = Math.floor(SysSecond % 60); // 计算秒     
			var minite = Math.floor((SysSecond / 60) % 60); //计算分 
			var hour = Math.floor((SysSecond / 3600) % 24); //计算小时 
			var day = Math.floor((SysSecond / 3600) / 24); //计算天 
			$("#remainTime").html(day + "天" + hour + "小时" + minite + "分" + second + "秒");
		} else { //剩余时间小于或等于0的时候，就停止间隔函数 
			window.clearInterval(InterValObj);
			//这里可以添加倒计时时间为0后需要执行的事件 
		}
	}
}
// 电梯导航
$(window).scroll(function() {
	// 1.显示隐藏电梯导航(消失的地方)
	var toolTop = $(".commidty-dea").offset().top;
	toggleTool();

	function toggleTool() {
		if ($(document).scrollTop() >= toolTop) {
			$(".back-top").fadeIn();
		} else {
			$(".back-top").fadeOut();
		};
	}

	//scrollTop
	var scrollTop = $(document).scrollTop();
	// console.log(scrollTop);
});
var flag = true;
//回到顶部
$('.back-top').click(function() {
	$('html,body').stop(true).animate({
		scrollTop: 0
	});
});

// 渲染
var id = parseInt(location.search.replace("?", "").split("=")[1]);
function tan() {
	$.ajax({
		url: "/product/model/" + id,
		type: "get",
		success: function(result) {
			if (result.code === 200) {
				$(" b.price").text(result.data.price);
				$(".goods-name").text(result.data.name);
				$(".goods-Highlights").text(result.data.brief);
				$(".sale").text(result.data.sale);
				$(".rate").text(result.data.rate);
				$("span.unitPrice").text(result.data.price);
				$(".add-img img").attr("src", result.data.avatar);
			}
		}

	})
}
tan()
// 渲染图片
$.ajax({
	url: "/product/model/" + 1,
	type: "get",
	success: function(result) {
		if (result.code === 200) {
			result.data.otherImgs.split(",").forEach(function(item) {
				$(`<img src="${item}">`).appendTo(".dea-img")
			});
			result.data.bannerImgs.split(",").forEach(function(item) {
				$(`<div class="swiper-slide"><img src="${item}"></div>`).appendTo(".swiper-wrapper");
			})
			var swiper = new Swiper('.swiper-container', {
				spaceBetween: 30,
				centeredSlides: true,
				autoplay: {
					delay: 2500,
					disableOnInteraction: false,
				},
				pagination: {
					el: '.swiper-paination',
				},
			});
		}
	}
})

// 向购物车添加商品
$(document).on('click','.layui-m-layerbtn',function(){
	$.ajax({
	url: "/cart/add",
	type: "post",
	headers: {
		"Content-Type": "application/json",
		"Authorization": sessionStorage.getItem("token")
	},
	data: JSON.stringify({
		pid: id,
		count:1
	}),
	success: function(result) {
		if (result.code === 200) {
			layer.open({
				content:'添加成功',
				skin:'msg',
				time:2
			});
		}
		},
		});
})
	
	// 购物车显示商品件数
$.ajax({
	url: "/cart/total",
	type: "get",
	headers: {
		"Authorization": sessionStorage.getItem("token")
	},
	success: function(result) {
		if (result.code === 200) {
			$('.piece-number').text(result.data)
			 $(document).on('click','.layui-m-layerbtn',function(){
				$('.piece-number').text(result.data +1)
			
			});
		}
		},
		});

	
// 跳转购物车
$('.cart-skip ').on('click', function() {
	location.href = '/cart/index.html'
});