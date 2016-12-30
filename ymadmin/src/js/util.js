var util = {
		
	isEmpty : function(val){
		if(val == ""){
			return true;
		}else if(typeof val == "undefined"){
			return true;
		}else if(val == null){
			return true;
		}else if(val.length == 0){
			return true;
		}else if(!/[^(^\s*)|(\s*$)]/.test(val)){
			return true;
		}else{
			return false;
		}
	},
	
	isNotEmpty : function(val){
		return !this.isEmpty(val);
	}
}

$("#js-modify-btn").on("click", function(){
	var html = "<div class='g-modify-wrap'>"+
			"	<p class='g-modify-top'><i class='icon-close-1'>x</i></p>"+
			"	<div class='g-modify-box'>" +
			"		<input type='password' id='pwd' autocomplete='off' class='g-text-1' placeholder='请输入原始密码'>"+
			"		<input type='password' id='confirm-pwd' autocomplete='off' class='g-text-1' placeholder='请输入新密码'>" +
			"	</div>"+
			"	<p class='g-text-error'>密码错误</p>"+
			"	<p><button class='g-confirm-btn'>确认修改</button></p>"+
			"</div>";
	ym_layer.open(html, {callback: function(box){
		$(box).find(".icon-close-1").on("click", function(){
			$(box).next().remove();
			$(box).remove();
		});
		$(box).find(".g-text-1").on("keyup", function(){
			
		});
		$(box).find(".g-confirm-btn").on("click", function(){
			var pwd = $("#pwd").val();
				confirmPwd = $("#confirm-pwd").val();
			if(util.isEmpty(pwd) || util.isEmpty(confirmPwd)){
				$(box).find(".g-text-error").text("密码不能为空").show().fadeOut(3000);
				return;
			}
			$.ajax({
				type: "post",
				url: "manager/modify_pwd",
				data: {oldPassword: pwd, newPassword: confirmPwd},
				beforeSend: function(){
					$(box).find(".g-confirm-btn").text("请稍后").off("click");
				},
				success: function(response){
					var result = eval("("+response+")");
					$(box).find(".g-confirm-btn").text("确认修改").on("click");
					if(result.statusCode == 1 && util.isNotEmpty(result.url)){
						ym_layer.alert("修改密码成功，请重新登录", {sure:function(){
							window.location.href = result.url;
						}});
					}else if(result.statusCode == 0 && util.isNotEmpty(result.url)){
						ym_layer.alert(result.message, {sure:function(){
							window.location.href = result.url;
						}});
					}else{
						$(box).find(".g-text-error").text(result.message).show().fadeOut(3000);
					}
				}
			});
		});
	}});
});
