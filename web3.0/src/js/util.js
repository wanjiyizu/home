
	var util = {
			
		isEmpty : function(val){
			if(val == ""){
				return true;
			}else if(typeof val == "undefined"){
				return true;
			}else if(val == null){
				return true;
			}else if(val.length == 0){
				return true;
			}else if(!/[^(^\s*)|(\s*$)]/.test(val)){
				return true;
			}else{
				return false;
			}
		},
		
		isNotEmpty : function(val){
			return !this.isEmpty(val);
		}
	}
	
