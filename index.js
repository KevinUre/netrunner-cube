const fs = require('fs')

const PERCENT_CARDS = 0.33
const PERCENT_IDENTITIES = 0.30
const CHANCE_ULTS = 0.125
const CHANCE_ORIGINAL_CORE = 0.33

const negate = fn => (...args) => !fn(...args);
const remove = (arr, fn) => arr.filter(negate(fn));
const spliceFilter = (arr, fn) =>
  arr.filter(fn).reduce((acc, val) => {
    arr.splice(arr.indexOf(val), 1);
    return acc.concat(val);
  }, []);


function shuffle(array) {
  let currentIndex = array.length;
  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

function uniqBy(a, key) {
  var seen = {};
  return a.filter(function(item) {
      var k = key(item);
      return seen.hasOwnProperty(k) ? false : (seen[k] = true);
  })
}

let cardsDB = JSON.parse(fs.readFileSync('./data/working/cards.json'))

let cube = []

if (Math.random() < CHANCE_ORIGINAL_CORE) {
  const coreCards = cardsDB.filter((c) => c.pack_code === 'core')
  // console.log(coreCards)
  // cardsDB = remove(cardsDB,(c) => c.pack_code === 'core')
  cube = cube.concat(coreCards)
} else {
  const coreCards = cardsDB.filter((c) => c.pack_code === 'core2')
  // console.log(coreCards)
  // cardsDB = remove(cardsDB,(c) => c.pack_code === 'core2')
  cube = cube.concat(coreCards)
}

cube.forEach((card)=>{
  spliceFilter(cardsDB,(c) => c.title === card.title)
})

//after core sets have been picked de-dup the database
for(let i = 0; i < cardsDB.length; i++) {
  for(let j = i+1; j < cardsDB.length; j++) {
    if (cardsDB[i].title === cardsDB[j].title) {
      cardsDB.splice(j,1)
      j--
    }
  }
}

let workingSet = []

workingSet = cardsDB.filter((c) => c.faction_code === 'anarch' && c.type_code === 'identity')
console.log(workingSet)
shuffle(workingSet)
cube = cube.concat(workingSet.slice(0,workingSet.length * PERCENT_IDENTITIES))

workingSet = cardsDB.filter((c) => c.faction_code === 'anarch' && c.type_code === 'event')
shuffle(workingSet)
cube = cube.concat(workingSet.slice(0,workingSet.length * PERCENT_CARDS))

workingSet = cardsDB.filter((c) => c.faction_code === 'anarch' && c.type_code === 'hardware')
shuffle(workingSet)
cube = cube.concat(workingSet.slice(0,workingSet.length * PERCENT_CARDS))

workingSet = cardsDB.filter((c) => c.faction_code === 'anarch' && c.type_code === 'program')
shuffle(workingSet)
cube = cube.concat(workingSet.slice(0,workingSet.length * PERCENT_CARDS))

workingSet = cardsDB.filter((c) => c.faction_code === 'anarch' && c.type_code === 'resource')
shuffle(workingSet)
cube = cube.concat(workingSet.slice(0,workingSet.length * PERCENT_CARDS))



workingSet = cardsDB.filter((c) => c.faction_code === 'criminal' && c.type_code === 'identity')
shuffle(workingSet)
cube = cube.concat(workingSet.slice(0,workingSet.length * PERCENT_IDENTITIES))

workingSet = cardsDB.filter((c) => c.faction_code === 'criminal' && c.type_code === 'event')
shuffle(workingSet)
cube = cube.concat(workingSet.slice(0,workingSet.length * PERCENT_CARDS))

workingSet = cardsDB.filter((c) => c.faction_code === 'criminal' && c.type_code === 'hardware')
shuffle(workingSet)
cube = cube.concat(workingSet.slice(0,workingSet.length * PERCENT_CARDS))

workingSet = cardsDB.filter((c) => c.faction_code === 'criminal' && c.type_code === 'program')
shuffle(workingSet)
cube = cube.concat(workingSet.slice(0,workingSet.length * PERCENT_CARDS))

workingSet = cardsDB.filter((c) => c.faction_code === 'criminal' && c.type_code === 'resource')
shuffle(workingSet)
cube = cube.concat(workingSet.slice(0,workingSet.length * PERCENT_CARDS))



workingSet = cardsDB.filter((c) => c.faction_code === 'shaper' && c.type_code === 'identity')
shuffle(workingSet)
cube = cube.concat(workingSet.slice(0,workingSet.length * PERCENT_IDENTITIES))

workingSet = cardsDB.filter((c) => c.faction_code === 'shaper' && c.type_code === 'event')
shuffle(workingSet)
cube = cube.concat(workingSet.slice(0,workingSet.length * PERCENT_CARDS))

workingSet = cardsDB.filter((c) => c.faction_code === 'shaper' && c.type_code === 'hardware')
shuffle(workingSet)
cube = cube.concat(workingSet.slice(0,workingSet.length * PERCENT_CARDS))

workingSet = cardsDB.filter((c) => c.faction_code === 'shaper' && c.type_code === 'program')
shuffle(workingSet)
cube = cube.concat(workingSet.slice(0,workingSet.length * PERCENT_CARDS))

workingSet = cardsDB.filter((c) => c.faction_code === 'shaper' && c.type_code === 'resource')
shuffle(workingSet)
cube = cube.concat(workingSet.slice(0,workingSet.length * PERCENT_CARDS))



workingSet = cardsDB.filter((c) => c.faction_code === 'neutral-runner' && c.type_code === 'event')
shuffle(workingSet)
cube = cube.concat(workingSet.slice(0,workingSet.length * PERCENT_IDENTITIES))

workingSet = cardsDB.filter((c) => c.faction_code === 'neutral-runner' && c.type_code === 'hardware')
shuffle(workingSet)
cube = cube.concat(workingSet.slice(0,workingSet.length * PERCENT_CARDS))

workingSet = cardsDB.filter((c) => c.faction_code === 'neutral-runner' && c.type_code === 'program')
shuffle(workingSet)
cube = cube.concat(workingSet.slice(0,workingSet.length * PERCENT_CARDS))

workingSet = cardsDB.filter((c) => c.faction_code === 'neutral-runner' && c.type_code === 'resource')
shuffle(workingSet)
cube = cube.concat(workingSet.slice(0,workingSet.length * PERCENT_CARDS))



workingSet = cardsDB.filter((c) => c.faction_code === 'haas-bioroid' && c.type_code === 'identity')
shuffle(workingSet)
cube = cube.concat(workingSet.slice(0,workingSet.length * PERCENT_IDENTITIES))

workingSet = cardsDB.filter((c) => c.faction_code === 'haas-bioroid' && c.type_code === 'agenda')
shuffle(workingSet)
cube = cube.concat(workingSet.slice(0,workingSet.length * PERCENT_CARDS))

workingSet = cardsDB.filter((c) => c.faction_code === 'haas-bioroid' && c.type_code === 'operation')
shuffle(workingSet)
cube = cube.concat(workingSet.slice(0,workingSet.length * PERCENT_CARDS))

workingSet = cardsDB.filter((c) => c.faction_code === 'haas-bioroid' && c.type_code === 'asset')
shuffle(workingSet)
cube = cube.concat(workingSet.slice(0,workingSet.length * PERCENT_CARDS))

workingSet = cardsDB.filter((c) => c.faction_code === 'haas-bioroid' && c.type_code === 'upgrade')
shuffle(workingSet)
cube = cube.concat(workingSet.slice(0,workingSet.length * PERCENT_CARDS))

workingSet = cardsDB.filter((c) => c.faction_code === 'haas-bioroid' && c.type_code === 'ice')
shuffle(workingSet)
cube = cube.concat(workingSet.slice(0,workingSet.length * PERCENT_CARDS))



workingSet = cardsDB.filter((c) => c.faction_code === 'jinteki' && c.type_code === 'identity')
shuffle(workingSet)
cube = cube.concat(workingSet.slice(0,workingSet.length * PERCENT_IDENTITIES))

workingSet = cardsDB.filter((c) => c.faction_code === 'jinteki' && c.type_code === 'agenda')
shuffle(workingSet)
cube = cube.concat(workingSet.slice(0,workingSet.length * PERCENT_CARDS))

workingSet = cardsDB.filter((c) => c.faction_code === 'jinteki' && c.type_code === 'operation')
shuffle(workingSet)
cube = cube.concat(workingSet.slice(0,workingSet.length * PERCENT_CARDS))

workingSet = cardsDB.filter((c) => c.faction_code === 'jinteki' && c.type_code === 'asset')
shuffle(workingSet)
cube = cube.concat(workingSet.slice(0,workingSet.length * PERCENT_CARDS))

workingSet = cardsDB.filter((c) => c.faction_code === 'jinteki' && c.type_code === 'upgrade')
shuffle(workingSet)
cube = cube.concat(workingSet.slice(0,workingSet.length * PERCENT_CARDS))

workingSet = cardsDB.filter((c) => c.faction_code === 'jinteki' && c.type_code === 'ice')
shuffle(workingSet)
cube = cube.concat(workingSet.slice(0,workingSet.length * PERCENT_CARDS))



workingSet = cardsDB.filter((c) => c.faction_code === 'nbn' && c.type_code === 'identity')
shuffle(workingSet)
cube = cube.concat(workingSet.slice(0,workingSet.length * PERCENT_IDENTITIES))

workingSet = cardsDB.filter((c) => c.faction_code === 'nbn' && c.type_code === 'agenda')
shuffle(workingSet)
cube = cube.concat(workingSet.slice(0,workingSet.length * PERCENT_CARDS))

workingSet = cardsDB.filter((c) => c.faction_code === 'nbn' && c.type_code === 'operation')
shuffle(workingSet)
cube = cube.concat(workingSet.slice(0,workingSet.length * PERCENT_CARDS))

workingSet = cardsDB.filter((c) => c.faction_code === 'nbn' && c.type_code === 'asset')
shuffle(workingSet)
cube = cube.concat(workingSet.slice(0,workingSet.length * PERCENT_CARDS))

workingSet = cardsDB.filter((c) => c.faction_code === 'nbn' && c.type_code === 'upgrade')
shuffle(workingSet)
cube = cube.concat(workingSet.slice(0,workingSet.length * PERCENT_CARDS))

workingSet = cardsDB.filter((c) => c.faction_code === 'nbn' && c.type_code === 'ice')
shuffle(workingSet)
cube = cube.concat(workingSet.slice(0,workingSet.length * PERCENT_CARDS))



workingSet = cardsDB.filter((c) => c.faction_code === 'weyland-consortium' && c.type_code === 'identity')
shuffle(workingSet)
cube = cube.concat(workingSet.slice(0,workingSet.length * PERCENT_IDENTITIES))

workingSet = cardsDB.filter((c) => c.faction_code === 'weyland-consortium' && c.type_code === 'agenda')
shuffle(workingSet)
cube = cube.concat(workingSet.slice(0,workingSet.length * PERCENT_CARDS))

workingSet = cardsDB.filter((c) => c.faction_code === 'weyland-consortium' && c.type_code === 'operation')
shuffle(workingSet)
cube = cube.concat(workingSet.slice(0,workingSet.length * PERCENT_CARDS))

workingSet = cardsDB.filter((c) => c.faction_code === 'weyland-consortium' && c.type_code === 'asset')
shuffle(workingSet)
cube = cube.concat(workingSet.slice(0,workingSet.length * PERCENT_CARDS))

workingSet = cardsDB.filter((c) => c.faction_code === 'weyland-consortium' && c.type_code === 'upgrade')
shuffle(workingSet)
cube = cube.concat(workingSet.slice(0,workingSet.length * PERCENT_CARDS))

workingSet = cardsDB.filter((c) => c.faction_code === 'weyland-consortium' && c.type_code === 'ice')
shuffle(workingSet)
cube = cube.concat(workingSet.slice(0,workingSet.length * PERCENT_CARDS))



workingSet = cardsDB.filter((c) => c.faction_code === 'neutral-corp' && c.type_code === 'identity')
shuffle(workingSet)
cube = cube.concat(workingSet.slice(0,workingSet.length * PERCENT_IDENTITIES))

workingSet = cardsDB.filter((c) => c.faction_code === 'neutral-corp' && c.type_code === 'agenda')
shuffle(workingSet)
cube = cube.concat(workingSet.slice(0,workingSet.length * PERCENT_CARDS))

workingSet = cardsDB.filter((c) => c.faction_code === 'neutral-corp' && c.type_code === 'operation')
shuffle(workingSet)
cube = cube.concat(workingSet.slice(0,workingSet.length * PERCENT_CARDS))

workingSet = cardsDB.filter((c) => c.faction_code === 'neutral-corp' && c.type_code === 'asset')
shuffle(workingSet)
cube = cube.concat(workingSet.slice(0,workingSet.length * PERCENT_CARDS))

workingSet = cardsDB.filter((c) => c.faction_code === 'neutral-corp' && c.type_code === 'upgrade')
shuffle(workingSet)
cube = cube.concat(workingSet.slice(0,workingSet.length * PERCENT_CARDS))

workingSet = cardsDB.filter((c) => c.faction_code === 'neutral-corp' && c.type_code === 'ice')
shuffle(workingSet)
cube = cube.concat(workingSet.slice(0,workingSet.length * PERCENT_CARDS))

// alphabetically
cube.sort((a,b) => {
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
})

// types
cube.sort((a,b) => {
  if (a.type_code === 'ice' && b.type_code !== 'ice') {
    return -1;
  }
  return 0;
})
cube.sort((a,b) => {
  if (a.type_code === 'upgrade' && b.type_code !== 'upgrade') {
    return -1;
  }
  return 0;
})
cube.sort((a,b) => {
  if (a.type_code === 'asset' && b.type_code !== 'asset') {
    return -1;
  }
  return 0;
})
cube.sort((a,b) => {
  if (a.type_code === 'operation' && b.type_code !== 'operation') {
    return -1;
  }
  return 0;
})
cube.sort((a,b) => {
  if (a.type_code === 'agenda' && b.type_code !== 'agenda') {
    return -1;
  }
  return 0;
})
cube.sort((a,b) => {
  if (a.type_code === 'resource' && b.type_code !== 'resource') {
    return -1;
  }
  return 0;
})
cube.sort((a,b) => {
  if (a.type_code === 'program' && b.type_code !== 'program') {
    return -1;
  }
  return 0;
})
cube.sort((a,b) => {
  if (a.type_code === 'hardware' && b.type_code !== 'hardware') {
    return -1;
  }
  return 0;
})
cube.sort((a,b) => {
  if (a.type_code === 'event' && b.type_code !== 'event') {
    return -1;
  }
  return 0;
})
cube.sort((a,b) => {
  if (a.type_code === 'identity' && b.type_code !== 'identity') {
    return -1;
  }
  return 0;
})

// factions
cube.sort((a,b) => {
  if (a.faction_code === 'neutral-corp' && b.faction_code !== 'neutral-corp') {
    return -1;
  }
  return 0;
})
cube.sort((a,b) => {
  if (a.faction_code === 'weyland-consortium' && b.faction_code !== 'weyland-consortium') {
    return -1;
  }
  return 0;
})
cube.sort((a,b) => {
  if (a.faction_code === 'nbn' && b.faction_code !== 'nbn') {
    return -1;
  }
  return 0;
})
cube.sort((a,b) => {
  if (a.faction_code === 'jinteki' && b.faction_code !== 'jinteki') {
    return -1;
  }
  return 0;
})
cube.sort((a,b) => {
  if (a.faction_code === 'haas-bioroid' && b.faction_code !== 'haas-bioroid') {
    return -1;
  }
  return 0;
})
cube.sort((a,b) => {
  if (a.faction_code === 'neutral-runner' && b.faction_code !== 'neutral-runner') {
    return -1;
  }
  return 0;
})
cube.sort((a,b) => {
  if (a.faction_code === 'shaper' && b.faction_code !== 'shaper') {
    return -1;
  }
  return 0;
})
cube.sort((a,b) => {
  if (a.faction_code === 'criminal' && b.faction_code !== 'criminal') {
    return -1;
  }
  return 0;
})
cube.sort((a,b) => {
  if (a.faction_code === 'anarch' && b.faction_code !== 'anarch') {
    return -1;
  }
  return 0;
})

console.log(JSON.stringify(cube.map((c)=>{return c.title})))

const simplifiedCube = cube.map((c)=> c.title)

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

fs.writeFileSync('./output/cube.json', JSON.stringify(simplifiedCube))
fs.writeFileSync('./output/cube.csv', toCSV(cube))
