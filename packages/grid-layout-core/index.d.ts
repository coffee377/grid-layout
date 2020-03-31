declare module "grid-layout-core/helper/const" {
    const CONTAINER = "container";
    const ITEM = "item";
    const SEPARATOR = ":";
    export { CONTAINER, ITEM, SEPARATOR };
}
declare module "grid-layout-core/data/layout-data" {
    import * as CSS from 'csstype';
    export interface CSSProperties extends CSS.Properties<string | number> {
    }
    export type GridType = 'container' | 'item';
    export type WithFalse<T> = T | false;
    export type FlowType = 'row' | 'column' | 'row dense' | 'column dense';
    export type ContentAlignType = 'start' | 'end' | 'center' | 'stretch' | 'space-around' | 'space-between' | 'space-evenly';
    export type ItemsAlignType = 'start' | 'end' | 'center' | 'stretch';
    export interface ComponentData {
        /**
         * @description 组件库名称
         */
        lib: string;
        /**
         * @description 组件名称
         */
        name: string;
        /**
         * @description 组件属性
         */
        props?: Exclude<any, Function>;
    }
    export interface ContainerData extends CSSProperties {
        /**
         * @description 容器名称(英文)
         */
        name?: string;
        /**
         * @description 容器展示成网格块级元素或行内元素
         * @default grid
         */
        display: 'grid' | 'inline-grid';
        /**
         * @description 定义每一行的行高
         * @default 1fr
         */
        gridTemplateRows: string;
        /**
         * @description 定义每一列的列宽
         * @default 1fr
         */
        gridTemplateColumns: string;
        /**
         * @description 容器宽度
         */
        width?: string | 0;
        /**
         * @description 容器高度
         */
        height?: string | 0;
        /**
         * @description 网格行与行的间隔（行间距）
         * @default 0
         */
        gridRowGap?: number | string;
        /**
         * 网格列与列的间隔（列间距）
         * @default 0
         */
        gridColumnGap?: number | string;
        /**
         * @description 容器的子元素排序方式
         */
        gridAutoFlow?: FlowType;
        /**
         * @description 整个内容区域在容器里面的水平位置
         */
        justifyContent?: ContentAlignType;
        /**
         * @description 整个内容区域在容器里面的垂直位置
         */
        alignContent?: ContentAlignType;
        /**
         * @description 设置所有单元格内容的水平位置
         * @see ItemData#justifySelf
         */
        justifyItems?: ItemsAlignType;
        /**
         * @description 设置所有单元格内容的垂直位置
         * @see ItemData#alignSelf
         */
        alignItems?: ItemsAlignType;
    }
    export interface ItemData {
        /**
         * @description 网格项目ID
         */
        id: string;
        /**
         * @description 网格项目名称(英文)，名称唯一
         */
        name: string;
        /**
         * @description 网格项目上边框所在的水平网格线
         */
        rowStart: number;
        /**
         * @description 网格项目下边框所在的水平网格线
         */
        columnStart: number;
        /**
         * @description 网格项目合并单元格行数
         * @default 1
         */
        rowSpan?: number;
        /**
         * @description 网格项目合并单元格列数
         * @default 1
         */
        columnSpan?: number;
        /**
         * @description 网格项目所在区域
         */
        gridArea?: string;
        /**
         * @description 网格项目CSS层级
         * @default 0
         */
        zIndex?: number;
        /**
         * @description 设置网格单元格内容的水平位置
         * @see ContainerData#justifyItems
         * @default stretch
         */
        justifySelf?: ItemsAlignType;
        /**
         * @description 设置单元格内容的垂直位置
         * @see ContainerData#alignItems
         * @default stretch
         */
        alignSelf?: ItemsAlignType;
        /**
         * @description 网格项外联样式名称
         */
        className?: string;
        /**
         * @description 网格项内联样式
         */
        style?: CSSProperties;
        /**
         * @description 项目使用的组件
         */
        component?: string | ComponentData;
    }
    export interface GridData {
        /**
         * @description 网格布局配置ID
         */
        id: string;
        /**
         * @description 网格布局配置名称（英文）
         */
        name: string;
        /**
         * @description 网格容器配置数据
         */
        container: ContainerData;
        /**
         * @description 网格项目配置数据
         */
        item?: ItemData[];
        /**
         * @description 网格容器额外样式
         */
        containerStyle?: CSSProperties;
        /**
         * @description 网格项目公用样式,默认外联样式类名 item
         */
        itemStyle?: CSSProperties;
    }
}
declare module "grid-layout-core/data" {
    export * from "grid-layout-core/data/layout-data";
}
declare module "grid-layout-core/rule/classNameRule" {
    import { GridType } from "grid-layout-core/data";
    class ClassNameRule {
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
}
declare module "grid-layout-core/rule" {
    export { default as ClassNameRule } from "grid-layout-core/rule/classNameRule";
}
declare module "grid-layout-core/helper/helper" {
    import { CSSProperties, GridData, ItemData } from "grid-layout-core/data";
    /**
     * @description 计算网格项目所在区域
     * @param itemData
     */
    export type GridAreaFn = (itemData: ItemData) => string;
    /**
     * 样式记录
     * @param gridData
     */
    export type StyleFn = (gridData: GridData) => Record<string, CSSProperties>;
    const calcGridArea: GridAreaFn;
    const containerClassName: (data: GridData) => string;
    const itemClassName: (itemData: ItemData) => string;
    const calcStyle: StyleFn;
    export { calcGridArea, calcStyle, containerClassName, itemClassName };
}
declare module "grid-layout-core/helper" {
    export * from "grid-layout-core/helper/const";
    export * from "grid-layout-core/helper/helper";
}
declare module "grid-layout-core/dom/render" {
    import { GridData } from "grid-layout-core/data";
    const render: (data: GridData, inline?: boolean) => VirtualDOM.VNode;
    export default render;
}
declare module "grid-layout-core/dom/mount" {
    import { GridData } from "grid-layout-core/data";
    /**
     * 生成或挂载 dom 元素
     * @param gridData
     * @param inline
     * @param mountElement
     */
    export type MountFn = (gridData: GridData, inline?: boolean, mountElement?: HTMLElement | Document) => Element;
    const mount: MountFn;
    export default mount;
}
declare module "grid-layout-core/dom/code" {
    import { GridData } from "grid-layout-core/data";
    /**
     * 创建代码文本
     * @param gridData
     * @param inline
     * @param format
     */
    export type CodeTextFn = (gridData: GridData, inline?: boolean, format?: boolean) => string;
    const DomCodeText: CodeTextFn;
    export default DomCodeText;
}
declare module "grid-layout-core/dom" {
    export { default as mount } from "grid-layout-core/dom/mount";
    export { default as domCodeText } from "grid-layout-core/dom/code";
}
declare module "grid-layout-core/css/code" {
    import { CSSProperties, GridData } from "grid-layout-core/data";
    interface Options {
        /**
         * A string used for the indentation of the declaration (default is 4
         * spaces).
         */
        indent?: string;
        /**
         * Defines the placement of open curly brace, either end-of-line (default)
         * or separate-line
         */
        openbrace?: 'end-of-line' | 'separate-line';
        /**
         * Always inserts a semicolon after the last ruleset(default is false)
         */
        autosemicolon?: boolean;
    }
    type CssFn = (data: Record<string, CSSProperties> | GridData, format?: boolean, formatOpts?: Options) => string;
    const CssCodeText: CssFn;
    export default CssCodeText;
}
declare module "grid-layout-core/css" {
    export { default as cssCodeText } from "grid-layout-core/css/code";
}
declare module "grid-layout-core/validator/validator" {
    import { GridData } from "grid-layout-core/data";
    type Result<T> = true | T[];
    export type VerifyFn = (gridData: GridData) => Result<string>;
    const verify: VerifyFn;
    export default verify;
}
declare module "grid-layout-core/validator" {
    export { default as verify } from "grid-layout-core/validator/validator";
}
declare module "grid-layout-core" {
    export { calcGridArea, calcStyle } from "grid-layout-core/helper";
    export { mount, domCodeText } from "grid-layout-core/dom";
    export { cssCodeText } from "grid-layout-core/css";
    export { verify } from "grid-layout-core/validator";
}
