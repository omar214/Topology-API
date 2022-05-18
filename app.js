import API from './modules/API.js';
let app = new API();



let data = app.readFile('./topology.json')
console.log(`read data done -> ${data.components}`);

app.writeFile('top1')
let devices = app.queryDevices("top1");
console.log(`devices in top1 -> ${devices}`);

let list = app.queryDevicesWithNetlistNode("top1", "vin")
console.log(`devices connected to vin -> ${list}`);

list = app.queryTopologies();
console.log(`all topoligies -> ${list}`);


app.deleteTopology("top1")
// console.log(app.memory[0]);
// console.log(data);

// console.log(devices);

// list[0].print()

// console.log(list);

// let data = app.readFile("./topology.json");
// console.log(data);