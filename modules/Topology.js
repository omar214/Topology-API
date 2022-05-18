
class Topology {
    /**
     * constructor to initialize topology members
     * @param {String} _id 
     * @param {Object} _components 
     */
    constructor(_id, _components) {
        this.id = _id;
        this.components = _components;
    }
    /**
     * setter to edit the component in a topology
     * @param {Object} _components 
     */
    setDevices = ( _components) => {
        this.components = _components;
    }
    /**
     * getter to access the components in topology
     * @returns {Object}
     */
    getDevices = () => {
        return this.components;
    }
    /**
     * function to print the topology data
     */
    print(){
        console.log(`topology --> ${this.id}\n`);
        for (const key in this.components) {
            this.components[key].print();
        }
        console.log('\n ------------------ \n');
    }
};

export default Topology;