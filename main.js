var utils = require('utils');
var roleHarvester = require('role.harvester');
var roleHarvester = require('role.upgrader');

Memory.sources = {};

module.exports.loop = function () {
    
    console.log('Hello World!');
	
	var dronesRequired = utils.checkDronesRequired();
    console.log('you will need ' + dronesRequired + ' drones for this rooms sources');
	
	var creepCount = Object.keys(Game.creeps).length;
	console.log('you have creeps: ' + creepCount);
	
	if(!Memory.sources) {
		utils.checkDronesRequired();
	}
	
	for(var source in Memory.sources) {
		console.log(source);
		console.log(Memory.sources[source]);
		if(source.harvesters.length < source.dronesRequired) {
			var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {memory: {source: source}});
			source.harvesters.push(newName);
			console.log('Spawning new harvester: ' + newName);
		}
	}
	
	for(var name in Game.creeps) {
		var creep = Game.creeps[name];
		roleHarvester.run(creep);
	}
	
	
    console.log('Youve used ' + (Math.round(Game.cpu.getUsed() * 100) / 100) + ' / ' + Game.cpu.limit);
	
	
}
