(function(){
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
	    formData: {
	    	"oldUrl": "http://img.youmifinance.com/img/images/news/1481098521222/cover/1481100563911.png",
	    	"dir": "images/news/2016/cover"
	    },
	    accept: {
	        title: 'Images',
	        extensions: 'gif,jpg,jpeg,bmp,png',
	        mimeTypes: 'image/jpg,image/jpeg,image/png,image/gif'
	    }
	};

	var coverUploader = null,
		thumbUploader = null;

	coverUploader = WebUploader.create(uploaderOpts),
	thumbUploader = WebUploader.create(uploaderOpts);
	uploadHandler.call(coverUploader, "#imgpickcover", $("#cover-image-thumb"), 216, 124);
	uploadHandler.call(thumbUploader, "#imgpickthumb", $("#logo-image-thumb"), 216, 99);

	function uploadHandler(pickEl, $wrap, width, height){

		this.addButton({
			id: pickEl,
		    multiple: false
		});

		this.on("fileQueued", function(file){

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
	}

	
	$("#save").on("click", save);
	$("#preview").on("click", preview);
	
	function save(){
		// 获取数据
		var news = getNewsData();
		news["status"] = 0;
		// 验证数据
		verifyData(news);
		// 提交数据
	}

	function preview(){
		var news = getNewsData();
		news["status"] = 2;
		verifyData(news);
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
			status: $("#save").data("status") || 0
		}
		return data;
	}

	function verifyData(obj){
		if(obj == null){
			return false;
		}

		/*预览和保存并发布的情况下*/
		if(obj.status == 1 || obj.status == 2){
			if(util.isEmpty(obj.title)){
				console.log("标题不能为空");
			}else if(util.isEmpty(obj.content)){
				console.log("正文必须有文字，请在正文中至少输入1个汉字后重试");
			}
		}else{
			/*保存的情况下*/
			if(util.isEmpty(obj.title) && util.isEmpty(obj.content)){
				console.log("请先输入一段正文（或者标题），再点击保存按钮。");
			}
		}

		
	}

})();