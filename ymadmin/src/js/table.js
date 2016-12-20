(function(window, document){

	var navbarH = $(".navbar").outerHeight(true),
		windowH = $(window).height(),
		contentH = windowH - navbarH,
		breadcrumbH = $(".page-breadcrumb").outerHeight(true),
		tableH = contentH - breadcrumbH,
		$table = $("#table");

	$(".page-content").height(contentH);

	// $table.bootstrapTable('resetView', {
//              height: 800
//          });
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

 //     setTimeout(function () {
    //     $table.bootstrapTable('resetView');
    // }, 200);

    function responseHandler(res) {
        $.each(res.rows, function (i, row) {
            row.state = $.inArray(row.id, selections) !== -1;
        });
        return res;
    }

    var $remove = $("#remove");
    $table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
        $remove.prop('disabled', !$table.bootstrapTable('getSelections').length);

        // save your data, here just save the current page
        // selections = getIdSelections();
        // push or splice the selections if you want to save all data selections
    });

    $remove.click(function(){
    	var ids = getIdSelections();
    	console.log(ids);
        $table.bootstrapTable('remove', {
            field: 'productName',
            values: ids
        });
        $remove.prop('disabled', true);
    });

    function getIdSelections(){
    	return $.map($table.bootstrapTable('getSelections'), function (row) {
            return row.productName;
        });
    }

	function statusFormatter(value, row, index){
		if(value == null || value == 0){
			return "未发布";
		}else if(value == 1){
			return "预约中";
		}else if(value == 2){
			return "运行中";
		}
	}

	function topFormatter(value, row, index){
		if(value == 0 || value == null){
			return "<a href='javascript:void(0)' class='data-status-on setTop' data-top='0' data-opid='"+ index +"'>置顶</a>";
		}else if(value == 1){
			return "<a href='javascript:void(0)' class='data-status-off setTop' data-top='1' data-opid='"+ index +"'>取消置顶</a>";
		}
	}
	
    function operateFormatter(value, row, index) {
        return [
            '<a class="editor" href="add_pe.html" title="点击编辑产品">',
            '<i class="glyphicon glyphicon-pencil"></i>',
            '</a>'
        ].join('');
    }

    window.operateFormatter = operateFormatter;
    window.statusFormatter = statusFormatter;
    window.topFormatter = topFormatter;
    window.$table = $table;
})(this, document);