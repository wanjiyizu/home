var seriesOptions = [],
	seriesCounter = 0,
	names = [],
	fileNames = ['hx', 'hs'],
	createChart = function () {
		$('#highcharts-0').highcharts({
			 xAxis: {
				type: 'datetime',
				gridLineDashStyle: 'longdash',
				dateTimeLabelFormats: {
					second: '%Y-%m-%d<br/>%H:%M:%S',
					minute: '%Y-%m-%d<br/>%H:%M',
					hour: '%Y-%m-%d<br/>%H:%M',
					day: '%Y<br/>%m-%d',
					week: '%Y<br/>%m-%d',
					month: '%Y-%m',
					year: '%Y'
				},
				gridLineWidth: 1,
				lineColor: '#999',
				tickColor: '#999',
				showFirstLabel: true,
				showLastLabel: true,
				labels: {
					style: {
						color: '#000',
						font: '11px Trebuchet MS, Verdana, sans-serif',
						align: 'right',
						style: {font: 'normal 13px 宋体'}
					},
					formatter: function () {
						return Highcharts.dateFormat('%Y-%m-%d', this.value);
					}
				},
				title: {
					style: {
						color: '#333',
						fontWeight: 'bold',
						fontSize: '12px',
						fontFamily: 'Trebuchet MS, Verdana, sans-serif'
					}
				}
			},
			
			yAxis: {
				showLastLabel: false,
				tickPixelInterval: 40,
				lineColor: '#999',
				lineWidth: 1,
				tickWidth: 1,
				tickColor: '#999',
				labels: {
					align: 'right',
					x: -10,
					y: 5,
					style: {
						color: '#000',
						font: '11px Trebuchet MS, Verdana, sans-serif'
					},
					format: '{value} %'
				},
				title: {
					enabled:false
				}
			},
			tooltip: {
				crosshairs: true,
				formatter: function () {
					var date = new Date(this.x);
					var s = '<b>时间: ' + date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日' + '</b>';
	                $.each(this.points, function (i, point) {
	                	if(i === 0){
	                		s += '<br/><span style="color:' + this.series.color + '">累计收益: ' +
	                		this.y.toFixed(2) + '%</span>';
	                	}else{
	                		s += '<br/><span style="color:' + this.series.color + '">' + this.series.name + '收益: ' +
	                		this.y.toFixed(2) + '%</span>';
	                	}
	                });
	                return s;
		        },
		        shared: true
				
			},
			credits: {
				enabled: false,
				href: null,
				text: ''
			},

			plotOptions: {
				series: {lineWidth: 2},
				line: {
					marker:{enabled:false},
					cursor: 'pointer'
				}
			},
			legend: {
				enabled: true,
				itemStyle: {
					font: '9pt Trebuchet MS, Verdana, sans-serif',
					color: '#004789'

				},
				itemHoverStyle: {
					color: '#004789'
				},
				y:12

			},
			chart: {
				type: "line",
				width: 785,
				height: 340
			},
			navigator: {
				enabled: true,
				top: 260,
				height: 30,
				xAxis: {
					labels: {
						enabled: false
					}
				}

			},
			exporting: {enabled: false},
			title: {text: null, style: {color: '#004789'}},
			rangeSelector: {enabled: false},
			scrollbar: {enabled: false},
			series: seriesOptions,
			colors:["#F08422", "#2f7ed8"]
		});
	};
	names.push($("#productName").text());
	names.push($("#js-beachMarkName").val());
	var dates = $(".js-date");
	var values = $(".js-value");
	var accNets = $(".js-accNet");
	var months = $(".js-month");
	var updateRates = $(".js-updateRate");
	var monthArray = [];
	var rateArray = [];
	var dateArray = [];
	var hsArray = [];
	var accNetArray = [];
	for(var i = 0; i < dates.length; i++){
		var date = new Date($(dates[i]).text());
		var arry = [];
		arry.push(date.getTime());
		arry.push(Number($(values[i]).data("value")));
		dateArray.push(arry);
	}
	for(var i = 0; i < dates.length; i++){
		var date = new Date($(dates[i]).text());
		var arry = [];
		arry.push(date.getTime());
		arry.push(Number($(values[i]).data("hs")));
		hsArray.push(arry);
	}
	for(var i = 0; i < dates.length; i++){
		var date = new Date($(dates[i]).text());
		var arry = [];
		arry.push(date.getTime());
		arry.push(Number($(accNets[i]).text()));
		accNetArray.push(arry);
	}
	for(var i = 0; i < months.length; i++){
		monthArray.push(months[i].value);
	}
	for(var i = 0; i < updateRates.length; i++){
		rateArray.push(Number(updateRates[i].value));
	}
	var sortDateArray = dateArray.sort();
	var sortHsArray = hsArray.sort();
	var sortAccNetArray = accNetArray.sort(); 
	
	/*月度回报率图*/
	$('#highcharts-2').highcharts({
	    chart: {
	        type: 'column',
	        width: 785,
	        height: 340
	    },
	    title: {
	        text: null
	    },
	    xAxis: {
	    	title : "月度回报率",
	    	categories: monthArray
	    },
	    yAxis: {
	    	title: null,
	    	labels: {
	        	format: '{value} %'
	        }
	    },
	    credits: {
	        enabled: false
	    },
	    legend: {
	    	title: "月度回报率"
	    },
	    colors: ["#F08422"],
	    series: [{
	    	name: "月度回报率%",
	        data: rateArray
	    }]
	});
	$.each(names, function (i, name) {
		if(i == 0){
			seriesOptions[i] = {
					name: name,
					data: dateArray.sort()
			};
		}else{
			seriesOptions[i] = {
					name: name,
					data: hsArray.sort()
			};
		}
		seriesCounter += 1;
		if (seriesCounter === names.length) {
			createChart();
		}
	});
	
	/*历史净值走势*/
	$('#highcharts-1').highcharts({
	 xAxis: {
		type: 'datetime',
		gridLineDashStyle: 'longdash',
		dateTimeLabelFormats: {
			second: '%Y-%m-%d<br/>%H:%M:%S',
			minute: '%Y-%m-%d<br/>%H:%M',
			hour: '%Y-%m-%d<br/>%H:%M',
			day: '%Y<br/>%m-%d',
			week: '%Y<br/>%m-%d',
			month: '%Y-%m',
			year: '%Y'
		},
		gridLineWidth: 1,
		lineColor: '#999',
		tickColor: '#999',
		showFirstLabel: true,
		showLastLabel: true,
		labels: {
			style: {
				color: '#000',
				font: '11px Trebuchet MS, Verdana, sans-serif',
				align: 'right',
				style: {font: 'normal 13px 宋体'}
			},
			formatter: function () {
				return Highcharts.dateFormat('%Y-%m-%d', this.value);
			}
		},
		title: {
			style: {
				color: '#333',
				fontWeight: 'bold',
				fontSize: '12px',
				fontFamily: 'Trebuchet MS, Verdana, sans-serif'
			}
		}
	},
	exporting: {enabled: false},
	title: {text: null, style: {color: '#004789'}},
	rangeSelector: {enabled: false},
	
	tooltip: {
		crosshairs: true,
		formatter: function () {
			var date = new Date(this.x);
			var s = '<b>时间: ' + date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日' + '</b>';
            $.each(this.points, function (i, point) {
                s += '<br/><span style="color:' + this.series.color + '">' + this.series.name + ': ' +
                    this.y + '</span>';
            });
            return s;
        },
        shared: true
	},
	credits: {
		enabled: false,
		href: null,
		text: ''
	},
	yAxis: {
		showLastLabel: false,
		tickPixelInterval: 40,
		lineColor: '#999',
		lineWidth: 1,
		tickWidth: 1,

		tickColor: '#999',
		labels: {
			align: 'right',
			x: -10,
			y: 5,
			style: {
				color: '#000',
				font: '11px Trebuchet MS, Verdana, sans-serif'
			}
		},
		title: {
			enabled:false
		}
	},
	plotOptions: {
		series: {lineWidth: 2},
		line: {
			marker:{enabled:false},
			cursor: 'pointer'
		}
	},
	title: {text: null, style: {color: '#004789'}},
	legend: {
		enabled: true,
		itemStyle: {
			font: '9pt Trebuchet MS, Verdana, sans-serif',
			color: '#004789'

		},
		itemHoverStyle: {
			color: '#004789'
		}

	},
	chart: {
		type: "line",
		width: 785,
		height: 340
	},
	 navigator: {
		enabled: true,
		top: 260,
		height: 30,
		xAxis: {
			labels: {
				enabled: false
			}
		}

	},
	colors: ["#F08422"],
	scrollbar: {enabled: false},
	series: [{
		name: "历史净值走势",
		data: sortAccNetArray
	}]
});