(function(window, document){
	var ue = UE.getEditor('container',{
		initialFrameHeight: 540,
	 	autoHeightEnabled: false,
	 	serverUrl: "http://localhost:8080/img/controller.jsp",
	 	elementPathEnabled: false,
	 	wordCount: false,
		toolbars: [
		     [
		        'undo', //撤销
		        'redo', //重做
		        'bold', //加粗
		        'italic', //斜体
		        'underline', //下划线
		        'forecolor', //字体颜色
		        'horizontal', //分隔线
		        'blockquote', //引用
		        'strikethrough', //删除线
		        'formatmatch', //格式刷
		        'backcolor', //背景色
		        'link', //超链接
		        'removeformat', //清除格式
		        'fontfamily', //字体
		        'fontsize', //字号
		        'lineheight', //行间距
		        'justifyleft', //居左对齐
		        'justifyright', //居右对齐
		        'justifycenter', //居中对齐
		        'justifyjustify', //两端对齐
		        'insertorderedlist', //有序列表
		        'insertunorderedlist', //无序列表
		        'rowspacingtop', //段前距
		        'rowspacingbottom', //段后距
		        'insertimage', //多图上传
		        'imagenone', //默认
		        'imageleft', //左浮动
		        'imageright', //右浮动
		        'imagecenter', //居中
		        'searchreplace', //查询替换
		        'insertvideo', //视频
		        'autotypeset', //自动排版
		        'music', //音乐
		        'drafts', // 从草稿箱加载
		        'source', //源代码
		    ]
		]
	});

	var uploaderOpts = {
	    auto: true,
	    server: 'http://localhost:8080/img/test_upload.html',
	    accept: {
	        title: 'Images',
	        extensions: 'gif,jpg,jpeg,bmp,png',
	        mimeTypes: 'image/jpg,image/jpeg,image/png,image/gif'
	    }
	};

	var coverUploader = null,
		thumbUploader = null,
		realPath = null,
		time = getTime();
		imageFolder = "images/news/" + time;

	coverUploader = WebUploader.create(uploaderOpts),
	thumbUploader = WebUploader.create(uploaderOpts);
	uploadHandler.call(coverUploader, "#imgpickcover", $("#cover-image-thumb"), 216, 124);
	uploadHandler.call(thumbUploader, "#imgpickthumb", $("#logo-image-thumb"), 216, 99);

	function uploadHandler(pickEl, $wrap, width, height){
		var uploader = this;
		uploader.addButton({
			id: pickEl,
		    multiple: false
		});

		uploader.on("fileQueued", function(file){
			var $img,
				wrap = $wrap;
			wrap.html("<img>");
			$img = wrap.find("img");
			coverUploader.makeThumb( file, function( error, src ) {

		        if ( error ) {
		            // $img.replaceWith('<span>不能预览</span>');
		            return;
		        }

		        $img.attr( 'src', src );
		    },width,height);
		});

		uploader.on("uploadStart", function(file){
			var oldUrl = $wrap.data("src"),
				type = $wrap.data("type"),
				dir = type == "cover" ? "images/news/"+time+"/cover" : "images/news/"+time+"/logo";
			console.log(oldUrl + "===" + dir);
			uploader.option("formData", {
				"oldUrl": oldUrl,
	    		"dir": dir
			});
		});

		uploader.on("uploadProgress", function(file, percentage){
			var  $percentage = $wrap.find(".progress .progress-bar");
			if( !$percentage.length ){
				$percentage = $wrap.append("<div class='progress'><div class='progress-bar progress-bar-warning progress-bar-striped' role='progressbar' aria-valuemin='0' aria-valuemax='100'></div>").find(".progress .progress-bar");
			}
			$percentage.css("width", percentage * 100 + '%');
		});

		uploader.on("uploadComplete", function(file){
			$wrap.find(".progress").remove();
		});

		uploader.on("uploadAccept", function(file, ret){
			$wrap.data("src", ret.src);
		});
	}

	
	$("#save").on("click", save);
	$("#preview").on("click", preview);
	$("#publish").on("click", publish);
	
	function save(){
		// 获取数据
		var news = getNewsData();
		news["status"] = 0;
		// 验证数据
		validate(news);
		// 提交数据
	}

	function preview(){
		var news = getNewsData();
		news["status"] = 0;
		validateStrictly(news);
	}

	function publish(){
		var news = getNewsData();
		news["status"] = 1;
		validateStrictly(news);
	}

	function getNewsData(){
		var data = {
			title: $("#js-news-title").val(),
			content: ue.getContent(),
			brief: $("#js-news-summary").val(),
			coverImg: $("#cover-image-thumb").data("src"),
			logoImg: $("#logo-image-thumb").data("src"),
			uploader: $("#js-news-author").val(),
			source: $("#js-news-source").val(),
			date: $("#js-news-date").val(),
			status: $("#save").data("status") || 0,
			realPath: realPath || "",
			imgDir: imageFolder
		}
		return data;
	}

	function validate(data){
		if(util.isEmpty(obj.title) && util.isEmpty(obj.content)){
			$("#page-tip").text("请先输入一段正文（或者标题），再点击保存按钮。").parent().show();
			console.log("请先输入一段正文（或者标题），再点击保存按钮。");
		}
	}

	function validateStrictly(obj){

		if(util.isEmpty(obj.title)){
			$("#page-tip").text("标题不能为空").parent().fadeIn().fadeOut(3000);
			$("#js-news-title").focus();
		}else if(util.isEmpty(obj.content)){
			$("#page-tip").text("正文必须有文字，请在正文中至少输入1个汉字后重试").parent().fadeIn().fadeOut(3000);
			ue.focus();
		}else if(util.isEmpty(obj.brief)){
			$("#page-tip").text("摘要不能为空").parent().fadeIn().fadeOut(3000);
			$("#js-news-summary").focus();
		}else if(util.isEmpty(obj.coverImg)){
			$("#page-tip").text("必须选择一张文章封面图").parent().fadeIn().fadeOut(3000);
		}else if(util.isEmpty(obj.logoImg)){
			$("#page-tip").text("必须选择一张文章缩略图").parent().fadeIn().fadeOut(3000);
		}else if(util.isEmpty(obj.uploader)){
			$("#page-tip").text("发布者不能为空").parent().fadeIn().fadeOut(3000);
			$("#js-news-author").focus();
		}else if(util.isEmpty(obj.source)){
			$("#page-tip").text("文章来源不能为空").parent().fadeIn().fadeOut(3000);
			$("#js-news-source").focus();
		}else if(util.isEmpty(util.isEmpty(obj.date))){
			$("#page-tip").text("时间不能为空").parent().fadeIn().fadeOut(3000);
			$("#js-news-date").focus();
		}
	}

	function getTime(){
		var time = $("#save").data("time"),
			stroageTime = localStorage.getItem("time");
		if(util.isNotEmpty(stroageTime)){
			time = stroageTime;
		}else if(util.isEmpty(time) && util.isEmpty(stroageTime)){
			time = new Date().getTime();
		}

		return time;
	}

	window.onbeforeunload = function(){
		// return "为确保内容不丢失";
		var data = getNewsData();
		var time = new Date().getTime();
		localStorage.setItem(time, data);
		return true;
	}

})(this, document);