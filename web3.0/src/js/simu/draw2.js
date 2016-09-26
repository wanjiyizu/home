var lineOpts = {
	
	title: {text: null},

	colors:["#F08422", "#2f7ed8"],

	chart: {
		type: "line",
		width: 1124,
		height: 340
	},

	credits: {
		enabled: false
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
		y:12
	},
	
	navigator: {
		enabled: true,
		top: 270,
		height: 30,
		xAxis: {
			labels: {
				enabled: false
			}
		}

	},

	xAxis: {
		type: 'datetime',
		gridLineWidth: 1,
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
		}
	},

	yAxis: {
		tickPixelInterval: 40,
		lineWidth: 1,
		labels: {
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
	}
};

var columnOpts = {
    chart: {
        type: 'column',
        width: 1124,
        height: 340
    },
    title: {
        text: null
    },
    xAxis: {
    	title : "月度回报率",
    	categories: ["2015-09", "2015-10", "2015-11", "2015-12", "2016-01", "2016-02", "2016-03", "2016-04", "2016-05", "2016-06", "2016-07"]
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
        data: [1.8, 0.88, -1.56, 0.89, 0, 1.37, 3.19, 0.28, 1.21, 1.85, 1.18]
    }]
};

var data1 = [
		{
			name: '鸿信8号',
			data: [[1445817600000,0.0],[1445904000000,0.0],[1445990400000,0.0],[1446076800000,0.0],[1446163200000,0.000700000000009],[1446422400000,0.2002],[1446508800000,0.2496],[1446595200000,0.258],[1446681600000,0.1347],[1446768000000,0.1451],[1447027200000,0.131],[1447113600000,0.6915],[1447200000000,0.5878],[1447286400000,0.6609],[1447372800000,0.7055],[1447632000000,0.8008],[1447718400000,0.535],[1447804800000,0.5931],[1447891200000,0.5657],[1447977600000,0.4566],[1448236800000,0.5161],[1448323200000,0.4601],[1448409600000,0.522],[1448496000000,0.4192],[1448582400000,0.7463],[1448841600000,0.7924],[1448928000000,0.852],[1449014400000,0.8901],[1449100800000,0.8949],[1449187200000,0.9464],[1449446400000,1.0131],[1449532800000,0.9988],[1449619200000,0.9347],[1449705600000,1.0322],[1449792000000,0.9545],[1450051200000,1.0488],[1450137600000,1.0618],[1450224000000,1.0419],[1450310400000,1.081],[1450396800000,1.0915],[1450656000000,1.2269],[1450742400000,1.3876],[1450828800000,1.3774],[1450915200000,1.0281],[1451001600000,1.3305],[1451260800000,1.5939],[1451347200000,1.7444],[1451433600000,1.9165],[1451520000000,1.9829],[1451865600000,1.7325],[1451952000000,1.8047],[1452038400000,1.6332],[1452124800000,1.7891],[1452211200000,1.8169],[1452470400000,1.9879],[1452556800000,2.1424],[1452643200000,2.0057],[1452729600000,2.3107],[1452816000000,2.1596],[1453075200000,2.2448],[1453161600000,2.3383],[1453248000000,2.1413],[1453334400000,2.2343],[1453420800000,2.4073],[1453680000000,2.39],[1453766400000,2.3491],[1453852800000,2.5323],[1453939200000,2.245],[1454025600000,1.94],[1454284800000,2.0683],[1454371200000,2.2255],[1454457600000,2.1279],[1454544000000,2.1056],[1454630400000,2.2195],[1455494400000,2.2944],[1455580800000,2.2924],[1455667200000,2.2788],[1455753600000,2.3162],[1455840000000,2.4872],[1458604800000,4.9347],[1458691200000,5.0247],[1458777600000,4.6001],[1458864000000,4.6192],[1459123200000,4.9016],[1459209600000,4.842],[1459296000000,4.7924],[1459382400000,4.9382],[1459468800000,4.7424],[1459814400000,4.9706],[1459900800000,4.8],[1459987200000,4.68],[1460073600000,4.64],[1460332800000,4.57],[1460419200000,4.86],[1460505600000,4.8],[1460592000000,4.97],[1460678400000,4.75],[1460937600000,4.93],[1461024000000,5.35],[1461110400000,6.39],[1461196800000,7.02],[1461283200000,6.58],[1461542400000,6.2762],[1461628800000,6.1568],[1461715200000,6.2779],[1461801600000,6.0536],[1461888000000,6.3657],[1462233600000,6.2288],[1462320000000,6.0996],[1462406400000,5.9218],[1462492800000,5.9984],[1462752000000,5.92],[1462838400000,6.27],[1462924800000,6.17],[1463011200000,6.27],[1463097600000,6.55],[1463356800000,6.7],[1463443200000,6.7],[1463529600000,6.5],[1463616000000,6.75],[1463702400000,6.98],[1463961600000,7.4],[1464048000000,7.32],[1464134400000,7.27],[1464220800000,7.23],[1464307200000,7.26],[1464566400000,7.39],[1464652800000,7.24],[1464739200000,7.0],[1464825600000,7.0],[1464912000000,7.03],[1465171200000,7.19],[1465257600000,7.2],[1465344000000,7.11],[1465776000000,7.61],[1465862400000,7.49],[1465948800000,7.29],[1466035200000,7.41],[1466121600000,7.41],[1466726400000,7.74],[1466985600000,7.82],[1467072000000,8.17],[1467158400000,8.39],[1467244800000,8.55],[1467331200000,8.79],[1467590400000,9.51],[1467676800000,9.22],[1467763200000,8.93],[1467849600000,8.87],[1467936000000,8.82],[1468195200000,8.84],[1468281600000,8.74],[1468368000000,8.82],[1468454400000,8.75],[1468540800000,8.77]]
		},
		{
			name: '沪深300',
			data: [[1445817600000,0.0],[1445904000000,0.23036572839],[1445990400000,0.25893351001],[1446076800000,0.11548677676],[1446163200000,0.06199816437],[1446422400000,0.09238942141],[1446508800000,-0.000607825140997],[1446595200000,-0.176877115991],[1446681600000,-0.179308416555],[1446768000000,-0.151956285216],[1447027200000,-0.559199129594],[1447113600000,-0.554944353608],[1447200000000,-0.412713270646],[1447286400000,-0.387792439871],[1447372800000,-0.323362974939],[1447632000000,-0.306951696136],[1447718400000,-0.266835236839],[1447804800000,-0.319108198953],[1447891200000,-0.331872526911],[1447977600000,-0.282030865361],[1448236800000,-0.254678734022],[1448323200000,-0.160465837188],[1448409600000,-0.07719379289],[1448496000000,0.01762692909],[1448582400000,0.04619471071],[1448841600000,0.1695832143],[1448928000000,0.18234754226],[1449014400000,0.20362142219],[1449100800000,0.30512822071],[1449187200000,0.39873329241],[1449446400000,0.44614365339],[1449532800000,0.56831650671],[1449619200000,0.6351772722],[1449705600000,0.66982330523],[1449792000000,0.7318214696],[1450051200000,0.62727554537],[1450137600000,0.65766680241],[1450224000000,0.74701709812],[1450310400000,0.8448769458],[1450396800000,1.06308617137],[1450656000000,1.40164477483],[1450742400000,1.55177758462],[1450828800000,1.5900705685],[1450915200000,1.80645631865],[1451001600000,1.83623975055],[1451260800000,1.94807957647],[1451347200000,1.96449085527],[1451433600000,1.93896219935],[1451520000000,1.95841260386],[1451865600000,1.7760650616],[1451952000000,1.6198540004],[1452038400000,1.6198540004],[1452124800000,1.6198540004],[1452211200000,1.95780477872],[1452470400000,2.07086025492],[1452556800000,2.07086025492],[1452643200000,2.55286559163],[1452729600000,2.50606305578],[1452816000000,2.50120045465],[1453075200000,2.41245798409],[1453161600000,2.30791205986],[1453248000000,2.1954644088],[1453334400000,2.23375739267],[1453420800000,2.30669640958],[1453680000000,2.10678272075],[1453766400000,2.07936980689],[1453852800000,1.8891205378],[1453939200000,1.88790488752],[1454025600000,2.04046899788],[1454284800000,2.10793758851],[1454371200000,1.97117693182],[1454457600000,1.90066921548],[1454544000000,2.00156818886],[1454630400000,2.03682204703],[1455494400000,2.26475647486],[1455580800000,2.20215048535],[1455667200000,2.20397396077],[1455753600000,2.21491481331],[1455840000000,2.26657995028],[1458604800000,2.90260817768],[1458691200000,2.9436971572],[1458777600000,2.97111007105],[1458864000000,3.02593589876],[1459123200000,2.98922326025],[1459209600000,2.97846475526],[1459296000000,2.97846475526],[1459382400000,3.04277265516],[1459468800000,3.08282833195],[1459814400000,3.09376918448],[1459900800000,3.06720722583],[1459987200000,4.43305109986],[1460073600000,2.98484691924],[1460332800000,2.96989442077],[1460419200000,2.93926003367],[1460505600000,2.78596653315],[1460592000000,2.68239312914],[1460678400000,2.74165608038],[1460937600000,4.18821913312],[1461024000000,2.75508901599],[1461110400000,2.55250089654],[1461196800000,2.43774350995],[1461283200000,2.29618103464],[1461542400000,1.993544897],[1461628800000,2.11158453936],[1461715200000,2.20075248752],[1461801600000,2.26907203336],[1461888000000,2.25800961579],[1462233600000,2.37945307894],[1462320000000,2.3680867488],[1462406400000,2.35751059135],[1462492800000,2.3728277849],[1462752000000,2.51846268865],[1462838400000,2.58781553723],[1462924800000,2.62398113311],[1463011200000,2.69941223309],[1463097600000,2.71837637748],[1463356800000,2.67339731706],[1463443200000,2.64665301086],[1463529600000,2.54113456641],[1463616000000,2.49743193878],[1463702400000,2.51426869518],[1463961600000,2.5130530449],[1464048000000,2.57122191088],[1464134400000,2.59346831104],[1464220800000,2.59140170556],[1464307200000,2.57760407486],[1464566400000,2.56186140371],[1464652800000,2.56186140371],[1464739200000,2.56277314142],[1464825600000,2.53390144723],[1464912000000,2.5268506756],[1465171200000,2.59146248807],[1465257600000,2.6014916029],[1465344000000,2.60355820837],[1465776000000,2.68227156412],[1465862400000,2.79168008947],[1465948800000,2.84851174014],[1466035200000,2.92959561393],[1466121600000,2.9782216252],[1466726400000,3.09966508835],[1466985600000,3.24365886422],[1467072000000,3.28255967323],[1467158400000,3.27526577154],[1467244800000,3.33082098942],[1467331200000,3.46089556956],[1467590400000,3.49067900146],[1467676800000,3.46612286577],[1467763200000,3.51748409018],[1467849600000,3.63862364075],[1467936000000,3.68184000827],[1468195200000,3.73259340753],[1468281600000,3.70007476249],[1468368000000,3.65789169772],[1468454400000,3.66664437974],[1468540800000,3.69034956024]]
		}
	];

var data2 = [{
    	name: "月度回报率%",
        data: [1.8, 0.88, -1.56, 0.89, 0, 1.37, 3.19, 0.28, 1.21, 1.85, 1.18]
    }];

var data3 = [{
		name: '历史净值走势',
		data:[
				[1441814400000,1],
				[1442505600000,1.016],
				[1443110400000,1.018],
				[1444320000000,1.025],
				[1444924800000,1.026],
				[1445529600000,1.039],
				[1446134400000,1.027],
				[1446739200000,1.034],
				[1447344000000,1.017],
				[1447948800000,1.017],
				[1448553600000,1.011],
				[1449158400000,1.017],
				[1449763200000,1.011],
				[1450368000000,1.018],
				[1450972800000,1.019],
				[1451491200000,1.02],
				[1452182400000,1.012],
				[1452787200000,1.011],
				[1453392000000,1.016],
				[1453996800000,1.02],
				[1454601600000,1.023],
				[1455811200000,1.035],
				[1456416000000,1.034],
				[1457020800000,1.046],
				[1457625600000,1.051],
				[1458230400000,1.069],
				[1458835200000,1.067],
				[1459440000000,1.08],
				[1460044800000,1.083],
				[1460649600000,1.074],
				[1461254400000,1.059],
				[1461859200000,1.07],
				[1462464000000,1.083],
				[1463068800000,1.074],
				[1463673600000,1.079],
				[1464278400000,1.083],
				[1464883200000,1.108],
				[1465315200000,1.107],
				[1466092800000,1.103],
				[1466697600000,1.103],
				[1467302400000,1.114],
				[1467907200000,1.124],
				[1468512000000,1.123],
				[1469116800000,1.123],
				[1469721600000,1.116],
				[1470326400000,1.125],
				[1470931200000,1.124],
				[1471536000000,1.128],
				[1472140800000,1.128]
			]
		}
];



