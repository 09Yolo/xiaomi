$('ul.list-main').on('click', function(e) {
	var li = e.target.tagName === "LI" ? e.target : e.target.parentNode;
	// 一级分类li选中效果切换
	if($(li).hasClass('active')) return;
		$('li span').removeClass('active');
		$(li).find('span').addClass('active');
	$('img.avatar').attr('src', li.dataset.avatar);
	
	// ajax请求二级分类数据并显示
	$.myAjax({
		url: `/category/list/${li.dataset.id}`,
		success: function(data) {
			$('ul.list-sub').empty().toggleClass('show', data.length > 0);
			$('.empty').toggleClass('show', data.length === 0);
			data.forEach(function(item) {
				$(
					`
			<li>
			<a href="/list/index.html?cid=${item.id}">
			<img src="${item.avatar}"/>
			<span>${item.name}</span>
			</a>
			</li>
			`
				).appendTo('ul.list-sub')
			});
		}
	})
});

// // 发送ajax请求一级分类的数据
$.myAjax({
	url: "/category/list/0",
	success: function(data) {
	data.forEach(function(item) {
			$(`
			<li data-id="${item.id}" data-avatar="${item.avatar}">
			<span>${item.name}</span>
			</li>
			`).appendTo('ul.list-main');
		});
		// trigger模拟触发第一个li点击事件
		$('ul.list-main li').eq(0).trigger('click');
	},
});
