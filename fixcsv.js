const fs = require('fs')


let cardsDB = JSON.parse(fs.readFileSync('./data/working/cards.json'))
let cube = JSON.parse(fs.readFileSync('./output/cube.json'))
let enrichedCube = []

cube.forEach(cubeCard => {
  enrichedCube.push(cardsDB.find((c)=> c.title === cubeCard))
});

console.log(enrichedCube)
const fuckme = toCSV(enrichedCube)
console.log(fuckme)

function toCSV(json) {
  json = Object.values(json);
  var csv = "";
  var keys = (json[0] && Object.keys(json[0])) || [];
  csv += keys.join(',') + '\n';
  for (var line of json) {
    csv += keys.map(key => line[key]).join(',') + '\n';
  }
  return csv;
}

fs.writeFileSync('./output/cube.csv', fuckme)