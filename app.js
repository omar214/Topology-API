import API from './modules/API.js';
let app = new API();

let printListComponent = (compList) =>{
    for (const comp in compList) {
        const element = compList[comp];
        element.print();
    }
}
let printListTopologies= (list) =>{
    for (const top in list){
        list[top].print();
    }
}

// --------------------------------------------
// reading files
console.log('test reading files');
let top1 = await app.readFile('./db/topology1.json')
let top2 = await app.readFile('./db/topology2.json')
top1.print();
top2.print();
// --------------------------------------------
// query devices
console.log('test query devices');
let devices1 = await app.queryDevices("top1");
let devices2 = await app.queryDevices("top2");
console.log(`devices in top1 -> \n\t`);
printListComponent(devices1)

console.log(`devices in top2 -> \n\t`);
printListComponent(devices2)
// --------------------------------------------
// query devices with nodelist

console.log(`test devices with nodelist`);
let list = await  app.queryDevicesWithNetlistNode("top1", "n1")
console.log(`devices connected to n1 -> `);
printListComponent(list)

// --------------------------------------------
// query topologies in memory
console.log(`test topologies in memory`);
list = await  app.queryTopologies();
console.log(`all topoligies in memory-> `);
printListTopologies(list)

// --------------------------------------------
//writing files 
console.log(`test writing to file`);
let result = await app.writeFile('top1')
result ? console.log("writing top1 done") : console.log("writing top1 failed");
result = await app.writeFile('top2')
result ? console.log("writing top2 done") : console.log("writing top2 failed");


// --------------------------------------------
//deleting topologies
console.log(`test deleting`);
result = await  app.deleteTopology("top1")
result ? console.log("deleting top1 done") : console.log("deleting top1 failed");

// --------------------------------------------
list = await  app.queryTopologies();
console.log(`topoligies in memory after delete top1-> `);
printListTopologies(list)
