import DescribeData from "../DescribeData";
export default class VC_DescribeData{

    static components = [
        {
            template_name: "air_conditioner_general_management_panel",
            ch_name: "空调总控面板",
            use: "Control panel containing all the functions of the air conditioner"
        },
        {
            template_name: "light_control_panel",
            ch_name: "灯光控制面板",
            use: "Control panel for lighting",
        },



    ];


    static promote=this.getBasePromote();
    
    private static getBasePromote():string{
        let result:string;
        result+=
            `\n这里是所有的值组件,即负责与数据交互的组件,这里包含组件vue注册名称,
            使用小写字母和下划线命名,以及组件用途的中文描述,以及组件其他的一些可选属性,
            你可以使用<注册名称 可选属性名:可选属性值>使用他们\n`; 
        this.components.forEach((component,index)=>{
            result+= index.toString()+".\n"+DescribeData.componentToStringSimple(component)+"\n"

        });
        console.log(result);
        return result;
    }


}
