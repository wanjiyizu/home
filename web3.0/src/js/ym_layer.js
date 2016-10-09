!(function(win,doc){
	 var utils = {
		append : function(target, str){
			var dom = typeof target === "string" ? document.querySelector(target) : target;
			var div = document.createElement("div");
			div.innerHTML = str;
			while(div.firstChild){
				dom.appendChild(div.firstChild);
			}
		},

		remove : function(target, ele){
			var dom = typeof target === "string" ? document.querySelector(target) : target;
			if(dom == null){
				alert();
			}
			dom.removeChild(ele);
		},

		center : function(target){
			var width2 = window.innerWidth;
			var height2 = window.innerHeight;
			if(width2 <= 320){
				target.querySelector(".content").style.maxWidth = 200 + "px";
			}
			var width = target.offsetWidth;
			var height = target.offsetHeight;
			
			var x = (width2 - width) / 2;
			var y = (height2 - height) / 2;
			target.style.left = x + "px";
			target.style.top = y + "px";
			var _this = this;
			window.addEventListener("resize",function(){
				_this.center(target);
			},false);
		},
		
		addEvent : function(el, type, fn, capture){
			el.addEventListener(type, fn, !!capture);
		},

		removeEvent : function(el, type, fn, capture){
			el.removeEventListener(type, fn, !!capture);
		}
	 }

	win.ym_layer = {
		alert : function(msg,obj){
			this.obj = obj || {};
			this.template(msg);
			this.initEvents();
		},

		
		template : function(message){
			var title = "<div class='ym_title'>信息</div>";
			var content = "<div class='ym_content'>"+ message +"</div>";
			var loading = "<div class='ym_loading'>"+ message +"</div>";
			this.loadingTemplate = loading;
			var btn_close = "<span class='btn_close'></span>";
			var bottom = "<div class='ym_bottom'>";
			this.obj.btn = this.obj.btn || [];
			if(this.obj.btn.length == 0){
				bottom += "<span class='sure'>确定</span>";
			}
			for(var i = 0; i < this.obj.btn.length; i++){
				if(i == 0){
					bottom += "<span class='sure'>"+this.obj.btn[i]+"</span>";
				}else if(i == 1){
					bottom += "<span class='close'>"+this.obj.btn[i]+"</span>";
				}else{
					bottom += "<span class='ym_btn_"+i+"'>"+this.obj.btn[i]+"</span>";
				}
			}

			bottom += "</div>";
			var bottom2 = "<div class='bottom'><span class='sure'>确定</span><span class='close'>取消</span></div>";
			if(this.obj.type == 2 && this.obj.btn.length != 0){
				bottom = bottom;
			}else if(this.obj.type == 2 && this.obj.btn.length == 0){
				bottom = bottom2;
			}
			//bottom = this.obj.type == 2 ? bottom2 : bottom;
			var alert_template = "<div class='ym_alert'>"+ title + content + bottom+"</div>";
			var overlay = "<div class='ym_overlay'></div>";
			this.loading = document.querySelector(".ym_loading");
			this.dialog = document.querySelector(".ym_alert");
			if(this.obj.type == 1 && this.loading == null){
				utils.append("body",loading);
				this.dialog = document.querySelector(".ym_loading");
				
			}else if(this.dialog == null){
				utils.append("body",alert_template);
				this.dialog = document.querySelector(".ym_alert");
			}
			
			this.overlay = document.querySelector(".ym_overlay");
			if(this.overlay == null){
				utils.append("body",overlay);
				this.overlay = document.querySelector(".ym_overlay");
			}
		
			utils.center(this.dialog);
		},
		
		// 邦定事件
		initEvents : function(isRemove){
			var eventType = isRemove ? utils.removeEvent : utils.addEvent;
			var overlay = !!this.overlay ? this.overlay : document.querySelector(".ym_overlay");
			var sure = this.dialog.querySelector(".sure");
			var cancel = this.dialog.querySelector(".close");
			var loading= this.loading;
			eventType(overlay, "click", this, true);
			eventType(overlay, "touchstart", this);
			if(typeof sure != "string" && sure != null){
				eventType(sure, "click", this, true);
				eventType(sure, "touchstart", this);
			}

			if(typeof cancel != "string" && cancel != null){
				eventType(cancel, "click", this, true);
				eventType(cancel, "touchstart", this);
			}

			if(typeof loading != "string" && loading != null){
				eventType(loading, "click", this, true);
				eventType(loading, "touchstart", this);
			}
		},

		// 处理事件
		handleEvent : function(e){
			e.preventDefault();
			switch(e.type){
				case "click":
				case "touchstart" : 
					this.close(this.dialog);
			}
		},
		
		// 关闭弹层函数
		close : function(dialog){
			var timer = null;

			clearTimeout(timer);
			if(this.obj.sure) this.obj.sure(dialog);
			var loading2 = document.querySelector(".ym_loading");;
			if(this.obj.showLoad == 'sure' && loading2 == null){
				utils.append("body", this.loadingTemplate);
				loading2 = document.querySelector(".ym_loading");
				loading2.textContent = "确定了";
				utils.center(loading2);
			}else if(this.obj.showLoad == 'cancel' && loading2 == null){
				utils.append("body", this.loading);
				loading2 = document.querySelector(".ym_loading");
				loading2.textContent = "取消了";
				utils.center(loading2);
			}else{
				utils.remove("body", this.overlay);
			}
			var obj = this.obj;
			var overlay = this.overlay;
			// 一秒之后执行
			timer = setTimeout(function(){
				if(obj.showLoad){
					utils.remove("body", loading2);
				}
				utils.remove("body", overlay);
			},1000);


			//if(this.obj.cancel) this.obj.cancel(dialog);
			if(dialog != null){
				utils.remove("body", dialog);
			}
			
		},
		
		// 打开自定义弹层
		open : function(content,obj){
			obj = obj || {};

			// 在body下创建一个自定义box
			utils.append("body", content);

			// 获取新创建的box
			var boxEl = document.body.lastElementChild;
			
			// 在body中创建一个overlay
			var overlay = "<div class='ym_overlay'></div>";
			utils.append("body", overlay);

			// 获取新创建的overlay
			var overlayDom = document.querySelector(".ym_overlay");
			
			// 赋值
			this.overlay = overlayDom;
			this.dialog = boxEl;
			
			// 给弹层增加特效
			boxEl.style.animation = "showAlert 0.3s";
			boxEl.style.position = "fixed";
			boxEl.style.zIndex = "99999";
			boxEl.style.display = "block";
			
			// 初始化事件
			this.initEvents();
			// 居中弹框
			utils.center(boxEl);
			// 执行回调函数
			if(obj.callback) obj.callback(boxEl);
		}

	};
	
})(window,document);