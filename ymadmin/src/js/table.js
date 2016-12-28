(function(window, document){

	var navbarH = $(".navbar").outerHeight(true),
		windowH = $(window).height(),
		contentH = windowH - navbarH,
		breadcrumbH = $(".page-breadcrumb").outerHeight(true),
		tableH = contentH - breadcrumbH,
		$table = $("#table");

	$(".page-content").height(contentH);

    /*初始化表格的高度*/
	$table.data("height", getTableHeight());

	$(window).resize(function () {
		$table.bootstrapTable('resetView', {
        	height: getTableHeight()
    	});
    });

    function getTableHeight(){
    	var navbarH = $(".navbar").outerHeight(true),
			windowH = $(window).height(),
			contentH = windowH - navbarH,
			breadcrumbH = $(".page-breadcrumb").outerHeight(true),
			tableH = contentH - breadcrumbH - 40;
		return tableH;
    }
    
    window.$table = $table;

})(this, document);