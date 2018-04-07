function getJsonData(){
    var jqXHR = $.ajax({
        url: "../SensorsData.json",
        async: false});

    return $.parseJSON(jqXHR.responseText);
}

var JSON_DATA = getJsonData();

//var JSON_DATA = JSON.parse("../../Json.json");



/*
class worker {
	id
	name
	access_level; 
}
*/

class master {
	conctructor (id,name,access_level){
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
	conctructor (id,name,access_level){
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
	}


}

class sensor {
	conctructor(id, type,value){
		this.id = id;
		this.type = type;
		this.value = 0;	
	}

	getValue(){
		return this.value;
	}

	setValue(value){
		this.value = value;
	}
}

class valve {
	conctructor(id){
		this.id = id;
		this.active = 0;
	}

	on(){
		active = "1";
	}

	off(){
		active = "0"
	}
}

class triger{
	conctructor(type,minCritical,minNormal,maxNormal,maxCritical){
		this.type = type;
		this.minCritical = minCritical;
		this.minNormal = minNormal;
		this.maxNormal = maxNormal;
		this.maxCritical = maxCritical;
	}
}
