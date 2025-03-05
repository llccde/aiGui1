import { error } from "jquery";
import { Ref, SetupContext } from "vue";

export default class dynamicComponent{
    
    attrs:SetupContext['attrs'];
    template_name:string;
    children:{child:dynamicComponent,atSlot?:string}[];

    public init(the_props:any,template_name:string,children?:{child:dynamicComponent,atSlot?:string}[]):void{
        this.attrs = this.attrs;
        this.template_name = template_name;
        if(children)this.children = children;
    }
}