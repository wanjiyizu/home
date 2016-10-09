!(function(window, document){
	var isLogin = $("#global_user_isLogin").val();
	var baseUrl = $("#baseUrl").attr("href");
	var dialog = "<div class='dialog'>"+
		"<div class='dialog-top'>" +
		"	我们将在1个工作日内联系您，提供专业理财服务<span class='close dialog-close'></span>" +
		"</div>"+
		"<div class='dialog-box'>"+
		"	<dl class='realname'>"+
		"		<dt>姓名：</dt>"+
		"		<dd><input class='requried' type='text'name='contact_name' placeholder='请输入2-5字中文姓名' /><span class='error'></span></dd>"+
		"	</dl>"+
		"	<dl class='cellphone'>"+
		"		<dt>手机：</dt>"+
		"		<dd><input class='requried' type='text' name='mobile' placeholder='请输入11位手机号码' /><span class='error'></span></dd>"+
		"	</dl>"+
		"	<div><a href='javascript:void(0)' class='yuyue_btn' id='yuyue_btn'>预约咨询</a></div>"+
		"</div>"+
	"</div>";
	
	var dialog_2 = "<div class='dialog f-height-1'>"+
	"<div class='dialog-top'>" +
	"	我们将在1个工作日内联系您，提供专业理财服务<span class='close dialog-close'></span>" +
	"</div>"+
	"<div class='dialog-box'>"+
	"	<dl class='realname'>"+
	"		<dt>姓名：</dt>"+
	"		<dd><input class='requried' type='text'name='contact_name' placeholder='请输入2-5字中文姓名' /><span class='error'></span></dd>"+
	"	</dl>"+
	"	<dl class='cellphone'>"+
	"		<dt>手机：</dt>"+
	"		<dd><input class='requried' type='text' name='mobile' placeholder='请输入11位手机号码' /><span class='error'></span></dd>"+
	"	</dl>"+
	"<label class='dialog-selected'>" +
	"	<input id='js-dialog-check' type='checkbox' value='1' checked='checked'>" +
	"	<span>同意参加万里挑一活动,详情请<a class='dialog-link' href='javascript:void(0)'>查看</a></span>" +
	"</label>"+
	"	<div><a href='javascript:void(0)' class='yuyue_btn' id='yuyue_btn'>预约咨询</a></div>"+
	"</div>"+
	"</div>";
	
	var dialog_3 = "<div class='dialog-3'>"+
	"	<div class='dialog-title'><span class='dialog-close-2'>x</span></div>"+
	"	<div class='dialog-content'>好消息，此产品属于<span class='dialog-color-1'>万里挑一</span>项目指定产品。想了解更多万里挑一项目信息，请点击<span>了解更多</span>按钮，不了解可点击<span>直接预约</span>按钮直接预约此产品</div>"+
	"	<div class='dialog-btn-group'><button class='dialog-btn-1'>了解更多</button><button class='dialog-btn-2'>直接预约</button></div>"+
	"</div>";
	
	var success_box = "<div class='yuyue_success'>"+
		"<div class='yuyue_box'>"+
		"	<div class='title'><span>温馨提示</span><i class='btn-close'>X</i></div>"+
		"	<div class='yuyue_content'>"+
		"		<div class='code_wrap'>"+
		"			<img src='images/product/er_code.png' />"+
		"			<p>扫一扫，获取最新咨询动态</p>"+
		"			<i class='line'></i>"+
		"		</div>"+
		"		<div class='success_wrap'>"+
		"			<img src='images/product/smile.png'>"+
		"			<p>恭喜，咨询成功</p>"+
		"			<p>我们将尽快与您联系</p>"+
		"		</div>"+
		"		<div class='clear'></div>"+
		"	</div>"+
		"</div>"+
	"</div>";
	var success_box_2 = "<div class='yuyue_success'>"+
		"<div class='yuyue_box'>"+
		"	<div class='title'><span>温馨提示</span><i class='btn-close'>X</i></div>"+
		"	<div class='yuyue_content'>"+
		"		<div class='code_wrap'>"+
		"			<img src='images/product/er_code.png' />"+
		"			<p>扫一扫，获取最新咨询动态</p>"+
		"			<i class='line'></i>"+
		"		</div>"+
		"		<div class='success_wrap'>"+
		"			<img src='images/product/smile.png'>"+
		"			<p>恭喜，咨询成功</p>"+
		"			<p>我们将尽快与您联系</p>"+
		"		</div>"+
		"		<div class='clear'></div>"+
		"	</div>"+
		"<div class='success-text'>尊敬的客户，感谢您支持优米金融“<span>万里挑一</span>”项目。即日起，您通过优米金融所获投资收益（不含本金）的万分之一将捐赠至“植物人视听唤醒项目”。与此同时，优米金融也将捐赠同等金额，与您一起以共同的名义向“植物人视听唤醒项目”捐赠善款。如有任何疑问，请垂询<span>400-960-8108</span>。</div>"+
		"</div>"+
	"</div>";
	
	$("body").delegate(".subscribe", "click", function(e) {
		var publishid = $(this).data("publishid");
		var varHotspot = $(this).data("hotspot");
		var isSelected = $(this).data("selected") || $(e.target).prev().find("input:checked").val();
		var link_prefix = $(this).data("prefix");
		if(isLogin == "true" && isSelected != 1){
			bookingForLogin(e);
		}else if(isLogin == "true" && isSelected == 1){
			ym_layer.open(dialog_3, {callback: function(box){
				$(box).find(".dialog-btn-2").on("click", function(e){
					$.ajax({
						type: "post",
						url : "product/booking.do",
						data : {publishId: publishid, hotspot: varHotspot, willing: isSelected},
						beforeSend: function(){
							$(e.target).off("click").text("正在预约")
						},
						success: function(response){
							var result = eval("("+response+")")
							if(result.status == 1){
								/*打开一个弹层*/
								$(box).next().remove();
								$(box).remove();
								ym_layer.open(success_box,{callback:function(dialog){
									$(dialog).on("click", function(){
										$(dialog).next().remove();
										$(dialog).remove();
									});
								}});
								$(e.target).on("click").text("不参加");
							}else{
								$(e.target).on("click").text("不参加");
								alert(result.error);
							}
						}
					});
				});
				$(".dialog-close-2").on("click", function() {
					$(box).next().remove();
					$(box).remove();
				});
				$(box).find(".dialog-btn-1").on("click", function(e){
					window.location.href = baseUrl + link_prefix + publishid + ".html";
					window.event.returnValue = false;
				});
			}});
		}else if(isLogin != "true" && isSelected == 1){
			ym_layer.open(dialog_2, {callback : function(box){
				$("#yuyue_btn").data("publishid", publishid);
				$("#yuyue_btn").data("hotspot", varHotspot);
				$("#yuyue_btn").on("click", booking);
				$(".dialog-close").on("click", function() {
					$(box).next().remove();
					$(box).remove();
				});
				$(box).find(".requried").on("focus", function(){
					$(this).next().css("visibility", "hidden");
				});
				$(box).find(".dialog-link").on("click", function(e){
					e.preventDefault();
					window.location.href = baseUrl + link_prefix + publishid + ".html";
					window.event.returnValue = false;
				});
			}});
		}else{
			ym_layer.open(dialog, {callback : function(box){
				$("#yuyue_btn").data("publishid", publishid);
				$("#yuyue_btn").data("hotspot", varHotspot);
				$("#yuyue_btn").on("click", booking);
				$(".dialog-close").on("click", function() {
					$(box).next().remove();
					$(box).remove();
				});
				$(box).find(".requried").on("focus", function(){
					$(this).next().css("visibility", "hidden");
				});
				$(box).find(".dialog-link").on("click", function(e){
					e.preventDefault();
					window.location.href = baseUrl + link_prefix + publishid + ".html";
					window.event.returnValue = false;
				});
			}});
		}
	});
	
	$(".js-btn-caret").on("click", function(){
		$(".g-menu-1").show();
	});
	
	$(".g-menu-1 li").on("click", function(){
		var text = $(this).text(),
			value = $(this).data("value");
		$(this).parents(".btn-group").find(".subscribe").text(text).data("selected", value);
		$(".g-menu-1").hide();
	});
	
	function bookingForLogin(e){
		var btn = $(e.target);
		var publishid = btn.data("publishid");
		var varHotspot = btn.data("hotspot");
		var isSelected = $("#js-dialog-check:checked").val();
		$.ajax({
			type : "post",
			url : "product/booking.do",
			data : {publishId: publishid, hotspot: varHotspot, willing: isSelected},
			beforeSend : function(){
				btn.text("正在预约");
				btn.off("click");
			},
			success : function(response){
				var result = eval("("+response+")");
				if(result.status == 1 && isSelected == 1){
					/*打开一个弹层*/
					ym_layer.open(success_box_2,{callback:function(dialog){
						$(dialog).on("click", function(){
							$(dialog).next().remove();
							$(dialog).remove();
						});
					}});
					btn.text("预约咨询");
					btn.on("click", bookingForLogin);
				}else if(result.status == 1){
					/*打开一个弹层*/
					ym_layer.open(success_box,{callback:function(dialog){
						$(dialog).on("click", function(){
							$(dialog).next().remove();
							$(dialog).remove();
						});
					}});
					btn.text("预约咨询");
					btn.on("click", bookingForLogin);
				}else{
					btn.text("预约咨询");
					btn.on("click", bookingForLogin);
					alert(result.error);
				}
			}
		});
	}
	
	function booking(){
		var contact_name = $("input[name=contact_name]").val().trim();
		var mobile = $("input[name=mobile]").val();
		var publishid = $(this).data("publishid");
		var varHotspot = $(this).data("hotspot");
		var isSelected = $("#js-dialog-check:checked").val();
		var matchPhone = /^[1]\d{10}$/;
		var matchName = /^[\u4e00-\u9fa5]{2,4}$/;
		if(util.isEmpty(contact_name)){
			$("input[name=contact_name]").next().text("请输入姓名，姓名不允许为空").css("visibility", "visible");
			return;
		}else if(!matchName.test(contact_name)){
			$("input[name=contact_name]").next().text("请输入正确的姓名").css("visibility", "visible");
			return;
		}else if(util.isEmpty(mobile)){
			$("input[name=mobile]").next().text("号码不允许为空").css("visibility", "visible");
			return;
		}else if(!matchPhone.test(mobile)){
			$("input[name=mobile]").next().text("号码格式不正确").css("visibility", "visible");
			return;
		}
		var params = {
			publishId	: publishid,
			nickName : contact_name,
			hotspot : varHotspot,
			cellphone	: mobile,
			willing: isSelected
		};
		$.ajax({
			type : "post",
			url : "product/booking.do",
			data : params,
			beforeSend : function(){
				$("#yuyue_btn").text("正在预约");
				$("#yuyue_btn").off("click");
			},
			success : function(response){
				var result = eval("("+response+")");
				if(result.status == 1 && isSelected == 1){
					$(".dialog").remove();
					/*打开一个弹层*/
					ym_layer.open(success_box_2,{callback:function(dialog){
						$(dialog).on("click", function(){
							$(dialog).next().remove();
							$(dialog).prev().remove();
							$(dialog).remove();
						});
					}});
				}else if(result.status == 1){
					$(".dialog").remove();
					/*打开一个弹层*/
					ym_layer.open(success_box,{callback:function(dialog){
						$(dialog).on("click", function(){
							$(dialog).next().remove();
							$(dialog).prev().remove();
							$(dialog).remove();
						});
					}});
				}else{
					$("#yuyue_btn").text("预约咨询");
					$("#yuyue_btn").on("click", booking);
					alert(result.error);
				}
			}
		});
	}

	$(".tab-menu-list li").on("click", function(){
		var index = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".tab-list").eq(index).addClass("active").siblings().removeClass("active");
	});
	
})(this, document)

