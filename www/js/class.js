'use strict';

var browserList_Sensor = {Sensor:[{id:1,type:"P",data:[1,2,3,4,5]}]};
var browserList_Valve = {Valve:[{id:1,value:0}]};
var browserList_Triger = {Triger:[{type:"T",id:1,minCritical:10,minNormal:30,maxNormal:70,maxCritical:90}]};


function ToList(Big_Json){
	return JSON.parse(Big_Json);
}

function ToJson(list){
	return JSON.stringify(list,"");
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; path=/; " + expires;

}

function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}



function loadJson(file){

	//const fs = require('fs');
	// write to a new file named 2pac.txt
	writeFile('SensorsData.json', file, (err) => {  
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log('Lyric saved!');
	});
}




class master {
	constructor(id,name,access_level){
		this.id = id;
		this.name = name;
		this.access_level = access_level;
	}

	addSensorValue(id,value){
		for (var i = 0; i < JSON_DATA.Sensor.length; i++){
			if (JSON_DATA.Sensor[i].id == id){
				
			}
		}
	}

	sendMassageById(id){

	}

}

class manager {
	constructor(id,name,access_level){
		this.id = id
		this.name = name;
		this.access_level = access_level;
	}

	ChangeValveValueById(id,value){
		for (var i = 0; i < JSON_DATA.Valve.length; i++){
			if (JSON_DATA.Valve[i].id == id){
				JSON_DATA.Valve[i].value = value;
			}
		}
		console.log(JSON_DATA);
		loadJson(JSON_DATA)
	}


}

class sensor {
	
	constructor(id, type){
		this.id = id;
		this.type = type;
		this.value = 0;	
		console.log(this.id);
		console.log(this.type);
		console.log(this.value);
		this.addToCookie();
		this.addToBrowserList();
	}

	show(){
		console.log(this.id);
		console.log(this.type);
		console.log(this.value);
	}

	addToBrowserList(){
		if (browserList_Sensor){
			browserList_Sensor.Sensor.push({id:this.id, type:this.type, data:[this.value]});
		}else{
			browserList_Sensor = {Sensor:[{id:this.id, type:this.type, data :[this.value]}]};
		}
	}

	addToCookie(){
		var list;
		if (getCookie("sensor")){
			list = ToList(getCookie("sensor"));
			list.Sensor.push({id:this.id, type:this.type, data:[this.value]});
		}else{
			list = {Sensor:[{id:this.id, type:this.type, data :[this.value]}]};
		}
		
		setCookie("sensor", ToJson(list), 7);
	}

	getValue(){
		return this.value;
	}

	setValue(value){
		this.value = value;
	}

	addValue(value){

	}
}

class valve {
	constructor(id){
		this.id = id;
		this.active = 0;
		this.addToCookie();
	}

	addToCookie(){
		var list;
		if (getCookie("valve")){
			list = ToList(getCookie("valve"));
			list.Valve.push({id:this.id, value:this.active});
		}else{
			list = {Valve:[{id:this.id, value:this.active}]};
		}
		
		setCookie("valve", ToJson(list), 7);
	}

	on(){
		active = "1";
	}

	off(){
		active = "0"
	}
}

class triger{
	constructor(type,id,minCritical,minNormal,maxNormal,maxCritical){
		this.type = type;
		this.id = id
		this.minCritical = minCritical;
		this.minNormal = minNormal;
		this.maxNormal = maxNormal;
		this.maxCritical = maxCritical;
		this.addToCookie();
	}

	addToCookie(){
		var list;
		if (getCookie("triger")){
			list = ToList(getCookie("triger"));
			list.Triger.push({type:this.type, id:this.id, minCritical:this.minCritical, minNormal:this.minNormal, maxNormal:this.maxNormal, maxCritical:this.maxCritical});
		}else{
			list = {Triger:[{type:this.type, id:this.id, minCritical:this.minCritical, minNormal:this.minNormal, maxNormal:this.maxNormal, maxCritical:this.maxCritical}]};
		}
		setCookie("triger", ToJson(list), 7);
	}
}

function CheckValueByTrigerId(trigerId, value){
	var triger;
	// 0 - всё плохо
	// 1 - предупреждение
	// 2 - все в норме
	/*
	var list = ToList(Triger_list);
	console.log(list);
	*/
	var list = ToList(getCookie("triger"));

	for (var i=0; i<list.Triger.length; i++){
		if (list.Triger[i].id == trigerId){
			triger = list.Triger[i];
			break;
		}
	}


	if ( (value>triger.maxCritical) || (value<triger.minCritical)){
		return 0
	}else if ((value>triger.maxNormal) || (value<triger.minNormal)){
		return 1
	}else{
		return 2
	}
}

/*
function addSensorValueByIdToCookie(sensorId,value){
	var list = ToList(getCookie("sensor"));
	var sensor;
	for (var i=0; i<list.Sensor.length; i++){
		if (list.Sensor[i].id == sensorId){
			//value.forEach( function (element) {
				list.Sensor[i].data.push(value);
			//});	
			
			setCookie("sensor", ToJson(list), 7);
			break;
		}
	}
}
*/

function addSensorValueByIdToBrouserList(sensorId,value){
	var sensor;
	for (var i=0; i<browserList_Sensor.Sensor.length; i++){
		if (browserList_Sensor.Sensor[i].id == sensorId){
			
			browserList_Sensor.Sensor[i].data.push(value);
			
			break;
		}
	}
}

function getLastNElems(id,n){
	var arr = [];
	var list = ToList(getCookie(sensor));
	for (var i=0; i<list.Sensor.length; i++){
		if (list.Sensor[i].id == id){
			var sensor = list.Sensor[i];
			console.log(sensor);
			if (n>sensor.data.length) n=sensor.data.length;
			console.log(n);
			console.log(sensor.data.length);
			for (var j = sensor.data.length-n; j<sensor.data.length; j++){
				
				arr[arr.length] = sensor.data[j];
			}
		}
	}
	return arr;
}


var s = new sensor(3,"T");


