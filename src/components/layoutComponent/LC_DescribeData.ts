import { param } from "jquery";
import DescribeData from "../DescribeData";

export default class LC_DescribeData{
    static basicComponents=[
        {
            template_name: "smart_container",
            ch_name: "智能布局容器",
            use: "自动化容器组件,通过<smart_container page_mode=true><component1 page_num=1/><component2 page_num=2/><smart_container page_num=3 night_mode:true><component3></smart_container></smart_container>的方式来管理布局,组件过多时应使用智能容器根据组件用途进行分组,接下来是对它的参数的描述",
        },
        {
            param_name:"page_mode",
            value:"true or false",
            child_param:"page_num",
            child_param_value:"int value of the page number",
            use:"分页模式下,智能容器将每次只展示一个直接子组件,并自动生成翻页功能所需的gui元素,直接子组件需指定page_num来指定自身所处的页码"
        },
        {
            param_name:"night_mode",
            value:"true or false",
            use:"黑夜模式开启,会自动传递给所有子组件,并影响他们的颜色"
        },
        {
            param_name:"back_color",
            value:"Hexadecimal color code",
            use:"组件整体色彩,兼容性强"
        },
        {
            template_name: "like_div",
            ch_name: "div增强型",
            use: "可以像一般的<div>标签一样通过style标签指定布局"
        },
    ];
    static promote=this.getBasePromote();
        
    private static getBasePromote():string{
        let result:string="";
        result+=
            `\n这里是布局管理组件,smartContainer可以通过指定attr参数来实现各种布局\n`; 
        this.basicComponents.forEach((component,index)=>{
            result+= index.toString()+".\n"+DescribeData.componentToString(component)+"\n"

        });
        console.log(result);
        return result;
    }
    
}