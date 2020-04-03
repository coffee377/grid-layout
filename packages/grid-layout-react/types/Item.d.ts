import React from 'react';
import { ItemData, WithFalse, CSSProperties } from 'grid-layout-core';
export interface ItemStyle extends CSSProperties {
}
export interface ItemProps extends Partial<ItemData> {
    /**
     * @description 项目内容中心化
     * @default true
     */
    centralized?: boolean;
    /**
     * @description ZIndex 基础值
     */
    baseZIndex?: number;
    /**
     * @description 数据配置
     * @default false
     */
    data?: WithFalse<ItemData>;
    /**
     * @description 项目内容
     */
    content?: React.ReactNode;
    /**
     * @description 网格项外联样式名称
     */
    className?: string;
    /**
     * @description 网格项内联样式
     */
    style?: ItemStyle;
}
declare const Item: React.FC<ItemProps>;
export default Item;
