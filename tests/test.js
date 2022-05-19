import API from '../modules/API.js'
console.time();
// function for debuggind
function printObj(obj) {
    console.log(JSON.stringify(obj));
}
/**
 * var stored in json file to test result with it
 */
const top1 = {
    "id": "top1",
    "components": [
        {
            "properties": {
                "type": "resistor",
                "id": "res1",
                "resistance": {
                    "default": 100,
                    "min": 10,
                    "max": 1000
                },
                "netlist": {
                    "t1": "vdd",
                    "t2": "n1"
                }
            }
        },
        {
            "properties": {
                "type": "resistor",
                "id": "res2",
                "resistance": {
                    "default": 200,
                    "min": 20,
                    "max": 1000
                },
                "netlist": {
                    "t1": "gnd",
                    "t2": "n1"
                }
            }
        },
        {
            "properties": {

                "type": "nmos",
                "id": "m1",
                "m(l)": {
                    "default": 1.5,
                    "min": 1,
                    "max": 2
                },
                "netlist": {
                    "drain": "n1",
                    "gate": "vin",
                    "source": "vss"
                }
            }
        }
    ]
}

//================================================================
//! create app
let app = new API()
let result = null

var testSuccesseded = 0;
var testFailed = 0;

/**
 * function to test reading files
 */
let testReading = async () => {
    // read right file
    result = await app.readFile('./db/topology1.json');
    result === null ? testFailed++ : testSuccesseded++;
    JSON.stringify(result) === JSON.stringify(top1) ?
        testSuccesseded++ : testFailed++;

    // read wrong file
    result = await app.readFile('wrong file');
    result !== null ? testFailed++ : testSuccesseded++;


    // read another right file
    result = await app.readFile('./db/topology2.json');
    result === null ? testFailed++ : testSuccesseded++;

    // test num topolgies
    result = await app.queryTopologies();
    result.length !== 2 ? testFailed++ : testSuccesseded++;

}

/**
 * function to test queru devices 
 */
let testQueryDevices = async () => {
    let top1 = await app.readFile('./db/topology1.json')
    let top2 = await app.readFile('./db/topology2.json')

    result = await app.queryDevices('top1')
    // printObj(result)
    result.length === 3 ? testSuccesseded++ : testFailed++;

    result[0].properties.type === 'resistor' ? testSuccesseded++ : testFailed++;
    result[2].properties.type === 'nmos' ? testSuccesseded++ : testFailed++;

    result[0].properties.netlist['t1'] === 'vdd' ? testSuccesseded++ : testFailed++;
    result[0].properties.netlist['t2'] === 'n1' ? testSuccesseded++ : testFailed++;

}
/**
 * function to test writing to files
 */
let test_writeJSON = async () => {
    const topology1 = await app.readFile('./db/topology1.json')
    // check result of writing
    result = await app.writeFile('top1');
    result === true ? testSuccesseded++ : testFailed++;

    // check the written data in file
    const writtenFile = await app.readFile('./output/top1.json')
    JSON.stringify(writtenFile) === JSON.stringify(top1) ? testSuccesseded++ : testFailed++;
}
/**
 * function to test query devices with netlist
 */
let test_queryDevicesWithNetlistNode = async () => {
    const topology1 = await app.readFile('./db/topology1.json');

    // check only one device is connected
    result = await app.queryDevicesWithNetlistNode('top1', 'vdd')
    result.length == 1 ? testSuccesseded++ : testFailed++;

    // check id of device connected to node
    result[0].properties.id === 'res1' ? testSuccesseded++ : testFailed++;
}
let test_deleteTopology = async () => {
    // load 2 topologies
    const topology1 = await app.readFile('./db/topology1.json');
    const topology2 = await app.readFile('./db/topology2.json');

    // check 2 topolgies in memory
    result = await app.queryTopologies()
    result.length === 2 ? testSuccesseded++ : testFailed++;

    // delete top1 --> check result 
    result = await app.deleteTopology('top1')
    result === true ? testSuccesseded++ : testFailed++;

    // check num topoogies =1 after deleting
    result = await app.queryTopologies()
    result.length === 1 ? testSuccesseded++ : testFailed++;

}

console.log("\n===================TESTING app===================\n")
await testReading();
await testQueryDevices();
await test_writeJSON();
await test_queryDevicesWithNetlistNode();
await test_deleteTopology();
console.timeEnd();

console.log(testSuccesseded + " test cases successeded out of " + (testSuccesseded + testFailed));
console.assert(testFailed == 0, testFailed + " test cases has FAILED!!! ");
