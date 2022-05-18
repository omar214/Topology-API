class Component {
    /**
     * constructor to initialize data of device 
     * @param {Object} _properties 
     */
    constructor(_properties) {
        this.properties = _properties;
    };


    /**
     * function to set data of device
     * @param {Object} _properties 
     */
    setData = (_properties) => {
        this.properties = _properties;
    };
    /**
     * function to check if device is conneted to a certain node
     * @param {String} node the node we check 
     * @returns {bool} true if devices is connect false if not connected
     */
    isConnectedToNetlist = (node) => {
        if (!this.properties.hasOwnProperty("netlist")) {
            return false;
        }
        let netlist = this.properties["netlist"];
        if (netlist === null) return false;
        for (const key in netlist) {
            if (netlist[key] == node)
                return true;
        }
        return false;
    };
    /**
     * function to print the component data
     */
    print() {
        console.log(`\tcomponent --> ${this.properties.id}`);
        for (const key in this.properties) {
            console.log(`\t ${key} : ${JSON.stringify(this.properties[key] )}`);
        }
        console.log('\n \t------------------ \n');
    }
};

export default Component