(function(win, doc) {
	var utils = {
		append : function(target, str) {
			var dom = typeof target === "string" ? document
					.querySelector(target) : target;
			var div = document.createElement("div");
			div.innerHTML = str;
			while (div.firstChild) {
				dom.appendChild(div.firstChild);
			}
		},

		remove : function(target, ele) {
			var dom = typeof target === "string" ? document
					.querySelector(target) : target;
			dom.removeChild(ele);
		},

		center : function(target) {
			var width2 = window.innerWidth;
			var height2 = window.innerHeight;
			var content = target.querySelector(".content");
			if(width2 <= 320 && content != null){
				 target.querySelector(".content").style.maxWidth = 240 + "px";
			}
			var width = target.offsetWidth;
			var height = target.offsetHeight;
			var x = (width2 - width) / 2;
			var y = (height2 - height) / 2;
			target.style.left = x + "px";
			target.style.top = y + "px";
			var _this = this;
			window.addEventListener("resize", function() {
				_this.center(target);
			}, false);
		}
	}

	win.ym_layer = {
		alert : function(msg, obj) {
			this.obj = obj || {};
			this.template(msg);
			this.bindEvent();
		},

		template : function(message) {
			var title = "";
			if(this.obj.title){
				title = "<div class='title'>"+this.obj.title+"</div>";
			}
			var content = "<div class='content'>" + message + "</div>";
			var loading = "<div class='ym_loading'>" + message + "</div>";
			this.loading = loading;
			var btn_close = "<span class='btn_close'></span>";
			var bottom = "<div class='bottom'>";
			this.obj.btn = this.obj.btn || [];
			if(this.obj.btn.length == 0){
				bottom += "<span class='sure'>确定</span>";
			}
			for (var i = 0; i < this.obj.btn.length; i++) {
				if (i == 0) {
					bottom += "<span class='sure'>" + this.obj.btn[i]
							+ "</span>";
				} else if (i == 1) {
					bottom += "<span class='close'>" + this.obj.btn[i]
							+ "</span>";
				} else {
					bottom += "<span class='ym_btn_" + i + "'>"
							+ this.obj.btn[i] + "</span>";
				}
			}

			bottom += "</div>";
			var bottom2 = "<div class='bottom'><span class='sure'>确定</span><span class='close'>取消</span></div>";
			if (this.obj.type == 2 && this.obj.btn.length != 0) {
				bottom = bottom;
			} else if (this.obj.type == 2 && this.obj.btn.length == 0) {
				bottom = bottom2;
			}
			// bottom = this.obj.type == 2 ? bottom2 : bottom;
			var alert_template = "<div class='ym_alert'>" + title + content
					+ bottom + "</div>";
			var overlay = "<div class='ym_overlay'></div>";
			if (this.obj.type == 1) {
				utils.append("body", loading);
				this.dialog = document.querySelector(".ym_loading");

			} else {
				utils.append("body", alert_template);
				this.dialog = document.querySelector(".ym_alert");
			}

			utils.append("body", overlay);

			this.overlay = document.querySelector(".ym_overlay");
			utils.center(this.dialog);
		},

		bindEvent : function() {
			var dialog = this.dialog;
			var overlay = this.overlay;
			var obj = this.obj;
			if (this.obj.type != 1) {
				var sure = this.dialog.querySelector(".sure");
				var cancel = this.dialog.querySelector(".close");
				var loading = this.loading;
				var timer = null;
				if (sure != null) {
					sure.onclick = function() {
						clearTimeout(timer);
						if (obj.sure)
							obj.sure(dialog);
						utils.remove("body", dialog);
						var loading2 = null;

						if (obj.showSureLoad) {
							utils.append("body", loading);
							loading2 = document.querySelector(".ym_loading");
							loading2.textContent = obj.showSureLoad;
							utils.center(loading2);
							timer = setTimeout(function() {
								if (obj.showSureLoad) {
									utils.remove("body", loading2);
								}

								utils.remove("body", overlay);
							}, 800);
						} else {
							utils.remove("body", overlay);
						}

					};
				}

				if (cancel != null) {
					cancel.onclick = function() {
						clearTimeout(timer);
						if (obj.cancel)
							obj.cancel(dialog);
						utils.remove("body", dialog);
						var loading2 = null;
						if (obj.showCancelLoad) {
							utils.append("body", loading);
							loading2 = document.querySelector(".ym_loading");
							loading2.textContent = obj.showCancelLoad;
							utils.center(loading2);
							timer = setTimeout(function() {
								if (obj.showCancelLoad) {
									utils.remove("body", loading2);
								}
								utils.remove("body", overlay);
							}, 1000);
						} else {
							utils.remove("body", overlay);
						}

					}
				}

			}
			var hasTouch = "ontouchstart" in win ? true : false;
//			if(hasTouch){
//				this.overlay.ontouchstart = function(e) {
//					e.preventDefault();
//					utils.remove("body", this);
//					utils.remove("body", dialog);
//				}
//			}else{
//				this.overlay.onclick = function(e) {
//					e.preventDefault();
//					utils.remove("body", this);
//					utils.remove("body", dialog);
//				}
//			}
			this.overlay.ontouchstart = function(e) {
				e.preventDefault();
				utils.remove("body", this);
				utils.remove("body", dialog);
			}
		},

		open : function(dom, obj) {
			obj = obj || {};
			dom.style.animation = "showAlert 0.3s";
			dom.style.position = "absolute";
			dom.style.zIndex = "999";
			dom.style.display = "block";
			var overlay = "<div class='ym_overlay'></div>";
			utils.append("body", overlay);
			var overlayDom = document.querySelector(".ym_overlay");
			utils.center(dom);
			if (obj.callback)
				obj.callback(overlayDom);
		}

	};

})(window, document);