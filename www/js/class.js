var JSON_DATA = JSON.parse('../Json.json');

class worker {
	id;
	name;
	access_level; 
}

class master [worker]{
	conctructor (id,name,access_level){
		this.id = id
		this.name = name;
		this.access_level = access_level;
	}

	addSensorValue(id,value){
		for each (sensor in JSON_DATA.Sensors){
			if (sensor.id == id){

			}
		}
	}

	sendMassageById(id){

	}

}

class manager [worker]{
	conctructor (id,name,access_level){
		this.id = id
		this.name = name;
		this.access_level = access_level;
	}

	ChangeValveValueById(id,value){
		for (i = 0; i < JSON_DATA.Valve.length; i++){
			if (JSON_DATA.Valve[i].id == id){
				JSON_DATA.Valve[i].value = value;
			}
		}
	}


}

class sensor {
	id;
	type;
	value;

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
	id;
	active;

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
	type;
	minCritical;
	minNormal 
	maxNormal;
	maxCritical;

	conctructor(type,minCritical,minNormal,maxNormal,maxCritical){
		this.type = type;
		this.minCritical = minCritical;
		this.minNormal = minNormal;
		this.maxNormal = maxNormal;
		this.maxCritical = maxCritical;
	}
}
