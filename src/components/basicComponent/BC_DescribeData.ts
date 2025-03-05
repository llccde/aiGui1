import DescribeData from "../DescribeData";

export default class BC_DescribeData{
    static basicComponents=[
        {
            template_name: "basic_button",
            ch_name: "基础按钮",
            use: "基础按钮,可以通过指定target项的值来控制多种家具,",
            target:["light_bedroom","light_kitchen","light_living_room","light_bathroom","light_corridor"]
        }
    ]
    static promote=this.getBasePromote();
        
        private static getBasePromote():string{
            let result:string;
            result+=
                `\n这里是所有的基础组件,大多数是通过指定target参数来自动关联到对应的api\n`; 
            this.basicComponents.forEach((component,index)=>{
                result+= index.toString()+".\n"+DescribeData.componentToString(component)+"\n"
    
            });
            console.log(result);
            return result;
        }
}