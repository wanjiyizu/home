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

	var uploader = WebUploader.create({

	    // 选完文件后，是否自动上传。
	    auto: true,

	    // 文件接收服务端。
	    server: 'http://localhost:8080/img/upload.html',

	    // 选择文件的按钮。可选。
	    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
	    pick: {
	    	id: '#imgpickcover',
	    	multiple: false
	    },

	    thumb: {
	    	 width: 216,
    		height: 124
	    },

	    formData: {
	    	"oldUrl": "http://img.youmifinance.com/img/images/news/1481098521222/cover/1481100563911.png",
	    	"dir": "images/news/2016/cover"
	    },

	    // 只允许选择图片文件。
	    accept: {
	        title: 'Images',
	        extensions: 'gif,jpg,jpeg,bmp,png',
	        mimeTypes: 'image/jpg,image/jpeg,image/png,image/gif'
	    }
	});

	uploader.on("fileQueued", function(file){

		var $img,
			wrap = $("#cover-image-thumb");
		wrap.html("<img class=''>");
		$img = wrap.find("img");
		uploader.makeThumb( file, function( error, src ) {

	        if ( error ) {
	            // $img.replaceWith('<span>不能预览</span>');
	            return;
	        }

	        $img.attr( 'src', src );
	    });
	});

	$("#save").on("click", function(){
		$("#file").trigger("click");
		
	});

	$("#file").on("change", function(e){
		var file = e.target.files[0];
		var xhr = new XMLHttpRequest();
		var formData = new FormData();
		xhr.upload.onprogress = function( e ){
			// console.log("=============");
		}
		formData.append("file", file);
		xhr.open("post", "http://localhost:8080/img/test_upload.html", true);
		xhr.send(formData);

	})
})();