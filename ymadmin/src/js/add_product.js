(function(window, document){

	var relatedTarget,
		sortables = [],
		$table1 = $("#table1"),
		$table2 = $("#table2"),
		$table3 = $("#table3"),
		$remove1 = $("#remove-table1"),
		$remove2 = $("#remove-table2"),
		$remove3 = $("#remove-table3");
		sortableOpts = {
    		handle: '.input-move',
    		//sort: true,
    		/*delay: 500,*/
    		ghostClass: 'ghost',
    		chosenClass: 'chosen',
    		forceFallback: true,	//生成拖动副本
    		scroll: true,
    		dataIdAttr: 'data-id'
    	};
	
	/*生成拖动排序列表*/
  	sortables.push(Sortable.create(simpleList1, sortableOpts));
  	sortables.push(Sortable.create(simpleList2, sortableOpts));
  	sortables.push(Sortable.create(simpleList3, sortableOpts));
  	sortables.push(Sortable.create(simpleList4, sortableOpts));

  	/*添加表格一行*/
	$(".add-tr").on("click", function(){
		var data,
			target = $(this).data("target"),
			template = $(this).data("template"),
		data = randomData.call($(template), $(target));

		if(data != null){
			$(target).bootstrapTable("prepend", data);
		}
	});

	/*添加一行数据*/
    function randomData($table) {
        var rows = [],
        	html = this.html(),
        	data = null,
        	date = "",
        	dateStr = null,
        	$tbody = $table.find("tbody"),
        	$firstTr = $tbody.find("tr").first();

        if($firstTr.find("input[type=date]").val()){
        	dateStr = $firstTr.find("input[type=date]").val();
        	date = getDate(new Date(dateStr));
        }else if($firstTr.find("input[type=month]").val()){
        	dateStr = $firstTr.find("input[type=month]").val();
        	date = getMonth(new Date(dateStr));
        }

       	html = html.replace(/_date/, date);
        try{
        	data = JSON.parse(html);
        	rows.push(data);
        	return rows;
        }catch(err){
        	console.log(err);
        	return null;
        }
    }

    /*生成时间*/
    function getDate(date){
		var year, month, days;

		date.setDate(date.getDate()+7)
		month = date.getMonth()+1;
		year = date.getFullYear();
		if(month < 10){
			month = "0"+month;
		}else{
			month = month;
		}
		if(date.getDate() < 10){
			days = "0"+date.getDate()
		}else{
			days = date.getDate();
		}
		return year+"-"+month+"-"+days;
	}

	function getMonth(date){
		var year, month, days;
		date.setMonth(date.getMonth()+1);
		month = date.getMonth()+1;
		year = date.getFullYear();
		if(month < 10){
			month = "0"+month;
		}else{
			month = month;
		}
		if(date.getDate() < 10){
			days = "0"+date.getDate()
		}else{
			days = date.getDate();
		}
		return year+"-"+month;
	}
	
	/*删除一行表格*/
	$table1.on("check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table", function(){
		$remove1.prop("disabled", !$(this).bootstrapTable("getSelections").length);
	});

	$(".table").on("keydown", ".js-last-input", function(e){
		if(e.keyCode == 9){
			$(".add-tr").trigger("click");
			return false;
		}
		
	});

	$(".table").on("keyup", ".js-setnext", function(){
		$(this).parent().next().find("input").val($(this).val());
	});

	$(".table").on("keyup", ".js-setprev", function(){
		$(this).parent().prev().find("input").val($(this).val());
	});

	$table2.on("check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table", function(){
		$remove2.prop("disabled", !$(this).bootstrapTable("getSelections").length);
	});

	$table3.on("check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table", function(){
		$remove3.prop("disabled", !$(this).bootstrapTable("getSelections").length);
	});

	$remove1.click(function(){
		var ids = getIdSelections.call($table1);
        $table1.bootstrapTable('remove', {
            field: 'state',
            values: ids
        });
        $remove1.prop('disabled', true);
	});

	$remove2.click(function(){
		var ids = getIdSelections.call($table2);
        $table2.bootstrapTable('remove', {
            field: 'state',
            values: ids
        });
        $remove2.prop('disabled', true);
	});

	$remove3.click(function(){
		var ids = getIdSelections.call($table3);
        $table3.bootstrapTable('remove', {
            field: 'state',
            values: ids
        });
        $remove3.prop('disabled', true);
	});

	/*获取选择的行*/
	function getIdSelections(){
		var arr = this.bootstrapTable("getSelections");
		return $.map(arr, function(row){
			return row.state;
		});
	}

	/*读取描述字段值到编辑框*/
	$("#myModal").on("show.bs.modal", function(e){
		relatedTarget = e.relatedTarget;
		$("#modal-editor").val(relatedTarget.value);
	});

	/*保存描述字段值*/
	$("#modal-sure").on("click", function(){
		relatedTarget.value = $("#modal-editor").val();
		$('#myModal').modal('hide');
	});

	/*添加描述字段*/
	$(".add-field").on("click", function(){
		var parent = $(this).parents(".form-left"),
			listGroup = parent.find(".list-group"),
			index = listGroup.children(".list-group-item").length || 0,
			fieldListItem = $("#fieldListItem").html();
		index = index + 1;
		listGroup.find(".list-group-no-data").hide();
		fieldListItem = fieldListItem.replace(/{priority}/, index);
		listGroup.append(fieldListItem);
	});

	/*删除描述字段*/
	$(".remove-field").click(function(e){
		var length,
			$listGroup = $(this).parents(".form-left").find(".list-group");
		$listGroup.find("input[type=checkbox]:checked").parents("li").remove();
		$(this).prop("disabled", true);
		length = $listGroup.find(".list-group-item").length;
		if(length == 0){
			$listGroup.html("<li class='list-group-no-data'>暂时没有字段，请点击添加字段按钮添加</li>");
		}
	});

	/*预览描述字段效果*/
	$(".preview").click(function(){
		var target = $(this).data("target");
		// $(target).attr("src", "http://www.youmilc.com");
	});

	/*点击全选按钮选择描述字段*/
	$(".list-group").on("check.bs.table", function(){
		var length = $(this).find("input[type=checkbox]:checked").length;
		if(length > 0){
			$(this).parent().find(".remove-field").prop("disabled", false);
		}else{
			$(this).parent().find(".remove-field").prop("disabled", true);
		}
	});

	$("input[type=checkbox]").click(function(e){
		$(this).parents(".list-group").trigger("check.bs.table");
	});

	$(".check-all").click(function(e){
		$(this).parents(".form-left").find("input[type=checkbox]").prop("checked", true);
		$(this).parents(".form-left").find(".list-group").trigger("check.bs.table");
	});

	window.sortables = sortables;

})(this, document);