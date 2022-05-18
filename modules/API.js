import Component from "./Component.js";
import Topology from "./Topology.js";
import fs from 'fs'

class API {
    /**
     * private member memry where we store topologies
     */
    #memory;

    /**
     * constructor to initialize the memory (at first it is empty)
     */
    constructor() {
        this.memory = [];
    }
    /**
     * function that read topology from disk and pushes it in memory
     * @param {String} fileName the path of json file
     * @returns {bool} true if done successfully false if failed
     */
    readFile(fileName) {
        let result = null;
        try {
            let rawdata = fs.readFileSync(fileName);
            result = JSON.parse(rawdata);
        } catch (error) {
            console.log(error);
            result = null;
        }
        if (result === null) {
            console.log(`error reading file`);
        } else {
            let topology = this.getTopologyById(result.id)
            if (topology !== null) {
                console.log(`${fileName} is already in memory cant read it again`);
                return result;
            }
            let topologyID = result.id
            let componentList = []
            for (const component in result.components) {
                let newComponent = new Component(result.components[component]);
                componentList.push(newComponent);
            }
            let newTopology = new Topology(topologyID, componentList);
            this.memory.push(newTopology);
            console.log(`succefully read ${fileName}`);
        }
        return result;
    }
    /**
     * function that write a certaion topology to a new file.json
     * outputs are stored in directory (./output/topologyID)
     * @param {String} _id Topology ID
     * @returns {bool} true if done successfully false if failed
     */
    writeFile(_id) {
        let topology = this.getTopologyById(_id)
        if (topology === null) {
            console.log(`error writing file id = ${_id} is not in memort`);
            return false;
        }
        const jsonString = JSON.stringify(topology);
        fs.writeFile((`./output/${topology.id}.json`), jsonString, err => {
            if (err) {
                console.log('Error writing file', err)
                return false;
            } else {
                console.log('Successfully wrote file')
                return true;
            }
        })
        return true;
    }
    /**
     * function that return all topologies stored in memory
     * @returns {bool} true if done successfully false if failed
     */
    queryTopologies() {
        if (this.memory.length === 0) {
            console.log(`no topologies in memory right now`);
        } else {
            return this.memory;
        }
    }
    /**
     * function that delete a certain topology from memory
     * @param {String} topologyID 
     * @returns {bool} true if done successfully false if failed
     */
    deleteTopology(topologyID) {
        let topology = this.getTopologyById(topologyID);
        if(topology === null){
            console.log(`error deleting file no such id =${topologyID} in memory`);
            return false;
        }else{
            this.memory = this.memory.filter((ele) => {
                return ele.id !== topologyID
            })
            console.log("deleting done succefully");
            return true;
        }
    }
    /**
     * function that gets all devices in a certain topology
     * @param {String} topologyID 
     * @returns {bool} true if done successfully false if failed
     */
    queryDevices(topologyID) {
        let topology = this.getTopologyById(topologyID);
        if (topology === null) {
            console.log(`error query devices id= ${topologyID} is not in memory`);
            return [];
        } else {
            console.log('query devices done succefully');
            return topology.components;
        }
    }

    /**
     * function that returns all devices connected to a netListNode
     * in a certain topology
     * @param {String} topologyID 
     * @param {String} NetlistNodeID 
     * @returns {Object} array of devices that are connected to node
     */
    queryDevicesWithNetlistNode(topologyID, NetlistNodeID) {
        let result = [];
        let topology = this.getTopologyById(topologyID);
        if (topology === null) {
            console.log(`error in query devices with net list ${topologyID} is not in memory`);
            return false;
        }
        let deviceList = topology.components
        for (let i = 0; i < deviceList.length; i++) {
            if (deviceList[i].isConnectedToNetlist(NetlistNodeID)) {
                result.push(deviceList[i])
            }
        }
        if (result === []) {
            console.log(`no device connected to node ${NetlistNodeID}`);
        } else {
            console.log(`query device list done successfully`);
        }
        return result;
    }
    /**
     * private method that access topology in memory by ID 
     */
    #getTopologyById(topologyID) {
        let topology = null;
        for (let i = 0; i < this.memory.length; i++) {
            const element = this.memory[i];
            if (element.id === topologyID) {
                topology = element;
                break;
            }
        }
        return topology;
    }
};

export default API

