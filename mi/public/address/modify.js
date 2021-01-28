// 页面返回
$('.arrow-left').on('click',function(){
	history.back()
});


var id = parseInt(location.search.replace("?", "").split("=")[1])
$.ajax({
	url: "/address/model/" + id,
	type: "get",
	headers: {
		"Authorization": sessionStorage.getItem("token")
	},
	success: function(result) {
		if (result.code === 200) {
			$("#name").val(result.data.receiveName)
			$("#tel").val(result.data.receivePhone)
			$("#city").val(result.data.receiveRegion)
			$("#detail").val(result.data.receiveDetail)
		} else {
			alert(result.msg)
		}
	}
})
// 修改地址
$(".btn-preservation").click(function() {
	$.ajax({
		url: "/address/update",
		type: "post",
		headers: {
			"Authorization": sessionStorage.getItem("token"),
			"Content-Type": "application/json"
		},
		data: JSON.stringify({
			"id": id,
			"receiveName": $('#name').val(),
			"receivePhone": $('#tel').val(),
			"receiveRegion": $('#city').val(),
			"receiveDetail": $('#detail').val()
		}),
		success: function(result) {
			if (result.code === 200) {
				layer.open({
					content: '修改地址成功',
					skin: 'msg',
					time: 2
				});
				setTimeout(funcName, 1000);
				function funcName() {
					location.assign("/address/index.html");
				}	
			} else {
				alert(result.msg)
			}
		}
	})
});


// 默认地址
$(".btn-preservation").click(function() {
if ($(".check-choice").is(":checked")) {
	$.ajax({
		url: "/address/set_default/"+id,
		type: "get",
		headers: {
			"Authorization": sessionStorage.getItem("token")
		},
		success: function(result) {
			if (result.code === 200) {
			}
		}
	})
}
});






// 删除地址
$(".content-input p").click(function() {
	$.ajax({
		url: "/address/remove/" + id,
		type: "get",
		headers: {
			"Authorization": sessionStorage.getItem("token")
		},
		success: function(result) {
			if (result.code === 200) {
		layer.open({
			content: '删除成功',
			skin: 'msg',
			time: 2
		});
		setTimeout(funcName, 1000);
		function funcName() {
			location.assign("/address/index.html");
		}	
			} else {
				alert('删除失败')
			}
		}
	})
})
