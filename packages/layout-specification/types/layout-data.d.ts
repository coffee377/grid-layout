declare module 'layout-data' {
  import * as CSS from 'csstype';

  export interface CSSProperties extends CSS.Properties<string | number> {}

  // export type NameRule = (name: string) => string;

  export type GridType = 'container' | 'item';

  export type WithFalse<T> = T | false;

  export type FlowType = 'row' | 'column' | 'row dense' | 'column dense';

  export type ContentAlignType =
    | 'start'
    | 'end'
    | 'center'
    | 'stretch'
    | 'space-around'
    | 'space-between'
    | 'space-evenly';

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
