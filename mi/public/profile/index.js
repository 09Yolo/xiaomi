var userName = sessionStorage.getItem("name");
if(userName !== null){
	$(".sign a").text(userName)
	$(".page-arrow img").hide()
}else{
	$(".sign a").text("请登录")
	$(".record").hide()
}

$('.page-order').on('click',function(){
	location.href = '/myorder/index.html'
});