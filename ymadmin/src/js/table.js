(function(window, document){

	var navbarH = $(".navbar").outerHeight(true),
		windowH = $(window).height(),
		contentH = windowH - navbarH,
		breadcrumbH = $(".page-breadcrumb").outerHeight(true),
		tableH = contentH - breadcrumbH,
		$table = $("#table"),
		$remove = $("#remove");

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

    $table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
        $remove.prop('disabled', !$table.bootstrapTable('getSelections').length);
    });
    
    window.$table = $table;
    window.$remove = $remove;

})(this, document);