/*复选框勾选并且定位到万里挑一介绍*/
function showText(obj){
	var isSelected = $(".book-input-checkbox:checked").val(),
		top = $(".product-wlty-wrap").offset().top ;
	if(isSelected){
		$("html,body").animate({scrollTop:top},666);
		$("#bottom-book-chekbox").prop("checked", true);
	}else{
		$("#bottom-book-chekbox").prop("checked", false);
	}
}

$("#bottom-book-chekbox").on("change", function(){
	var isSelected = $("#bottom-book-chekbox:checked").val();
	if(isSelected){
		$(".book-input-checkbox").prop("checked", true);
	}else{
		$(".book-input-checkbox").prop("checked", false);
	}
});

/*移动到万里挑一介绍*/
function moveTo(){
	var top = $(".product-wlty-wrap").offset().top;
	$("html,body").animate({scrollTop:top},666);
}

/*预约条*/
$(window).on("scroll", function(){
	var h1 =$(".product-info-wrap").outerHeight(),
		h2 = $("#header").outerHeight(),
		h3 = $(".page-breadcrumb-wrap").outerHeight(),
		h4 = $(document).height(),
		h5 = $(window).height(),
		h6 = $(".bottom-book-wrap").outerHeight(),
		h7 = $(".page-footer-wrap").outerHeight(),
		scrollTop = $(this).scrollTop();
	if(scrollTop < (h1 + h2 + h3) || scrollTop >= (h4 - h5 - h7)){
		$(".bottom-book-wrap").find(".bottom-book-bg").removeClass("bottom-book-bg2");
		$(".bottom-book-wrap").css({"position": "relative"});
	}else{
		$(".bottom-book-wrap").find(".bottom-book-bg").addClass("bottom-book-bg2");
		$(".bottom-book-wrap").css({"position": "fixed"});
	}
});

/*切换图表*/
$("#js-graph-menu li").on("click", function(){
	var index = $(this).index();
	$(this).addClass("active").siblings().removeClass("active");
	$("#graph-tab-"+index).addClass("active").siblings().removeClass("active");
	switchCharts();
});

/*切换基金经理*/
$("#js-present-menu li").on("click", function(){
	var index = $(this).index();
	$(this).addClass("active").siblings().removeClass("active");
	$("#highlight-tab-"+index).addClass("active").siblings().removeClass("active");
});

switchCharts();

/*切换图表*/
function switchCharts(){

	if($("#graph-tab-0").hasClass("active")){

		lineOpts.series = data1;
		$("#graph-tab-0").highcharts(lineOpts);

	}else if($("#graph-tab-1").hasClass("active")){

		columnOpts.series = data2;
		$("#graph-tab-1").highcharts(columnOpts);

	}else if($("#graph-tab-2").hasClass("active")){
		lineOpts.series = data3;
		$("#graph-tab-2").highcharts(lineOpts);
	}
}