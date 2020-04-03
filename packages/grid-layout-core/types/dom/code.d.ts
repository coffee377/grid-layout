import { GridData } from "../data";
/**
 * 创建代码文本
 * @param gridData
 * @param inline
 * @param format
 */
export declare type CodeTextFn = (gridData: GridData, inline?: boolean, format?: boolean) => string;
declare const DomCodeText: CodeTextFn;
export default DomCodeText;
