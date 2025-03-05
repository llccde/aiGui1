import { Input } from "postcss";
import { Ref } from "vue";

export default class ComponentBuilder {
    public static componentBuilderInstance:ComponentBuilder = new ComponentBuilder();
    private static api_key: string = "sk-cf82e614db424ed28fc6568300f792e2"; // 请替换为真实API密钥
    private static api_url: string = "https://api.deepseek.com";



    private userRequire: string = "null";
    private require_detail:string="null";



    private styleFlags: Map<string,((Input:string)=>void)[]> = new Map();
    async callApi(promote : string): Promise<string | null> {
        try {
            const response = await fetch(`${ComponentBuilder.api_url}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ComponentBuilder.api_key}`
                },
                body: JSON.stringify({
                    model: "deepseek-chat",
                    messages: [
                        { role: "user", content: promote }
                    ]
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error('API调用失败:', error);
            return null;
        }
    }
    async callApi_more(context : {role: string;content: string;}[]): Promise<string | null> {
        try {
            const response = await fetch(`${ComponentBuilder.api_url}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ComponentBuilder.api_key}`
                },
                body: JSON.stringify({
                    model: "deepseek-chat",
                    messages: context
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error('API调用失败:', error);
            return null;
        }
    }
    whatToDo(){
        this.callApi_more([{role:"system",content:"当前是智能家居管理软件,目的是通过ai和已有组件构建动态化的用户界面,实现对用户住所的接入网络的家居进行控制,所有的家居网络接口都已被抽象为 唯一标识符 ,在此阶段,你只需要根据用户的原始需求输入,分析出当前页面实际要拥有的功能,例如用户说自己对家中的家居耗电不确定,你应该分析出这页面应该是获取用户家中所有家居的耗电量,然后整合汇总,进行展示,明白吗?"},
                {role:"assistant",content:"明白"},
                {role:"system",content:"用户提出如下需求:\"  我要一个控制所有房间灯泡的界面\""},
                {role:"assistant",content:"用户提出:我要一个控制所有房间灯泡的界面。这意味着当前页面需要集成所有房间的灯泡控制接口，并提供以下功能：\n\n1. **灯泡列表**：显示家中每个房间的灯泡状态（开/关）。\n2. **开关控制**：提供开关按钮，允许用户直接控制每个灯泡的开关状态。\n3. **调光功能**：如果灯泡支持调光，提供滑块或选择器来调整亮度。\n4. **统一控制**：提供“全开”和“全关”按钮，可同时控制所有灯泡。\n5. **状态反馈**：实时展示每个灯泡的当前状态（开/关）。\n\n这样可以方便用户在一个界面内高效地控制家中所有房间的灯光。"},
                {role:"system",content:"好的,用户提出新的需求:\"我想知道家里的用电情况 \""},                      
            ]).then(response=> console.log(response));
    }
    toTaskTree(){

    }
    toHtml(){
        
    }
    setStyleFlag(name:string,callBack:(Input:string)=>void){
        if(this.styleFlags.has(name)){
            this.styleFlags.get(name).push(callBack);
        }
        else this.styleFlags.set(name,[callBack]);
    }

    setDependency_source(callBack:(input:JSON)=>JSON,describe:JSON){

    }
    setDependency_target(callBack:(input:((input:JSON)=>JSON))=>void,describe:JSON){

    }
    connectDependencies(){

    }
    buildStyleFlags(){

    }
    setUserRequire(requirement: string): void {
        this.userRequire = requirement;
    }

}
