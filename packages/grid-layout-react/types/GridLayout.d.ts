import React from 'react';
import { GridData } from 'grid-layout-core';
import Container from "./Container";
import Item from "./Item";
/**
 * 包裹组件，仅用于传递数据
 */
export interface GridLayoutProps extends Partial<GridData> {
    /**
     * @description 网格布局配置数据
     */
    data?: GridData;
}
interface GridLayoutType extends React.FC<GridLayoutProps> {
    Container?: typeof Container;
    Item?: typeof Item;
}
declare const GridLayout: GridLayoutType;
export default GridLayout;
