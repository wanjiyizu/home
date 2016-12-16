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
		$(this).parent().toggleClass("down");
		$(this).parent().siblings().find(".sidebar-submenu").slideUp(200);

	});

	$(".admin-menu").on("click", function(){
		$(".page-sidebar").addClass("offcanvas-active");
		setTimeout(function(){
			$(".page-sidebar .offcanvas-bar").addClass("offcanvas-bar-active");
		},1);
		
	});

	$(".offcanvas").on("click", function(){
		$(".page-sidebar .offcanvas-bar").removeClass("offcanvas-bar-active");
		setTimeout(function(){
			$(".page-sidebar").removeClass("offcanvas-active");
		},200);
		
	})
})(this, document);