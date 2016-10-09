!(function(window, document){
	var utils = (function(){
		var me = {};
		me.addEvent = function(el, type, fn, capture){
			el.addEventListener(type, fn, !!capture);
		}
		me.removeEvent = function(el, type, fn, capture){
			el.removeEventListener(type, fn, !!capture);
		}
		me.hasClass = function(el, c){
			var re = new RegExp("(^|\\s)" + c + "(\\s|$)");
			return re.test(el.className);
		}
		me.addClass = function(el, c){
			if(me.hasClass(el, c)){
				return;
			}
			var classList = el.className.split(" ");
			classList.push(c);
			el.className = classList.join(" ");

		}
		me.removeClass = function(el, c){
			if(!me.hasClass(el, c)){
				return;
			}
			var re = RegExp("(^|\\s)" + c +"(\\s|$)", "g");
			el.className = el.className.replace(re, "");
		}
		me.createElementByHtml = function(html){
			var el = document.createElement("div");
			el.innerHTML = html;
			return el;
		}
		return me;
	})();

	function ym_paging(el, options){
		this.wrapper = typeof el == "string" ? document.querySelector(el) : el; 
		this.options = {
			total: 300,		// 总个数
			perPage: 10,	// 每页个数
			p: 2,			// 省略号左边显示的页数
			left: 4,		// 左边展示的页数
			right: 4,		// 右边显示的页数
			initSize: 5,	// 初始化显示的页数
			maxSize: 9,		// 最大显示页数
			current: 1,		// 默认选中的页数
			callback: function(){
			
			}
		}
		for(var i in options){
			this.options[i] = options[i];
		}
		if(this.options.total / this.options.perPage > 1){
			this.totalPage = parseInt(this.options.total / this.options.perPage);
			if(this.options.total % this.options.perPage != 0){
				this.totalPage++;
			}
		}
		if(this.totalPage > 1){
			this.init();
		}else if(this.wrapper != null){
			this.wrapper.innerHTML = ""
		}
	}

	ym_paging.prototype = {
		init : function(){
			var newDiv = document.createElement("div");
			this.wrapper.parentNode.insertBefore(newDiv, this.wrapper);
			this.wrapper.parentNode.removeChild(this.wrapper);
			var classList = this.wrapper.classList;
			var className = "";
			if(classList.length > 0){
				className = classList[0];
			}
			if(this.wrapper.id){
				newDiv.id = this.wrapper.id;
				this.wrapper.removeAttribute('id');
			}
			newDiv.className = "ym_paging";
			this.wrapper = newDiv;
			var wrapHtml = "<ul class='items'></ul>"+
						"<div class='total'>共 "+this.totalPage+" 页，</div>"+
						"<div class='form'>"+
						"	<span class='text'>到第</span>"+
						"	<input class='input' type='number' value='"+this.options.current+"' min='1' max='"+this.totalPage+"' />"+
						"	<span class='btn'>确定</span>"+
						"</div>";
			var el = utils.createElementByHtml(wrapHtml);
			var length = el.children.length;
			for(var i = 0; i < length; i++){
				this.wrapper.appendChild(el.children[0]);
			}
			this.paging = this.wrapper.querySelector(".items");
			this.button = this.wrapper.querySelector(".btn");
			utils.addEvent(this.button, "click", this);
			this.drawPage();
			this.initEvents();
			
		},

		drawPage : function(){
			var length;
			if(this.totalPage <= this.options.initSize){
				length = this.totalPage + 2;
			}else if(this.totalPage == this.options.initSize){
				length = this.options.initSize+2;
			}else{
				length = this.options.initSize+3;
			}
			var current = this.options.current;
			for(var i = 0; i < length; i++){
				var li = document.createElement("li");
				li.index = 0;
				if(i == 0 && current == 1){
					// 左箭头开始第一页是当前页的情况下，左箭头disabled
					li.className = "item prev prev-disabled";
				}else if(i == 0 && current != 1){
					// 左箭头开始第一页不是当前页的情况下，左箭头状态enabled
					li.className = "item prev";
				}else if(i == length-2 && this.totalPage > length){
					// 如果总页数大于初始页数，右箭头前一个为省略号
					li.className = "item dot";
					li.innerText = "...";
				}else if(i == length-1 && current == this.totalPage){
					// 如果右箭头前一页为当前页，右箭头状态disabled
					li.className = "item next next-disabled";
				}else if(i == length-1 && current != this.totalPage){
					// 如果右箭头前一页不是当前页，右箭头状态enabled
					li.className = "item next";
				}else if(i == current){
					// 当前页状态为active
					li.className = "item active";
					li.innerText = i;
				}else{
					li.className = "item j_ajax";
					li.innerText = i;
				}
				this.paging.appendChild(li);
			}
			this.items = this.paging.querySelectorAll(".item");
		},

		initEvents: function(){
			var items = this.paging.querySelectorAll(".item");
			var length = items.length;
			var active;			// 点击页的className
			var nextDisabled;	// 右箭头disabled的className
			var prevDisabled;	// 左箭头disabled的className
			var li;
			for(var i = 0; i < length; i++){
				li = items[i];
				active = li.classList[1];
				prevDisabled = li.classList[2];
				nextDisabled = li.classList[2];
				if(i == 0 && prevDisabled != "prev-disabled"){
					utils.addEvent(li, "click", this, false);
				}else if(active == "j_ajax"){
					utils.addEvent(li, "click", this, false);
				}else if(i == length - 1 && nextDisabled != "next-disabled"){
					utils.addEvent(li, "click", this, false);
				}
			}
			
		},

		handleEvent: function(e){
			if(e.type != "click"){
				return;
			}
			if(utils.hasClass(e.currentTarget, "next")){
				this.next();
			}else if(utils.hasClass(e.currentTarget, "prev")){
				
				this.prev();
			}else if(!utils.hasClass(e.currentTarget, "active") && !utils.hasClass(e.currentTarget, "btn")){
				this.active(e);
			}else if(utils.hasClass(e.currentTarget, "btn")){
				this.skip();
			}
		},

		prev: function(){
			var currentEl = this.paging.querySelector(".active");
			var index =  currentEl.index || 1;
			var num = Number(currentEl.innerText);
			--index;
			num--;
			var obj = {
				index: index,
				num: num
			}
			this.goPage(obj);
		},

		next: function(){
			var currentEl = this.paging.querySelector(".active");
			var index =  currentEl.index || 1;
			var num = Number(currentEl.innerText);
			++index;
			num++;
			var obj = {
				index: index,
				num: num
			}
			this.goPage(obj);
		},

		skip: function(){
			this.value = this.wrapper.querySelector(".input").value;
			var currentEl = this.paging.querySelector(".active");
			var currentNo = Number(currentEl.innerText);
			if(this.value == "" || this.value == currentNo || this.value > this.totalPage || this.value == 0){
				return;
			}
			var obj = {
				num: this.value
			}
			this.goPage(obj);
		},

		active: function(e){
			var target;
			if(e != null){
				target = e.currentTarget;
			}
			var num = Number(target.innerText);	// 点击的当前页数
			var obj = {
				index: target.index,
				num: num
			}
			this.goPage(obj);
		},

		goPage: function(obj){
			var centerNo,			// 中间的数字
				centerEl,
				items		= this.items,
				length		= items.length,
				p			= this.options.p,
				m			= this.options.left,
				n			= this.options.right,
				dot			= items[this.options.p+1].classList[1];
			for(var i = 0; i < length; i++){
				if(utils.hasClass(items[i], "active")){
					utils.removeClass(items[i], "active");
					utils.addClass(items[i], "j_ajax");
				}else if(utils.hasClass(items[i], "next-disabled")){
					utils.removeClass(items[i], "next-disabled");
				}else if(utils.hasClass(items[i], "prev-disabled")){
					utils.removeClass(items[i], "prev-disabled");
				}
			}

			console.log(obj.num);
			if(obj.num <= (p+m+1)){
				this.repaint(true, obj.num);
			}else if(obj.num > (p+m+1) && obj.num <= (p+m+n) && dot != "dot" && this.totalPage > this.options.maxSize){
				this.repaint(false, obj.num);
			}else if(obj.num > (p+m+1) && this.totalPage == this.options.maxSize){
				this.repaint(true, obj.num);
			}else if(obj.num > (p+m+1) && dot != "dot"){
				this.repaint(false, obj.num);
			}else if(dot == "dot"){
				var i = p+m+2; // p+2+m+1
				centerEl = items[i];
				centerNo = Number(centerEl.innerText);
				if((obj.num > (centerNo-m) && obj.num <= (centerNo -1)) || (obj.num >= (centerNo+1) && obj.num <= (centerNo+n-1)) || obj.num == this.totalPage){
					this.initEvents();
					for(var i = 0; i < length; i++){
						if(Number(items[i].innerText) == obj.num){
							utils.addClass(items[i], "active");
							utils.removeEvent(items[i], "click", this);
						}
					}
					if(this.value != ""){
						this.wrapper.querySelector(".input").value = obj.num;
					}
				}else{
					this.repaint(false, obj.num);
				}
			}
			if(obj.num == this.totalPage){
				// 点击最后一个的时候
				utils.addClass(items[length-1], "next-disabled");
				utils.removeEvent(items[length-1], "click", this);
			}else if(obj.num == 1){
				utils.addClass(items[0], "prev-disabled");
				utils.removeEvent(items[0], "click", this);
			}
			if(this.options.callback){
				this.options.callback(obj.num,this.options.perPage);
			}
		},

		repaint: function(flag, num){
			var	sum,
				length,
				_temp = num,
				step = num - 1,
				p = this.options.p,
				left = this.options.left,
				right = this.options.right,
				maxSize = this.options.maxSize,
				initSize = this.options.initSize,
				total = this.totalPage,
				center = p + left + 2;		// 减去一个箭头和两个数字再加上yi
			
			if(this.value != ""){
				this.wrapper.querySelector(".input").value = num;
			}
			
			if(flag){
				sum = num + step;
				if(this.totalPage <= this.options.initSize){
					length = this.totalPage + 2;
				}else if(num + step >= this.options.maxSize && this.totalPage == this.options.maxSize){
					length = this.options.maxSize + 2;
				}else{
					length = this.options.initSize + step + 3;
				}
			}else{
				sum = this.totalPage - num;
				if(sum <= right){
					length = p + left + (this.totalPage - num) + 4;
				}else{
					length = p + left + right + 5;
				}
			}

			this.paging.innerHTML = "";
			for(var i = 0; i < length; i++){
				var li = document.createElement("li");
				li.index = i;
				if(i == 0 && num != 1){
					li.className = "item prev";
				}else if(i == 0 && num == 1){
					li.className = "item prev prev-disabled";
				}else if(i == (this.options.p+1) && !flag){
					li.className = "item dot";
					li.innerText = "...";
				}else if(i == length-2 && total > initSize && total != maxSize && flag){
					li.className = "item dot";
					li.innerText = "...";
				}else if(i == length-2 && total == maxSize && sum < maxSize && flag){
					li.className = "item dot";
					li.innerText = "...";
				}else if(i == length - 2 && sum > right && !flag){
					li.className = "item dot";
					li.innerText = "...";
				}else if(i == length-1 && this.totalPage == num){
					li.className = "item next next-disabled";
				}else if(i == length-1 && this.totalPage != num){
					li.className = "item next";
				}else if((i == center && !flag) || (i == num && flag)){
					li.className = "item active";
					li.innerText = num;
				}else if(i > (this.options.p+1) && i < center && !flag){
					li.className = "item j_ajax";
					li.innerText = num - left;
					left--;
				}else if(i > center && i < length - 2 && sum > right && !flag){
					li.className = "item j_ajax";
					_temp++;
					li.innerText = _temp;
				}else if(i > center && sum <= right && !flag){
					li.className = "item j_ajax";
					_temp++;
					li.innerText = _temp;
				}else if(i < (this.options.p+1) && i > 0 && !flag){
					li.className = "item j_ajax";
					li.innerText = i;
				}else{
					li.className = "item j_ajax";
					li.innerText = i;
				}
				this.paging.appendChild(li);
			}
			this.initEvents();
			this.items = this.paging.querySelectorAll(".item");
		}
	}
	window.ym_paging = ym_paging;
})(this, document);