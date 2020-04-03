import { GridType } from "../data";
declare class ClassNameRule {
    readonly type: GridType;
    readonly name: string;
    readonly separator: string;
    constructor(type: GridType, name: string, separator?: string);
    key: () => string;
    static phrase: (text: string, separator?: string) => ClassNameRule;
    static of: (type: GridType, name: string, separator?: string) => ClassNameRule;
    static container: (name: string) => ClassNameRule;
    static item: (name: string) => ClassNameRule;
}
export default ClassNameRule;
