module.exports = {
	// Function checks to see if results are cached, if not runs actual function
	checkDronesRequired: function() {
		if (Memory.DronesRequired)
		{
			return Memory.DronesRequired;
		}
		else
		{
			// currently only works for one room anyway
			var curRoom = Game.spawns['Spawn1'].room;
			var sources = curRoom.find(FIND_SOURCES);
			var totalDronesRequired = 0;
			for (var source of sources)
			{
				// find number of spaces to harvest, and the length of the path from source to spawn or extension
				var area = curRoom.lookAtArea(LOOK_TERRAIN, source.pos.y - 1, source.pos.x - 1, source.pos.y + 1, source.pos.x + 1, true);
				var droneSpaces = 8;
				for (var point of area)
				{
					if (point.type == 'terrain')
					{
						if (point.terrain == 'wall')
						{
							droneSpaces--;
						}
					}
					if (point.type == 'structure')
					{
						if (OBSTACLE_OBJECT_TYPES.IndexOf(point.structure) >= 0)
						{
							droneSpaces--;
						}	
					}
				}
				// droneSpaces now equals number of points around source that are not walls or obstacles
				// next job is to figure out distance from the spawn to the source
				var sourcepath = curRoom.findPath(Game.spawns['Spawn1'].pos, source.pos);
				// assuming drones have WORK, CARRY, MOVE, then travel time is 3 times the path length, and it takes 25 ticks to fill a CARRY
				var droneRatio = sourcepath.length * 2 / 25;
				Memory.sources[source.id] = {};
				Memory.sources[source.id].harvesters = {};
				Memory.sources[source.id].dronesRequired = (droneRatio * droneSpaces);
				console.log('just added Memory.sources');
				totalDronesRequired += (droneRatio * droneSpaces);
				
				Memory.DronesRequired = totalDronesRequired; // remember to uncomment me for performance saving after testing~!
			}
			return totalDronesRequired;
		}
		
	}
}
