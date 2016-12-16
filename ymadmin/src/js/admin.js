(function(win, document){
	$(".sidebar-closed").on("click", function(){
		if($(this).data("toggle")){
			$(this).data("toggle", false);
			$(".offcanvas-bar").removeClass("open").addClass("closed")
			setTimeout(function(){
				$(".page-sidebar").hide();
			}, 200);
		}else{
			$(this).data("toggle", true);
			$(".page-sidebar").show();	
			setTimeout(function(){
				$(".offcanvas-bar").removeClass("closed").addClass("open");
			},100);
		}
		
	});

	$(window).on("resize", function(){
		$(".offcanvas-bar").removeClass("open");
	});

	$(".sidebar-dropdown").on("click", function(){
		$(this).parent().find(".sidebar-submenu").slideToggle(200);
		$(this).parent().toggleClass("down");
		$(this).parent().siblings().find(".sidebar-submenu").slideUp(200);

	});

	$("#admin-menu").on("click", function(){
		$(".page-sidebar").addClass("offcanvas-active");
		setTimeout(function(){
			$(".page-sidebar .offcanvas-bar").addClass("offcanvas-bar-active");
		},1);
		
	});

	$(".offcanvas").on("click", function(){
		$(".page-sidebar .offcanvas-bar").removeClass("offcanvas-bar-active");
		setTimeout(function(){
			$(".page-sidebar").removeClass("offcanvas-active");
		},300);
	});

	$(".offcanvas-bar").on("click", function(e){
		e.stopImmediatePropagation();
	});


	var startX, startY, $this = $("body"), _left, _top, left, top, active = true;
	// $(document).on("touchstart", function(e){
	// 	e.preventDefault();
	// 	active = true;
	// 	startX = e.originalEvent.targetTouches[0].pageX;
	// 	startY = e.originalEvent.targetTouches[0].pageY;
	// 	left = $("#admin-menu").offset().left;
	// 	top = $("#admin-menu").offset().top;
	// 	// console.log(left);

	// });

	// $(document).on("touchmove", function(e){
	// 	e.preventDefault();
	// 	if(!active){
	// 		return;
	// 	}
	// 	var windowW = document.documentElement.clientWidth,
	// 		windowH = document.documentElement.clientHeight,
	// 		offsetX = e.originalEvent.targetTouches[0].pageX,
	// 		offsetY = e.originalEvent.targetTouches[0].pageY;
	// 		console.log(left);
	// 	if(offsetX <= 0 || offsetX >= windowW || left <= 0 || left >= windowW){
	// 		console.log("超过了");
	// 		return;
	// 	}

	// 	if(offsetY <= 0 || offsetY >= windowH || top <= 0 || top >= windowH){
	// 		return;
	// 	}

	// 	_left = Math.abs(offsetX + left - startX);
	// 	_top = Math.abs(offsetY + top - startY);
		
	// 	$("#admin-menu").css({"left": _left, "top": _top});
	// });

	// $(document).on("touchend", function(e){
	// 	active = false;
	// });
})(this, document);