module.exports = 
{
	// Function checks to see if results are cached, if not runs actual function
	function checkDronesRequired()
	{
		if (Memory.DronesRequired)
		{
			return Memory.DronesRequired;
		}
		else
		{
			// currently only works for one room anyway
			var curRoom = Game.rooms[0];
			var sources = curRoom.find(FIND_SOURCES);
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
				
			}
		}
		
	}
	
	
}

[
    {x: 5, y: 10, type: 'creep', creep: {...}},
    {x: 5, y: 10, type: 'terrain', terrain: 'swamp'},
    {x: 6, y: 10, type: 'terrain', terrain: 'swamp'},
    {x: 7, y: 10, type: 'terrain', terrain: 'swamp'},
    {x: 5, y: 11, type: 'terrain', terrain: 'plain'},
    {x: 6, y: 11, type: 'structure', structure: {...}},
    {x: 6, y: 11, type: 'terrain', terrain: 'swamp'},
    {x: 7, y: 11, type: 'terrain', terrain: 'wall'}
]

OBSTACLE_OBJECT_TYPES.IndexOf()

