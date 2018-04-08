'use strict';

var Sensors_list = '{"Sensors":[{"id":1,"type":"P","data":[1,2,3,4,5]},{"id":2,"type":"P","data":[1,2,3,4,5]}]}';
var Valve_list = '{"Valve":[{"id":1,"value":0},{"id":2,"value":1}]}';
var Triger_list = '{"Triger":[{"type":"T","id":1,"minCritical":10,"minNormal":30,"maxNormal":70,"maxCritical":90}]}';


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

/*
function getJsonData(){
    var jqXHR = $.ajax({
        url: "../SensorsData.json",
        async: false});

    return $.parseJSON(jqXHR.responseText);
}
*/

//var JSON_DATA = getJsonData();

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
		for (var i = 0; i < JSON_DATA.Sensors.length; i++){
			if (JSON_DATA.Sensors[i].id == id){
				
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
	}

	show(){
		console.log(this.id);
		console.log(this.type);
		console.log(this.value);
	}

	addToCookie(){
		var list = ToList(Sensors_list);
		console.log(list);
		list.Sensors.push({id:this.id, type:this.state, data:[this.value]});
		setCookie("list", ToJson(list), 7);
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
	}

	addToCookie(){
		var list = ToList(Valve_list);
		console.log(list);
		list.Valve.push({id:this.id, value:this.value});
		setCookie("list", ToJson(list), 7);
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
	}

	addToCookie(){
		var list = ToList(Triger_list);
		console.log(list);
		list.Triger.push({type:this.type, id:this.id, minCritical:this.minCritical, minNormal:this.minNormal, maxNormal:this.maxNormal, maxCritical:this.maxCritical});
		setCookie("list", ToJson(list), 7);
	}
}

function CheckValueByTrigerId(trigerId, value){
	var triger;
	// 0 - всё плохо
	// 1 - предупреждение
	// 2 - все в норме
	var list = ToList(Triger_list);
	console.log(list);
	for (var i=0; i<list.Triger.length; i++){
		if (list.Triger[i].id == trigerId){
			triger = list.Triger[i];
			break;
		}
	}


	if ( (value>triger.maxCritical) || (value<minCritical)){
		return 0
	}else if ((value>triger.maxNormal) || (value<minNormal)){
		return 1
	}else{
		return 2
	}
}


