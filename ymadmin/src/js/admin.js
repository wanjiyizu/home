(function(win, document){
	$(".sidebar-toggle i").on("click", function(){
		if($(this).data("toggle")){
			$(this).data("toggle", false);
			$(".page-sidebar").hide();
			$(".page-content").css("margin-left", 0);
		}else{
			$(this).data("toggle", true);
			$(".page-sidebar").show();
			$(".page-content").css("margin-left", 235);
		}
		
	});

	$(".sidebar-dropdown").on("click", function(){
		$(this).parent().find(".sidebar-submenu").slideToggle(200);
		$(this).parent().siblings().find(".sidebar-submenu").slideUp(200);
	});
})(this, document);