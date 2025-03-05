import { Ref, ref } from 'vue';

export default class FlagOutPutManager {
    public static CssFlagRegister: Ref<Function>;
    public FlagName: string;
    public Flags: Ref<any>[];

}