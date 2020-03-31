import React, { CSSProperties } from 'react';
import { ContainerData, WithFalse } from "grid-layout-core/data";
export interface ContainerStyle extends CSSProperties {
}
export interface ContainerProps extends Partial<ContainerData> {
    /**
     * @description 数据配置
     * @default false
     */
    data?: WithFalse<ContainerData>;
    /**
     * @description 内联样式配置优先
     * @default true
     */
    stylePreferred?: boolean;
    /**
     * @description 外联样式名称
     */
    className?: string;
    /**
     * @description 内联样式
     */
    style?: ContainerStyle;
}
declare const Container: React.FC<ContainerProps>;
export default Container;
