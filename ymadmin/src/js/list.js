(function(window, document){

	function List($table, $remove){

		this.$table = $table;
		this.$remove = $remove;
		
		this.getTableHeight();

	    /*初始化表格的高度*/
	    console.log(this.tableH);
		this.$table.data("height", this.tableH);

		$(".page-content").height(this.contentH);

		this.resize();

		this.initEvent();

	}

	List.prototype = {

		getTableHeight: function(){
	    	this.navbarH = $(".navbar").outerHeight(true),
			this.windowH = $(window).height(),
			this.contentH = this.windowH - this.navbarH,
			this.breadcrumbH = $(".page-breadcrumb").outerHeight(true),
			this.tableH = this.contentH - this.breadcrumbH - 40;
			return this.tableH;
	    },

	    resize: function(){
	    	var $table = this.$table,
	    		_this = this;
	    	$(window).resize(function () {
				$table.bootstrapTable('resetView', {
		        	height: _this.getTableHeight()
		    	});
		    });
	    },

	    initEvent: function(){
	    	var $table = this.$table,
	    		$remove = this.$remove;

	    	$table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
		        $remove.prop('disabled', !$table.bootstrapTable('getSelections').length);
		    });
	    }

	}

	window.List = List;
})(this, document);
