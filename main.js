var utils = require('utils');
var roleHarvester = require('role.harvester');
var roleHarvester = require('role.upgrader');

Memory.sources = {};

module.exports.loop = function () {
    
    console.log('Hello World!');
	
	for(var name in Memory.creeps) {
		if(!Game.creeps[name]) {
			if(Memory.creeps[name].source) {
				delete Memory.sources[Memory.creeps[name].source].harvesters[name];
			}
			delete Memory.creeps[name];
			console.log('clearing old creep ' + name + ' from memory');
		}
	}
	
	var dronesRequired = utils.checkDronesRequired();
    console.log('you will need ' + dronesRequired + ' drones for this rooms sources');
	
	var creepCount = Object.keys(Game.creeps).length;
	console.log('you have creeps: ' + creepCount);
	
	if(!Memory.sources) {
		utils.checkDronesRequired();
		console.log('I couldnt find Memory.sources');
	}
	
	for(var sourceid in Memory.sources) {
		if(Memory.sources[sourceid].harvesters.length < Memory.sources[sourceid].dronesRequired) {
			var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {memory: {source: sourceid, role: 'harvester'}});
			Memory.sources[sourceid].harvesters.newName = Memory.creeps.newName;
			console.log('Spawning new harvester: ' + newName);
		}
	}
	
	for(var name in Game.creeps) {
		var creep = Game.creeps[name];
		roleHarvester.run(creep);
	}
	
	
    console.log('Youve used ' + (Math.round(Game.cpu.getUsed() * 100) / 100) + ' / ' + Game.cpu.limit);
	
	
}
