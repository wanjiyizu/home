var loginTemplate = $("#js-login-template").html();
	registerTemplate = $("#js-register-template").html();
	
$("#js-quick-login").click(function(){
	appendLogin();
	appendcomplete();
});

$("#js-quick-register").click(function(){
	appendRegister();
	appendcomplete();
});

function appendcomplete(){
	$("body").delegate("#js-register-right-btn", "click", function(){
		$("#js-register-form").addClass("active").siblings().removeClass("active");
		$(this).find(".btn-text-chinese").text("登 录");
		$(this).find(".btn-text-english").text("log in");
		$(this).attr("id", "js-login-right-btn");
		$(this).prev().text("如 果 您 已 拥 有 优 米 账 户，可 在 此 登 录");
	});

	$("body").delegate("#js-login-right-btn", "click", function(){
		$("#js-login-form").addClass("active").siblings().removeClass("active");
		$(this).find(".btn-text-chinese").text("注 册");
		$(this).find(".btn-text-english").text("register");
		$(this).attr("id", "js-register-right-btn");
		$(this).prev().text("如 果 您 还 未 拥 有 优 米 账 户，可 在 此 注 册");
	});

	$("#js-page-header").addClass("f-position-fixed page-header-wrap-fixed");
	$(".page-overlay").show();

	$("body").delegate("#js-login-close", "click", function(){
		$("#js-page-header").removeClass();
		$(".page-overlay").hide()
		$("#js-login-wrap").remove();
	});

	$("body").delegate(".login-input-wrap input", "focus", function(){
		$(this).prev().hide();
		$(this).next().hide();
	});

	$("body").delegate(".login-input-wrap input", "blur", function(){
		var value = $(this).val();
		if(value.length == 0){
			$(this).prev().show();
			$(this).next().show();
		}
	});
}

function appendLogin(){
	if($("#js-login-wrap").length <= 0){
		$("#js-register-wrap").remove();
		$("body").append(loginTemplate);
	}
}

function appendRegister(){
	if($("#js-register-wrap").length <= 0){
		$("#js-login-wrap").remove();
		$("body").append(registerTemplate);
	}
}
