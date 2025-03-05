export default class DescribeData{

    static componentToString(c): string {
        let result = '{\n';
        for (const key in c) {
            if (c.hasOwnProperty(key)) {
                const value = c[key];
                // 处理数组类型的字段（如 in_which_room）
                if (Array.isArray(value)) {
                    result += `${key}: [${value.join(', ')}],\n`;
                } else {
                    result += `${key}: ${value},\n`;
                }
            }
        }
        result+="}";
        return result.trim(); // 去掉末尾的换行符
    }
    static componentToStringSimple(c){
        let result = 
        `{\ntemplate_name:${c.template_name},\nuse:${c.use}\n}`;
        return result;

    }
}