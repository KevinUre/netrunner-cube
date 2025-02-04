const fs = require('fs')

const packs = JSON.parse(fs.readFileSync('./data/working/packs.json'))

const packCodes = packs.map((pack) => pack.code);

const cardsData = JSON.parse(fs.readFileSync('./data/original/cards.json'))

const cardsFiltered = cardsData.data.filter((card) => packCodes.includes(card['pack_code']))

const cards = cardsFiltered.map((card) => {
  return {
    title: card.title,
    type_code: card.type_code,
    faction_code: card.faction_code,
    pack_code: card.pack_code,
  }
})

fs.writeFileSync('./data/working/cards.json',JSON.stringify(cards,null,'  '));

const factions = {}
const types = {}

cards.forEach((card) => {
  if (!factions[card.faction_code]) {
    factions[card.faction_code] = 1;
  } else {
    factions[card.faction_code] ++;
  }
  if (!types[card.type_code]) {
    types[card.type_code] = 1;
  } else {
    types[card.type_code] ++;
  }
})

const metadata = {
  factions: factions,
  types: types,
}

fs.writeFileSync('./data/working/metadata.json',JSON.stringify(metadata,null,'  '));