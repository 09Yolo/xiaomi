// 根据当前窗口的location
var reg = /.+\/(.+?)\/index.html$/;
var pageName = window.parent.location.href.match(reg)[1];
$(`li[data-page=${pageName}]`).addClass('active');
// 为菜单绑定点击事件，实现导航跳转
$('li').on('click',function(){
    window.parent.location.href=`/${this.dataset.page}/index.html`;
});