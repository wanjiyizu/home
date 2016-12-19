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
})();