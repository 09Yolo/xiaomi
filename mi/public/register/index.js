//点击返回登录
$(".login").on("click",function(){
    window.location.href = "../login/index.html"
})
$("form.demo").Validform({
    tiptype:2,
    datatype: {//gets 输入框value值；obj当前正在被验证的表单元素本身（默认是jQuery对象）；curfrom当前表单整个元素本身（form）（也是jQuery对象）
        username: function(gets,obj,curform){
			
            //可以返回bool类型、字符串(表示返回false)、啥都不返回(表示返回true)
            var reg = /^\w{3,20}$/;
            if(!reg.test(gets)) return false;
            var result;
			//ajaxy异步调整
			//异步 asynchronous 
			//同步 synchronous
            $.ajax({
                async: true,
                type: 'get',
                url: '/user/check_name/'+ gets,
                success:function(response){
                    if(response.code === 200){
                        result = response.data === 0 ? "用户名可用" : "用户名已存在";
                    }else{
                        result = response.msg
                    }
                },
                error:function(){
                    result = "服务器验证失败"
                }
            })
            return result;
         },
        m: function(gets,obj,curfrom){
            //可以返回bool类型、字符串(表示返回false)、啥都不返回(表示返回true)
            var reg2 = /^(1)\d{10}$/;
            if(!reg2.test(gets)) return false;
            var result;
            //这里用原生ajax以免卡住
            $.ajax({
                async: true,//核心点！！！！让ajax异步变同步，就这一句话就行，我不完事，后面不准动
                type: "get",
                url: "/user/check_phone/" + gets,
                success:function(response){
                    if(response.code === 200){
                        result = response.data === 0 ? "手机号可用" : "手机号已存在";
                    }else{
                        result = response.msg
                    }
                },
                error:function(){
                    result = "服务器验证失败"
                }
            })
            return result;
        },

    }
})

$(".btn").on("click",function(){
    var name = $(".userName").val();
    var phone = $(".phone").val();
    var pwd = $(".password").val();
    $.ajax({
        url: "/user/register",
        type: "post",
        headers:{
			"Content-Type":"application/json",
        },
        data: JSON.stringify({name,pwd,phone}),
        success: function(result){
            if(result.code === 200){
                layer.open({
                    content: '注册成功'
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
                  });
               setTimeout(function(){
                   window.location.href = "../login/index.html"
               },1000)
            }
        }
    })
})
