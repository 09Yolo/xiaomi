$('.check-choice').on('click', function() {
	$('.set-default, .default').toggleClass("show");
});
// 地址渲染
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
											<li>${item.receiveName}</li>
											<li>${item.receivePhone}</li>
											<li><img class="img-modify" src="img/修改.png" ></li>
										</ul>
										<div class="address-detailed">${item.receiveRegion} ${item.receiveDetail}</div>
										<div class="default-address">
											<p>默认</p>
										</div>
									</div>
									
								</div>
					`
					).appendTo('.page-content')
				} else {
					$(
						`
							<div class="content-address" data-id=${item.id} data-isDefault=${item.isDefault}>
									<div class="infor-address">
										<ul>
											<li>${item.receiveName}</li>
											<li>${item.receivePhone}</li>
											<li><img class="img-modify" src="img/修改.png" ></li>
										</ul>
										<div class="address-detailed">${item.receiveRegion} ${item.receiveDetail}</div>
									</div>
									
								</div>
					`
					).appendTo('.page-content')
				}
			})
		}
	}
});

$('.page-content').on("click", ".content-address", function(e) {
	location.assign("/address/modify-index.html?id=" + $(this).data('id'));
})


// 新增地址
$('button.btn-preservation').on('click', function() {
	var name = $(".userName").val();
	var phone = $(".phone").val();
	var address = $(".regions-picker").val();
	var detail = $("#detail").val();
	$.ajax({
		url: "/address/add",
		type: "post",
		headers: {
			"Authorization": sessionStorage.getItem("token"),
			"Content-Type": "application/json"
		},
		data: JSON.stringify({
			"receiveName": name,
			"receivePhone": phone,
			"receiveRegion": address,
			"receiveDetail": detail
		}),

		success: function(result) {
			if (result.code === 200) {
				layer.open({
					content: '添加成功',
					skin: 'msg',
					time: 2
				});
				setTimeout(funcName, 1000);

				function funcName() {
					location.href = 'index.html';
				}

			} else {
				alert(result.msg)
			}

		}
	})
});
