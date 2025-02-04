const fs = require('fs')

const cycleData = JSON.parse(fs.readFileSync('./data/working/cycles.json'))

const packsInput = JSON.parse(fs.readFileSync('./data/original/packs.json'))

const cycles = cycleData.data.map((cycle) => { return cycle['code'] })

const packsFiltered = packsInput.data.filter((pack) => cycles.includes(pack['cycle_code']))

const packs = packsFiltered.map((pack) => {
  return {
    code: pack.code,
    name: pack.name,
  }
})

fs.writeFileSync('./data/working/packs.json',JSON.stringify(packs));

