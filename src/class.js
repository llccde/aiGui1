
var module= {};

const debug = true;

export default  class boolState_data {
    static url_get = "http://localhost:3000/get_state_bool/";
    static url_set = "http://localhost:3000/set_state_bool/";
    constructor() {
        this.state = false;
        this.data_api_name = "default";
        this.description = "default";
        this.name = "default";
    }

    changeState() {
        this.state = !this.state;
    }

    getState() {
        return this.state;
    }

    async fromJSON(json) {
        if (json.type === "bool") {
            this.data_api_name = json.data_api_name;
            this.description = json.description;
            this.name = json.name;
            try {
                const response = await fetch(boolState_data.url_get + this.data_api_name);
                const data = await response.json();
                if (data.state !== undefined) {
                    this.state = data.state;
                } else {
                    if (debug) {
                        alert("Error: state not found in --" + this.data_api_name);
                    }
                    this.state = Math.random() >= 0.5;
                }
            } catch (error) {
                if (debug) {
                    alert("Error fetching state: " + error);
                }
                this.state = Math.random() >= 0.5;
            }
        }
    }
}
class enumState_data{
    static url_get = "http://localhost:3000/get_state_enum/";
    static url_set = "http://localhost:3000/set_state_enum/";
    constructor() {
        this.state = 0;
        this.data_api_name = "default";
        this.description = "default";
        this.name = "default";
        this.enum = ["option1", "option2"];
    }

    changeState(index) {
        this.state = (index < this.enum.length) && (index>=0)? index:enumState_data.length-1;
    }

    getState() {
        return this.state;
    }
    getSelection(){
        return this.enum[this.state];
    }

    async fromJSON(json) {
        if (json.type === "enum") {
            this.data_api_name = json.data_api_name;
            this.description = json.description;
            this.name = json.name;
            this.enum = json.enum;
            try {
                const response = await fetch(enumState_data.url_get + this.data_api_name);
                const data = await response.json();
                if (data.state !== undefined) {
                    this.state = data.state;
                } else {
                    if (debug) {
                        alert("Error: state not found in --" + this.data_api_name);
                    }
                    this.state = Math.floor(Math.random() * this.enum.length);
                }
            } catch (error) {
                if (debug) {
                    alert("Error fetching state: " + error);
                }
                this.state = Math.floor(Math.random() * this.enum.length);
            }
        }
    }
}
class intState_data{
    static url_get = "http://localhost:3000/get_state_int/";
    static url_set = "http://localhost:3000/set_state_int/";
    constructor() {
        this.state = 0;
        this.data_api_name = "default";
        this.description = "default";
        this.name = "default";
        this.min = 0;
        this.max = 100;
    }

    changeState(value) {
        this.state = value;
    }

    getState() {
        return this.state;
    }

    async fromJSON(json) {
        if (json.type === "int") {
            this.data_api_name = json.data_api_name;
            this.description = json.description;
            this.name = json.name;
            this.min = json.min;
            this.max = json.max;
            try {
                const response = await fetch(intState_data.url_get + this.data_api_name);
                const data = await response.json();
                if (data.state !== undefined) {
                    this.state = data.state;
                } else {
                    if (debug) {
                        alert("Error: state not found in --" + this.data_api_name);
                    }
                    this.state = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
                }
            } catch (error) {
                if (debug) {
                    alert("Error fetching state: " + error);
                }
                this.state = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
            }
        }
    }
}
module.exports = {boolState_data,enumState_data,intState_data};