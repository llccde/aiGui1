import Sense from "./json_interface";
const serverHost = "http://localhost:8089";
const serverPath = "/api";
const setUrl = "/set";
const getUrl = "/get";

// 抽象基类
class BaseStateInstance {
  constructor(DataInterface) {
    if (new.target === BaseStateInstance) {
      throw new Error("Cannot instantiate abstract class");
    }
    this.data = DataInterface;
  }

  // 公共同步方法
  async syncFromServer() {
    try {
      const value = await this._fetchData('GET');
      this.data.setState(value);
    } catch (error) {
      console.error('Sync failed:', error);
    }
  }

  // 公共状态获取
  getState() {
    return this.data.getState();
  }

  // 公共状态设置
  async setState(value) {
    try {
      await this._fetchData('SET', value);
      this.data.setState(value);
    } catch (error) {
      console.error('Set state failed:', error);
      throw error;
    }
  }

  // 统一的请求方法
  async _fetchData(method, value = null) {
    const url = new URL(`${serverHost}${serverPath}${method === 'GET' ? getUrl : setUrl}`);
    url.searchParams.append('data_api_name', this.data.data_api_name);

    if (method === 'SET') {
      url.searchParams.append('new_value', value);
    }

    const response = await fetch(url, {
      //method: method === 'GET' ? 'GET' : 'POST'
      method: "GET" // 仅为示例，实际应根据具体情况选择
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json().dataValue;
  }
}

// 布尔类型状态实例
class BoolStateInstance extends BaseStateInstance {
  // 可添加布尔类型特有方法
}

// 整型类型状态实例
class IntStateInstance extends BaseStateInstance {
  getRange() {
    return this.data.getRange();
  }
}

// 枚举类型状态实例
class EnumStateInstance extends BaseStateInstance {
  getOptions() {
    return this.data.getOptions();
  }
}

// 状态工厂类
export default class State_data_instance {
  static stateInstancePack = new State_data_instance();
  static types = {
    INT: "int",
    BOOL: "bool", 
    ENUM: "enum"
  };

  constructor() {
    this.sense = new Sense();
  }
  getSense() {
    return this.sense;
  }
  getInstance(type, data_api_name) {
    const interfaceMap = {
      [State_data_instance.types.INT]: IntStateInstance,
      [State_data_instance.types.BOOL]: BoolStateInstance,
      [State_data_instance.types.ENUM]: EnumStateInstance
    };

    const InstanceClass = interfaceMap[type];
    if (!InstanceClass) {
      throw new Error(`Unknown status type: ${type}`);
    }

    return new InstanceClass(
      this.sense.getStateInterface(data_api_name)
    );
  }
}