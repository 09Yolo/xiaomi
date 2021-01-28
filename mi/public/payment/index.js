$('.icon-left-arrow').on('click', function() {
	history.back()
});
// 获取订单总金额
var orderIds = location.search.replace("?", "").split("=")[1];
$.myAjax({
	url:'/order/account/'+orderIds,
	success:function(data){
		$('.paymoney').text(data);
		$('.amountMoney').text(data);
	}
});

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

$('.active').on('click',function(){
	$('.stages').show()
});
$('.hide').on('click',function(){
	$('.stages').hide()
});

$('.stages-num').click(function(){
	$(this).addClass('stages-num_style');
	$(this).siblings().removeClass('stages-num_style');
});

// 确认支付
$('.foot-wrap span').on('click',function(){
	$.myAjax({
		url:'/order/pay/'+orderIds,
		success:function(data){
			location.replace('/myorder/index.html')
		}
	})
})