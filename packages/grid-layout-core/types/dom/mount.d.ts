import { GridData } from "../data";
/**
 * 生成或挂载 dom 元素
 * @param gridData
 * @param inline
 * @param mountElement
 */
export declare type MountFn = (gridData: GridData, inline?: boolean, mountElement?: HTMLElement | Document) => Element;
declare const mount: MountFn;
export default mount;
