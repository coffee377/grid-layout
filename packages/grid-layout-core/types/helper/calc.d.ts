import { CSSProperties, GridData, ItemData } from "../data";
/**
 * @description 计算网格项目所在区域
 * @param itemData
 */
export declare type GridAreaFn = (itemData: ItemData) => string;
/**
 * 样式记录
 * @param gridData
 */
export declare type StyleFn = (gridData: GridData) => Record<string, CSSProperties>;
declare const calcGridArea: GridAreaFn;
declare const calcStyle: StyleFn;
export { calcGridArea, calcStyle };
