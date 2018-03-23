var utils = require('utils');

module.exports.loop = function () {
    
    console.log('Hello World!')
    console.log(utils.checkDronesRequired())
    console.log('Youve used ' + (Math.round(Game.cpu.getUsed() * 100) / 100) + ' / ' + Game.cpu.limit)
}
