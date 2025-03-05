class BoolState {
  constructor(data, parent, allStates) {
    this.name = data.name;
    this.type = data.type;
    this.description = data.description;
    this.data_api_name = data.data_api_name;
    this.state = false;
    this.parent = parent;
    allStates.set(this.data_api_name, this);
  }

  setState(value) {
    this.state = value;
  }

  getState() {
    return this.state;
  }
}

class IntState {
  constructor(data, parent, allStates) {
    this.name = data.name;
    this.type = data.type;
    this.description = data.description;
    this.data_api_name = data.data_api_name;
    this.range = data.range;
    this.state = this.range[0];
    this.parent = parent;
    allStates.set(this.data_api_name, this);
  }

  setState(value) {
    if (value >= this.range[0] && value <= this.range[1]) {
      this.state = value;
    }
  }

  getState() {
    return this.state;
  }

  getRange() {
    return {min: this.range[0], max: this.range[1]};
  }
}

class EnumState {
  constructor(data, parent, allStates) {
    this.name = data.name;
    this.type = data.type;
    this.description = data.description;
    this.data_api_name = data.data_api_name;
    this.options = data.options;
    this.state = this.options[0];
    this.stateIndex = 0;
    this.parent = parent;
    allStates.set(this.data_api_name, this);
  }

  setState(value) {
    if (this.options.includes(value)) {
      this.state = value;
      this.stateIndex = this.options.indexOf(value);
    }
  }

  getState() {
    return this.state;
  }

  getOptions() {
    return this.options;
  }
}

class Furniture {
  constructor(data, parent, allStates) {
    this.name = data.name;
    this.type = data.type;
    this.status = data.status.map(status => {
      switch (status.type) {
        case 'bool':
          return new BoolState(status, this, allStates);
        case 'int':
          return new IntState(status, this, allStates);
        case 'enum':
          return new EnumState(status, this, allStates);
        default:
          throw new Error(`Unknown status type: ${status.type}`);
      }
    });
    this.parent = parent;
  }
}

class Room {
  constructor(data, parent, allStates) {
    this.name = data.name;
    this.furniture = data.furniture.map(furniture => new Furniture(furniture, this, allStates));
    this.parent = parent;
  }
}

class House {
  constructor(data, allStates) {
    this.room_list = data.room_list.map(room => new Room(room, this, allStates));
  }
}

export default class Sense {

  constructor() {
    this.house = null;
    this.allStates = new Map();
    this.loadHouseData();
  }

  async loadHouseData() {
    try {
      const response = await fetch("http://127.0.0.1:8089/get_room_json");
      const data = await response.json();
      this.createHouseFromJson(data);
    } catch (error) {
      console.error('Failed to load house data:', error);
    }
  }

  createHouseFromJson(json) {
    this.house = new House(json, this.allStates);
    return this.house;
  }

  getStateInterface(data_api_name) {
    return this.allStates.get(data_api_name);
  }

}
