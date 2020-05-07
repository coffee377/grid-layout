import React from 'react';
import { GridData } from 'grid-layout-core';
/**
 * 包裹组件，仅用于传递数据
 */
export interface GridLayoutProps extends Partial<GridData> {
    /**
     * @description 网格布局配置数据
     */
    data?: GridData;
}
declare const GridLayout: React.FC<GridLayoutProps>;
export default GridLayout;
